const express = require('express')
const router = express.Router()
const { AuthMiddleware } = require('../middleware/auth.middlware')
const { addToCart, getCart, updateCartItem, removeItem } = require('../controllers/cart.controller')

router.post('/add', AuthMiddleware, addToCart)
router.get('/', AuthMiddleware, getCart)
router.put('/update', AuthMiddleware, updateCartItem)
router.delete('/delete', AuthMiddleware, removeItem)

module.exports = router