import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { backend_url } from "../contexts/StoredContext";

import MiniLoader from "./MiniLoader";

function SignUp({ state, setState, onSuccessfulSignup }) {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext); // Accessing UserContext
  const navigate = useNavigate(); // Hook for navigation

  // Handling avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  // Triggering file input click
  const handleAvatarClick = () => {
    const fileInput = document.getElementById("avatarInput");
    fileInput.click();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Create FormData to include the image and other fields
    const formData = new FormData();
    formData.append("profilePicture", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);

    setLoading(true); // Enable loading state
    try {
      // Making the POST request to backend signup route
      const response = await axios.post(`${backend_url}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      setLoading(true); // Enable loading state
      
      if (response.data.success) {
        setLoading(false); // Disable loading state
        setUser(response.data.user); // Save user data to context
        onSuccessfulSignup()
        window.location.reload();
      } else {
        setLoading(false); // Disable loading state
        setError(response.data.message); // Display error from backend
      }
      
    } catch (error) {
      setLoading(false); // Disable loading state
      if (error.response) {
        setError(error.response.data.message); // Show server error
      } else {
        setError("Signup error, please try again."); // Handle generic error
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false); // Disable loading
    }
  };

  // Clean up URL for avatar on component unmount
  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(URL.createObjectURL(avatar));
      }
    };
  }, [avatar]);

  return (
    <div className="auth_signup w-[350px] sm:w-[400px] py-5 bg-white rounded-lg gap-5 shadow-lg p-3 shadow-[#0000001a]">
      <div className="w-full h-16 border-b-2 border-[#00000086] flex items-center justify-center">
        <h2 className="text-2xl font-bold">Create your Account</h2>
      </div>
      <form className="flex flex-col items-center justify-center gap-3 mt-5" onSubmit={handleSignUp}>
        <div className="w-full h-20 flex items-center justify-center flex-col">
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Avatar Preview"
              className="w-16 h-16 rounded-full relative"
              onClick={handleAvatarClick}
              title="Click to add profile picture"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Default Avatar"
              className="w-16 h-16 rounded-full relative"
              onClick={handleAvatarClick}
            />
          )}
          <input type="file" id="avatarInput" onChange={handleAvatarChange} className="hidden" />
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[90%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[90%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[90%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all"
          required
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-[90%] h-20 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all resize-none p-2"
          required
        />
        <div className="w-[90%] bg-[#1a1a1a] h-10 flex items-center justify-center ">
        <input
          type="submit"
          className=" text-white font-thin cursor-pointer w-full h-full rounded-sm"
          value="Sign Up"
        />
        {loading && <MiniLoader />} {/* Display loader if loading state is true */}
        </div>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      </form>
      <p className="w-full py-2 flex items-center justify-center text-[#00000086]">
        Already have an account?{" "}
        <span
          className="text-[#664df1] font-thin cursor-pointer"
          onClick={() => setState("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default SignUp;
