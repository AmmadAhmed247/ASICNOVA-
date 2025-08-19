const express = require('express')
const router = express.Router()
const { createProduct, createReview, getProducts, getProductById } = require('../controllers/product.controller')
const { AuthMiddleware, isAdmin } = require('../middleware/auth.middlware')

router.post('/create-product', AuthMiddleware, isAdmin, createProduct)
router.post('/:id/create-review', AuthMiddleware, createReview)
router.get('/get-products', getProducts)
router.get('/getProductById/:id', getProductById)

module.exports = router;