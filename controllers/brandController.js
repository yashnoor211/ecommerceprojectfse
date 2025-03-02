const Brand = require('../models/brand');

// ✅ Create a new brand
const createBrand = async (req, res) => {
    try {
        const { name, description, logo } = req.body;

        const brand = await Brand.create({ name, description, logo });

        res.status(201).json({ message: 'Brand created successfully', brand });
    } catch (error) {
        res.status(500).json({ message: 'Error creating brand', error });
    }
};

// ✅ Get all brands
const getBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands', error });
    }
};

// ✅ Get a single brand by ID
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByPk(id);

        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brand', error });
    }
};

// ✅ Update a brand
const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, logo } = req.body;

        const brand = await Brand.findByPk(id);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        await brand.update({ name, description, logo });

        res.json({ message: 'Brand updated successfully', brand });
    } catch (error) {
        res.status(500).json({ message: 'Error updating brand', error });
    }
};

// ✅ Delete a brand
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findByPk(id);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });

        await brand.destroy();
        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brand', error });
    }
};

module.exports = { createBrand, getBrands, getBrandById, updateBrand, deleteBrand };
