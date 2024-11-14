const express = require("express");
const productRouter = express.Router();
const { addProduct, removeProduct, getAllProducts, getProductsByPrice, updateProduct } = require("../controllers/productController");
const { upload } = require("../controllers/productController");  // Import the upload middleware

productRouter.post('/add', upload.single('productImage'), addProduct);
productRouter.put('/update/:id', upload.single('productImage'), updateProduct);
productRouter.delete('/delete/:id', removeProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/price', getProductsByPrice);

module.exports = productRouter;
