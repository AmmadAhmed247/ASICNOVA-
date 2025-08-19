const mongoose = require('mongoose');

const processedTransactionSchema = new mongoose.Schema({
  txid: { type: String, required: true, unique: true, index: true },
  coin: { type: String, required: true, enum: ['BTC', 'ETH', 'LTC', 'USDT'] },
  amount: { type: Number, required: true },
  recipient: { type: String, required: true },
  sender: { type: String },
  blockNumber: { type: Number },
  status: { type: String, enum: ['pending', 'confirmed', 'processed'], default: 'pending' },
  verifiedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('ProcessedTransaction', processedTransactionSchema);
