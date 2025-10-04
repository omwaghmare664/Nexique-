import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='absolute top-0 left-0 z-50  w-full   flex items-center justify-between px-12 border-[#FECACA] border-b-2'>
      <div className='flex items-center justify-center gap-2  bg-red-200 m-3 rounded-full px-10'>
        <img className='w-[55px]  h-auto' src="/Nexique2.png" alt="" />
        <span className='font-[Poppins] font-bold text-2xl '>Nexique</span>
      </div>
      <ul className='flex items-center justify-center gap-6'>
        <li className='text-sm cursor-pointer border-b-[1px] border-[#b8029f59] '><a className="decoration-[#b8029f59]" href="#">Learn More</a></li>
        <Link to="/auth">
          <button className="py-2 px-8 rounded-full bg-[#f89a9a] text-white font-[Poppins] font-light text-[15px]">
            Login
          </button>
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
