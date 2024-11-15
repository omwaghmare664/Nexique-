import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import BackHome from "../components/BackHome";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { backend_url } from "../contexts/StoredContext";

function Profile() {
  const backend_products_url =backend_url;
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  // Clear all localStorage and log out
  const logout = () => {
    axios
      .get(`${backend_products_url}/auth/logout`, { withCredentials: true })
      .then(() => {
        localStorage.clear(); // Clear all items from local storage
        window.location.href = "/auth"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Optionally, you can show an error message to the user
      });
  };

  // Check if user exists to avoid accessing undefined properties
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackHome />
      <div className="w-full h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="w-[60%] bg-white rounded shadow-lg shadow-[#0000001a] flex mt-10 flex-col items-center justify-start py-10">
          <div className="w-[90%] h-16 p-2 bg-red-100 border border-[#ff3d3d41] rounded-sm flex items-center justify-center gap-5 px-5">
            <span className="text-xl text-red-600">⚠</span>
            <span className="text-[14px] text-red-600 font-mono leading-tight">
              For Security and Privacy reasons, Address, Password are not
              visible, and Email cannot be changed once registered.
            </span>
          </div>
          <form className="flex flex-col items-center justify-center gap-3 mt-5 w-full h-full px-4">
            <div className="w-24 h-24 border shadow-lg shadow-[#0000001a] rounded-full overflow-hidden object-cover mb-5">
              {user.image ? (
                <img src={user.image} alt="User" className="w-full h-full" />
              ) : (
                <img
                  src={`${backend_products_url}${user.profilePicture}`}
                  alt="Profile"
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Name"
              className="w-[55%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all"
              value={user.name || ""}
              required
              readOnly
            />
            <input
              type="email"
              placeholder="Email"
              className="w-[55%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none bg-[#4e4e4e2c] text-[#4b4a4a] cursor-not-allowed transition-all"
              value={user.email || ""}
              disabled
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-[55%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all"
              required
            />
            <textarea
              placeholder="Update Address"
              className="w-[55%] h-20 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all resize-none p-2"
              required
            />
            <input
              type="submit"
              className="w-[55%] h-10 bg-[#1a1a1a] rounded-sm text-white font-thin hover:bg-[#131313] cursor-pointer transition-all"
              value="Update Changes"
            />
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <button
            onClick={logout}
            className="logout mt-5 cursor-pointer p-2 text-white bg-[#da0909] border border-[#ff3d3d41] rounded-sm flex items-center justify-center gap-5 px-5"
          >
            <IoIosLogOut />
            <h2>Logout</h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
