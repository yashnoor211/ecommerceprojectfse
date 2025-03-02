const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCart, removeCartItem } = require('../controllers/cartController');

// 📌 Correct Routes
router.post('/', addToCart); // ✅ POST /api/cart  (Add item to cart)
router.get('/', getCart); // ✅ GET /api/cart  (Get all cart items)
router.put('/:cartId', updateCart); // ✅ PUT /api/cart/:cartId (Update cart item)
router.delete('/:cartId', removeCartItem); // ✅ DELETE /api/cart/:cartId (Remove cart item)

module.exports = router;
