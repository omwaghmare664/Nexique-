import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { MdClose } from "react-icons/md";
import { FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa"; // Import icons
import BackHome from "../components/BackHome";
import { backend_url } from "../contexts/StoredContext";

function Order() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const backend_products_url = backend_url;

  useEffect(() => {
    if (!user || !user.id) {
      setError("User not found");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${backend_products_url}/order/getUserOrders/${user.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id, backend_products_url]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const toggleOrderDetails = (orderId) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  return (
    <>
      <BackHome />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Your Orders
          </h2>
          {orders === 0 ? (
            <div className="text-center text-gray-500">No orders found.</div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-green-500"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Order #{order._id}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Total Price:</strong> ${order.totalPrice}
                    </p>
                    <div className="flex items-center space-x-2">
                      {order.status === "Delivered" && (
                        <FaCheckCircle className="text-green-500" />
                      )}
                      {order.status === "Pending" && (
                        <FaClock className="text-yellow-500" />
                      )}
                      {order.status === "Cancelled" && (
                        <FaExclamationCircle className="text-red-500" />
                      )}
                      <span className="text-gray-700">{order.status}</span>
                    </div>
                  </div>

                  {selectedOrder === order._id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-10">
                      <div className="bg-white rounded-lg p-8 w-full max-w-lg relative transform transition-all duration-500 scale-105">
                        <MdClose
                          className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer hover:text-green-500 transition-all"
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
                                key={item._id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-green-100 transition-all"
                              >
                                <div className="flex items-center space-x-4">
                                  <img
                                    src={`${backend_url}/${item.productId.productImage}`}
                                    alt={item.productId.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <span className="text-gray-800 font-medium">
                                    {item.name} (x{item.quantity})
                                  </span>
                                </div>
                                <span className="text-gray-600">
                                  ${item.price * item.quantity}
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
