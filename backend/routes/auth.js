const express = require('express');
const router = express.Router();
const { registerUser, loginUser, resetPassword } = require('../controllers/auth');

const { body } = require('express-validator');

router.post('/signup', [
    body('password').trim().isLength({ min: 3 }),
    body('username').trim().isLength({ min: 3 }),
    body('role').isIn(['seller', 'buyer']).withMessage('Role must be either "seller" or "buyer"')
], registerUser);

router.post('/login', [
    body('password').trim().isLength({ min: 3 }),
    body('username').trim().isLength({ min: 3 })
], loginUser);

router.post('/resetPassword', [
    body('username').trim().isLength({ min: 3 })
], resetPassword);

module.exports = router;
