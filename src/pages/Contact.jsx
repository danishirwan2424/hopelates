import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";
import ContactImg from "../images/People3.jpg"; 
import Footer from "../LandingPage_cmp/Footer";

function Contact() {
  return (
    <div className="bg-[#EDEDED] min-h-screen font-sans overflow-x-hidden">
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

      {/* 🟢 Call to Action */}
      <section className="bg-[#019461] text-white py-20 px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-[38px] font-bold">Let’s Build a Kinder World</h2>
          <p className="text-white/80 text-[15px] leading-relaxed max-w-2xl mx-auto">
            Have an idea to help your community? We’re open to partnerships,
            collaborations, and volunteer efforts that spread hope.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-[#019461] font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            Get Involved
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
