const Product = require("../models/productModel.js");
const { uploadToCloudinary, cloudinary } = require("../db/claudinary.js"); // Cloudinary helper

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create a new product with Cloudinary image upload
const createProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging
    console.log("Uploaded Files:", req.files); // Debugging

    // Ensure required fields exist
    if (!req.body.name) {
      return res.status(400).json({ message: "Name and Price are required." });
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.path);
        imageUrls.push(imageUrl);
      }
    }

    // Create product
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      dimensions: req.body.dimensions,
      material: req.body.material,
      customizable: req.body.customizable,
      turnaround_time: req.body.turnaround_time,
      images: imageUrls, // Array of Cloudinary URLs
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Update a product and add new images
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Upload new images to Cloudinary
    const newImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.path);
        newImages.push(imageUrl);
      }
    }

    // Update product details
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.dimensions = req.body.dimensions || product.dimensions;
    product.material = req.body.material || product.material;
    product.customizable = req.body.customizable || product.customizable;
    product.turnaround_time =
      req.body.turnaround_time || product.turnaround_time;
    product.images = [...product.images, ...newImages]; // Append new images

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product and its images from Cloudinary
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    console.log("Cloudinary instance before delete:", cloudinary);

    // Delete associated images from Cloudinary
    for (const imageUrl of product.images) {
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract Cloudinary public ID
      // console.log("Deleting image from Cloudinary:", publicId);

      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
