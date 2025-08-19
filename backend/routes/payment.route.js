const express = require("express");
const router = express.Router();
const { startPaymentTimer, verifyPayment } = require("../controllers/payment.controller");

router.post("/start-timer", startPaymentTimer);
router.post("/verify", verifyPayment);

module.exports = router;
