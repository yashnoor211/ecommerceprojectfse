const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.searchProducts = async (req, res) => {
    try {
        const { keyword, category, minPrice, maxPrice } = req.query;

        const whereClause = {};

        if (keyword) {
            whereClause.name = { [Op.like]: `%${keyword}%` }; // Search by product name
        }
        if (category) {
            whereClause.category = category; // Exact match for category
        }
        if (minPrice && maxPrice) {
            whereClause.price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
        } else if (minPrice) {
            whereClause.price = { [Op.gte]: parseFloat(minPrice) };
        } else if (maxPrice) {
            whereClause.price = { [Op.lte]: parseFloat(maxPrice) };
        }

        const products = await Product.findAll({ where: whereClause });

        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error searching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
