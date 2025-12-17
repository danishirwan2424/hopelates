<<<<<<< HEAD
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-4">HopeLates</h3>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Empowering communities through compassion and innovation.
              Together, we can build a better tomorrow for everyone in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-emerald-400 inline-block pb-1">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Donations</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-emerald-400 inline-block pb-1">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> hopelates@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +60 12-345 6789
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Malacca, Malaysia
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-emerald-400 inline-block pb-1">
              Follow Us
            </h4>
            <p className="text-sm text-emerald-100 mb-4">
              Stay connected and be part of our journey.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 transition"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 transition"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 transition"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-emerald-600 pt-6 text-center text-xs text-emerald-200">
          <p>© 2025 <span className="font-semibold text-white">HopeLates</span>. All Rights Reserved.</p>
          <p className="mt-1">Designed & Developed with <span className="text-pink-300">♥</span> by the HopeLates Team</p>
        </div>
      </div>
    </footer>
  );
}
=======
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
    <footer className="bg-[#018C60] text-white font-inter mt-0">
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
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
