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
    <div className="mt-16 flex flex-col md:flex-row items-center md:items-start gap-8 p-6 md:p-12 bg-gray-100 min-h-screen w-full text-gray-800">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Zoom>
          <img
            src={product.productImage}
            alt={product.name}
            className="rounded-lg shadow-lg border-[1px] border-gray-300 max-h-[500px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </Zoom>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-xl border-[1px] border-gray-300 md:w-1/2 w-full">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {product.description}
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p className="text-3xl font-semibold text-green-500">₹{product.price}</p>
        <button
          onClick={addToCart}
          className={`bg-indigo-600 text-white px-8 py-3 rounded-lg mt-4 hover:bg-indigo-700 transition-transform duration-300 transform  ${
            loading ? "bg-indigo-400 cursor-not-allowed" : ""
          }`}
        >
          Add to Cart
        </button>
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
