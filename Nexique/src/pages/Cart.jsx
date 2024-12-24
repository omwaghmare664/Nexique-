import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../contexts/StoredContext";
import Loader from "../components/Loader";

function Cart() {
  const backend_products_url = backend_url;
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${backend_products_url}/cart/get/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.cart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user._id, backend_products_url]);

  const calculateDiscountPercentage = (subtotal) => {
    if (subtotal === 0) return 0;
    if (subtotal >= 3000000) return 38;
    if (subtotal >= 1500000) return 25;
    if (subtotal >= 800000) return 17;
    if (subtotal >= 100000) return 26;
    if (subtotal >= 50000) return 43;
    if (subtotal >= 25000) return 38;
    if (subtotal >= 10100) return 32;
    if (subtotal >= 2050) return 25;
    if (subtotal >= 1000) return 20;
    if (subtotal >= 500) return 15;
    if (subtotal >= 250) return 10;
    return 5;
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const discountPercentage = calculateDiscountPercentage(subtotal);
    const discountAmount = subtotal * (discountPercentage / 100);
    const total = subtotal - discountAmount;

    return { subtotal, discountPercentage, discountAmount, total };
  };

  const handleQuantityChange = async (item, change) => {
    const newQuantity = item.quantity + change;

    if (newQuantity < 0) return;

    try {
      if (newQuantity === 0) {
        await fetch(`${backend_products_url}/cart/delete/${user._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: item.product._id }),
        });
      } else {
        await fetch(`${backend_products_url}/cart/change/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: item.product._id,
            quantity: newQuantity,
          }),
        });
      }
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const { subtotal, discountPercentage, discountAmount, total } =
    calculateTotals();

  if (loading) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center gap-10">
    <Loader />
    <h2>Loading...</h2>
  </div>
    );
  }

  const proceedOrder = () => {
    if (subtotal === 0) {
      alert("Your cart is empty");
    } else {
      navigate("/checkout", {
        state: { cartItems: cartItems, totalPrice: total, userId: user._id },
      });
    }
  };

  return (
    <div className="cart w-full h-full py-24 bg-gray-100">
      <div className="cart_content w-full h-full px-4 sm:px-6 md:px-10 lg:px-28 flex flex-col lg:flex-row items-start justify-center gap-6">
        <div className="w-full lg:w-3/5 py-5 bg-white rounded-md shadow-lg shadow-[#0000001a]">
          <h2 className="text-2xl font-bold px-4">Cart</h2>
          <div className="cart_products max-w-full mx-auto my-8 p-4 bg-white rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-gray-700">Product</th>
                  <th className="p-4 text-gray-700">Price</th>
                  <th className="p-4 text-gray-700">Quantity</th>
                  <th className="p-4 text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      <h1 className="text-xl font-semibold">
                        Cart is empty now!
                      </h1>
                      <p className="mt-2 text-gray-600">
                        Don't miss out! Start adding items to your cart now.
                      </p>
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={`${item.product.productImage}`}
                          alt="Product"
                          className="w-12 sm:w-16 h-12 sm:h-16 rounded-md object-contain"
                        />
                        <span className="font-medium text-gray-800 text-sm sm:text-base">
                          {item.product.name}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 text-sm sm:text-base">
                        ₹{item.product.price.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                            onClick={() => handleQuantityChange(item, -1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-10 text-center border border-gray-300 rounded"
                            readOnly
                          />
                          <button
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm sm:text-base">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full lg:w-2/5">
          <div className="w-full py-5 px-4 sm:px-6 bg-white rounded-sm shadow-lg shadow-[#0000001a] space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">
              Order Summary
            </h2>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span className="text-green-600">{discountPercentage}% off</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={proceedOrder}
              className="w-full py-2 bg-blue-500 text-white font-thin rounded hover:bg-blue-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
