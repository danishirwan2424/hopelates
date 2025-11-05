import React from "react";
import { useNavigate } from "react-router-dom";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden">
      {/* 🟢 Left Side - Form Section (50%) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-8 md:px-16">
        <div className="w-full max-w-sm text-center">
          {/* Logo and Title */}
          <img
            src={logo}
            alt="HopeLates Logo"
            className="h-10 w-auto object-contain mx-auto mb-4"
          />
          <h2 className="text-[30px] font-bold text-gray-900 leading-snug mb-3">
            Start Your Charity <br /> Journey Here
          </h2>
          <p className="text-black/60 text-[14px] mb-8">
            Welcome back! Please log in to continue making an impact.
          </p>

          {/* Form */}
          <form className="space-y-4 text-left">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#019461] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#019461] focus:outline-none"
              />
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

          {/* 🟢 Signup Redirect */}
          <div className="text-center mt-5 text-[14px] text-gray-700">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signp")}
              className="text-[#019461] font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Right Side - Image Section (50%) */}
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
