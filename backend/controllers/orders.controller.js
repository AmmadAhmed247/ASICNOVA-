const Product = require("../models/product.model");
const Order = require("../models/order.model");

const createOrder = async (req, res) => {
  try {
    const { userId, items, selectedCoin, billingDetails, shippingDetails } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: "No items selected" });

    if (!['BTC', 'ETH', 'USDT'].includes(selectedCoin?.toUpperCase()))
      return res.status(400).json({ success: false, message: "Invalid cryptocurrency selected" });

    // Validate billing details
    if (!billingDetails?.fullName || !billingDetails?.email || !billingDetails?.address)
      return res.status(400).json({ success: false, message: "Billing details are required" });

    // Calculate total USD
    let totalUSD = 0;
    items.forEach(item => {
      if (!item.priceUSD || !item.quantity)
        throw new Error("Invalid item price or quantity");
      totalUSD += item.priceUSD * item.quantity;
    });

    // Pick first product just for crypto address (or customize logic)
    const product = await Product.findById(items[0].productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (!product.cryptoAddresses[selectedCoin] || !product.expectedAmounts[selectedCoin])
      return res.status(400).json({ success: false, message: `${selectedCoin} not supported for this product` });

    const cryptoAmountLocked = product.expectedAmounts[selectedCoin];
    const receiveAddress = product.cryptoAddresses[selectedCoin];

    const order = new Order({
      userId: userId || null,
      items,
      totalUSD,
      selectedCoin: selectedCoin.toUpperCase(),
      cryptoAmountLocked,
      receiveAddress,
      billingDetails,
      shippingDetails: shippingDetails || billingDetails,
      status: "PENDING",
      quoteExpiresAt: Date.now() + 10 * 60 * 1000 // 10 min expiry
    });

    await order.save();
    return res.json({ success: true, message: "Order created", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { createOrder };
