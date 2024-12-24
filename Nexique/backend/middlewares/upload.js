const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Helper function to create folder if it doesn't exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Create storage for product images
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const productDir = path.join(__dirname, "../uploads/product");
    ensureFolderExists(productDir);
    cb(null, productDir); // Store product images temporarily
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create storage for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileDir = path.join(__dirname, "../uploads/profile");
    ensureFolderExists(profileDir);
    cb(null, profileDir); // Store profile pictures temporarily
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Common file filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

// Multer instances for product and profile
const uploadProduct = multer({ storage: productStorage, fileFilter });
const uploadProfile = multer({ storage: profileStorage, fileFilter });

module.exports = { uploadProduct, uploadProfile };