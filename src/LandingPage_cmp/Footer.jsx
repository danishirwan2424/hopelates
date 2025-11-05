import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#018C60] text-white font-inter mt-28">
      {/* 🔹 Upper Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/20">
        {/* 🌿 Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-semibold tracking-wide">HopeLates</h2>
          </div>
          <p className="text-white/85 leading-relaxed text-[15px]">
            Empowering communities through compassion and innovation. Together,
            we can build a better tomorrow for everyone in need.
          </p>
        </div>

        {/* ⚡ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-white after:mt-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-white/80">
            {[
              { label: "Home", href: "/landing" },
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Donations", href: "/donations" },
              { label: "Contact", href: "/contact" },
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="relative group hover:text-white transition-all duration-200"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ☎ Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-white after:mt-2">
            Contact Us
          </h3>
          <ul className="space-y-3 text-white/85 text-[15px]">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-white/90" /> hopelates@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-white/90" /> +60 12-345 6789
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-[3px] text-white/90" />
              <span>Malacca, Malaysia</span>
            </li>
          </ul>
        </div>

        {/* 🌍 Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-white after:mt-2">
            Follow Us
          </h3>
          <p className="text-white/85 text-[15px] mb-4">
            Stay connected and be part of our journey.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, url: "https://facebook.com" },
              { icon: <FaInstagram />, url: "https://instagram.com" },
              { icon: <FaTwitter />, url: "https://twitter.com" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social Media"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white hover:text-[#018C60] transition-all duration-300 transform hover:-translate-y-1 shadow-md"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Footer Section */}
      <div className="text-center py-6 text-sm text-white/70 tracking-wide">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">HopeLates</span>. All Rights Reserved.
        </p>
        <p className="mt-1 text-white/60 text-[13px]">
          Designed & Developed with ❤️ by the HopeLates Team
        </p>
      </div>
    </footer>
  );
}

export default Footer;
