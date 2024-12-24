import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeSidebar from "../components/HomeSidebar";
import Product from "../components/Product";

import { backend_url } from "../contexts/StoredContext";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Home() {
  const { user } = useContext(UserContext);
  const backend_products_url = backend_url;

  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [selectedCategory, setSelectedCategory] = useState("All"); // State for selected category
  const [selectedPrice, setSelectedPrice] = useState([null, null]); // State for selected price range
  const [detectUser, setDetectUser] = useState(false);


  console.log("User:", user); // Debugging log

  useEffect(() => {
    const UserDetect = async () => {
      try {
        const response = await axios.get(
          `${backend_products_url}/auth/user/${user._id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setDetectUser(true);
          return 0;
        }
        if (!response.data.success) {
          localStorage.clear();
          setDetectUser(false);
          navigate("/getstarted");
        }
      } catch (error) {
        setDetectUser(false);
        navigate("/getstarted");
      }
    };

    UserDetect();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend_products_url}/product/all`);
        console.log("Fetched products response:", response.data); // Debugging log

        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Set fetched products if it's an array
          setFilteredProducts(response.data.products); // Initialize filtered products
        } else {
          throw new Error("Fetched data does not contain products.");
        }
      } catch (err) {
        setError("Failed to fetch products: " + err.message); // Handle error
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only on component mount

  const applyFilters = () => {
    let updatedProducts = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price only if both minPrice and maxPrice are set
    const [minPrice, maxPrice] = selectedPrice; // Destructure the selectedPrice
    if (minPrice !== null && maxPrice !== null) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(updatedProducts); // Set the filtered products
  };

  if (loading)
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center gap-10">
        <Loader />
        <h2>Loading...</h2>
      </div>
    ); // Display loading state
  if (error) return <div>{error}</div>; // Display error message
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Use navigate to change route
  };

  return (
    <>
      <div className="home flex flex-col w-full h-screen overflow-hidden">
        {/* <Navbar /> */}
        <div className="home_content mt-[70px] w-full h-full flex">
          <HomeSidebar
            setSelectedCategory={setSelectedCategory}
            setSelectedPrice={setSelectedPrice}
            applyFilters={applyFilters}
          />
          <div className="products relative p-5 py-10 bg-white w-full h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-28 max-h-full overflow-auto grid-auto-rows">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer p-2 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center"
              >
                <Product
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  handleProductClick={handleProductClick}
                  price={product.price}
                  image={product.productImage}
                />
              </div>
            ))}

            <div className="pointer-events-none w-full h-24 bg-gradient-to-b to-white from-transparent fixed bottom-0 left-0"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
