const express = require('express');
const router = express.Router();
const { makePayment, getPayment, getPaymentStatus, updatePaymentStatus, getAllPayments } = require('../controllers/paymentController');

router.post('/payments', makePayment); 
router.get('/payments/:id', getPayment); 
router.get('/payments/:id/status', getPaymentStatus); 
router.put('/payments/:id/status', updatePaymentStatus); 
router.get('/payments', getAllPayments); 

module.exports = router;
