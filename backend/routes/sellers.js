const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct, getMyProducts } = require('../controllers/sellers');
const auth = require('../middleware/auth');

const { body } = require('express-validator');

const validations = [
    body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('category').trim().isLength({ min: 3 }).withMessage('Category must be at least 3 characters long'),
    body('description').trim().isLength({ min: 3 }).withMessage('Description must be at least 3 characters long'),
    body('price').trim().isLength({ min: 1 }).isNumeric().withMessage('Price must be a number'),
    body('quantity').trim().isLength({ min: 1 }).isNumeric().withMessage('Quantity must be a number')
];

// POST /api/sellers/product
router.post('/product', auth, validations, addProduct);

// PUT /api/sellers/product:id
router.put('/product/:id', auth, validations, editProduct);

// GET /api/sellers/myproducts
router.get('/myproducts', auth, getMyProducts);

// DELETE /api/sellers/product:id
router.delete('/product/:id', auth, deleteProduct);

module.exports = router;
