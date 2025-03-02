const express = require('express');
const router = express.Router();
const { makePayment, getPayment, getPaymentStatus, updatePaymentStatus, getAllPayments } = require('../controllers/paymentController');

router.post('/payments', makePayment); // Make a payment
router.get('/payments/:id', getPayment); // Get payment details
router.get('/payments/:id/status', getPaymentStatus); // Get payment status
router.put('/payments/:id/status', updatePaymentStatus); // Update payment status
router.get('/payments', getAllPayments); // Get all payments

module.exports = router;
