const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

// 📌 Corrected Routes
router.post('/', addProduct); // ✅ POST /api/products (Create product)
router.get('/', getAllProducts); // ✅ GET /api/products (Get all products)
router.get('/:productId', getProductById); // ✅ GET /api/products/:productId (Get product by ID)
router.put('/:productId', updateProduct); // ✅ PUT /api/products/:productId (Update product)
router.delete('/:productId', deleteProduct); // ✅ DELETE /api/products/:productId (Delete product)

module.exports = router;
