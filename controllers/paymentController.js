const Payment = require('../models/payment');


const makePayment = async (req, res) => {
    try {
        const { orderId, userId, amount, paymentMethod } = req.body;

        const payment = await Payment.create({
            orderId,
            userId,
            amount,
            paymentMethod,
            status: 'pending' // Default status
        });

        res.status(201).json({ message: "Payment initiated successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Error initiating payment", error: error.message });
    }
};


const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payment", error: error.message });
    }
};


const getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, { attributes: ['status'] });
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        res.json({ status: payment.status });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payment status", error: error.message });
    }
};


const updatePaymentStatus = async (req, res) => {
    try {
        const { status, transactionId } = req.body;
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) return res.status(404).json({ message: "Payment not found" });

        await payment.update({ status, transactionId });

        res.json({ message: "Payment status updated successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Error updating payment status", error: error.message });
    }
};


const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payments", error: error.message });
    }
};

module.exports = { makePayment, getPayment, getPaymentStatus, updatePaymentStatus, getAllPayments };
