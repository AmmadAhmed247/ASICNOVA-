const express = require('express');
const router = express.Router();
const { startPaymentTimer, verifyPayment, checkPaymentStatus } = require('../controllers/payment.controller');


router.post('/start-timer', startPaymentTimer);
router.post('/verify', verifyPayment);
router.get('/status/:orderId', checkPaymentStatus);

module.exports = router;
