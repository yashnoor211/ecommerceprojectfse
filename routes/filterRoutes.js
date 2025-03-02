const express = require('express');
const router = express.Router();
const { getFilteredProducts } = require('../controllers/filterController');

router.get('/products/filter', getFilteredProducts); // Filter products based on query params

module.exports = router;
