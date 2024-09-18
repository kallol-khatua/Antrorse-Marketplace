const express = require('express');
const router = express.Router();
const {authorization} = require("../app/middleware/auth")
const {checkout} = require('../app/controlllers/checkoutController');

// Checkout API route
router.post('/',authorization, checkout);

//router.post('/direct-purchase',authorization, directPurchase );

module.exports = router;