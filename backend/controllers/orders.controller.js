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

module.exports = { createOrder };
