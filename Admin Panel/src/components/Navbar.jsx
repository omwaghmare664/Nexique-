import React from "react";
import { FaHome } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className=" z-50 bg-white w-full  flex items-center justify-between px-12 border-b-2">
        <div className="flex items-center justify-center gap-2">
          <img className="w-[65px] h-auto" src="/Nexique2.png" alt="Logo" />
          <span className="font-[Poppins] font-bold text-2xl">Admin Panel</span>
        </div>
        <ul className="flex items-center justify-center gap-7 mr-10  h-full">
          <Link to="/">
            <div className="h-[65px] w-[60px] bg-[#2b2b2b00] hover:bg-[#2b2b2b6b] flex items-center justify-center">
              <FaHome className="text-2xl " title="Home" />
            </div>
          </Link>
          <Link to="/orders">
            <div className="h-[65px] w-[60px] bg-[#2b2b2b00] hover:bg-[#2b2b2b6b] flex items-center justify-center">
              <FaBox className="text-xl " title="Orders" />
            </div>
          </Link>
          <Link to="/products">
            <div className="h-[65px] w-[60px] bg-[#2b2b2b00] hover:bg-[#2b2b2b6b] flex items-center justify-center">
              <MdAddBusiness
                className="text-2xl "
                title="Products"
              />
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
