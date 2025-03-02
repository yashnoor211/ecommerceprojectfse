const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');

if (!createOrder || !getOrders || !getOrderById || !updateOrder || !deleteOrder) {
    console.error("❌ Order controller functions are not loaded properly.");
}

// 📌 Correct Routes
router.post('/', createOrder); // ✅ POST /api/orders
router.get('/', getOrders); // ✅ GET /api/orders
router.get('/:orderId', getOrderById); // ✅ GET /api/orders/:orderId
router.put('/:orderId', updateOrder); // ✅ PUT /api/orders/:orderId
router.delete('/:orderId', deleteOrder); // ✅ DELETE /api/orders/:orderId

module.exports = router;
