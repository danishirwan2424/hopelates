import React from "react";
import { useNavigate } from "react-router-dom";
import peopleImg from "../images/People3.jpg";

function AboutUs() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-[#EDEDED]">
      {/* Hero Section - Together we change the world */}
      <div className="bg-[#E8F0ED] py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left - Text Content */}
            <div className="md:w-1/2 space-y-6">
              <p className="text-[#019461] text-[13px] font-semibold tracking-wider uppercase">
                About Us
              </p>
              <h1 className="text-[48px] font-bold text-gray-900 leading-tight">
                Together we change<br />the world
              </h1>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Every small action contributes to a larger mission. Our mission is to bring people together to create lasting, positive change for our communities and beyond.
              </p>
              <button 
                onClick={handleContactClick}
                className="bg-[#019461] text-white font-semibold text-[14px] px-8 py-3 rounded-[8px] hover:bg-[#017a54] transition-all duration-200"
              >
                Contact Now
              </button>
            </div>

            {/* Right - Image */}
            <div className="md:w-1/2">
              <div className="w-full h-[400px] overflow-hidden rounded-[16px] shadow-lg">
                <img
                  src={peopleImg}
                  alt="Community volunteers helping families"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-[36px] font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            We aim to empower communities, uplift those in need, and promote unity through compassion and shared purpose. Together, we build a future where kindness drives progress and every voice is heard.
          </p>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="bg-[#EDEDED] py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-[36px] font-bold text-gray-900 text-center mb-12">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Empower Communities */}
            <div className="bg-white rounded-[12px] shadow-sm p-8 hover:shadow-md transition-shadow">
              <h3 className="text-[20px] font-bold text-[#019461] mb-4">
                Empower Communities
              </h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                We support communities through education, resources, and volunteerism programs that build resilience and lasting change.
              </p>
            </div>

            {/* Card 2 - Inspire Action */}
            <div className="bg-white rounded-[12px] shadow-sm p-8 hover:shadow-md transition-shadow">
              <h3 className="text-[20px] font-bold text-[#019461] mb-4">
                Inspire Action
              </h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                We motivate individuals to take part in meaningful initiatives that promote compassion, sustainability, and positive impact.
              </p>
            </div>

            {/* Card 3 - Create Change */}
            <div className="bg-white rounded-[12px] shadow-sm p-8 hover:shadow-md transition-shadow">
              <h3 className="text-[20px] font-bold text-[#019461] mb-4">
                Create Change
              </h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                Through collective efforts, we address challenges and foster growth, because real change begins with people like you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;