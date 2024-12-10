const productModel = require("../models/ProductModel");
const multer = require("multer");
const path = require("path");
const { uploadProduct } = require("../middlewares/upload");
const cloudinary = require("../services/cloudinary");

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.log("Error uploading image to Cloudinary: ", error);
    throw new Error("Error uploading image");
  }
};

const addProduct = async (req, res) => {
  const { name, description, category, price } = req.body;
  const productImage = req.file ? await uploadImageToCloudinary(req.file.path) : null;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  
  console.log(req.file); // Logs the uploaded file
  console.log(req.body); // Logs other form fields
  try {
    const product = await productModel.create({
      productImage: productImage, // Use the file path for the image
      name: name,
      description: description,
      price: price,
      category: category,
    });

    await product.save();

    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price } = req.body;
  const productImage = req.file ? await uploadImageToCloudinary(req.file.path) : null;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update product details
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    // Update product image if a new file was uploaded
    if (productImage) {
      product.productImage = productImage;
    }

    await product.save();

    return res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// For finding products between price of two example 100$ to 200$
const getProductsByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.body;
  try {
    const products = await productModel.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });
    return res.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addProduct,
  removeProduct,
  updateProduct,
  getAllProducts,
  uploadProduct,
  getProductsByPrice,
};
