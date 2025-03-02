const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');


router.post('/', addProduct); 
router.get('/', getAllProducts);
router.get('/:productId', getProductById); 
router.put('/:productId', updateProduct); 
router.delete('/:productId', deleteProduct); 

module.exports = router;
