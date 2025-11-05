import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";
import People3 from "../images/People3.jpg"; 
import Footer from "../LandingPage_cmp/Footer";

function AboutUs() {
  return (
    <div className="bg-[#EDEDED] min-h-screen font-sans overflow-x-hidden">
      <Navigator />

      {/* 🟢 Hero Section */}
      <section className="pt-[150px] flex flex-col md:flex-row items-center justify-between px-12 py-16 max-w-7xl mx-auto">
        {/* 🔹 Left Side: Text */}
        <div className="md:w-1/2 space-y-6 text-left">
          <p className="text-[#019461] font-semibold tracking-wide uppercase">
            About Us
          </p>
          <h1 className="text-[54px] font-bold leading-tight text-gray-900">
            Together we change the world
          </h1>
          <p className="text-black/60 text-[15px] leading-relaxed max-w-md">
            Every small action contributes to a larger purpose. Our mission is
            to bring people together to create lasting, positive change for our
            communities and beyond.
          </p>
            <button
                className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px]  shadow-md hover:bg-[#017a54] transition-all duration-200"
            >
            Donate Now
          </button>
        </div>

        {/* 🔹 Right Side: Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={People3}
            alt="People working together"
            className="w-[600px] h-auto object-cover rounded-[20px] shadow-lg"
          />
        </div>
      </section>

      {/* 🟢 Our Mission Section */}
      <section className="bg-white py-20 px-12 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-[42px] font-bold text-gray-900">Our Mission</h2>
          <p className="text-black/60 text-[15px] leading-relaxed max-w-3xl mx-auto">
            We aim to empower communities, uplift those in need, and promote
            unity through compassion and shared purpose. Together, we build a
            future where kindness drives progress and every voice is heard.
          </p>
        </div>
      </section>

      {/* 🟢 What We Do Section */}
      <section className="bg-[#F8F8F8] py-20 px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[38px] font-bold text-gray-900 mb-12">What We Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 🧩 Card 1 */}
            <div className="bg-white rounded-[20px] shadow-md p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[22px] font-semibold text-[#019461] mb-4">
                Empower Communities
              </h3>
              <p className="text-black/60 text-[15px] leading-relaxed">
                We support communities through education, resources, and
                collaborative programs that build long-term resilience.
              </p>
            </div>

            {/* 🧩 Card 2 */}
            <div className="bg-white rounded-[20px] shadow-md p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[22px] font-semibold text-[#019461] mb-4">
                Inspire Action
              </h3>
              <p className="text-black/60 text-[15px] leading-relaxed">
                We motivate individuals to take part in meaningful initiatives
                that promote compassion, sustainability, and positive impact.
              </p>
            </div>

            {/* 🧩 Card 3 */}
            <div className="bg-white rounded-[20px] shadow-md p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[22px] font-semibold text-[#019461] mb-4">
                Create Change
              </h3>
              <p className="text-black/60 text-[15px] leading-relaxed">
                Through collective efforts, we address challenges and foster
                growth—because real change begins when people come together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
