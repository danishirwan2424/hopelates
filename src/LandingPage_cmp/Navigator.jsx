import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaBars, FaTimes } from "react-icons/fa";
import donorIcon from "../images/donoricon.jpeg";
import logo from "../images/Logo.png";

function Navigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/landing" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Donations", path: "/donations" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 font-sans transition-shadow duration-300 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"
      }`}
    >
      {/* 🔹 Top Info Bar */}
      <div className="h-[37px] bg-white flex items-center justify-between px-6 md:px-10 text-sm text-gray-700">
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[#019461] transition-colors duration-200"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[#019461] transition-colors duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-[#019461] transition-colors duration-200"
          >
            <FaTwitter />
          </a>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-gray-800">
          <span>📍 Malacca, Malaysia</span>
          <span>|</span>
          <span>☎ +60 12-345 6789</span>
        </div>
      </div>

      {/* 🔹 Main Nav */}
      <nav className="relative flex items-center justify-between px-6 md:px-10 h-[62px] text-[15px]">
        {/* Logo */}
        <div
          onClick={() => navigate("/landing")}
          className="cursor-pointer flex items-center select-none"
        >
          <img
            src={logo}
            alt="Website Logo"
            className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 text-black">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <span
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`cursor-pointer font-medium relative group transition-all duration-200 ${
                  isActive ? "text-[#019461]" : "text-black hover:text-[#019461]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#019461] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </span>
            );
          })}
        </div>

        {/* Donor Section */}
        <div className="hidden md:flex items-center gap-3">
          <img
            src={donorIcon}
            alt="Donor Icon"
            className="w-10 h-10 object-cover rounded-full shadow-sm"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm text-gray-500">Join us now</span>
            <span
              onClick={() => navigate("/donor")}
              className="text-black font-medium cursor-pointer hover:text-[#019461] transition-colors duration-200"
            >
              Become A Donor
            </span>
          </div>
          <button
            onClick={() => navigate("/donate")}
            className="px-5 py-2 rounded-md text-white bg-[#019461] hover:bg-[#017a54] transition-colors duration-200 font-medium"
          >
            Donate Now
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-800 text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[62px] left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 gap-4 animate-slideDown">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  className={`text-[16px] w-full text-left font-medium transition-colors duration-200 ${
                    isActive ? "text-[#019461]" : "text-black hover:text-[#019461]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                navigate("/donate");
                setMenuOpen(false);
              }}
              className="mt-3 w-full px-5 py-2 rounded-md text-white bg-[#019461] hover:bg-[#017a54] font-medium"
            >
              Donate Now
            </button>
          </div>
        )}
      </nav>

      {/* 🔹 Animations */}
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

export default Navigator;
