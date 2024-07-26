const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct } = require('../controllers/sellers');
const auth = require('../middleware/auth');

router.post('/product', auth, addProduct);
router.put('/product/:id', auth, editProduct);
router.delete('/product/:id', auth, deleteProduct);

module.exports = router;
