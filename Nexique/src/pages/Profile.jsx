import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import BackHome from "../components/BackHome";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { backend_url } from "../contexts/StoredContext";
import Loader from "../components/Loader";
import ErrorServer from "../components/ErrorServer";

function Profile() {
  const backend_products_url = backend_url;
  const { user, setUser } = useContext(UserContext); // Ensure `setUser` is available in context
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch user details in real-time
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${backend_products_url}/auth/user/${user._id}`,
          { withCredentials: true }
        ); // Fetch user details from backend
        setUser(response.data.user); // Update user context
      } catch (err) {
        setError("Failed to load user information: " + err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, [backend_products_url, setUser]);

  // Clear all localStorage and log out
  const logout = () => {
    axios
      .get(`${backend_products_url}/auth/logout`, { withCredentials: true })
      .then(() => {
        setUser(null); // Clear user context
        window.location.href = "/getstarted"; // Redirect to login page
      })
      .catch((error) => {
        setError("Logout failed: " + error.message);
      });
  };

  if (loading)
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center gap-10">
        <Loader />
        <h2>Loading...</h2>
      </div>
    ); // Loading state
  if (error)
    return <ErrorServer error={error} />; // Error state

  return (
    <div className="w-full h-screen bg-white lg:bg-[#F3F4F6] flex items-center justify-center">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] bg-white rounded lg:shadow-lg lg:shadow-[#0000001a] flex mt-10 flex-col items-center justify-start py-10 px-5">
        {/* Profile Form */}
        <form className="flex flex-col items-center justify-center gap-3 mt-5 w-full h-full">
          <div className="w-24 h-24 border shadow-lg shadow-[#0000001a] rounded-full overflow-hidden object-cover mb-5">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="User" className="w-full h-full" />
            ) : (
              <img src="/default-profile.png" alt="Default Profile" className="w-full h-full" />
            )}
          </div>
          <input
            type="text"
            placeholder="Name"
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[55%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all"
            value={user?.name || ""}
            readOnly
          />
          <input
            type="email"
            placeholder="Email"
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[55%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none bg-[#4e4e4e2c] text-[#4b4a4a] cursor-not-allowed transition-all"
            value={user?.email || ""}
            readOnly
          />
          
          <textarea
            placeholder="Update Address"
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[55%] h-20 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all resize-none p-2"
            spellCheck="false"
            value={user?.address || ""}
          />
          <input
            type="submit"
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[55%] h-10 bg-[#474747] rounded-sm text-white font-thin hover:bg-[#474747] cursor-pointer pointer-events-none transition-all"
            value="Update Changes"
          />
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="logout mt-5 cursor-pointer p-2 text-white bg-[#da0909] border border-[#ff3d3d41] rounded-sm flex items-center justify-center gap-5 px-5"
        >
          <IoIosLogOut />
          <h2>Logout</h2>
        </button>
      </div>
    </div>
  );
}

export default Profile;
