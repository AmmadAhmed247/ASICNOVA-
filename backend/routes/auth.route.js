const express = require('express')
const router = express.Router()
const {userRegister, verifyOTPAndPassword, loginUser, getProfile} = require('../controllers/auth.controller')
const { AuthMiddleware } = require('../middleware/auth.middlware')

router.post('/send-otp', userRegister)
router.post('/verify-signup', verifyOTPAndPassword)
router.post('/login-user', loginUser)
router.get('/get-profile', AuthMiddleware, getProfile)

module.exports = router; 