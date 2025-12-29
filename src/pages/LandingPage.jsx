import React from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.jpg";
import humanityImg1 from "../images/Humanity1.png"; 
import humanityImg2 from "../images/Humanity2.png"; 
import humanityImg3 from "../images/Humanity3.png"; 
import peopleImg2 from "../images/People2.jpg"; 

function Landing() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donations");
  };

  const handleApplyClick = () => {
    navigate("/application");
  };

  return (
    <div className="bg-[#EDEDED] min-h-screen min-w-screen font-sans">
      <Navigator />

      {/* ✅ Hero Section */}
      <div 
        className="relative pt-[99px] min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${peopleImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-12 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/80 text-[15px] font-semibold tracking-wide">
              ALWAYS DONATE FOR HUMANITY
            </p>

            <h1 className="text-[54px] font-bold leading-tight text-white">
              Lend a Helping Hand to Those in Need
            </h1>

            <p className="text-white/90 text-[16px] leading-relaxed">
              A donation of RM20 allows us to distribute complete food care packages, ensuring that nutritious meals reach the most vulnerable members of our community
            </p>

            <button
              onClick={handleDonateClick}
              className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-lg hover:bg-[#017a54] hover:scale-105 transition-all duration-200"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Info Section */}
      <div className="h-[254px] bg-white flex items-center justify-center px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {[
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
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <img
                src={item.img}
                alt="Humanity icon"
                className="w-40 h-40 object-contain"
              />
              <div>
                <h3 className="text-[18px] font-semibold text-gray-900 uppercase">
                  {item.title}
                </h3>
                <p className="text-black/50 text-[14px] leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Apply Section */}
      <div 
        className="relative min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${peopleImg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-12 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/80 text-[15px] font-semibold tracking-wide">
              AN INITIATIVE TO HELP THOSE IN NEEDS
            </p>

            <h2 className="text-[54px] font-bold leading-tight text-white">
              APPLY FOR FOOD AND FILL IN THE INFORMATION
            </h2>

            <p className="text-white/90 text-[16px] leading-relaxed">
              FILL THE INFORMATION AND SENT TO US AND WE WILL CHECK AND PROVIDES FOOD WITHIN 7 DAYS
            </p>

            <button
              onClick={handleApplyClick}
              className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-lg hover:bg-[#017a54] hover:scale-105 transition-all duration-200"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
