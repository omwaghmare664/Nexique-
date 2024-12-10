import React, { useState, useEffect } from "react";
import moment from "moment";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaHourglass } from "react-icons/fa";
import { gsap } from "gsap";

function Orders() {
  const BACKEND_PORT = "http://localhost:5500";
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch orders from backend
  useEffect(() => {
    fetch(`${BACKEND_PORT}/order/getAllOrders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  // Pending status animation with GSAP
  useEffect(() => {
    gsap.fromTo(
      ".pending-dot",
      { opacity: 1 },
      { opacity: 0.3, duration: 0.8, repeat: -1, yoyo: true }
    );
  }, []);

  // Handle status change and update it on the backend
  const handleStatusChange = (orderId, newStatus) => {
    fetch(`${BACKEND_PORT}/order/updateOrderStatus/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.updatedOrder) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: newStatus } : order
            )
          );
        } else {
          console.error("Error updating status:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Toggle order details visibility
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Filter orders based on selected status
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status.toLowerCase() === filterStatus;
  });

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Orders</h1>

      {/* Filter Section */}
      <div className="flex justify-center mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 p-2 rounded-md w-48 transition duration-300 ease-in-out"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <table className="w-full text-left rounded-lg border border-gray-200 shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-sm text-gray-600">Order ID</th>
            <th className="p-4 text-sm text-gray-600">Customer Name</th>
            <th className="p-4 text-sm text-gray-600">Total Price</th>
            <th className="p-4 text-sm text-gray-600">Status</th>
            <th className="p-4 text-sm text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <React.Fragment key={order._id}>
              <tr className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                <td className="p-4">{order._id}</td>
                <td className="p-4">{order.userId?.name}</td>
                <td className="p-4">₹{order.totalPrice}</td>

                {/* Status Dropdown */}
                <td className="p-4 relative">
                  {order.status === "Pending" && (
                    <span className="pending-dot bg-orange-400 rounded-full w-2 h-2 inline-block mr-2 absolute top-9 left-0"></span>
                  )}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-700 p-2 rounded-md w-full transition duration-300 ease-in-out hover:border-gray-500"
                    disabled={order.status === "Completed"} // Disable if order is completed
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Expand/Collapse Button */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => toggleOrderDetails(order._id)}
                    className="text-blue-500 hover:text-blue-700 flex items-center justify-center space-x-2"
                  >
                    {expandedOrder === order._id ? (
                      <>
                        <IoIosArrowUp size={18} />
                        <span>Hide Details</span>
                      </>
                    ) : (
                      <>
                        <IoIosArrowDown size={18} />
                        <span>View Details</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>

              {/* Order Details Row */}
              {expandedOrder === order._id && (
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td colSpan="5" className="p-6">
                    <div className="space-y-3 text-sm">
                      <p>
                        <strong>Order Date:</strong> {moment(order.orderDate).format("MMMM Do YYYY, h:mm:ss a")}
                      </p>
                      <p>
                        <strong>Payment Method:</strong> {order.paymentMethod}
                      </p>
                      <div>
                        <strong>Shipping Address:</strong>
                        <p>
                          {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                      </div>
                      <div>
                        <strong>Items:</strong>
                        <ul className="list-disc pl-5">
                          {order.items.map((item) => (
                            <li key={item._id}>
                              {item.name} - Qty: {item.quantity}, Price: ₹{item.price},
                              Products Id: {item._id}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
