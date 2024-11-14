import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti"; // Import canvas-confetti
import { backend_url } from "../contexts/StoredContext";

function Proceed() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { cartItems, totalPrice, userId } = location.state || {};

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const triggerExplosion = () => {
    confetti({
      particleCount: 100,
      angle: 90,
      spread: 180,
      origin: { x: 0.1, y: 0.8 },
    });
    confetti({
      particleCount: 100,
      angle: 90,
      spread: 180,
      origin: { x: 0.9, y: 0.8 },
    });
  };
  
  const clearUserCart = async () => {
    try {
      const response = await fetch(`${backend_url}/cart/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }), // Replace with actual userId
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // "Cart has been cleared successfully"
        // Handle clearing cart on frontend if needed
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod || !Object.values(address).every((field) => field)) {
      alert("Please fill out all fields");
      return;
    }
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: userId,
      items: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice,
      shippingAddress: address,
      paymentMethod: paymentMethod,
    };

    setIsLoading(true); // Start loading state

    try {
      // Wait for 3 seconds before sending the request
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch("http://localhost:5500/order/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      clearUserCart();
      // Trigger confetti blast from left and right side
      triggerExplosion();

      // Redirect to order confirmation page after successful order creation

      setTimeout(() => {
        navigate("/order");
      }, 2000); // Wait a bit before navigating to allow confetti to play
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Checkout
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={address.street}
              onChange={handleAddressChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={address.city}
              onChange={handleAddressChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={address.state}
              onChange={handleAddressChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={address.country}
              onChange={handleAddressChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <select
              name="paymentMethod"
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select payment method</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading} // Disable the button during loading
              className={`w-full py-3 px-4 ${
                isLoading
                  ? "bg-white text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white"
              } rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Proceed;
