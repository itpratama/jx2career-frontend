import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Logo from "../../../Assets/img/PratamaLogowhite.png";
import Background from "../../../Assets/img/Nike5.mov";

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to the backend API
      const response = await axios.post('http://localhost:4005/loginAdmin', {
        username,
        password,
      });

      console.log(response.data);

      // If login is successful, save token and user data
      const { user, token } = response.data;
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
      localStorage.setItem('usernameJX2CareerAdmin', user.username); // Save username

      navigate("/AccountList");
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <div className="bg-gray-200">
        <div className="flex justify-center items-center h-screen">
          {/* Video Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
            >
              <source src={Background} type="video/mp4" />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-10"></div>
          </div>

          {/* Centered Form */}
          <div className="relative z-10 flex items-center w-full max-w-xl px-8 mx-auto">
            <div className="bg-black bg-opacity-30 rounded-lg shadow-lg p-10 w-full">
              <div className="text-center mb-8">
                <img
                  className="mx-auto"
                  src={Logo}
                  alt="Your Company"
                />
              </div>

              <form onSubmit={handleLogin}>
                {/* Username */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm text-gray-100 font-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="block w-full px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-100 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
