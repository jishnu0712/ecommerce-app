const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct } = require('../controllers/sellers');
const auth = require('../middleware/auth');

// POST /api/sellers/product
router.post('/product', auth, addProduct);

// PUT /api/sellers/product:id
router.put('/product/:id', auth, editProduct);

// DELETE /api/sellers/product:id
router.delete('/product/:id', auth, deleteProduct);

module.exports = router;
