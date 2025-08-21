const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orders.controller');

router.post('/orders/create', createOrder);


module.exports = router;
