const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct } = require('../controllers/sellers');
const auth = require('../middleware/auth');

const { body } = require('express-validator');

// POST /api/sellers/product
router.post('/product', auth, [
    body('name').trim().isLength({ min: 3 }),
    body('category').trim().isLength({ min: 3 }),
    body('description').trim().isLength({ min: 3 }),
    body('price').trim().isLength({ min: 1 }),
], addProduct);

// PUT /api/sellers/product:id
router.put('/product/:id', auth, [
    body('name').trim().isLength({ min: 3 }),
    body('category').trim().isLength({ min: 3 }),
    body('description').trim().isLength({ min: 3 }),
    body('price').trim().isLength({ min: 1 }),
], editProduct);

// DELETE /api/sellers/product:id
router.delete('/product/:id', auth, deleteProduct);

module.exports = router;
