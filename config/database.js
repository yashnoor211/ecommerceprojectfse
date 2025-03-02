const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Connect to MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

// Export the connection
module.exports = sequelize;
