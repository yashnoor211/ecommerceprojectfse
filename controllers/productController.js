const Product = require('../models/Product');

const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        const product = await Product.create({ name, description, price, stock, imageUrl });

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};


const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, stock, imageUrl } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.update({ name, description, price, stock, imageUrl });

        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
