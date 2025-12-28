import React from "react";
import { useNavigate } from "react-router-dom";
import peopleImg from "../images/People3.jpg";
import peopleImg2 from "../images/People2.jpg";

function AboutUs() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-[#EDEDED]">
      {/* Hero Section - Full Banner with Overlay */}
      <div 
        className="relative pt-[99px] min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${peopleImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-12 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/80 text-[18px] font-semibold tracking-wide uppercase">
              ABOUT US
            </p>

            <h1 className="text-[54px] font-bold leading-tight text-white">
              Together we change the world
            </h1>

            <p className="text-white/90 text-[16px] leading-relaxed">
              Every small action contributes to a larger mission. Our mission is to bring people together to create lasting, positive change for our communities and beyond.
            </p>

            <button 
              onClick={handleContactClick}
              className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-lg hover:bg-[#017a54] hover:scale-105 transition-all duration-200"
            >
              Contact Now
            </button>
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

      {/* What We Do Section - Full Banner with Overlay */}
      <div 
        className="relative min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${peopleImg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-12 py-16">
          <h2 className="text-[36px] font-bold text-white text-center mb-12">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Empower Communities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[12px] shadow-lg p-8 hover:bg-white hover:shadow-xl transition-all">
              <h3 className="text-[20px] font-bold text-[#019461] mb-4">
                Empower Communities
              </h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                We support communities through education, resources, and volunteerism programs that build resilience and lasting change.
              </p>
            </div>

            {/* Card 2 - Inspire Action */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[12px] shadow-lg p-8 hover:bg-white hover:shadow-xl transition-all">
              <h3 className="text-[20px] font-bold text-[#019461] mb-4">
                Inspire Action
              </h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                We motivate individuals to take part in meaningful initiatives that promote compassion, sustainability, and positive impact.
              </p>
            </div>

            {/* Card 3 - Create Change */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[12px] shadow-lg p-8 hover:bg-white hover:shadow-xl transition-all">
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