import React, { useState } from "react";
import { MdTune } from "react-icons/md";


function HomeSidebar({ setSelectedCategory, setSelectedPrice, applyFilters }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedPrice([null, null]);
    setSelectedCategory("All");
    applyFilters();
  };

  return (
    <>
      {/* Hamburger Button for Small Screens */}
      <button
        className="fixed bottom-4 left-4 z-50 md:hidden bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <MdTune className="text-2xl"></MdTune>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 p-5 transform ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } transition-transform top-10 duration-300 ease-in-out md:translate-x-0 md:static md:w-[200px]`}
      >
        <div className="w-full max-w-xs mx-auto">
          <label className="block text-gray-700 text-[12px] font-semibold mb-2">
            Category
          </label>
          <div className="relative">
            <select
              className="w-full border border-gray-300 rounded-lg p-2 pl-2 pr-10 mt-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none transition duration-300 ease-in-out"
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
                setSelectedPrice([e.target.value, maxPrice]);
              }}
            />
            <input
              type="number"
              value={maxPrice}
              placeholder="Max Price"
              className="border border-gray-300 rounded-lg p-2"
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setSelectedPrice([minPrice, e.target.value]);
              }}
            />
          </div>
        </div>

        <button
          className="w-full py-2 bg-black text-white rounded-lg mt-4 text-sm transition-all hover:bg-[#000000e8]"
          onClick={applyFilters}
        >
          Apply
        </button>

        <button
          className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg mt-2 transition-all hover:bg-gray-300"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

        {/* Close Button for Mobile */}
        <button
          className="mt-4 md:hidden w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          onClick={() => setIsSidebarOpen(false)}
        >
          Close
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default HomeSidebar;
