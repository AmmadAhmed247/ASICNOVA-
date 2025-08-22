const express = require('express');
const router = express.Router();
const { createOrder, getPaymentInfo } = require('../controllers/orders.controller');

router.post('/orders/create', createOrder);
router.get('/orders/payment-info/:orderId/:coinType', getPaymentInfo);

module.exports = router;