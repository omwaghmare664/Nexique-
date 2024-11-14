const orderModel = require('../models/OrderModel');
const userModel = require('../models/UserModel');

// Place Order
const placeOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, shippingAddress, paymentMethod } = req.body;

        // Validate the incoming request data
        if (!userId || !items || !totalPrice || !shippingAddress || !paymentMethod) {
            return res.status(400).json({
                status: 400,
                message: "Missing required fields",
            });
        }

        // Create a new order object
        const newOrder = new orderModel({
            userId,
            items,
            totalPrice,
            shippingAddress,
            paymentMethod,
        });

        // Save the new order to the database
        await newOrder.save();

        // Update the user's orders array
        await userModel.findByIdAndUpdate(userId, {
            $push: { orders: newOrder._id },
        });

        return res.status(201).json({
            status: 201,
            message: "Order placed successfully!",
            order: newOrder,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

// Get User Orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming the userId is passed in the URL params

        // Fetch orders from the database
        const orders = await orderModel.find({ userId }).populate('items.productId');

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No orders found for this user.",
            });
        }

        return res.status(200).json({
            status: 200,
            orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

// Get All Orders (for Admin Panel)
const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders and populate user details
        const orders = await orderModel.find().populate('userId', 'name email').populate('items.productId');

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No orders found.",
            });
        }

        return res.status(200).json({
            status: 200,
            orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; // Assuming the orderId is passed in the URL params
        const { status } = req.body; // The new status, e.g., "Completed"

        // Validate status
        const validStatuses = [
            "Pending",
            "Confirmed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Completed",
            "Cancelled",
            "Returned",
            "Failed Delivery"
          ];
          
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid status value.",
            });
        }

        // Check if order exists
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found.",
            });
        }

        // Update the order's status
        order.status = status;
        const updatedOrder = await order.save();

        return res.status(200).json({
            status: 200,
            message: "Order status updated successfully.",
            updatedOrder,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

module.exports = {
    placeOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
};
