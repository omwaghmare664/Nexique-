import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 z-50 bg-white w-full py-4 flex items-center justify-between px-6 md:px-12 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img
          className="w-12 md:w-16 h-auto"
          src="/Nexique2.png"
          alt="Nexique Logo"
        />
        <span className="font-poppins font-bold text-lg md:text-2xl">
          Nexique
        </span>
      </div>

      {/* Menu Links */}
      <ul
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center gap-6 absolute md:static top-16 left-0 w-full bg-white md:w-auto px-6 md:px-0`}
      >
        <li className="text-sm cursor-pointer">
          <a href="#" className="hover:text-gray-600 transition">
            Learn More
          </a>
        </li>
        <Link to="/auth">
          <button className="py-2 px-6 md:px-8 rounded-full bg-black text-white text-sm md:text-base hover:bg-gray-800 transition">
            Login
          </button>
        </Link>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden">
        <button
          aria-label="Toggle Menu"
          className="text-black focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
