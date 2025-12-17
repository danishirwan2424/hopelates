<<<<<<< HEAD
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import peopleImg from "../images/People3.jpg";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#EDEDED]">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <p className="text-[#019461] text-[13px] font-semibold tracking-wider mb-4">
            CONTACT US
          </p>
          <h1 className="text-[48px] font-bold text-gray-900 mb-6 leading-tight">
            Get in Touch With Us
          </h1>
          <p className="text-gray-600 text-[15px] max-w-3xl mx-auto leading-relaxed">
            Whether you'd like to volunteer, donate, or simply learn more about our mission, we'd love to hear from you. Let's make a difference together.
          </p>
        </div>
      </div>

      {/* Contact Content Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-[32px] font-bold text-gray-900 mb-6">
              Reach Out to Us
            </h2>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-8">
              Have a question or want to contribute? Contact our team and we'll respond as soon as possible.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#019461] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-[14px] font-medium">Address:</p>
                  <p className="text-gray-600 text-[14px]">123 Charity Street, Melaka, Malaysia</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#019461] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-[14px] font-medium">Phone:</p>
                  <p className="text-gray-600 text-[14px]">+60 12-345 6789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#019461] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-[14px] font-medium">Email:</p>
                  <p className="text-gray-600 text-[14px]">support@foodcharity.org</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#019461] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-[14px] font-medium">Hours:</p>
                  <p className="text-gray-600 text-[14px]">Mon-Fri, 9:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="mt-8">
              <img
                src={peopleImg}
                alt="Community volunteers helping families"
                className="w-full h-auto rounded-[12px] object-cover shadow-md"
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <div className="bg-white rounded-[12px] shadow-sm p-8">
              <h3 className="text-[24px] font-bold text-gray-900 mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 text-[13px] font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-gray-700 text-[13px] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 text-[13px] font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows="5"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#019461] text-white font-semibold text-[14px] py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
=======
import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";
import ContactImg from "../images/People3.jpg"; 
import Footer from "../LandingPage_cmp/Footer";
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.div
      className="bg-[#EDEDED] min-h-screen min-w-screen font-sans overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navigator />

      {/* 🟢 Hero Section */}
      <section className="pt-[150px] text-center px-6">
        <p className="text-[#019461] font-semibold tracking-wide uppercase">
          Contact Us
        </p>
        <h1 className="text-[48px] md:text-[54px] font-bold leading-tight text-gray-900 mt-2">
          Get in Touch With Us
        </h1>
        <p className="text-black/60 text-[16px] max-w-2xl mx-auto mt-4 leading-relaxed">
          Whether you’d like to volunteer, donate, or simply learn more about
          our mission, we’d love to hear from you. Let’s make a difference together.
        </p>
      </section>

      {/* 🟢 Contact Info + Form */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Contact Info */}
        <div className="space-y-8 text-left">
          <h2 className="text-[36px] font-bold text-gray-900">
            Reach Out to Us
          </h2>
          <p className="text-black/60 text-[16px] leading-relaxed">
            Have a question or want to contribute? Contact our team and we’ll
            respond as soon as possible.
          </p>

          <div className="space-y-4 text-[15px] text-black/70">
            <p>📍 <strong>Address:</strong> 123 Charity Street, Malacca, Malaysia</p>
            <p>📞 <strong>Phone:</strong> +60 12-345 6789</p>
            <p>✉️ <strong>Email:</strong> support@foodcharity.org</p>
            <p>🕒 <strong>Hours:</strong> Mon–Fri, 9:00 AM – 5:00 PM</p>
          </div>

          <img
            src={ContactImg}
            alt="Contact illustration"
            className="w-[500px] h-auto object-cover rounded-[20px] shadow-lg mt-8"
          />
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white rounded-[20px] shadow-lg p-10">
          <h3 className="text-[28px] font-semibold mb-6 text-gray-900 text-center">
            Send Us a Message
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out! We’ll get back to you soon.");
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-[12px] px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#019461] outline-none"
              />
            </div>

            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-[12px] px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#019461] outline-none"
              />
            </div>

            <div>
              <label className="block text-[15px] font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                required
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-[12px] px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#019461] outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#019461] text-white font-semibold text-[15px] px-6 py-3 rounded-[12px] shadow-md hover:bg-[#017c53] transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

export default Contact;
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
