import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.jpg";
import peopleImg2 from "../images/People2.jpg";
import humanityImg1 from "../images/Humanity1.png";
import humanityImg2 from "../images/Humanity2.png";
import humanityImg3 from "../images/Humanity3.png";

// ✅ Reusable Hero Section
function HeroSection({ bgImage, subtitle, title, desc, buttonText, onClick }) {
  return (
    <div
      className="relative min-h-[500px] md:min-h-[700px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-white text-[15px] md:text-[16px] font-semibold tracking-wide">
            {subtitle}
          </p>
          <h1 className="text-white font-bold leading-tight text-4xl md:text-[54px]">
            {title}
          </h1>
          <p className="text-white text-[14px] md:text-[15px] leading-relaxed">
            {desc}
          </p>
          <button
            onClick={onClick}
            aria-label={buttonText}
            className="bg-[#019461] text-white font-semibold text-[15px] md:text-[16px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] hover:scale-105 transition-all duration-200"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable Info Card with fade-in animation
function InfoCard({ img, title, desc, custom }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: custom * 0.2 }}
    >
      <img src={img} alt={`${title} icon`} className="w-32 h-32 md:w-40 md:h-40 object-contain" />
      <div className="text-center md:text-left">
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-900 uppercase">{title}</h3>
        <p className="text-black/50 text-[13px] md:text-[14px] leading-snug">{desc}</p>
      </div>
    </motion.div>
  );
}

function Landing() {
  const navigate = useNavigate();

  const handleDonateClick = () => navigate("/login");
  const handleApplyClick = () => navigate("/login");

  const infoArray = [
    {
      img: humanityImg1,
      title: "EMPOWER COMMUNITIES",
      desc: "We build stronger bonds by ensuring no one in our community goes to bed hungry.",
    },
    {
      img: humanityImg2,
      title: "DELIVER NOURISHMENT",
      desc: "We organize and distribute essential food supplies directly to families in need.",
    },
    {
      img: humanityImg3,
      title: "SHARE COMPASSION",
      desc: "Your generosity provides more than just food; it provides hope and dignity.",
    },
  ];

  return (
    <motion.div
      className="bg-[#EDEDED] min-h-screen min-w-screen font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navigator />

      {/* Hero Section */}
      <HeroSection
        bgImage={peopleImg}
        subtitle="ALWAYS DONATE FOR HUMANITY"
        title="Lend a Helping Hand to Those in Need"
        desc="A donation of RM20 allows us to distribute complete food care packages, ensuring that nutritious meals reach the most vulnerable members of our community."
        buttonText="Donate Now"
        onClick={handleDonateClick}
      />

      {/* Info Section */}
      <div className="py-12 bg-white flex justify-center px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {infoArray.map((item, index) => (
            <InfoCard key={index} {...item} custom={index} />
          ))}
        </div>
      </div>

      {/* Apply Section */}
      <HeroSection
        bgImage={peopleImg2}
        subtitle="AN INITIATIVE TO HELP THOSE IN NEED"
        title="Helping Each Other Can Make World Better"
        desc="Fill in the information and submit it to us. We will review your request and provide the food within 7 days."
        buttonText="Apply Now"
        onClick={handleApplyClick}
      />
    </motion.div>
  );
}

export default Landing;
