// File: FormNav.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import logo from "../../../images/Logo.png"; // keep your logo path

function FormNav() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/landing");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 font-sans transition-shadow duration-300 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"
      }`}
    >

      {/* Main Nav */}
      <nav className="relative flex items-center justify-between px-6 md:px-10 h-[62px] text-[15px]">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center select-none"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-15 w-auto object-contain hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-black items-center">
          {/* Keep Form link */}
          <Link
            to="/form"
            className="text-gray-700 hover:text-[#019461] font-medium transition-colors"
          >
            Form
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-[#019461] font-medium focus:outline-none"
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-800 text-2xl focus:outline-none"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[62px] left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 gap-4 animate-slideDown">
            <Link
              to="/form"
              className="text-[16px] w-full text-left font-medium text-black hover:text-[#019461]"
              onClick={() => setMenuOpen(false)}
            >
              Form
            </Link>

            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="text-[16px] w-full text-left font-medium text-black hover:text-[#019461]"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-[16px] w-full text-left font-medium text-black hover:text-[#019461]"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Slide Down Animation */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}

export default FormNav;
