const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    products: {
        type: DataTypes.JSON, // Store list of products
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending" // Can be 'pending', 'shipped', 'delivered', 'cancelled'
    }
}, {
    timestamps: true
});

module.exports = Order;
