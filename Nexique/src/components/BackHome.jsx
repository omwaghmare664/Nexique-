import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function BackHome() {
  return (
    <div className=" bg-white w-full h-12 border-b-[1px] flex justify-between items-center px-12 gap-3">
        <Link to="/">
          <div className="flex justify-start items-center px-12 gap-3 cursor-pointer group">
            <IoArrowBack className="text-2xl transition-transform duration-300 transform group-hover:-translate-x-[-5px]" />
            <span>Back</span>
          </div>
        </Link>
      </div>
  )
}

export default BackHome
