const Cart = require('../models/Cart');
const Product = require('../models/Product');


const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const cartItem = await Cart.create({ productId, quantity });

        res.status(201).json({ message: "Item added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};


const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.findAll();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};


const updateCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findByPk(cartId);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        await cartItem.update({ quantity });

        res.json({ message: "Cart updated successfully", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;

        const cartItem = await Cart.findByPk(cartId);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        await cartItem.destroy();

        res.json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
};

module.exports = { addToCart, getCart, updateCart, removeCartItem };
