import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4 bg-white/80 backdrop-blur-md shadow-sm'>
      {/* Logo */}
      <div className='flex items-center justify-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-full px-4 sm:px-6 py-1.5 sm:py-2'>
        <img className='w-10 sm:w-[55px] h-auto' src="/Nexique2.png" alt="" />
        <span className='font-[Poppins] font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
          Nexique
        </span>
      </div>

      {/* Navigation */}
      <ul className='flex items-center justify-center gap-3 sm:gap-4 md:gap-6'>
        <li className='hidden sm:block'>
          <a 
            className="text-sm cursor-pointer text-gray-600 hover:text-[#ff7373] transition-colors duration-300 font-medium" 
            href="#"
          >
            Learn More
          </a>
        </li>
        <Link to="/auth">
          <button className="py-1.5 sm:py-2 px-4 sm:px-6 md:px-8 rounded-full bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] text-white font-[Poppins] font-light text-sm sm:text-[15px] shadow-md hover:shadow-lg hover:shadow-[#ff7373]/30 transition-all duration-300">
            Login
          </button>
        </Link>
      </ul>

      {/* Mobile Menu Indicator - Optional but keeps same logic */}
      <button className="sm:hidden text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  )
}

export default Navbar
