import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  items: [{
    productId: String,
    name: String,
    qty: Number,
    priceUSD: Number
  }],
  totalUSD: { type: Number, required: true },

  selectedCoin: { type: String, enum: ["BTC","ETH","USDT"], required: true },
  cryptoAmountLocked: { type: String }, 
  rateAtQuote: { type: Number },       
  quoteExpiresAt: { type: Date },

  receiveAddress: { type: String, required: true },
  status: { type: String, enum: ["PENDING","AWAITING_PAYMENT","PAYMENT_VERIFICATION","PAID","SHIPPED","COMPLETED","REJECTED"], default: "AWAITING_PAYMENT" },

  txId: { type: String },
  proofUrl: { type: String },
  confirmations: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OrderSchema.pre("save", function(next){
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Order", OrderSchema);
