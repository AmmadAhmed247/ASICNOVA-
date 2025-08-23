// Import all models to ensure they are registered with Mongoose
const User = require('./user.model');
const Product = require('./product.model');
const Order = require('./order.model');
const Contact = require('./contact.model');
const ProcessedTransaction = require('./processedTransaction.model');

// Export all models
module.exports = {
  User,
  Product,
  Order,
  Contact,
  ProcessedTransaction
};

console.log('All models registered successfully');
