import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";
import peopleImg from "../images/People.png";
import humanityImg1 from "../images/Humanity1.png"; 
import humanityImg2 from "../images/Humanity2.png"; 
import humanityImg3 from "../images/Humanity3.png"; 
import peopleImg2 from "../images/People2.png"; // ✅ Use import instead of require

function Landing() {
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde 
            omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam 
            rem aperiam.
          </p>

          <button
            className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px]  shadow-md hover:bg-[#017a54] transition-all duration-200"
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

      {/* 🔹 New Section Below (Height: 254px) */}
      <div className="h-[254px] bg-white flex items-center justify-center px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          
          {/* ✅ Box 1 */}
          <div className="flex items-center gap-2">
            <img
              src={humanityImg1}
              alt="Humanity icon"
              className="w-40 h-40 object-contain"
            />
            <div>
              <h3 className="text-[18px] font-semibold text-gray-900">
                ALWAYS DONATE FOR HUMANITY
              </h3>
              <p className="text-black/50 text-[14px] leading-snug">
                Lorem ipsum dolor sit amet, consectetur omnis iste natus
              </p>
            </div>
          </div>
        
          {/* ✅ Box 2 */}
          <div className="flex items-center gap-2">
            <img
              src={humanityImg2}
              alt="Humanity icon"
              className="w-40 h-40 object-contain"
            />
            <div>
              <h3 className="text-[18px] font-semibold text-gray-900">
                ALWAYS DONATE FOR HUMANITY
              </h3>
              <p className="text-black/50 text-[14px] leading-snug">
                Lorem ipsum dolor sit amet, consectetur omnis iste natus
              </p>
            </div>
          </div>
        
          {/* ✅ Box 3 */}
          <div className="flex items-center gap-2">
            <img
              src={humanityImg3}
              alt="Humanity icon"
              className="w-40 h-40 object-contain"
            />
            <div>
              <h3 className="text-[18px] font-semibold text-gray-900">
                ALWAYS DONATE FOR HUMANITY
              </h3>
              <p className="text-black/50 text-[14px] leading-snug">
                Lorem ipsum dolor sit amet, consectetur omnis iste natus
              </p>
            </div>
          </div>
        
        </div>
      </div>

{/* 🔹 New Section Below */}
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
      <h2 className="text-[54px] font-bold leading-tight text-gray-900">
        Helping Each Other <br />Can Make World Better
      </h2>

      <p className="text-black/50 text-[15px] leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde 
        omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam 
        rem aperiam.
      </p>

      <ul className="list-disc list-inside text-black/50 text-[15px] leading-relaxed space-y-1">
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit. Sed ut</li>
        <li>Perspiciatis unde</li>
      </ul>

      <button
        className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px]  shadow-md hover:bg-[#017a54] transition-all duration-200"
      >
        Donate Now
      </button>

    </div>
  </div>
</div>

    </div>
  );
}

export default Landing;
