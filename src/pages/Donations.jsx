import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";

function Donation() {
  const navigate = useNavigate();
  const [packageQuantities, setPackageQuantities] = useState({
    A: 0,
    B: 0,
    C: 0
  });

  const packages = [
    {
      id: "A",
      name: "PACKAGE A",
      price: 20,
      pax: "FOR 1-3 PAX",
      items: ["RICE", "BREAD", "BISCUITS"]
    },
    {
      id: "B",
      name: "PACKAGE B",
      price: 50,
      pax: "FOR 4-6 PAX",
      items: ["RICE", "BREAD", "BISCUITS"]
    },
    {
      id: "C",
      name: "PACKAGE C",
      price: 70,
      pax: "FOR 7-10 PAX",
      items: ["RICE", "BREAD", "BISCUITS"]
    }
  ];

  const handleQuantityChange = (packageId, change) => {
    setPackageQuantities(prev => {
      const newQuantity = Math.max(0, prev[packageId] + change);
      return { ...prev, [packageId]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return packages.reduce((total, pkg) => {
      return total + (pkg.price * packageQuantities[pkg.id]);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(packageQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const handleContinue = () => {
    const totalItems = getTotalItems();
    if (totalItems === 0) {
      alert("Please select at least one package");
      return;
    }

    // Create selected packages array with quantities
    const selectedPackages = packages
      .filter(pkg => packageQuantities[pkg.id] > 0)
      .map(pkg => ({
        ...pkg,
        quantity: packageQuantities[pkg.id],
        subtotal: pkg.price * packageQuantities[pkg.id]
      }));

    navigate("/check-details", { 
      state: { 
        packages: selectedPackages,
        totalAmount: calculateTotal(),
        totalItems: totalItems
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 mt-12">
          <h1 className="text-[36px] font-bold text-gray-900">
            FOOD DONATION PACKAGE
          </h1>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex flex-col">
              {/* Package Name - Outside Card */}
              <div className="text-center mb-4">
                <h3 className="text-[20px] font-bold text-gray-900 underline decoration-2 underline-offset-4 inline-block">
                  {pkg.name}
                </h3>
              </div>

              {/* Card */}
              <div
                className={`bg-white rounded-[16px] shadow-md transition-all overflow-hidden ${
                  packageQuantities[pkg.id] > 0
                    ? "ring-4 ring-[#019461]"
                    : "hover:shadow-lg"
                }`}
              >
                {/* Image Placeholder */}
                <div className="bg-gradient-to-br from-[#1a5c8a] to-[#004B7F] h-[180px] flex items-center justify-center relative">
                  <div className="text-[64px]">📦</div>
                  {packageQuantities[pkg.id] > 0 && (
                    <div className="absolute top-3 right-3 bg-[#019461] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-[14px]">
                      {packageQuantities[pkg.id]}
                    </div>
                  )}
                </div>

                {/* Package Details */}
                <div className="p-6 text-center">
                  <p className="text-[28px] font-bold text-gray-900 mb-2">
                    RM {pkg.price}
                  </p>
                  <p className="text-[14px] font-semibold text-gray-600 mb-6">
                    {pkg.pax}
                  </p>

                  {/* Items List */}
                  <ul className="space-y-2 text-left mb-6">
                    {pkg.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-[14px] text-gray-800 font-medium flex items-center"
                      >
                        <span className="mr-2 text-gray-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleQuantityChange(pkg.id, -1)}
                      disabled={packageQuantities[pkg.id] === 0}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        packageQuantities[pkg.id] === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-[20px] font-bold text-gray-900 w-12 text-center">
                      {packageQuantities[pkg.id]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(pkg.id, 1)}
                      className="w-10 h-10 rounded-full bg-[#019461] text-white hover:bg-[#017a54] flex items-center justify-center transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Bar */}
        {getTotalItems() > 0 && (
          <div className="bg-white rounded-[12px] shadow-lg p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-[#019461]" />
                <div>
                  <p className="text-[16px] font-semibold text-gray-900">
                    {getTotalItems()} Package{getTotalItems() > 1 ? 's' : ''} Selected
                  </p>
                  <p className="text-[14px] text-gray-600">
                    {packages.map(pkg => 
                      packageQuantities[pkg.id] > 0 
                        ? `${pkg.name}: ${packageQuantities[pkg.id]}` 
                        : null
                    ).filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] text-gray-600 mb-1">Total Amount</p>
                <p className="text-[28px] font-bold text-[#019461]">
                  RM {calculateTotal()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={getTotalItems() === 0}
            className={`font-semibold text-[15px] px-12 py-3 rounded-[8px] transition-all duration-200 ${
              getTotalItems() > 0
                ? "bg-[#019461] text-white hover:bg-[#017a54] cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Donation;