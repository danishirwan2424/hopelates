import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigator from "../../LandingPage_cmp/Navigator";

function CheckDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle both old single package and new multiple packages format
  const packages = location.state?.packages || [];
  const totalAmount = location.state?.totalAmount || 0;
  const totalItems = location.state?.totalItems || 0;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        packages: packages,
        totalAmount: totalAmount,
        totalItems: totalItems,
        userDetails: formData
      }
    });
  };

  return (
    <>
      <Navigator />
      <div className="min-h-screen bg-[#EDEDED] pt-[120px] py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-[32px] font-bold text-gray-900 mb-6">Confirm Your Details</h1>

          {/* Order Summary */}
          <div className="bg-[#019461]/10 p-6 rounded-lg mb-8">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Package List */}
            <div className="space-y-3 mb-4">
              {packages.map((pkg, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-300 last:border-0 last:pb-0">
                  <div>
                    <p className="text-gray-900 font-medium text-[14px]">{pkg.name}</p>
                    <p className="text-gray-600 text-[13px]">
                      RM {pkg.price} × {pkg.quantity}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold text-[14px]">
                    RM {pkg.subtotal}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-400">
              <div>
                <p className="text-[#019461] font-semibold text-[16px]">Total Amount</p>
                <p className="text-gray-600 text-[13px]">{totalItems} package{totalItems > 1 ? 's' : ''}</p>
              </div>
              <p className="text-[#019461] font-bold text-[24px]">
                RM {totalAmount}
              </p>
            </div>
          </div>

          {/* User Details Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-[13px] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-[13px] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-[13px] font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-[13px] font-medium mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="4"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] resize-none"
                required
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/donations")}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-[14px] py-2.5 rounded-[6px] hover:bg-gray-50 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#019461] text-white font-semibold text-[14px] py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckDetails;