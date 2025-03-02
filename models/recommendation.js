const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recommendation = sequelize.define('Recommendation', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Recommendation;
