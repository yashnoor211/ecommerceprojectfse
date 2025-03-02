const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING, // Store logo URL (optional)
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Brand;
