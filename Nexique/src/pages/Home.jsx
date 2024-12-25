import React, { useContext, useEffect, useState } from "react";
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState([null, null]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend_products_url}/product/all`);
        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        } else {
          throw new Error("Fetched data does not contain products.");
        }
      } catch (err) {
        setError("Failed to fetch products: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = () => {
    let updatedProducts = [...products];
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    const [minPrice, maxPrice] = selectedPrice;
    if (minPrice !== null && maxPrice !== null) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(updatedProducts);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
        <Loader />
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="home flex w-full h-[89.5vh] mt-16 bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <HomeSidebar
        setSelectedCategory={setSelectedCategory}
        setSelectedPrice={setSelectedPrice}
        applyFilters={applyFilters}
        className="w-[250px] bg-white hidden lg:block"
      />

      {/* Products Section */}
      <div className="w-full h-full overflow-auto products flex-1 sm:p-3  p-0 lg:p-10 sm:bg-gray-100 bg-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3 lg:gap-5 gap-[1px] pt-[1px]">
          {filteredProducts.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              handleProductClick={handleProductClick}
              price={product.price}
              image={product.productImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
