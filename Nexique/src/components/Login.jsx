import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { backend_url } from "../contexts/StoredContext";
import MiniLoader from "./MiniLoader";

function Login({ state, setState, infoMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // If user is navigated from Signup.jsx then Sate error to 'Login your email and password'

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backend_url}/auth/login`, {
        email,
        password,
      });
      setLoading(false);
      setUser(response.data.user); // Save user data to context
      navigate("/"); // Navigate to home page
    } catch (error) {
      setError(error.response ? error.response.data.message : "Login failed");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth_login w-[350px] sm:w-full max-w-sm py-3 bg-white rounded-lg gap-5 shadow-lg p-2 shadow-[#0000001a] mx-auto">
      {/* Header */}
      <div className="w-full h-16 border-b-2 border-[#00000086] flex items-center justify-center">
        <h2 className="text-xl md:text-2xl font-bold">Login</h2>
      </div>

      {/* Form */}
      <form
        className="flex flex-col items-center justify-center gap-4 mt-5"
        onSubmit={handleLogin}
      >
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-[90%] h-12 border-[1px] border-[#00000086] rounded-md px-3 outline-none focus:border-[#1a1a1aec] transition-all"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-[90%] h-12 border-[1px] border-[#00000086] rounded-md px-3 outline-none focus:border-[#1a1a1aec] transition-all"
          required
        />

        {/* Submit Button */}
        <div className="w-[90%] bg-[#1a1a1a] h-10 flex items-center justify-center ">
        <input
          type="submit"
          className=" text-white font-thin cursor-pointer w-full h-full rounded-sm"
          value="Login"
        />
        {loading && <MiniLoader />} {/* Display loader if loading state is true */}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Info Message */}
        {infoMessage && <p className="text-green-500 text-sm">{infoMessage}</p>}
      </form>

      {/* Signup Link */}
      <p className="w-full py-2 text-center text-sm text-[#00000086]">
        Don't have an account?{" "}
        <span
          className="text-[#664df1] font-medium cursor-pointer hover:underline"
          onClick={() => setState("signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
