import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import {backend_url} from "../contexts/StoredContext.jsx"

const ProductShow = () => {
  const PORT =  backend_url // Set the port for the API
  const { id } = useParams(); // Extract the ID from the URL
    const { user } = useContext(UserContext); // Access user context to get user ID
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [errorMessage, setErrorMessage] = useState(null); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(null); // State to manage success messages
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/product/getOne/${id}`
        );
        const data = await response.json(); // Parse the response as JSON

        if (data.success) {
          setProduct(data.product); // Set the product data
        } else {
          throw new Error(data.message || "Failed to fetch product details.");
        }
      } catch (error) {
        setError("Failed to fetch product details: " + error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProductDetails(); // Call the function
  }, [id]);

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
  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    ); // Display loading state
  if (error) return <div>{error}</div>; // Display error message

  return (
    <>
    <Navbar />
      <div className=" mt-16 flex flex-col md:flex-row items-center md:items-start gap-8 p-6 md:p-12 bg-gray-50 min-h-screen w-full">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Zoom>
            <img
              src={product.productImage}
              alt={product.name}
              className="rounded-[4px] p-5 px-10 shadow-md border-2  max-h-[500px] object-contain"
            />
          </Zoom>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200 md:w-1/2 w-full">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-gray-700 text-lg">
            <span className="font-medium">Category:</span> {product.category}
          </p>
          <p className="text-3xl font-semibold text-green-600">
            ₹{product.price}
          </p>
          <button onClick={addToCart} className={`bg-blue-600 text-white px-8 py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all text-xl ${loading ? 'bg-blue-400 cursor-not-allowed ' : ''}}`}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductShow;
