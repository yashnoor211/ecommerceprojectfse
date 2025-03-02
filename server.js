require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');





// Import Models for Synchronization
const User = require('./models/User');
const Brand = require('./models/brand');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Payment = require('./models/payment');
const Recommendation = require('./models/recommendation');
const Filter = require('./models/filter');


const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const filterRoutes = require('./routes/filterRoutes');

const searchRoutes = require('./routes/searchRoutes');

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/filters', filterRoutes);
app.use('/api/search', searchRoutes);



app.get('/', (req, res) => {
    res.send("✅ API is running...");
});


async function syncModels() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected...");

        await sequelize.sync({ alter: true }); // Keeps schema updated without dropping data
        console.log("✅ Models synchronized with the database.");
    } catch (error) {
        console.error("❌ Error synchronizing models:", error);
    }
}

// 🔹 Start Server After Sync
async function startServer() {
    await syncModels(); // Ensures DB sync before server starts

    const PORT = process.env.PORT || 5004;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on PORT ${PORT}`);
    });
}

startServer();
