const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const axios = require("axios");

// Live price fetch (CoinGecko)
const getCryptoPriceUSD = async (coin) => {
  const ids = { BTC: "bitcoin", ETH: "ethereum" };
  const id = ids[coin];
  if (!id) throw new Error("Unsupported coin for pricing");
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  );
  const price = response.data?.[id]?.usd;
  if (!price) throw new Error("Failed to fetch price");
  return Number(price);
};

const createOrder = async (req, res) => {
  try {
    const { userId, items, selectedCoin, billingDetails, shippingDetails } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: "No items selected" });

    // Handle both single coin and array of coins
    let coinsToProcess;
    if (Array.isArray(selectedCoin)) {
      coinsToProcess = selectedCoin.map(coin => coin.toUpperCase());
    } else {
      coinsToProcess = [(selectedCoin || "").toUpperCase()];
    }

    // Validate all coins
    const validCoins = coinsToProcess.filter(coin => ["BTC", "ETH"].includes(coin));
    if (validCoins.length === 0)
      return res.status(400).json({ success: false, message: "Invalid cryptocurrency selected" });

    if (!billingDetails?.fullName || !billingDetails?.email || !billingDetails?.address)
      return res.status(400).json({ success: false, message: "Billing details are required" });

    // Calculate total USD from frontend item prices
    let totalUSD = 0;
    items.forEach(item => {
      if (!item.priceUSD || !item.quantity)
        throw new Error("Invalid item price or quantity");
      totalUSD += item.priceUSD * item.quantity;
    });

    // Get the first product to check supported addresses
    const product = await Product.findById(items[0].productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Create payment options for each coin
    const paymentOptions = {};
    let primaryCoin = null;
    let primaryReceiveAddress = null;
    let primaryCryptoAmount = null;

    for (const coin of validCoins) {
      const receiveAddress = product.cryptoAddresses?.[coin];
      if (!receiveAddress) {
        console.warn(`${coin} not supported for product ${product.name}`);
        continue;
      }

      // Calculate crypto amount
      const priceUSD = await getCryptoPriceUSD(coin);
      const cryptoAmountLocked = (totalUSD / priceUSD).toFixed(8);

      paymentOptions[coin] = {
        receiveAddress,
        cryptoAmountLocked,
        priceUSD
      };

      // Set the first valid coin as primary for backward compatibility
      if (!primaryCoin) {
        primaryCoin = coin;
        primaryReceiveAddress = receiveAddress;
        primaryCryptoAmount = cryptoAmountLocked;
      }
    }

    if (Object.keys(paymentOptions).length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No supported cryptocurrencies available for this product" 
      });
    }

    const order = new Order({
      userId: userId || null,
      items,
      totalUSD,
      selectedCoin: validCoins, // Store array of coins
      paymentOptions, // Store all payment options
      
      // Legacy fields for backward compatibility
      receiveAddress: primaryReceiveAddress,
      cryptoAmountLocked: primaryCryptoAmount,
      
      billingDetails,
      shippingDetails: shippingDetails || billingDetails,
      status: "AWAITING_PAYMENT",
      quoteExpiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 min
    });

    await order.save();
    return res.json({ success: true, message: "Order created", order });
  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get payment info for specific coin type
const getPaymentInfo = async (req, res) => {
  try {
    const { orderId, coinType } = req.params;
    const coin = coinType.toUpperCase();

    if (!["BTC", "ETH"].includes(coin)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid coin type. Only BTC and ETH are supported." 
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    if (new Date() > order.quoteExpiresAt) {
      return res.status(400).json({ 
        success: false, 
        message: "Order quote has expired" 
      });
    }

    const product = await Product.findById(order.items[0].productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    const receiveAddress = product.cryptoAddresses?.[coin];
    if (!receiveAddress) {
      return res.status(400).json({ 
        success: false, 
        message: `${coin} address not configured for this product` 
      });
    }

    let cryptoAmount;
    
    if (coin === order.selectedCoin) {
      cryptoAmount = order.cryptoAmountLocked;
    } else {
      try {
        const currentPrice = await getCryptoPriceUSD(coin);
        cryptoAmount = (order.totalUSD / currentPrice).toFixed(8);
      } catch (error) {
        console.error(`Error fetching ${coin} price:`, error);
        return res.status(500).json({ 
          success: false, 
          message: `Failed to calculate ${coin} amount` 
        });
      }
    }

    const qrCode = `${coin.toLowerCase()}:${receiveAddress}?amount=${cryptoAmount}`;

    return res.json({
      success: true,
      receiveAddress,
      cryptoAmount,
      qrCode,
      coinType: coin,
      orderTotal: order.totalUSD,
      expiresAt: order.quoteExpiresAt
    });

  } catch (error) {
    console.error("getPaymentInfo error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// NEW: Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status.toUpperCase();
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const orders = await Order.find(filter)
      .populate({
        path: 'items.productId',
        select: 'name images',
        options: { lean: true }
      })
      .populate({
        path: 'userId',
        select: 'fullName email',
        options: { lean: true }
      })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalOrders = await Order.countDocuments(filter);

    return res.json({
      success: true,
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("getAllOrders error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// NEW: Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber, carrier, estimatedDelivery, adminNotes, internalStatus } = req.body;

    const validStatuses = [
      "PENDING", 
      "AWAITING_PAYMENT", 
      "PAID", 
      "CONFIRMED", 
      "IN_WAREHOUSE", 
      "SHIPPED", 
      "DELIVERED", 
      "FAILED", 
      "EXPIRED", 
      "CANCELLED"
    ];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status" 
      });
    }

    const updateData = { status };
    
    // Add tracking information when status changes to SHIPPED
    if (status === "SHIPPED") {
      if (trackingNumber) updateData.trackingNumber = trackingNumber;
      if (carrier) updateData.carrier = carrier;
      if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;
      updateData.shippedAt = new Date();
    }
    
    // Add delivery timestamp when status changes to DELIVERED
    if (status === "DELIVERED") {
      updateData.deliveredAt = new Date();
    }
    
    // Add admin notes and internal status if provided
    if (adminNotes) updateData.adminNotes = adminNotes;
    if (internalStatus) updateData.internalStatus = internalStatus;

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    ).populate('items.productId', 'name images');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    return res.json({
      success: true,
      message: "Order updated successfully",
      order
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// NEW: Update tracking information (Admin)
const updateTrackingInfo = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { trackingNumber, carrier, estimatedDelivery } = req.body;

    if (!trackingNumber || !carrier) {
      return res.status(400).json({ 
        success: false, 
        message: "Tracking number and carrier are required" 
      });
    }

    const updateData = {
      trackingNumber,
      carrier,
      estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined
    };

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    ).populate('items.productId', 'name images');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    return res.json({
      success: true,
      message: "Tracking information updated successfully",
      order
    });
  } catch (error) {
    console.error("updateTrackingInfo error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// NEW: Get user orders
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, email } = req.query;

    console.log('getUserOrders called with:', { userId, email, page, limit });

    // First, let's check what orders exist in the database
    const totalOrdersInDB = await Order.countDocuments({});
    console.log(`Total orders in database: ${totalOrdersInDB}`);

    if (totalOrdersInDB > 0) {
      // Get a sample order to see the structure
      const sampleOrder = await Order.findOne({}).select('userId billingDetails.email status createdAt');
      console.log('Sample order structure:', sampleOrder);
    }

    // Build the query based on available parameters
    let query = {};
    
    if (email) {
      // If email is provided, look for orders by userId OR email
      query = {
        $or: [
          { userId: userId },
          { 'billingDetails.email': email }
        ]
      };
    } else {
      // If no email provided, we need to get the user's email first
      // since the orders are guest orders with userId: null
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
      
      // Query by email since orders are guest orders
      query = { 'billingDetails.email': user.email };
      console.log(`User found: ${user.email}, querying by email`);
    }

    console.log('Query being executed:', JSON.stringify(query, null, 2));

    const orders = await Order.find(query)
      .populate('items.productId', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    console.log(`Found ${orders.length} orders`);

    const totalOrders = await Order.countDocuments(query);

    return res.json({
      success: true,
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("getUserOrders error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// NEW: Update shipping address (User)
const updateShippingAddress = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { shippingDetails } = req.body;

    console.log('=== updateShippingAddress called ===');
    console.log('orderId:', orderId);
    console.log('shippingDetails from body:', shippingDetails);
    console.log('Full request body:', req.body);
    console.log('Full request params:', req.params);

    // Validate shipping details - only require the fields that are being updated
    if (!shippingDetails) {
      console.log('Validation failed - no shipping details provided');
      return res.status(400).json({ 
        success: false, 
        message: "Shipping details are required" 
      });
    }

    // Check if at least one field is being updated (and has actual content)
    const hasUpdates = (shippingDetails.address && shippingDetails.address.trim() !== '') || 
                      (shippingDetails.city && shippingDetails.city.trim() !== '') || 
                      (shippingDetails.country && shippingDetails.country.trim() !== '') || 
                      (shippingDetails.fullName && shippingDetails.fullName.trim() !== '') || 
                      (shippingDetails.email && shippingDetails.email.trim() !== '') || 
                      (shippingDetails.phone && shippingDetails.phone.trim() !== '') || 
                      (shippingDetails.postalCode && shippingDetails.postalCode.trim() !== '');
    
    if (!hasUpdates) {
      console.log('Validation failed - no fields to update');
      return res.status(400).json({ 
        success: false, 
        message: "Please provide at least one field to update" 
      });
    }

    // Log what we received for debugging
    console.log('Received shipping details:', JSON.stringify(shippingDetails, null, 2));
    console.log('Fields with values:', {
      address: shippingDetails.address,
      city: shippingDetails.city,
      country: shippingDetails.country,
      fullName: shippingDetails.fullName,
      email: shippingDetails.email,
      phone: shippingDetails.phone,
      postalCode: shippingDetails.postalCode
    });

    // Find the order first to check its current status
    const order = await Order.findById(orderId);
    if (!order) {
      console.log('Order not found with ID:', orderId);
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    console.log('Current order status:', order.status);
    console.log('Current order shipping details:', order.shippingDetails);

    // Only allow updates if order is not yet shipped
    if (['SHIPPED', 'DELIVERED'].includes(order.status)) {
      console.log('Order status prevents update:', order.status);
      return res.status(400).json({ 
        success: false, 
        message: "Cannot update shipping address for shipped orders" 
      });
    }

    // Update the shipping details - only update fields that are provided
    const updateData = {
      shippingDetails: {
        fullName: shippingDetails.fullName !== undefined ? shippingDetails.fullName : (order.shippingDetails?.fullName || order.billingDetails?.fullName),
        email: shippingDetails.email !== undefined ? shippingDetails.email : (order.shippingDetails?.email || order.billingDetails?.email),
        phone: shippingDetails.phone !== undefined ? shippingDetails.phone : (order.shippingDetails?.phone || order.billingDetails?.phone),
        address: shippingDetails.address !== undefined ? shippingDetails.address : order.shippingDetails?.address,
        city: shippingDetails.city !== undefined ? shippingDetails.city : order.shippingDetails?.city,
        country: shippingDetails.country !== undefined ? shippingDetails.country : order.shippingDetails?.country,
        postalCode: shippingDetails.postalCode !== undefined ? shippingDetails.postalCode : (order.shippingDetails?.postalCode || order.billingDetails?.postalCode)
      }
    };

    console.log('Update data being sent to database:', updateData);

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true, runValidators: true }
    ).populate('items.productId', 'name images');

    if (!updatedOrder) {
      console.log('Failed to update order in database');
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update order" 
      });
    }

    console.log('Shipping address updated successfully for order:', orderId);
    console.log('Updated order shipping details:', updatedOrder.shippingDetails);

    return res.json({
      success: true,
      message: "Shipping address updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("updateShippingAddress error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// NEW: Get single order details
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('items.productId', 'name images functionType')
      .populate('userId', 'fullName email');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    return res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("getOrderById error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Test function to check models
const testModels = async (req, res) => {
  try {
    // Test if models are accessible
    const orderCount = await Order.countDocuments();
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    
    return res.json({
      success: true,
      message: "Models are working correctly",
      counts: {
        orders: orderCount,
        products: productCount,
        users: userCount
      }
    });
  } catch (error) {
    console.error("testModels error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Model test failed", 
      error: error.message 
    });
  }
};

// Debug function to check orders in database
const debugOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get all orders to see what's in the database
    const allOrders = await Order.find({}).select('userId billingDetails.email status createdAt').limit(20);
    
    // Get orders specifically for this user
    const userOrders = await Order.find({ userId: userId }).select('userId billingDetails.email status createdAt');
    
    // Get orders by email if userId is provided
    let emailOrders = [];
    if (userId) {
      const user = await User.findById(userId);
      if (user && user.email) {
        emailOrders = await Order.find({ 'billingDetails.email': user.email }).select('userId billingDetails.email status createdAt');
      }
    }
    
    return res.json({
      success: true,
      message: "Debug information",
      allOrdersCount: allOrders.length,
      allOrders: allOrders,
      userOrdersCount: userOrders.length,
      userOrders: userOrders,
      emailOrdersCount: emailOrders.length,
      emailOrders: emailOrders,
      requestedUserId: userId
    });
  } catch (error) {
    console.error("debugOrders error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Debug failed", 
      error: error.message 
    });
  }
};

module.exports = { 
  createOrder, 
  getPaymentInfo, 
  getAllOrders, 
  updateOrderStatus, 
  updateTrackingInfo,
  getUserOrders, 
  updateShippingAddress, 
  getOrderById,
  testModels,
  debugOrders
};