const Recommendation = require('../models/recommendation');
const Product = require('../models/Product');
const Order = require('../models/Order');


const generateRecommendations = async (userId) => {

    const pastOrders = await Order.findAll({
        where: { userId },
        attributes: ['productId']
    });

    if (!pastOrders.length) {
       
        const popularProducts = await Product.findAll({ limit: 5 });
        return popularProducts.map(p => ({ userId, productId: p.id, reason: "Popular product" }));
    }

    
    const productIds = pastOrders.map(o => o.productId);
    const products = await Product.findAll({ where: { id: productIds } });

    const categories = [...new Set(products.map(p => p.category))];

    // Recommend products from the same categories
    const recommendations = await Product.findAll({
        where: { category: categories },
        limit: 5
    });

    return recommendations.map(p => ({ userId, productId: p.id, reason: "Based on past purchases" }));
};


const getRecommendations = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if recommendations exist
        let recommendations = await Recommendation.findAll({ where: { userId } });

        if (!recommendations.length) {
            // If no recommendations, generate new ones
            const newRecommendations = await generateRecommendations(userId);
            recommendations = await Recommendation.bulkCreate(newRecommendations);
        }

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations", error });
    }
};


const refreshRecommendations = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Delete old recommendations
        await Recommendation.destroy({ where: { userId } });

        // Generate new recommendations
        const newRecommendations = await generateRecommendations(userId);
        const savedRecommendations = await Recommendation.bulkCreate(newRecommendations);

        res.json({ message: "Recommendations refreshed", recommendations: savedRecommendations });
    } catch (error) {
        res.status(500).json({ message: "Error refreshing recommendations", error });
    }
};

module.exports = { getRecommendations, refreshRecommendations };
