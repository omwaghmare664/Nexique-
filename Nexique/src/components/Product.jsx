import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext"; // Import UserContext to access user ID
import { backend_url } from "../contexts/StoredContext";

function Product({ name, description, price, image, id }) {
  const PORT = backend_url;
  const { user } = useContext(UserContext); // Access user context to get user ID

  const [errorMessage, setErrorMessage] = useState(null); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(null); // State to manage success messages

  const formatPrice = (price) => {
    // Convert to number and format with commas
    return `${Number(price).toLocaleString()}`;
  };

  const addToCart = async () => {
    if (!user || !user.id) {
      setErrorMessage("User ID is not available. Please log in."); // Set error message for user ID
      return;
    }

    try {
      const response = await fetch(`${PORT}/cart/add/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id        
        }),
      });

      if (response.ok) {
        setSuccessMessage("Product added to cart!"); // Set success message
        setErrorMessage(null); // Clear any previous error messages
        setTimeout(() => {
          setSuccessMessage(null); // Remove success message after 3 seconds
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add to cart'); // Set error message from response
        setTimeout(() => {
          setErrorMessage(null); // Remove error message after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setErrorMessage("An error occurred while adding the product."); // Set generic error message
      setTimeout(() => {
        setErrorMessage(null); // Remove error message after 3 seconds
      }, 3000);
    }
  };

  return (
    <div className="max-w-[250px] max-h-[400px] bg-white text-black rounded-lg border border-gray-200 shadow-md overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center cursor-pointer">
      <div className="relative mb-3">
        <img
          src={`${image}`}
          alt={name}
          className="w-full h-40 object-contain rounded-md border border-gray-100"
        />
      </div>

      {/* Product Details */}
      <div className="text-left w-full">
        <h1 className="text-[22px] font-semibold truncate">{name}</h1>
        <p className="text-black text-xs mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
  {description}
</p>

        <p className="text-lg font-bold mt-2 ">
          <span className="mr-[5px]">₹</span>
          {formatPrice(price)}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <button
          onClick={addToCart}
          className="w-[150px] py-2 bg-black text-white rounded-md font-medium text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        >
          Add to Cart
        </button>
      </div>

      {/* Error and Success Messages */}
      {errorMessage && (
        <div className="mt-2 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mt-2 p-2 bg-green-100 text-green-600 border border-green-300 rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default Product;
