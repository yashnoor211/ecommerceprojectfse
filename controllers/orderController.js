const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { products, totalPrice, status } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Order must have at least one product." });
        }

        const order = await Order.create({ products, totalPrice, status });
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ message: "Error placing order", error });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Get single order
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByPk(orderId);

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        console.error("❌ Error fetching order:", error);
        res.status(500).json({ message: "Error fetching order", error });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        await order.update({ status });

        res.json({ message: "Order updated successfully", order });
    } catch (error) {
        console.error("❌ Error updating order:", error);
        res.status(500).json({ message: "Error updating order", error });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        await order.destroy();

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting order:", error);
        res.status(500).json({ message: "Error deleting order", error });
    }
};

// ✅ Correct Export
module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
