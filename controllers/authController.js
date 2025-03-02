const User = require('../models/User');


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


const login = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


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

const changePassword = async (req, res) => {
    try {
        const { userId } = req.query;
        const { newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        
        await user.update({ password: newPassword });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error: error.message });
    }
};


module.exports = { register, login, fetchProfile, updateProfile, updateAddress, changePassword };
