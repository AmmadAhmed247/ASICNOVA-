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

    // BTC + ETH only (USDT removed)
    selectedCoin: { 
      type: String, 
      enum: ["BTC", "ETH"], 
      required: true 
    },

    // Payment-specific fields
    receiveAddress: { type: String }, // Where user must send funds
    cryptoAmountLocked: { type: String }, // Exact crypto amount to receive (string to preserve decimals)
    quoteExpiresAt: { type: Date }, // When the locked quote expires
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
    
    // Enhanced order status with new options
    status: { 
      type: String, 
      enum: [
        "PENDING", 
        "AWAITING_PAYMENT", 
        "PAID", 
        "CONFIRMED", 
        "IN_WAREHOUSE", 
        "SHIPPED", 
        "DELIVERED", 
        "FAILED", 
        "EXPIRED", 
        "CANCELLED"
      ], 
      default: "PENDING" 
    },

    // Tracking information
    trackingNumber: { type: String },
    carrier: { type: String },
    estimatedDelivery: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },

    // Admin notes and internal status
    adminNotes: { type: String },
    internalStatus: { type: String },

    paymentMethod: { type: String, default: "crypto" },
    notes: { type: String }
  },
  { timestamps: true }
);

// Indexes
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ selectedCoin: 1 });
orderSchema.index({ receiveAddress: 1 });
orderSchema.index({ txId: 1 });
orderSchema.index({ trackingNumber: 1 });

// Auto-calc per-item total + order total
orderSchema.pre('save', function(next) {
  this.items.forEach(item => {
    item.totalUSD = item.quantity * item.priceUSD;
  });
  this.totalUSD = this.items.reduce((sum, item) => sum + item.totalUSD, 0);
  next();
});

module.exports = mongoose.model("Order", orderSchema);
