import React from "react";
import { useNavigate } from "react-router-dom";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden">
      {/* 🟢 Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-8 md:px-16">
        <div className="w-full max-w-sm">
          {/* Title Section */}
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="HopeLates Logo"
              className="h-10 w-auto object-contain mx-auto mb-3"
            />
            <h2 className="text-[30px] font-bold text-gray-900 leading-snug mb-3">
              Join HopeLates <br /> And Make a Difference
            </h2>
            <p className="text-black/60 text-[14px]">
              Create your account and start helping communities today.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#019461] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#019461] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#019461] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#019461] focus:outline-none text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-3">
              <button
                type="submit"
                className="bg-[#019461] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#017b54] transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* 🟢 Login Redirect */}
          <div className="text-center mt-5 text-[14px] text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#019461] font-medium hover:underline"
            >
              Log in
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

export default SignUp;
