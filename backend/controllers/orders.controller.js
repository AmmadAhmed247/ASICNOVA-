const Product = require("../models/product.model");
const Order = require("../models/order.model");
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

    const coin = (selectedCoin || "").toUpperCase();
    if (!["BTC", "ETH"].includes(coin))
      return res.status(400).json({ success: false, message: "Invalid cryptocurrency selected" });

    if (!billingDetails?.fullName || !billingDetails?.email || !billingDetails?.address)
      return res.status(400).json({ success: false, message: "Billing details are required" });

    // Calculate total USD from frontend item prices (trusted server-side)
    let totalUSD = 0;
    items.forEach(item => {
      if (!item.priceUSD || !item.quantity)
        throw new Error("Invalid item price or quantity");
      totalUSD += item.priceUSD * item.quantity;
    });

    // Use the first item's product to define which address to use (or customize your logic)
    const product = await Product.findById(items[0].productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const receiveAddress = product.cryptoAddresses?.[coin];
    if (!receiveAddress)
      return res.status(400).json({ success: false, message: `${coin} not supported for this product` });

    // Calculate dynamic crypto amount at time of order
    const priceUSD = await getCryptoPriceUSD(coin);
    const cryptoAmountLocked = (totalUSD / priceUSD).toFixed(8);

    const order = new Order({
      userId: userId || null,
      items,
      totalUSD,
      selectedCoin: coin,
      cryptoAmountLocked,
      receiveAddress,
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

// NEW METHOD: Get payment info for specific coin type
const getPaymentInfo = async (req, res) => {
  try {
    const { orderId, coinType } = req.params;
    const coin = coinType.toUpperCase();

    // Validate coin type
    if (!["BTC", "ETH"].includes(coin)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid coin type. Only BTC and ETH are supported." 
      });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Check if order is still valid (not expired)
    if (new Date() > order.quoteExpiresAt) {
      return res.status(400).json({ 
        success: false, 
        message: "Order quote has expired" 
      });
    }

    // Get the first product to access crypto addresses
    const product = await Product.findById(order.items[0].productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // Get address for the requested coin
    const receiveAddress = product.cryptoAddresses?.[coin];
    if (!receiveAddress) {
      return res.status(400).json({ 
        success: false, 
        message: `${coin} address not configured for this product` 
      });
    }

    // Calculate crypto amount for the requested coin
    let cryptoAmount;
    
    if (coin === order.selectedCoin) {
      // If it's the same coin as originally selected, use locked amount
      cryptoAmount = order.cryptoAmountLocked;
    } else {
      // If it's a different coin, calculate new amount with current price
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

    // Optional: Generate QR code data (you can implement this later)
    const qrCode = `${coin.toLowerCase()}:${receiveAddress}?amount=${cryptoAmount}`;

    return res.json({
      success: true,
      receiveAddress,
      cryptoAmount,
      qrCode, // You can enhance this to return actual QR code image data
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

module.exports = { createOrder, getPaymentInfo };