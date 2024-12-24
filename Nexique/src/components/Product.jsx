import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext"; // Import UserContext to access user ID
import { backend_url } from "../contexts/StoredContext";

function Product({ name, description, price, image, id, handleProductClick }) {
  const PORT = backend_url;
  const { user } = useContext(UserContext); // Access user context to get user ID

  const [errorMessage, setErrorMessage] = useState(null); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(null); // State to manage success messages

  const formatPrice = (price) => {
    // Convert to number and format with commas
    return `${Number(price).toLocaleString()}`;
  };

  const addToCart = async () => {
    if (!user || !user._id) {
      setErrorMessage("User ID is not available. Please log in."); // Set error message for user D
      return;
    }

    try {
      const response = await fetch(`${PORT}/cart/add/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Added to cart!"); // Set success message
        setErrorMessage(null); // Clear any previous error messages
        setTimeout(() => {
          setSuccessMessage(null); // Remove success message after 3 seconds
        }, 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add to cart"); // Set error message from response
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
    <div className="max-w-[250px] bg-white text-black rounded-lg border border-gray-200 shadow-sm overflow-hidden p-4 transition-shadow duration-300 flex flex-col items-center justify-center cursor-pointer lg:max-w-[300px] sm:max-w-[200px] md:max-w-[220px]">
      <div className="relative mb-3 w-full">
        <img
          src={`${image}`}
          alt={name}
          onClick={() => handleProductClick(id)}
          className="w-full h-40 object-contain rounded-md border border-gray-100 hover:scale-105 transition-transform"
        />
      </div>

      {/* Product Details */}
      <div className="text-left w-full">
        <h1 className="text-[18px] md:text-[20px] font-semibold truncate">{name}</h1>
        <p className="text-black text-xs md:text-sm mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
          {description}
        </p>

        <p className="text-lg font-bold mt-2">
          <span className="mr-[5px]">₹</span>
          {formatPrice(price)}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4 w-full">
        {successMessage ? <button
          onClick={addToCart}
          className="w-full py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        >
          {successMessage}
        </button> : <button
          onClick={addToCart}
          className="w-full py-2 bg-black text-white rounded-md font-medium text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        >
          Add to Cart
        </button>}

        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      </div>

      
    </div>
  );
}

export default Product;
