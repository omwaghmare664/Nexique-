import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='absolute top-0 left-0 z-50 bg-white w-full py-4  flex items-center justify-between px-12 border-b-2'>
        <div className='flex items-center justify-center gap-2'>
            <img className='w-[65px]  h-auto' src="/Nexique2.png" alt="" />
            <span className='font-[Poppins] font-bold text-2xl'>Nexique</span>
        </div>
        <ul className='flex items-center justify-center gap-6'>
            <li className='text-sm cursor-pointer border-b-[1px] border-[#00000059] '><a className="decoration-black" href="#">Learn More</a></li>
            <Link to="/auth">
  <button className="py-2 px-8 rounded-full bg-[#0F0F0F] text-white font-[Poppins] font-light text-[15px]">
    Login
  </button>
</Link>
        </ul>
    </div>
  )
}

export default Navbar
