const express = require("express");
const productRouter = express.Router();
const { addProduct, removeProduct, getAllProducts, getProductsByPrice, updateProduct } = require("../controllers/productController");
const { uploadProduct } = require("../middlewares/upload");

productRouter.post('/add', uploadProduct.single('productImage'), addProduct);
productRouter.put('/update/:id', uploadProduct.single('productImage'), updateProduct);
productRouter.delete('/delete/:id', removeProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/price', getProductsByPrice);

module.exports = productRouter;
