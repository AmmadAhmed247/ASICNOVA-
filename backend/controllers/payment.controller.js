// payment.controller.js
const Order = require('../models/order.model');
const ProcessedTransaction = require('../models/processedTransaction.model');
const axios = require('axios');
const { parseUnits } = require('ethers'); // for ETH precision

// -----------------------
// BTC Conversion: string → satoshis
// -----------------------
const convertBTCToSatoshis = (btcAmount) => {
  const [whole = '0', decimal = ''] = btcAmount.toString().split('.');
  const paddedDecimal = (decimal + '00000000').slice(0, 8); // pad to 8 decimals
  const satoshiStr = whole + paddedDecimal;
  return BigInt(satoshiStr);
};

// -----------------------
// BTC Verification using BlockCypher
// -----------------------
const verifyBTC_BlockCypher = async (txId, receiveAddress, expectedAmount) => {
  try {
    const res = await axios.get(`https://api.blockcypher.com/v1/btc/main/txs/${txId}`);
    const tx = res.data;
    if (!tx.outputs) return false;

    const expectedSatoshis = convertBTCToSatoshis(expectedAmount);
    let receivedSatoshis = BigInt(0);

    tx.outputs.forEach(o => {
      if (o.addresses.includes(receiveAddress)) {
        receivedSatoshis += BigInt(o.value);
      }
    });

    console.log('BTC Verification:', {
      expectedSatoshis: expectedSatoshis.toString(),
      receivedSatoshis: receivedSatoshis.toString(),
    });

    return receivedSatoshis >= expectedSatoshis;
  } catch (err) {
    console.error('BlockCypher API error:', err.message);
    return false;
  }
};

// -----------------------
// ETH Verification using ethers.js
// -----------------------
const verifyETH = async (txData, receiveAddress, expectedAmount) => {
  if (!txData) return null;
  const expectedWei = parseUnits(expectedAmount.toString(), 'ether'); // safe BigInt
  const sentWei = BigInt(txData.value);

  if (txData.to?.toLowerCase() === receiveAddress.toLowerCase() && sentWei >= expectedWei) {
    return {
      amount: Number(sentWei) / 1e18,
      blockNumber: parseInt(txData.blockNumber, 16),
      sender: txData.from,
    };
  }
  return null;
};

// -----------------------
// Start Payment Timer
// -----------------------
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

// -----------------------
// Verify Payment
// -----------------------
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
    let txInfo = {};

    if (coin === 'BTC') {
      const isPaid = await verifyBTC_BlockCypher(txId, order.receiveAddress, order.cryptoAmountLocked);
      if (!isPaid) return res.status(400).json({ success: false, message: 'Transaction invalid or insufficient amount' });
      txInfo = { amount: parseFloat(order.cryptoAmountLocked), blockNumber: null, sender: 'Unknown' };
    } else if (coin === 'ETH') {
      const txData = await axios.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txId}&apikey=${process.env.ETHERSCAN_API_KEY}`
      );
      const ethInfo = await verifyETH(txData.data.result, order.receiveAddress, order.cryptoAmountLocked);
      if (!ethInfo) return res.status(400).json({ success: false, message: 'Transaction invalid or insufficient amount' });
      txInfo = ethInfo;
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported coin' });
    }

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
    console.error('verifyPayment error:', err.message, err.stack);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// -----------------------
// Check Payment Status
// -----------------------
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
