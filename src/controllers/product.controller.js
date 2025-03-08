import { Product } from "../models/product.models.js";

export const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    if (!(name && description && price && category && stock)) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        existingProduct.stock += 1;
    }
    try {
        const product = await Product.create({ name, description, price, category, stock });
        return res.status(201).json({ message: "Product created successfully", product});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating product" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ message: "All products fetched successfully", products });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, stock });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Error updating product" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product" });
    }
};