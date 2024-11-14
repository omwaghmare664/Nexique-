const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/OrderController");

const OrderRouter = require("express").Router();

// Create Order
OrderRouter.post("/placeOrder", placeOrder);

// Get User Orders (with userId as a URL parameter)
OrderRouter.get("/getUserOrders/:userId", getUserOrders);

// Get All Orders
OrderRouter.get("/getAllOrders", getAllOrders);

// Update Order Status (with orderId as a URL parameter)
OrderRouter.post("/updateOrderStatus/:orderId", updateOrderStatus);

module.exports = OrderRouter;
