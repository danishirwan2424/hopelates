import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DonationConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ If user opens page directly (no redirect loop)
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No donation data found. Please make a donation first.
        </p>
      </div>
    );
  }

  const {
    packages,
    totalAmount,
    donorName,
    paymentMethod,
    transactionDate,
  } = state;

  return (
    <div className="min-h-screen bg-[#f4fbf7] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8 text-center">
        <CheckCircle className="mx-auto text-[#278659]" size={72} />

        <h1 className="text-2xl font-semibold mt-4">
          Donation Successful
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your generosity. Your donation has been received.
        </p>

        <div className="mt-6 text-left bg-[#f0faf5] rounded-xl p-6">
          <h2 className="font-semibold mb-4 text-[#11452E]">
            Donation Details
          </h2>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-gray-500">Donor Name</span>
            <span>{donorName}</span>

            <span className="text-gray-500">Package(s)</span>
            <span>
              {packages.map((pkg, index) => (
                <div key={index}>
                  {pkg.name} × {pkg.quantity}
                </div>
              ))}
            </span>

            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold text-[#278659]">
              RM {totalAmount}
            </span>

            <span className="text-gray-500">Payment Method</span>
            <span>{paymentMethod}</span>

            <span className="text-gray-500">Date</span>
            <span>{transactionDate}</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => navigate("/donation")}
            className="px-6 py-2 rounded-lg border border-[#278659] text-[#278659]"
          >
            Donate Again
          </button>

          <button
            onClick={() => navigate("/donation-tracking")}
            className="px-6 py-2 rounded-lg bg-[#278659] text-white"
          >
            View My Donations
          </button>
        </div>
      </div>
    </div>
  );
}
