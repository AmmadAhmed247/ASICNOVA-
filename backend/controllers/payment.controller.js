const Order = require("../models/order.model");
const axios = require("axios");

// Start timer when user opens payment page
const startPaymentTimer = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (!order.quoteExpiresAt) {
      order.status = "AWAITING_PAYMENT";
      order.quoteExpiresAt = new Date(Date.now() + 15*60*1000); // 15 min
      await order.save();
    }

    return res.json({
      success: true,
      receiveAddress: order.receiveAddress,
      cryptoAmountLocked: order.cryptoAmountLocked,
      quoteExpiresAt: order.quoteExpiresAt
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Verify payment submitted by user
const verifyPayment = async (req, res) => {
  try {
    const { orderId, txId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success:false, message:"Order not found" });

    const now = new Date();
    if (order.quoteExpiresAt && now > order.quoteExpiresAt) {
      order.status = "REJECTED";
      await order.save();
      return res.status(400).json({ success:false, message:"Payment time expired" });
    }

    const coin = order.selectedCoin.toLowerCase();
    let confirmed = false;

    if (coin === "btc") {
      const btcResp = await axios.get(`https://blockchain.info/rawtx/${txId}?cors=true`);
      if (btcResp.data && btcResp.data.out) {
        confirmed = btcResp.data.out.some(out =>
          out.addr === order.receiveAddress &&
          (out.value / 1e8) >= parseFloat(order.cryptoAmountLocked)
        );
      }
    } else if (coin === "eth") {
      const ethResp = await axios.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txId}&apikey=YOUR_API_KEY`
      );
      if (ethResp.data.result) {
        const tx = ethResp.data.result;
        const valueInEth = parseInt(tx.value, 16) / 1e18;
        confirmed = tx.to.toLowerCase() === order.receiveAddress.toLowerCase() &&
                    valueInEth >= parseFloat(order.cryptoAmountLocked);
      }
    }

    if (!confirmed) return res.status(400).json({ success:false, message:"Transaction invalid or insufficient amount" });

    order.status = "PAID";
    order.txId = txId;
    await order.save();
    return res.json({ success:true, message:`${order.selectedCoin} payment confirmed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success:false, message:"Server error", error:error.message });
  }
};

module.exports = { startPaymentTimer, verifyPayment };
