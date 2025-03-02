const express = require('express');
const router = express.Router();
const { getRecommendations, refreshRecommendations } = require('../controllers/recommendationController');

router.get('/recommendations/:userId', getRecommendations); // Get recommendations for a user
router.put('/recommendations/:userId/refresh', refreshRecommendations); // Refresh recommendations

module.exports = router;
