const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending",
            "Confirmed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Completed",
            "Cancelled",
            "Returned",
            "Failed Delivery"],
    default: "Pending",
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orderDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true }
});
const orderModel = mongoose.model("Order", OrderSchema);
module.exports = orderModel
