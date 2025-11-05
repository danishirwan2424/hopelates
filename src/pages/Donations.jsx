import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";
import DonateImg from "../images/People3.jpg"; 
import Footer from "../LandingPage_cmp/Footer";

function Donations() {
  return (
    <div className="bg-[#EDEDED] min-h-screen font-sans">
      <Navigator />

      {/* 🟢 Hero Section */}
      <section className="pt-[150px] text-center px-6">
        <p className="text-[#019461] font-semibold tracking-wide uppercase">
          Donate Today
        </p>
        <h1 className="text-[48px] md:text-[54px] font-bold leading-tight text-gray-900 mt-2">
          Your Support Feeds Hope
        </h1>
        <p className="text-black/60 text-[16px] max-w-2xl mx-auto mt-4 leading-relaxed">
          Every contribution helps us deliver food, warmth, and care to those who
          need it most. Together, we can fight hunger and make a lasting difference.
        </p>
      </section>

      {/* 🟢 Donation Info Section */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={DonateImg}
            alt="Donation action"
            className="w-[600px] h-auto object-cover rounded-[20px] shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6 text-left">
          <h2 className="text-[36px] font-bold text-gray-900">
            Why Your Donation Matters
          </h2>
          <p className="text-black/60 text-[16px] leading-relaxed">
            Your donation provides essential meals, supports local kitchens, and
            helps families in crisis. Every ringgit you contribute fuels our
            mission to ensure no one goes hungry.
          </p>
          <ul className="list-disc list-inside text-black/70 space-y-2">
            <li>RM10 can provide a meal for 3 people.</li>
            <li>RM50 supports a family with food for a week.</li>
            <li>RM100 helps run a community kitchen for a day.</li>
          </ul>

          <button
            onClick={() => alert("Thank you for your kindness! (Demo Button)")}
            className="bg-[#019461] text-white font-semibold text-[15px] px-8 py-3 rounded-[12px] shadow-md hover:bg-[#017c53] transition-all duration-200"
          >
            Donate Now
          </button>
        </div>
      </section>

      {/* 🟢 Ways to Donate Section */}
      <section className="bg-white py-20 px-6 md:px-12 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-[38px] font-bold text-gray-900">
            Ways You Can Contribute
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Option 1 */}
            <div className="bg-[#F8F8F8] p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-[22px] text-black/60 font-semibold mb-2">Online Donation</h3>
              <p className="text-black/60 text-[15px]">
                Donate securely through our website using credit/debit card or
                online banking.
              </p>
            </div>

            {/* Option 2 */}
            <div className="bg-[#F8F8F8] p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-[22px] text-black/60 font-semibold mb-2">Bank Transfer</h3>
              <p className="text-black/60 text-[15px]">
                Send your contribution directly to our charity bank account for
                maximum transparency.
              </p>
            </div>

            {/* Option 3 */}
            <div className="bg-[#F8F8F8] p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-[22px] text-black/60 font-semibold mb-2">Food Donations</h3>
              <p className="text-black/60 text-[15px]">
                Contribute non-perishable food items and essentials to our
                community pantry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Donations;
