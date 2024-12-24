import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { FaBoxesPacking } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { UserContext } from "../contexts/UserContext";
import { backend_url } from "../contexts/StoredContext";

function Navbar() {
  const backend_products_url = backend_url;
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user || !user._id) return; // Exit early if user is not defined
  
      try {
        const response = await fetch(
          `${backend_products_url}/cart/get/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.cart);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCartItems();
  }, (2000)[(user, backend_products_url)]);
  

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 z-50  bg-white w-full py-1 px-6 shadow-sm border-b-[1px] border-[#D1D5DB] transition-all duration-300">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-auto" src="/Nexique2.png" alt="Logo" />
          <span className="font-bold text-lg text-gray-800">Nexique</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden relative p-2 flex flex-col gap-1 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen && <span className={`${cartItems.length === 0 && 'hidden'} absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center`}>
                    {cartItems.length}
                  </span>}
          <span
            className={`w-6 h-[2px] bg-gray-800 rounded transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-[2px] bg-gray-800 rounded transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-[2px] bg-gray-800 rounded transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>

        {/* Links */}
        <ul
          className={`lg:flex items-center gap-8 lg:gap-2 absolute lg:static bg-white w-full lg:w-auto top-0 left-0 h-screen lg:h-auto transform transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 lg:flex-row flex-col p-8 lg:p-0 shadow-lg lg:shadow-none`}
        >
          <li className="my-2 lg:my-0">
            <Link
              to="/cart"
              className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-all"
            >
              <div className="relative p-3 bg-black rounded-full">
                <LuShoppingCart className="text-white text-lg" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className=" lg:hidden text-gray-700">Cart</span>
            </Link>
          </li>
          <li className="my-2 lg:my-0">
            <Link
              to="/order"
              className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-all"
            >
              <div className="p-3 bg-gray-600 rounded-full">
                <FaBoxesPacking className="text-white text-lg" />
              </div>
              <span className=" lg:hidden text-gray-700">Orders</span>
            </Link>
          </li>
          <li className="my-2 lg:my-0">
            <Link
              to="/profile"
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <div className="p-1  bg-gray-200 rounded-full">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-9 h-9 rounded-full"
                  />
                ) : (
                  <RxAvatar className="text-gray-700 text-3xl" />
                )}
              </div>
              <span className="lg:hidden  text-gray-700">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
