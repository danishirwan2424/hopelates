import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location.state?.package || { name: "Package A", price: 100 };
  const userDetails = location.state?.userDetails || {};

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {
    const donationData = {
      donationId: "DN" + Math.floor(Math.random() * 10000),
      packageName: selectedPackage.name,
      totalAmount: selectedPackage.price,
      transactionDate: new Date().toLocaleDateString()
    };

    navigate("/donation-confirmation", { state: donationData });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment Details</h1>

        <div className="bg-[#019461]/10 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Package:</span>
              <span className="font-semibold">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Donor:</span>
              <span className="font-semibold">{userDetails.fullName || "N/A"}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#019461] pt-4 border-t">
              <span>Total Amount:</span>
              <span>RM {selectedPackage.price}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-[#019461]"
              />
              <span className="ml-3 text-gray-700 font-medium">Credit/Debit Card</span>
            </label>
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-[#019461]"
              />
              <span className="ml-3 text-gray-700 font-medium">Online Banking</span>
            </label>
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="ewallet"
                checked={paymentMethod === "ewallet"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-[#019461]"
              />
              <span className="ml-3 text-gray-700 font-medium">E-Wallet</span>
            </label>
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/check-details")}
            className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            className="flex-1 bg-[#019461] text-white font-semibold py-3 rounded-lg hover:bg-[#017a54] transition-colors"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
