const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCart, removeCartItem } = require('../controllers/cartController');


router.post('/', addToCart); 
router.get('/', getCart); 
router.put('/:cartId', updateCart); 
router.delete('/:cartId', removeCartItem); 

module.exports = router;
