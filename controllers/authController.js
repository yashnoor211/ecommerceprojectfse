const User = require('../models/User');

// 📌 Register a new user (No password needed for now)
const register = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({ name, email, phone });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// 📌 Login user (Dummy logic for now)
const login = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 🔹 In a real app, you should verify passwords & generate a JWT token
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// 📌 Fetch user profile (Uses userId from query params)
const fetchProfile = async (req, res) => {
    try {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

// 📌 Update user profile (No authentication required)
const updateProfile = async (req, res) => {
    try {
        const { userId } = req.query;
        const { name, phone } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ name, phone });
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// 📌 Update user address
const updateAddress = async (req, res) => {
    try {
        const { userId } = req.query;
        const { address } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ address });
        res.json({ message: 'Address updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error: error.message });
    }
};

// 📌 Change password (Dummy logic, needs hashing in future)
const changePassword = async (req, res) => {
    try {
        const { userId } = req.query;
        const { newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // ⚠️ In production, hash `newPassword` before saving!
        await user.update({ password: newPassword });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error: error.message });
    }
};

// 📌 Export all functions
module.exports = { register, login, fetchProfile, updateProfile, updateAddress, changePassword };
