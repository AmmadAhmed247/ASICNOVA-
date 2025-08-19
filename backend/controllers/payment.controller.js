const Order = require('../models/order.model');
const ProcessedTransaction = require('../models/processedTransaction.model');
const axios = require('axios');

const coinApis = {
  BTC: async (txId) => {
    try {
      const resp = await axios.get(`https://blockchain.info/rawtx/${txId}?cors=true`);
      return resp.data;
    } catch (err) {
      console.error('BTC API error:', err.message);
      return null;
    }
  },
  ETH: async (txId) => {
    try {
      const resp = await axios.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txId}&apikey=${process.env.ETHERSCAN_API_KEY}`
      );
      return resp.data?.result || null;
    } catch (err) {
      console.error('ETH API error:', err.message);
      return null;
    }
  },
  LTC: async (txId) => null,
  USDT: async (txId) => null,
};

// Start Payment Timer
const startPaymentTimer = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ success: false, message: 'orderId is required' });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (!order.quoteExpiresAt) {
      order.status = 'AWAITING_PAYMENT';
      order.quoteExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
      await order.save();
    }

    return res.json({
      success: true,
      receiveAddress: order.receiveAddress,
      cryptoAmountLocked: order.cryptoAmountLocked,
      selectedCoin: order.selectedCoin,
      quoteExpiresAt: order.quoteExpiresAt,
    });
  } catch (err) {
    console.error('startPaymentTimer error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  const { orderId, txId } = req.body;
  if (!orderId || !txId) return res.status(400).json({ success: false, message: 'orderId and txId are required' });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Expiration check
    if (order.quoteExpiresAt && new Date() > order.quoteExpiresAt) {
      order.status = 'EXPIRED';
      await order.save();
      return res.status(400).json({ success: false, message: 'Payment time expired' });
    }

    // Already processed
    const existingTx = await ProcessedTransaction.findOne({ txid: txId });
    if (existingTx) return res.status(400).json({ success: false, message: 'Transaction already processed' });

    const coin = order.selectedCoin.toUpperCase();
    const txData = await coinApis[coin](txId);

    if (!txData) {
      return res.status(400).json({ success: false, message: `Unable to fetch ${coin} transaction data` });
    }

    let confirmed = false;
    let txInfo = {};

    if (coin === 'BTC') {
      const match = txData.out?.find(
        (o) => o.addr === order.receiveAddress && o.value / 1e8 >= parseFloat(order.cryptoAmountLocked)
      );
      if (match) {
        confirmed = true;
        txInfo = {
          amount: match.value / 1e8,
          blockNumber: txData.block_height,
          sender: txData.inputs?.[0]?.prev_out?.addr || 'Unknown',
        };
      }
    } else if (coin === 'ETH') {
      const valueInEth = parseInt(txData.value, 16) / 1e18;
      if (txData.to?.toLowerCase() === order.receiveAddress.toLowerCase() && valueInEth >= parseFloat(order.cryptoAmountLocked)) {
        confirmed = true;
        txInfo = { amount: valueInEth, blockNumber: parseInt(txData.blockNumber, 16), sender: txData.from };
      }
    }

    if (!confirmed) return res.status(400).json({ success: false, message: 'Transaction invalid or insufficient amount' });

    // Save processed transaction
    const processedTx = new ProcessedTransaction({
      txid: txId,
      coin,
      amount: txInfo.amount,
      recipient: order.receiveAddress,
      sender: txInfo.sender,
      blockNumber: txInfo.blockNumber,
      status: 'confirmed',
      verifiedAt: new Date(),
    });
    await processedTx.save();

    order.status = 'PAID';
    order.txId = txId;
    order.verifiedAt = new Date();
    await order.save();

    return res.json({ success: true, message: `${coin} payment confirmed`, transactionDetails: processedTx });
  } catch (err) {
    console.error('verifyPayment error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Check Payment Status
const checkPaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).json({ success: false, message: 'orderId is required' });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    return res.json({
      success: true,
      status: order.status,
      timeRemaining: order.quoteExpiresAt ? Math.max(0, order.quoteExpiresAt - Date.now()) : 0,
      txId: order.txId,
      verifiedAt: order.verifiedAt,
    });
  } catch (err) {
    console.error('checkPaymentStatus error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { startPaymentTimer, verifyPayment, checkPaymentStatus };
