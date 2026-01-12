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