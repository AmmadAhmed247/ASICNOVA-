const express = require('express')
const router = express.Router()
const { createProduct, createReview, getProducts } = require('../controllers/product.controller')
const { AuthMiddleware } = require('../middleware/auth.middlware')

router.post('/create-product', createProduct)
router.post('/:id/create-review', AuthMiddleware, createReview)
router.get('/get-products', getProducts)

module.exports = router;