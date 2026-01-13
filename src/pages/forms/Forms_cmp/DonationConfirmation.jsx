import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DonationConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Data passed from payment page
  const donation = state || {
    donationId: "DN000123",
    donorName: "CHENG KAH HOOI",
    packageName: "PACKAGE A",
    quantity: 1,
    amount: 20,
    paymentMethod: "Online Transfer",
    date: new Date().toLocaleString(),
  };

  return (
    <div className="min-h-screen bg-[#f4fbf7] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8 text-center">
        <CheckCircle className="mx-auto text-[#278659]" size={72} />
        <h1 className="text-2xl font-semibold mt-4">Donation Successful</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your generosity. Your donation has been received.
        </p>

        <div className="mt-6 text-left bg-[#f0faf5] rounded-xl p-6">
          <h2 className="font-semibold mb-4 text-[#11452E]">Donation Details</h2>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-gray-500">Donation ID</span>
            <span>{donation.donationId}</span>

            <span className="text-gray-500">Donor Name</span>
            <span>{donation.donorName}</span>

            <span className="text-gray-500">Package</span>
            <span>
              {donation.packageName} × {donation.quantity}
            </span>

            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold text-[#278659]">
              RM {donation.amount}
            </span>

            <span className="text-gray-500">Payment Method</span>
            <span>{donation.paymentMethod}</span>

            <span className="text-gray-500">Date</span>
            <span>{donation.date}</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => navigate("/donation")}
            className="px-6 py-2 rounded-lg border border-[#278659] text-[#278659] hover:bg-[#e6f6ee]"
          >
            Donate Again
          </button>
          <button
            onClick={() => navigate("/my-donations")}
            className="px-6 py-2 rounded-lg bg-[#278659] text-white hover:bg-[#1f6e4a]"
          >
            View My Donations
          </button>
        </div>
      </div>
    </div>
  );
}
