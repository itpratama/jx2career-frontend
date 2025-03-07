import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Logo from "../../../Assets/img/PratamaLogo.png";

const Login = () => {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Hanya angka
    if (value.length > 16) {
      value = value.slice(0, 16); // Batasi hanya 16 karakter
    }
    setNik(value);
    setShowMessage(value.length > 0 && value.length !== 16);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://153.92.5.18:4005/login', {
        nik,
        password,
      });

      const { user, token } = response.data;
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
      localStorage.setItem('nikJX2Career', user.id);

      // Using navigate instead of window.location.href
      navigate("/");
    } catch (err) {
      setError('Invalid NIK or password');
    }
  };

  // Conditional background class based on device
  const backgroundClass = isMobile
    ? "bg-gradient-to-br from-orange-200/70 via-orange-100/60 to-orange-50/50"
    : "bg-gradient-to-br from-orange-300 via-orange-200 to-orange-100";

  return (
    <div className={`min-h-screen flex items-center justify-center ${backgroundClass} px-4 sm:px-6 lg:px-8`}>
      {/* Login Form Container - Card for desktop, no card for mobile */}
      <div className={`relative z-10 w-full ${isMobile ? 'max-w-full p-6' : 'max-w-xl bg-white p-12 rounded-xl shadow-lg border border-orange-100'}`}>
        <div className="text-center mb-8">
          <img className="mx-auto h-24 w-60" src={Logo} alt="Your Company" />
          <h2 className={`mt-4 ${isMobile ? 'text-gray-800' : 'text-gray-800'} text-2xl font-bold`}>Sign in to your account</h2>
          <p className="mt-2 text-orange-500 text-sm">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* NIK Input */}
          <div>
            <label
              htmlFor="nik"
              className={`block text-sm font-medium ${isMobile ? "text-gray-700" : "text-gray-700"}`}
            >
              NIK
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="nik"
                value={nik}
                onChange={handleChange}
                placeholder="Enter your NIK"
                className="block w-full rounded-md bg-white border border-orange-200 text-gray-900 py-3 px-4 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                maxLength={16} // Batasi input di level HTML juga
                required
              />
            </div>
            {showMessage && (
              <p className="text-red-500 text-xs mt-1">NIK harus 16 angka</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${isMobile ? 'text-gray-700' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full rounded-md bg-white border border-orange-200 text-gray-900 py-3 px-4 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center bg-white px-2 py-1 rounded">{error}</p>}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-4 rounded-md hover:from-orange-500 hover:to-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-200 font-medium"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className={`mt-8 text-center text-sm ${isMobile ? 'text-gray-700' : 'text-gray-600'}`}>
          Not a member?{' '}
          <a onClick={() => navigate("/RegistForm")} className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer transition-all duration-200">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;