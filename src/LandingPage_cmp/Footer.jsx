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