import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { UserContext } from "../contexts/UserContext";
import { backend_url } from "../contexts/StoredContext.jsx";
import Loader from "../components/Loader.jsx";

const ProductShow = () => {
  const PORT = backend_url;
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${PORT}/product/getOne/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          throw new Error(data.message || "Failed to fetch product details.");
        }
      } catch (error) {
        setError("Failed to fetch product details: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async () => {
    if (!user._id) {
      setErrorMessage("Please log in to add items to the cart.");
      return;
    }
    try {
      const response = await fetch(`${PORT}/cart/add/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      if (response.ok) {
        setSuccessMessage("Product added to cart!");
        setErrorMessage(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add to cart");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the product.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  if (loading)
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center gap-10">
        <Loader />
        <h2>Loading...</h2>
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row mt-8 p-8 gap-8">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Zoom>
          <img
            src={product.productImage}
            alt={product.name}
            className="w-full max-w-[500px] w- h-auto object-contain rounded-lg shadow-xl transition-transform duration-500 hover:scale-105 bg-white p-8"
          />
        </Zoom>
      </div>

      {/* Product Details */}
      <div className="w-full h-[350px] bg-white p-16 py-8 rounded-sm shadow-sm shadow-slate-300 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-lg text-gray-600 mb-6">{product.description}</p>
        
        {/* Product Info */}
        <div className="text-lg gap-2 flex flex-col items-start text-gray-700 mb-4">
          <p><strong className="font-semibold text-gray-900">Category:</strong> {product.category}</p>
          <p className="font-bold text-3xl text-green-600">₹{product.price}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <button
            onClick={addToCart}
            className={`w-full md:w-2/3 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 focus:outline-none transition duration-300 ${
              loading ? "bg-yellow-400 cursor-not-allowed" : ""
            }`}
          >
            Add to Cart
          </button>
        </div>

        {/* Success/Error Message */}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProductShow;
