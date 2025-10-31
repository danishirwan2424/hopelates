import React from "react";
import { useNavigate } from "react-router-dom";

function Navigator() {
  const navigate = useNavigate();

  return (
    <nav
      className="fixed top-0 left-0 w-full flex items-center justify-between px-10 shadow-md bg-white z-50 h-[62px] font-[Istok_Web] text-[15px]"
    >
      {/* Left Section — Logo / Name */}
      <h1
        className="text-black font-semibold cursor-pointer"
        onClick={() => navigate("/landing")}
      >
        Logo
      </h1>

      {/* Center Section — Navigation Links */}
      <div className="flex gap-6 text-black">
        {["Home", "Users", "About"].map((label, index) => {
          const paths = ["/landing", "/users", "/about"];
          return (
            <button
              key={index}
              onClick={() => navigate(paths[index])}
              className="text-black bg-transparent border-0 focus:outline-none hover:bg-transparent active:bg-transparent cursor-pointer"
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Right Section — Donor Actions */}
      <div className="flex items-center gap-4">
        <span
          className="text-black cursor-pointer select-none"
          onClick={() => navigate("/donor")}
        >
          Become A Donor
        </span>
        <button
          onClick={() => navigate("/donate")}
          className="px-5 py-2 rounded-md text-white bg-[#019461] hover:opacity-90 transition-opacity duration-200"
        >
          Donate Now
        </button>
      </div>
    </nav>
  );
}

export default Navigator;
