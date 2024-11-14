import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { FaBoxesPacking } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { UserContext } from "../contexts/UserContext";
import { backend_url } from "../contexts/StoredContext";

function Navbar() {
  const backend_products_url = backend_url;
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${backend_products_url}/cart/get/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.cart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, (3000)[(user.id, backend_products_url)]);

  

  return (
    <div className="absolute top-0 left-0 z-50 bg-white w-full py-4 flex items-center justify-between px-12 border-b-2">
      <div className="flex items-center justify-center gap-2">
        <img className="w-[65px] h-auto" src="/Nexique2.png" alt="Logo" />
        <span className="font-[Poppins] font-bold text-2xl">Nexique</span>
      </div>
      <ul className="flex items-center justify-center gap-7 mr-10">
        <Link to="/cart">
          <div className="home_navbar_cart relative p-3 bg-black rounded-full cursor-pointer">
            <LuShoppingCart className="text-2xl text-white" title="Cart" />
            {
              cartItems.length > 0 &&
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"> </span>
            }
          </div>
        </Link>
        <Link to="/order">
          <div className="home_navbar_cart relative p-3 bg-gray-600 rounded-full cursor-pointer">
            <FaBoxesPacking className="text-2xl text-white" title="Cart" />
            
          </div>
        </Link>
        <Link to="/profile">
          <div className="relative p-[3px] bg-gray-200 rounded-sm cursor-pointer">
            {user?.profilePicture ? (
              <img
                src={backend_products_url + user.profilePicture}
                className="w-9"
                alt="Profile"
              />
            ) : (
              <RxAvatar className="text-4xl text-[#2e2e2e]" title="Profile" />
            )}
          </div>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
