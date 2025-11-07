import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";
import '../../index.css';


function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden bg-white">
      {/* 🟢 Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <div className="w-full max-w-sm text-center">
          {/* Logo and Title */}
          <img
            src={logo}
            alt="HopeLates Logo"
            className="h-10 w-auto object-contain mx-auto mb-4"
          />
          <h2 className="text-[30px] font-bold text-gray-800 leading-snug mb-3">
            Start Your Charity <br /> Journey Here
          </h2>
          <p className="text-gray-500 text-[14px] mb-8">
            Welcome back! Please log in to continue making an impact.
          </p>

          {/* Form */}
          <form className="space-y-4 text-left">
            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#019461] focus:outline-none"
              />
            </div>

            {/* Password with eye icon */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#019461] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-3">
              <button
                type="submit"
                className="bg-[#019461] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#017b54] transition-colors duration-200"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/landing")}
                className="border border-[#019461] text-[#019461] py-2.5 rounded-lg text-sm font-medium hover:bg-[#019461] hover:text-white transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
          </form>

          {/* Signup Redirect */}
          <div className="text-center mt-5 text-[14px] text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signUp")}
              className="text-[#019461] font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Right Side - Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 h-full">
        <img
          src={leaves}
          alt="Charity theme background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
