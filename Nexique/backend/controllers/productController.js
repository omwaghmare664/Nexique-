const productModel = require("../models/ProductModel");
const multer = require("multer");
const path = require("path");

// Set up storage for product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product"); // Path to the product folder inside uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with extension
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

addProduct = async (req, res) => {
  const { name, description, category, price } = req.body;
  const productImage = req.file ? req.file.path : null;

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
  const productImage = req.file ? req.file.path : null;

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
  upload,
  getProductsByPrice,
};
