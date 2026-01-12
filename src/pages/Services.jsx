import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, Utensils, ShoppingCart, Heart, Sprout, AlertCircle } from "lucide-react";
import peopleImg from "../images/People.jpg";
import peopleImg2 from "../images/People2.jpg";

function Services() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donations");
  };

  const handleApplyClick = () => {
    navigate("/application");
  };

  return (
    <div className="min-h-screen bg-[#EDEDED]">
      {/* Services Header Section */}
      <div className="bg-white pt-[130px] pb-16">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <p className="text-[#019461] text-[15px] font-semibold tracking-wider mb-4 uppercase">
            OUR SERVICES
          </p>
          <h1 className="text-[54px] font-bold text-gray-900 mb-6 leading-tight">
            Serving Communities With Compassion
          </h1>
          <p className="text-gray-600 text-[16px] max-w-3xl mx-auto leading-relaxed">
            Through our food charity programs, we aim to fight hunger, reduce food waste, and build a stronger, more caring community — one meal at a time.
          </p>
        </div>
      </div>

      {/* Donate Now Banner */}
      <div 
        className="relative min-h-[700px] flex items-center justify-center"
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
            <p className="text-white/80 text-[18px] font-semibold tracking-wide">
              ALWAYS DONATE FOR HUMANITY
            </p>

            <h2 className="text-[54px] font-bold leading-tight text-white">
              Lend a Helping Hand to Those in Need
            </h2>

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

      {/* Services Grid Section */}
      <div className="max-w-6xl mx-auto px-8 py-16 bg-[#EDEDED]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Food Distribution */}
          <div className="bg-white rounded-[12px] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Food Distribution
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              We provide nutritious meals to underprivileged families and individuals in need, ensuring no one goes hungry.
            </p>
          </div>

          {/* Card 2 - Community Kitchens */}
          <div className="bg-white rounded-[12px] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Community Kitchens
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              Our community kitchens serve fresh meals daily, offering a safe space for people to eat and connect.
            </p>
          </div>

          {/* Card 3 - Food Donation Drives */}
          <div className="bg-white rounded-[12px] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-md">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Food Donation Drives
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              We organize food collection campaigns with local partners and donors to stock up on essentials for the poor.
            </p>
          </div>

          {/* Card 4 - Volunteer Programs */}
          <div className="bg-white rounded-[12px] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Volunteer Programs
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              Join our volunteer network to help pack, deliver, and distribute meals to those who need them most.
            </p>
          </div>

          {/* Card 5 - Sustainable Food Sourcing */}
          <div className="bg-white rounded-[12px] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Sustainable Food Sourcing
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              We collaborate with local farmers and markets to reduce food waste and promote sustainable supply chains.
            </p>
          </div>

          {/* Card 6 - Emergency Relief */}
          <div className="bg-white rounded-[12px] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-md">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Emergency Relief
            </h3>
            <p className="text-gray-600 text-[14px] leading-relaxed">
              During crises or disasters, we deliver immediate food aid and support to affected communities.
            </p>
          </div>
        </div>
      </div>

      {/* Apply Now Banner */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-12 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/80 text-[18px] font-semibold tracking-wide">
              AN INITIATIVE TO HELP THOSE IN NEEDS
            </p>
            
            <h2 className="text-[54px] font-bold leading-tight text-white">
              APPLY FOR FOOD AND FILL IN THE INFORMATION
            </h2>

            <p className="text-white/90 text-[16px] leading-relaxed">
              FILL THE INFORMATION AND SENT TO US AND WE WILL CHECK AND PROVIDES FOOD WITH 7 DAYS
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

export default Services;