import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";

// Import images
import PackageAImg from "../../images/PACKAGEA.png";
import PackageBImg from "../../images/PACKAGEB.png";
import PackageCImg from "../../images/PACKAGEC.png";

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
      items: ["RICE", "CANNED SARDINES", "COOKING OIL", "INSTANT NOODLES", "CHOCOLATE DRINK"],
      image: PackageAImg
    },
    {
      id: "B",
      name: "PACKAGE B",
      price: 50,
      pax: "FOR 4-6 PAX",
      items: ["RICE", "CANNED SARDINES", "COOKING OIL", "INSTANT NOODLES", "CHOCOLATE DRINK"],
      image: PackageBImg
    },
    {
      id: "C",
      name: "PACKAGE C",
      price: 70,
      pax: "FOR 7-10 PAX",
      items: ["RICE", "CANNED SARDINES", "COOKING OIL", "INSTANT NOODLES", "CHOCOLATE DRINK"],
      image: PackageCImg
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

    // Navigate to check details page with selected packages
    navigate("/check-details", { 
      state: { 
        packageQuantities: packageQuantities,
        packages: packages,
        total: calculateTotal(),
        totalItems: totalItems
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-[36px] font-bold text-gray-900 tracking-tight">
            FOOD DONATION PACKAGES
          </h1>
          <p className="text-gray-600 mt-2">Select a package to help those in need</p>
        </header>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group flex flex-col">
              {/* Package Title */}
              <div className="text-center mb-4">
                <h3 className="text-[18px] font-bold text-gray-800 uppercase tracking-widest border-b-2 border-[#019461] inline-block pb-1">
                  {pkg.name}
                </h3>
              </div>

              {/* Package Card */}
              <div className={`bg-white rounded-2xl shadow-sm transition-all duration-300 flex flex-col h-full border-2 ${
                  packageQuantities[pkg.id] > 0 ? "border-[#019461] shadow-md" : "border-transparent"
                }`}>
                
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-gray-200">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { 
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; 
                    }}
                  />
                  {/* Quantity Badge */}
                  {packageQuantities[pkg.id] > 0 && (
                    <div className="absolute top-4 right-4 bg-[#019461] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {packageQuantities[pkg.id]}
                    </div>
                  )}
                </div>

                {/* Package Details */}
                <div className="p-8 flex flex-col flex-grow text-center">
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-black text-gray-900">RM {pkg.price}</span>
                    <p className="text-xs font-bold text-[#019461] mt-1 tracking-widest">{pkg.pax}</p>
                  </div>

                  {/* Items List */}
                  <ul className="text-left space-y-3 mb-8 flex-grow border-t border-gray-100 pt-6">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#019461] mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
                    <button
                      onClick={() => handleQuantityChange(pkg.id, -1)}
                      disabled={packageQuantities[pkg.id] === 0}
                      className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-red-50 hover:text-red-500 disabled:opacity-30 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl font-bold text-gray-900">
                      {packageQuantities[pkg.id]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(pkg.id, 1)}
                      className="w-12 h-12 rounded-lg bg-[#019461] text-white shadow-md flex items-center justify-center hover:bg-[#017a54] transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary & Checkout Button */}
        <div className="sticky bottom-8 max-w-2xl mx-auto">
          {/* Summary Card - Only show when items selected */}
          {getTotalItems() > 0 && (
            <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-2xl flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#019461] rounded-xl">
                  <ShoppingCart className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-bold tracking-widest">
                    Selected Packages
                  </p>
                  <p className="text-xl font-bold">{getTotalItems()} Items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-widest">
                  Total Amount
                </p>
                <p className="text-2xl font-black text-[#019461]">RM {calculateTotal()}</p>
              </div>
            </div>
          )}

          {/* Checkout Button */}
          <button
            onClick={handleContinue}
            disabled={getTotalItems() === 0}
            className={`w-full py-5 rounded-2xl font-bold text-lg tracking-widest transition-all ${
              getTotalItems() > 0 
              ? "bg-[#019461] text-white hover:bg-[#017a54] shadow-xl" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Donation;