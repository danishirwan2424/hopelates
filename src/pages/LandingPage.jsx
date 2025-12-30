import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.png";
import peopleImg2 from "../images/People2.png";

function Landing() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
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
        <div className="md:w-1/2 text-left space-y-6">
          <p className="text-black/50 text-[15px] font-semibold tracking-wide">
            ALWAYS DONATE FOR HUMANITY
          </p>

          <h1 className="text-[54px] font-bold leading-tight text-gray-900">
            Lend a Helping Hand<br />to Those in Need
          </h1>

          <p className="text-black/50 text-[15px] leading-relaxed">
            Each RM20 provides 1–3 meals for someone in need, helping to make a meaningful impact in their life.
          </p>

          <button
            onClick={handleDonateClick}
            className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] transition-all duration-200"
          >
            Donate Now
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src={peopleImg} alt="Helping people" className="w-[600px] h-auto object-cover" />
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

    </motion.div>
  );
}

export default Landing;
