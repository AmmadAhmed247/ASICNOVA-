const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getPaymentInfo, 
  getAllOrders, 
  updateOrderStatus, 
  updateTrackingInfo,
  getUserOrders, 
  updateShippingAddress, 
  getOrderById,
  testModels,
  debugOrders
} = require('../controllers/orders.controller');

// Test route to check models
router.get('/test-models', testModels);

// Debug route to check orders
router.get('/debug-orders/:userId', debugOrders);

// Public routes
router.post('/orders/create', createOrder);
router.get('/orders/payment-info/:orderId/:coinType', getPaymentInfo);
router.get('/orders/:orderId', getOrderById);

// Admin routes (add authentication middleware as needed)
router.get('/admin/orders', getAllOrders);
router.put('/admin/orders/:orderId/status', updateOrderStatus);
router.put('/admin/orders/:orderId/tracking', updateTrackingInfo);

// User routes (add authentication middleware as needed)
router.get('/user/:userId/orders', getUserOrders);
router.put('/orders/:orderId/shipping', updateShippingAddress);

module.exports = router;