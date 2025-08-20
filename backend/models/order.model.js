const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      default: null // Allow null for guest orders
    },

    items: [
      {
        productId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceUSD: { type: Number, required: true, min: 0 },
        totalUSD: { type: Number } // quantity * priceUSD
      },
    ],

    totalUSD: { type: Number, required: true, min: 0 },
    selectedCoin: { 
      type: String, 
      enum: ["BTC", "ETH", "LTC", "USDT"], 
      required: true 
    },

    // Payment-specific fields
    receiveAddress: { type: String }, // Set when payment timer starts
    cryptoAmountLocked: { type: String }, // Exact crypto amount to receive
    quoteExpiresAt: { type: Date }, // When the crypto quote expires
    paymentStartedAt: { type: Date }, // When user started payment process

    billingDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String }
    },

    shippingDetails: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },

    // Transaction details
    txId: { type: String, default: null },
    verifiedAt: { type: Date },
    
    // Updated status enum to match frontend usage
    status: { 
      type: String, 
      enum: ["PENDING", "AWAITING_PAYMENT", "PAID", "FAILED", "EXPIRED", "CANCELLED"], 
      default: "PENDING" 
    },

    // Additional tracking fields
    paymentMethod: { type: String, default: "crypto" },
    notes: { type: String }
  },
  { timestamps: true }
);

// Add indexes for better performance
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ selectedCoin: 1 });
orderSchema.index({ receiveAddress: 1 });
orderSchema.index({ txId: 1 });

// Pre-save middleware to calculate item totals
orderSchema.pre('save', function(next) {
  // Calculate totalUSD for each item
  this.items.forEach(item => {
    item.totalUSD = item.quantity * item.priceUSD;
  });
  
  // Recalculate order total
  this.totalUSD = this.items.reduce((sum, item) => sum + item.totalUSD, 0);
  
  next();
});

module.exports = mongoose.model("Order", orderSchema);