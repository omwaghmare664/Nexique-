const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");

const AddCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.params;

    // Find user and product
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    // Check if the product is already in the user's cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      // If product is already in cart, increase the quantity
      cartItem.quantity += 1;
    } else {
      // If product is not in cart, add it with quantity 1
      user.cart.push({ product: productId, quantity: 1 });
    }

    // Save the updated user cart
    await user.save();

    // Return the updated cart with populated product details
    const updatedUser = await UserModel.findById(userId).populate(
      "cart.product"
    );
    res.status(200).json({ success: true, cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const removeCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.params;

    // Find user and product
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);

    // Check if user and product exist
    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    // Remove product from user cart
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated user cart
    await user.save();

    // Populate the product details for the response
    const updatedUser = await UserModel.findById(userId).populate(
      "cart.product"
    );
    res.status(200).json({ success: true, cart: updatedUser.cart });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const getCartController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and populate cart with product details
    const user = await UserModel.findById(userId).populate("cart.product");

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const changeQuantityController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.params;

    // Find user and product
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);

    // Check if user and product exist
    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    // Find the item in the user's cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    // Check if the item exists in the cart
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity
    if (quantity <= 0) {
      // If quantity is less than or equal to 0, remove the item from the cart
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      // Update the quantity
      cartItem.quantity = quantity;
    }

    // Save the updated user cart
    await user.save();

    // Populate the product details for the response
    const updatedUser = await UserModel.findById(userId).populate(
      "cart.product"
    );
    res.status(200).json({ success: true, cart: updatedUser.cart });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const clearCart = async (req, res) => {
  const { userId } = req.body; // Get user ID from the request body

  try {
    // Find the user by userId and clear the cart
    const user = await UserModel.findById(userId); // Directly find the user by userId

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Clear the cart items by resetting the cart array
    user.cart = []; // Empty the cart array in the user document

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart has been cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ success: false, message: 'Failed to clear the cart' });
  }
};

module.exports = {
  AddCartController,
  removeCartController,
  getCartController,
  changeQuantityController,
  clearCart,
};
