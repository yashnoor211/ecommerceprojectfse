const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Ensures valid email format
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^\+?[0-9\s\-]{10,15}$/ // Allows optional +, spaces, and hyphens
        }
    },
    address: {
        type: DataTypes.JSON, // Stores structured address as JSON
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = User;
