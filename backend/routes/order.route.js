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
router.get('/admin', getAllOrders);
router.get('/debug-orders/:userId', debugOrders);

// Public routes
router.post('/create', createOrder);
router.get('/:orderId', getOrderById);

// Admin routes (add authentication middleware as needed)
router.get('/payment-info/:orderId/:coinType', getPaymentInfo);
router.put('/admin/:orderId/status', updateOrderStatus);
router.put('/admin/orders/:orderId/tracking', updateTrackingInfo);

// User routes (add authentication middleware as needed)
router.get('/user/:userId/orders', getUserOrders);
router.put('/:orderId/shipping', updateShippingAddress);

module.exports = router;