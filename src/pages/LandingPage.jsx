import React from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom"; // 👈 Import navigation hook
import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.png";
import humanityImg1 from "../images/Humanity1.png"; 
import humanityImg2 from "../images/Humanity2.png"; 
import humanityImg3 from "../images/Humanity3.png"; 
import peopleImg2 from "../images/People2.png"; 
=======
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.png";
import humanityImg1 from "../images/Humanity1.png";
import humanityImg2 from "../images/Humanity2.png";
import humanityImg3 from "../images/Humanity3.png";
import peopleImg2 from "../images/People2.png";
import packA from "../images/PackA.png";
import packB from "../images/PackB.png";
import packC from "../images/PackC.png";
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c

function Landing() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
<<<<<<< HEAD
    navigate("/donations"); // 👈 Redirect to login page
  };

  const handleApplyClick = () => {
    navigate("/application"); // 👈 Redirect to login page
  };

  return (
    <div className="bg-[#EDEDED] min-h-screen min-w-screen font-sans">
      <Navigator />

      {/* ✅ Hero Section */}
      <div className="pt-[150px] flex flex-col md:flex-row items-center justify-between px-12 py-16 max-w-7xl mx-auto">
        {/* Left — Text Section */}
=======
    navigate("/login");
  };

  return (
    <motion.div
      className="bg-[#EDEDED] min-h-screen min-w-screen font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navigator />

      {/* HERO SECTION */}
      <div className="pt-[150px] flex flex-col md:flex-row items-center justify-between px-12 py-16 max-w-7xl mx-auto">
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
        <div className="md:w-1/2 text-left space-y-6">
          <p className="text-black/50 text-[15px] font-semibold tracking-wide">
            ALWAYS DONATE FOR HUMANITY
          </p>

          <h1 className="text-[54px] font-bold leading-tight text-gray-900">
<<<<<<< HEAD
            Lend a Helping Hand to Those in Need
          </h1>

          <p className="text-black/50 text-[15px] leading-relaxed">
            A donation of RM20 allows us to distribute complete food care packages, ensuring that nutritious meals reach the most vulnerable members of our community
          </p>

          <button
            onClick={handleDonateClick} // 👈 Redirect to login
=======
            Lend a Helping Hand<br />to Those in Need
          </h1>

          <p className="text-black/50 text-[15px] leading-relaxed">
            Each RM20 provides 1–3 meals for someone in need, helping to make a meaningful impact in their life.
          </p>

          <button
            onClick={handleDonateClick}
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
            className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] transition-all duration-200"
          >
            Donate Now
          </button>
        </div>

<<<<<<< HEAD
        {/* Right — Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={peopleImg}
            alt="Helping people"
            className="w-[600px] h-auto object-cover"
          />
        </div>
      </div>

{/* 🔹 Info Section */}
      <div className="h-[254px] bg-white flex items-center justify-center px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {/* Define the data for each card here */}
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

      {/* 🔹 Helping Section */}
      <div className="h-[700px] bg-[#EDEDED] flex justify-center px-12 pt-[28px]">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

          {/* ✅ Left — Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={peopleImg2}
              alt="Helping Each Other"
              className="w-[600px] h-auto object-cover"
            />
          </div>

          {/* ✅ Right — Text */}
          <div className="md:w-1/2 space-y-6 text-left">
          <p className="text-black/50 text-[15px] leading-relaxed">
              AN INITIATIVE TO HELP THOSE IN NEEDS
            </p>
            
            <h2 className="text-[54px] font-bold leading-tight text-gray-900">
              APPLY FOR FOOD AND FILL IN THE INFORMATION
            </h2>

            <p className="text-black/50 text-[15px] leading-relaxed">
              FILL THE INFORMATION AND SENT TO US AND WE WILL CHECK AND PROVIDES FOOD WITH 7 DAYS
            </p>

            <button
              onClick={handleApplyClick} // 👈 Redirect to login
              className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] transition-all duration-200"
            >
              Apply Now
            </button>
          </div>
=======
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src={peopleImg} alt="Helping people" className="w-[600px] h-auto object-cover" />
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
        </div>
      </div>

      {/* HELPING SECTION */}
      <div className="h-[700px] bg-white flex justify-center px-12 pt-[28px]">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="md:w-1/2 flex justify-center">
            <img src={peopleImg2} alt="Helping Each Other" className="w-[450px] h-auto object-cover" />
          </div>

          <div className="md:w-1/2 space-y-6 text-left">
            <h2 className="text-[54px] font-bold leading-tight text-gray-900">
              Helping Each Other <br />Can Make World Better
            </h2>

            <p className="text-black/50 text-[15px] leading-relaxed">
              Fill in the information and submit it to us. We will review your request and provide the food within 7 days
            </p>

            <button
              onClick={handleDonateClick}
              className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] transition-all duration-200"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* PACKS SECTION */}
      <div className="h-[800px] bg-[#EDEDED] flex flex-col items-center justify-start px-12 pt-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Pack</h1>
        <h3 className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Select a donation pack to support those in need. Each pack contains essential food items.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

          {[ 
            { img: packA, price: "RM20", pax: "1–3 Pax", package: "Basic Pack" },
            { img: packB, price: "RM50", pax: "4–6 Pax", package: "Standard Pack" },
            { img: packC, price: "RM70", pax: "7–10 Pax", package: "Premium Pack" },
          ].map((pack, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 p-2 hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden w-80"
            >
              <div className="px-5 py-1 rounded-t-full rounded-b shadow-lg bg-gradient-to-r from-[#11452E] to-[#278659] text-white text-sm font-medium mt-2">
                {pack.package}
              </div>

              <img src={pack.img} alt="" className="w-64 h-auto object-contain mt-4" />

              <h3 className="text-xl font-semibold text-gray-900 mt-2">{pack.price}</h3>
              <h4 className="text-md font-medium text-gray-700">{pack.pax}</h4>

              <p className="text-center text-gray-400 text-sm mt-3 px-4">
                Support this pack and make a meaningful impact today.
              </p>
            </div>
          ))}

        </div>
      </div>

    </motion.div>
  );
}

<<<<<<< HEAD
export default Landing;
=======
export default Landing;
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
