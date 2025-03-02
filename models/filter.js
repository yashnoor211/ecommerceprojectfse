const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Filter = sequelize.define('Filter', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true // Optional, for tracking user preferences
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    minPrice: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    maxPrice: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Filter;
