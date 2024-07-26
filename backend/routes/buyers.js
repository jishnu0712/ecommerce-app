const express = require('express');
const router = express.Router();
const { searchProducts, addToCart, removeFromCart } = require('../controllers/buyers');
const auth = require('../middleware/auth');

router.get('/products', searchProducts);
router.post('/cart', auth, addToCart);
router.delete('/cart/:productId', auth, removeFromCart);

module.exports = router;
