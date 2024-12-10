import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import BackHome from "../components/BackHome";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../contexts/StoredContext";

function Cart() {
  const backend_products_url = backend_url
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${backend_products_url}/cart/get/${user.id}`
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
  }, (3000)[(user.id, backend_products_url)]);

  const calculateDiscountPercentage = (subtotal) => {
    // Determine discount percentage based on subtotal
    if (subtotal === 0) return 0;
    if (subtotal >= 3000000) return 38; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 1500000) return 25; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 800000) return 17; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 100000) return 26; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 50000) return 43; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 25000) return 38; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 10100) return 32; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 2050) return 25; // 10% discount for orders between ₹250 and ₹499
    if (subtotal >= 1000) return 20; // 20% discount for orders over ₹1000
    if (subtotal >= 500) return 15; // 15% discount for orders between ₹500 and ₹999
    if (subtotal >= 250) return 10; // 10% discount for orders between ₹250 and ₹499
    return 5; // 5% discount for orders under ₹250
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
        await fetch(`${backend_products_url}/cart/delete/${user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: item.product._id }),
        });
      } else {
        await fetch(`${backend_products_url}/cart/change/${user.id}`, {
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
    return <div>Loading...</div>;
  }
  const proceedOrder = () => {
    const userId = user.id;

    const { subtotal, total } = calculateTotals();
    if (subtotal === 0) {
      alert("Your cart is empty");
    } else {
      navigate("/checkout", {
        state: { cartItems: cartItems, totalPrice: total, userId: userId },
      });
    }
  };

  return (
    <div className="cart w-full h-screen bg-gray-100">
      <BackHome />
      <div className="cart_content w-full h-full py-4 px-28 flex items-start justify-center gap-3">
        <div className="w-full py-5 bg-white rounded-md shadow-lg shadow-[#0000001a]">
          <h2 className="text-2xl font-bold px-4 ">Cart</h2>
          <div className="cart_products max-w-4xl mx-auto my-8 p-4 bg-white rounded-lg">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-gray-700">Product</th>
                  <th className="p-4 text-gray-700">Price</th>
                  <th className="p-4 text-gray-700">Quantity</th>
                  <th className="p-4 text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y ">
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
                          className="w-16 h-16 rounded-md object-contain"
                        />
                        <span className="font-medium text-gray-800">
                          {item.product.name}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
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
                      <td className="p-4 text-gray-600">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[450px] py-5 px-6 bg-white rounded-sm shadow-lg shadow-[#0000001a] space-y-4">
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
