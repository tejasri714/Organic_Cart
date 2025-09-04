import { v2 as cloudinary } from 'cloudinary';
import Product from "../models/Product.js";

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    // Ensure inStock is stored correctly (default to true if missing)
    await Product.create({ 
      ...productData, 
      inStock: productData.inStock ?? true, 
      image: imageUrls 
    });

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Product List Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product By ID : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get Product By ID Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product Stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.error("Change Stock Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
