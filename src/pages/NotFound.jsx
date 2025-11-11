import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/Logo2.png"; // ✅ Adjust path if needed

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-green-100 font-sans">
      {/* 🟢 Logo */}
      <img
        src={logo}
        alt="HopeLates Logo"
        className="h-12 w-auto mb-6 drop-shadow-md"
      />

      {/* 🧱 Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-[90%]">
        {/* Title */}
        <h1 className="text-[90px] font-extrabold text-[#019461] leading-none mb-2">
          404
        </h1>
        <h2 className="text-[24px] font-semibold text-gray-800 mb-3">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
          The page you’re looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-[#019461] text-white px-8 py-3 rounded-lg text-[15px] font-medium         shadow-md hover:bg-[#017b54] transition-all duration-300 hover:shadow-lg"
        >
          Go Back
        </button>

      </div>

      {/* Decorative Text */}
      <p className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} HopeLates. All rights reserved.
      </p>
    </div>
  );
}

export default NotFound;
