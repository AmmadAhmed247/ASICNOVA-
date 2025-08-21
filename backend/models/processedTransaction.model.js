const mongoose = require('mongoose');

const processedTransactionSchema = new mongoose.Schema({
  txid: { type: String, required: true, unique: true }, // <-- removed "index: true"
  coin: { type: String, required: true, enum: ['BTC', 'ETH', 'LTC', 'USDT'] },
  amount: { type: Number, required: true },
  recipient: { type: String, required: true },
  sender: { type: String },
  blockNumber: { type: Number },
  status: { type: String, enum: ['pending', 'confirmed', 'processed'], default: 'pending' },
  verifiedAt: { type: Date },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Link to order
  confirmations: { type: Number, default: 0 },
  notes: { type: String }
}, { timestamps: true });

// Add indexes for better performance
processedTransactionSchema.index({ orderId: 1 });
processedTransactionSchema.index({ coin: 1, status: 1 });
processedTransactionSchema.index({ recipient: 1 });

module.exports = mongoose.model('ProcessedTransaction', processedTransactionSchema);
