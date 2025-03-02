const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');

if (!createOrder || !getOrders || !getOrderById || !updateOrder || !deleteOrder) {
    console.error("❌ Order controller functions are not loaded properly.");
}


router.post('/', createOrder); 
router.get('/', getOrders); 
router.get('/:orderId', getOrderById); 
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder); 

module.exports = router;
