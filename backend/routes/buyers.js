const express = require('express');
const router = express.Router();
const { searchProducts, addToCart, removeFromCart, getAllProducts, getCartItems, getProductById } = require('../controllers/buyers');
const auth = require('../middleware/auth');


// GET /api/buyers/allproducts
router.get('/allproducts', getAllProducts);

// GET /api/buyers/products
router.get('/products', searchProducts);

// GET /api/buyers/:id
router.get('/product/:id', getProductById);

// POST /api/buyers/cart
router.post('/cart', auth, addToCart);

// GET /api/buyers/cart
router.get('/cart', auth, getCartItems)

// DELETE /api/buyers/cart/:id
router.delete('/cart/:productId', auth, removeFromCart);

module.exports = router;
