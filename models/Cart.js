const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); 

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: true
});

module.exports = Cart;
