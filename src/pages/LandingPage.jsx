import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import navigation hook
import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.png";
import humanityImg1 from "../images/Humanity1.png"; 
import humanityImg2 from "../images/Humanity2.png"; 
import humanityImg3 from "../images/Humanity3.png"; 
import peopleImg2 from "../images/People2.png";
import packA from "../images/PackA.png";
import packB from "../images/PackB.png";
import packC from "../images/PackC.png"; 

function Landing() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/login"); // 👈 Redirect to login page
  };

  return (
    <div className="bg-[#EDEDED] min-h-screen min-w-screen font-sans">
      <Navigator />

      {/* ✅ Hero Section */}
      <div className="pt-[150px] flex flex-col md:flex-row items-center justify-between px-12 py-16 max-w-7xl mx-auto">
        {/* Left — Text Section */}
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
            onClick={handleDonateClick} // 👈 Redirect to login
            className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] transition-all duration-200"
          >
            Donate Now
          </button>
        </div>

        {/* Right — Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={peopleImg}
            alt="Helping people"
            className="w-[600px] h-auto object-cover"
          />
        </div>
      </div>



            {/* 🔹 Helping Section */}
      <div className="h-[700px] bg-white flex justify-center px-12 pt-[28px]">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

          {/* ✅ Left — Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={peopleImg2}
              alt="Helping Each Other"
              className="w-[450px] h-auto object-cover"
            />
          </div>

          {/* ✅ Right — Text */}
          <div className="md:w-1/2 space-y-6 text-left">
            <h2 className="text-[54px] font-bold leading-tight text-gray-900">
              Helping Each Other <br />Can Make World Better
            </h2>

            <p className="text-black/50 text-[15px] leading-relaxed">
              Fill in the information and submit it to us. We will review your request and provide the food within 7 days
            </p>

            <button
              onClick={handleDonateClick} // 👈 Redirect to login
              className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017a54] transition-all duration-200"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>




      {/* 🔹 Info Section */}
<div className="h-[800px] bg-[#EDEDED] flex flex-col items-center justify-start px-12 pt-12">
  
  {/* Section Heading */}
  <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Pack</h1>
  <h3 className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
    Select a donation pack to support those in need. Each pack contains essential food items for the specified number of people.
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
    {[
      { 
        img: packA, 
        price: "RM20", 
        pax: "For 1-3 Pax", 
        package: "Basic Pack", 
        list: ["Packet of Rice", "Packet of Bread", "Packet of Biscuits"] 
      },
      { 
        img: packB, 
        price: "RM50", 
        pax: "For 4-6 Pax", 
        package: "Standard Pack", 
        list: ["Packet of Rice", "Packet of Bread", "Packet of Biscuits"] 
      },
      { 
        img: packC, 
        price: "RM70", 
        pax: "For 7-10 Pax", 
        package: "Premium Pack", 
        list: ["Packet of Rice", "Packet of Bread", "Packet of Biscuits"] 
      }
    ].map((pack, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 p-2 hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden w-80"
      >
        {/* Package Badge Inside Card */}
        <div className="px-5 py-1 rounded-t-full rounded-b shadow-lg bg-gradient-to-r from-[#11452E] to-[#278659] text-white text-sm font-medium mt-2">
          {pack.package}
        </div>

        {/* Pack Image */}
        <img src={pack.img} alt={`${pack.package} image`} className="w-64 h-auto object-contain mt-4" />

        {/* Price & Pax */}
        <h3 className="text-xl font-semibold text-gray-900 mt-2">{pack.price}</h3>
        <h4 className="text-md font-medium text-gray-700">{pack.pax}</h4>

        {/* Item List */}
        <ul className="text-gray-500 text-sm list-disc list-inside text-center space-y-1 mt-2">
          {pack.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* Call to Action */}
        <p className="text-center text-gray-400 text-sm mt-3 px-4">
          Support this pack and make a meaningful impact today.
        </p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}

export default Landing;
