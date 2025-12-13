import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Donations() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { id: 1, name: "Package A", price: 100, description: "Basic food package for a family" },
    { id: 2, name: "Package B", price: 200, description: "Standard food package with essentials" },
    { id: 3, name: "Package C", price: 300, description: "Premium food package with extras" }
  ];

  const handleContinue = () => {
    if (!selectedPackage) {
      alert("Please select a donation package");
      return;
    }
    navigate("/check-details", { state: { package: selectedPackage } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Donation</h1>
          <p className="text-gray-600 text-lg">
            Select a package that works for you. Every contribution makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`bg-white p-6 rounded-xl shadow-md cursor-pointer transition-all ${
                selectedPackage?.id === pkg.id
                  ? "border-4 border-[#019461] transform scale-105"
                  : "border-2 border-gray-200 hover:border-[#019461]"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-3xl font-bold text-[#019461] mb-4">RM {pkg.price}</p>
              <p className="text-gray-600">{pkg.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-[#019461] text-white font-semibold px-12 py-4 rounded-lg hover:bg-[#017a54] transition-colors text-lg"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Donations;
