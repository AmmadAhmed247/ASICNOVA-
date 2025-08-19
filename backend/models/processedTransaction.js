const mongoose = require('mongoose');

const processedTransactionSchema = new mongoose.Schema({
  txid: { 
    type: String, 
    required: true,
    unique: true,
    index: true
  },
  coin: { 
    type: String, 
    required: true,
    enum: ['BTC', 'ETH']
  },
  amount: { 
    type: Number, 
    required: true 
  },
  recipient: { 
    type: String, 
    required: true 
  },
  sender: {
    type: String
  },
  blockNumber: {
    type: Number
  },
  confirmations: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processed'],
    default: 'pending'
  },
  processedAt: { 
    type: Date, 
    default: Date.now 
  },
  verifiedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProcessedTransaction', processedTransactionSchema);