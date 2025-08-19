const Product = require("../models/product.model");
const Order = require("../models/order.model");

const createOrder = async (req, res) => {
  try {
    const { userId, items, selectedCoin } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ success: false, message: "No items selected" });

    let totalUSD = 0;
    items.forEach(item => totalUSD += item.priceUSD * item.qty);

    const product = await Product.findById(items[0].productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const cryptoAmountLocked = product.expectedAmounts[selectedCoin];
    const receiveAddress = product.cryptoAddresses[selectedCoin];

    const order = new Order({
      userId,
      items,
      totalUSD,
      selectedCoin,
      cryptoAmountLocked,
      receiveAddress,
      status: "PENDING",      // timer NOT started yet
      quoteExpiresAt: null
    });

    await order.save();
    return res.json({ success: true, message: "Order created", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { createOrder };
