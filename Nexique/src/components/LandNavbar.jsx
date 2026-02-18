import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,115,115,0.1)] border-b border-white/20 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link to="/" className='flex items-center gap-2 group relative'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500'></div>
              <img 
                className='w-10 sm:w-12 h-auto relative transform group-hover:scale-110 transition-transform duration-300' 
                src="/Nexique2.png" 
                alt="Nexique" 
              />
            </div>
            <span className='font-[Poppins] font-bold text-xl sm:text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
              Nexique
            </span>
            <Sparkles className='w-4 h-4 text-[#ff7373] opacity-0 group-hover:opacity-100 transition-opacity' />
          </Link>

          {/* Desktop Menu */}
          <ul className='hidden md:flex items-center gap-8'>
            <li>
              <a 
                href="#" 
                className='text-gray-600 hover:text-[#ff7373] transition-colors duration-300 font-medium relative group'
              >
                Learn More
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] group-hover:w-full transition-all duration-300'></span>
              </a>
            </li>
            <li>
              <Link to="/auth">
                <button className="relative group overflow-hidden rounded-full p-[2px] bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] hover:shadow-lg hover:shadow-[#ff7373]/30 transition-all duration-300">
                  <span className="block px-8 py-2.5 rounded-full bg-white text-gray-800 font-[Poppins] font-medium text-[15px] group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                    Login
                  </span>
                </button>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden relative w-10 h-10 rounded-full bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#ff7373]/30 transition-all duration-300'
          >
            {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute left-0 right-0 px-4 transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-2 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        }`}>
          <div className='bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 mt-4 overflow-hidden'>
            <ul className='py-4'>
              <li>
                <a 
                  href="#" 
                  className='block px-6 py-3 text-gray-600 hover:text-[#ff7373] hover:bg-pink-50 transition-colors duration-300 font-medium'
                  onClick={() => setIsOpen(false)}
                >
                  Learn More
                </a>
              </li>
              <li className='px-4 mt-2'>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <button className="w-full relative group overflow-hidden rounded-full p-[2px] bg-gradient-to-r from-[#ff7373] to-[#ff3c8a]">
                    <span className="block px-6 py-2.5 rounded-full bg-white text-gray-800 font-[Poppins] font-medium text-[15px] group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                      Login
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
