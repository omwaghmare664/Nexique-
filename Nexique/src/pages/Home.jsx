import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeSidebar from "../components/HomeSidebar";
import Product from "../components/Product";

import {backend_url} from '../contexts/StoredContext'
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(UserContext);
  const backend_products_url = backend_url

  const navigate = useNavigate()
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [selectedCategory, setSelectedCategory] = useState("All"); // State for selected category
  const [selectedPrice, setSelectedPrice] = useState([null, null]); // State for selected price range

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend_products_url}/product/all`);
        console.log("Fetched products response:", response.data); // Debugging log

        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Set fetched products if it's an array
          setFilteredProducts(response.data.products); // Initialize filtered products
        } else {
          throw new Error('Fetched data does not contain products.');
        }
      } catch (err) {
        setError('Failed to fetch products: ' + err.message); // Handle error
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array to run only on component mount

  const applyFilters = () => {
    let updatedProducts = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by price only if both minPrice and maxPrice are set
    const [minPrice, maxPrice] = selectedPrice; // Destructure the selectedPrice
    if (minPrice !== null && maxPrice !== null) {
      updatedProducts = updatedProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    setFilteredProducts(updatedProducts); // Set the filtered products
  };

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error message
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Use navigate to change route
  };

  return (
    <>
      <div className="home flex flex-col w-full h-screen">
        <Navbar />
        <div className="home_content mt-[95px] w-full h-full flex">
          <HomeSidebar
            setSelectedCategory={setSelectedCategory}
            setSelectedPrice={setSelectedPrice}
            applyFilters={applyFilters}
          />
          <div className="products p-10 bg-white w-full h-full flex flex-wrap gap-5 items-start justify-center max-h-[84vh] overflow-auto">
            {filteredProducts.map((product) => ( // Map through filtered products and display them
              <div
              key={product._id}
              onClick={() => handleProductClick(product._id)} // Log product ID when clicked
              className="cursor-pointer"
            >
              <Product
                id={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.productImage}
              />
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
