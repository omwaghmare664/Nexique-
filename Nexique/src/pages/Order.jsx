import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { MdClose } from "react-icons/md";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTruck,
  FaShippingFast,
  FaUndoAlt,
} from "react-icons/fa"; // Import necessary icons
import { backend_url } from "../contexts/StoredContext";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorServer from "../components/ErrorServer";

function Order() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const backend_products_url = backend_url;

  useEffect(() => {
    if (!user._id) {
      setError("User not signed in, please login");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${backend_products_url}/order/getUserOrders/${user._id}`
          `${backend_products_url}/order/getUserOrders/${user._id}`
        );

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || "Failed to fetch orders");
          setOrders([]);
        } else {
          const data = await response.json();
          setOrders(Array.isArray(data.orders) ? data.orders : []);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user._id, backend_products_url]);

  const statusIcons = {
    Pending: {
      icon: <FaClock className="text-yellow-500" />,
      label: "Pending",
    },
    Confirmed: {
      icon: <FaCheckCircle className="text-blue-500" />,
      label: "Confirmed",
    },
    Shipped: {
      icon: <FaShippingFast className="text-indigo-500" />,
      label: "Shipped",
    },
    "Out for Delivery": {
      icon: <FaTruck className="text-teal-500" />,
      label: "Out for Delivery",
    },
    Delivered: {
      icon: <FaCheckCircle className="text-green-500" />,
      label: "Delivered",
    },
    Completed: {
      icon: <FaCheckCircle className="text-green-700" />,
      label: "Completed",
    },
    Cancelled: {
      icon: <FaExclamationCircle className="text-red-500" />,
      label: "Cancelled",
    },
    Returned: {
      icon: <FaUndoAlt className="text-orange-500" />,
      label: "Returned",
    },
    "Failed Delivery": {
      icon: <FaExclamationCircle className="text-gray-500" />,
      label: "Failed Delivery",
    },
  };

  const toggleOrderDetails = (orderId) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  if (loading)
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center gap-10">
        <Loader />
        <h2>Loading...</h2>
      </div>
    );

  if (error)
    return (
      <ErrorServer error={error} />
    );

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="w-full sm:max-w-4xl mx-auto bg-white p-6 rounded-lg sm:shadow-md mt-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Your Orders
          </h2>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven’t placed any orders yet.
            </p>
          ) : (
            <div className="space-y-6 flex flex-col-reverse gap-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 bg-white rounded-lg shadow-lg hover:ring-2 hover:ring-green-500 transition-all cursor-pointer"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Order #{order._id}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Date:{" "}
                    {new Date(order.orderDate).toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-700 font-medium">
                    Time:{" "}
                    {new Date(order.orderDate).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <div className="flex items-center space-x-2 py-2">
                    {statusIcons[order.status]?.icon}
                    <span className="text-gray-700 text-xl font-bold">
                      {order.status}
                    </span>
                  </div>
                  {selectedOrder === order._id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-10">
                      <div className="bg-white overflow-auto max-h-[400px] rounded-lg p-8 w-full max-w-lg relative">
                        <MdClose
                          className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer hover:text-green-500"
                          onClick={() => setSelectedOrder(null)}
                        />
                        <h4 className="font-semibold text-gray-800 mb-4">
                          Order Details
                        </h4>
                        <p>
                          <strong>Status:</strong> {order.status}
                        </p>
                        <p>
                          <strong>Payment Method:</strong> {order.paymentMethod}
                        </p>
                        <p>
                          <strong>Shipping Address:</strong>{" "}
                          {order.shippingAddress.street},{" "}
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state},{" "}
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </p>
                        <div className="mt-4">
                          <h5 className="font-semibold text-gray-700 mb-2">
                            Order Items:
                          </h5>
                          <ul className="space-y-4">
                            {order.items.map((item) => (
                              <li
                                key={`${order._id}-${item._id}`}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                              >
                                <div className="flex items-center space-x-4">
                                  <img
                                    src={item.productId.productImage}
                                    alt={item.productId.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <span className="text-gray-800 font-medium">
                                    {item.name} (x{item.quantity})
                                  </span>
                                </div>
                                <span className="text-gray-600">
                                  ₹{item.price * item.quantity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
