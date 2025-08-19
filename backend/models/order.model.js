const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{ name: String, quantity: Number, priceUSD: Number }],
  totalUSD: { type: Number, required: true },
  selectedCoin: { 
    type: String, 
    required: true,
    enum: ['BTC', 'ETH', 'LTC', 'USDT']
  },
  cryptoAmountLocked: { type: String, required: true },
  receiveAddress: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'AWAITING_PAYMENT', 'PAID', 'EXPIRED', 'REJECTED'], 
    default: 'PENDING'
  },
  quoteExpiresAt: { type: Date },
  txId: { type: String },
  verifiedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
