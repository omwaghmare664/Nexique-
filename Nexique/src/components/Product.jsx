import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { backend_url } from "../contexts/StoredContext";

function Product({ name, description, price, image, id, handleProductClick }) {
  const PORT = backend_url;
  const { user } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const formatPrice = (price) => `${Number(price).toLocaleString()}`;

  const addToCart = async () => {
    if (!user || !user._id) {
      setErrorMessage("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await fetch(`${PORT}/cart/add/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      if (response.ok) {
        setSuccessMessage("Added to cart!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setErrorMessage("Failed to add to cart.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding to the cart.");
    }
  };

  return (
    <div
      className="p-4  bg-white sm:rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={() => handleProductClick(id)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain mb-3 rounded-md"
      />
      <h3 className="text-lg font-bold truncate">{name}</h3>
      <p className="text-sm text-gray-600 truncate">{description}</p>
      <p className="text-lg font-bold mt-2">₹ {formatPrice(price)}</p>
      <button
        className="w-full mt-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
      >
        {successMessage || "Add to Cart"}
      </button>
    </div>
  );
}

export default Product;
