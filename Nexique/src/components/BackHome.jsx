import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function BackHome() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className=" bg-white w-full h-12 border-b-[1px] flex justify-between items-center px-12 gap-3">
       
          <div onClick={handleBack} className="flex justify-start items-center px-12 gap-3 cursor-pointer group">
            <IoArrowBack className="text-2xl transition-transform duration-300 transform group-hover:-translate-x-[-5px]" />
            <span>Back</span>
          </div>
      </div>
  )
}

export default BackHome
