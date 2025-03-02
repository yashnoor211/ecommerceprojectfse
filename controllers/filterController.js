const Product = require('../models/Product');
const { Op } = require('sequelize');

const getFilteredProducts = async (req, res) => {
    try {
        const { category, brand, minPrice, maxPrice, rating } = req.query;
        let whereClause = {};

        if (category) whereClause.category = category;
        if (brand) whereClause.brand = brand;
        if (minPrice) whereClause.price = { [Op.gte]: parseFloat(minPrice) };
        if (maxPrice) whereClause.price = { ...whereClause.price, [Op.lte]: parseFloat(maxPrice) };
        if (rating) whereClause.rating = { [Op.gte]: parseFloat(rating) };

        const filteredProducts = await Product.findAll({ where: whereClause });

        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ message: "Error filtering products", error });
    }
};

module.exports = { getFilteredProducts };
