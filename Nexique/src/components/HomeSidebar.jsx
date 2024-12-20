import React, { useState } from "react";

function HomeSidebar({ setSelectedCategory, setSelectedPrice, applyFilters }) {
  const [minPrice, setMinPrice] = useState(""); // Start with empty string for min price
  const [maxPrice, setMaxPrice] = useState(""); // Start with empty string for max price

  const resetFilters = () => {
    setMinPrice(""); // Reset min price to empty
    setMaxPrice(""); // Reset max price to empty
    setSelectedPrice([null, null]); // Reset selected price range to null
    setSelectedCategory("All"); // Reset category to "All"
    applyFilters(); // Call applyFilters to reset the displayed products
  };

  return (
    <div className="home_sidebar w-[200px] h-full bg-white border-r border-r-gray-200 p-5 flex flex-col gap-5">
      <div className="w-full max-w-xs mx-auto">
        <label className="block text-gray-700 text-[12px] font-semibold mb-2">
          Category
        </label>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-lg p-2 pl-2 pr-10 mt-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none transition duration-300 ease-in-out transform"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Grocery">Grocery</option>
            <option value="Cooking">Cooking</option>
            <option value="Kids">Kids</option>
            <option value="Mobiles/Laptops">Mobiles/Laptops</option>
          </select>
          <span className="absolute inset-y-0 top-2 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="w-full max-w-xs mx-auto mt-8">
        <label className="block text-gray-700 text-sm font-semibold mb-3">
          Price Range
        </label>

        <div className="flex justify-between mb-2">
          <span className="text-gray-700">₹{minPrice}</span>
          <span className="text-gray-700">₹{maxPrice}</span>
        </div>

        <div className="relative flex flex-col">
          <input
            type="number"
            value={minPrice}
            placeholder="Min Price"
            className="border border-gray-300 rounded-lg p-2 mb-2"
            onChange={(e) => {
              setMinPrice(e.target.value);
              setSelectedPrice([e.target.value, maxPrice]); // Update selected price range
            }}
          />
          <input
            type="number"
            value={maxPrice}
            placeholder="Max Price"
            className="border border-gray-300 rounded-lg p-2"
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setSelectedPrice([minPrice, e.target.value]); // Update selected price range
            }}
          />
        </div>
      </div>

      <button
        className="px-2 py-2 bg-black text-white rounded-[2px] mt-4 text-sm transition-all hover:bg-[#000000e8]"
        onClick={applyFilters}
      >
        Apply
      </button>

      <button
        className="px-2 py-2 bg-gray-200 text-gray-800 rounded-[4px] mt-2 transition-all hover:bg-gray-300"
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default HomeSidebar;
