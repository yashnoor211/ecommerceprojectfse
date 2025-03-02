const express = require('express');
const router = express.Router();
const { register, login, fetchProfile, updateProfile, changePassword, updateAddress } = require('../controllers/authController');
//const authenticate = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', fetchProfile);
router.put('/profile', updateProfile);
router.put('/password', changePassword);
router.put('/address', updateAddress);

module.exports = router;
