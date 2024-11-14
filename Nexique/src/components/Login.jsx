import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { backend_url } from '../contexts/StoredContext';


function Login({ state, setState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backend_url}/auth/login`, { email, password });
      setUser(response.data.user); // Save user data to context
      navigate("/"); // Navigate to home page
    } catch (error) {
      setError(error.response ? error.response.data.message : "Login failed");
    }
  };
  return (
    <div className='auth_login w-[400px] py-5 bg-white rounded-lg gap-5 shadow-lg p-3 shadow-[#0000001a]'>
      <div className='w-full h-16 border-b-2 border-[#00000086] flex items-center justify-center'>
        <h2 className='text-2xl font-bold'>Login</h2>
      </div>
      <form className='flex flex-col items-center justify-center gap-3 mt-5' onSubmit={handleLogin}>
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-[90%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all'
          required
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-[90%] h-10 border-[1px] border-[#00000086] rounded-sm px-3 outline-none focus:border-[#1a1a1aec] transition-all'
          required
        />
        <input
          type='submit'
          className='w-[90%] h-10 bg-[#1a1a1a] rounded-sm text-white font-thin hover:bg-[#131313]'
          value="Login"
        />
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      </form>
      <p className='w-full py-2 flex items-center justify-center text-[#00000086]'>
        Don't have an account?{" "}
        <span className='text-[#664df1] font-thin cursor-pointer' onClick={() => setState('signup')}>
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
