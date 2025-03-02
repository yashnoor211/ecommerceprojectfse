const express = require('express');
const router = express.Router();
const { getRecommendations, refreshRecommendations } = require('../controllers/recommendationController');

router.get('/recommendations/:userId', getRecommendations); 
router.put('/recommendations/:userId/refresh', refreshRecommendations); 

module.exports = router;
