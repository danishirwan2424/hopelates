import React, { useState } from "react";
import { Plus, Minus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DonationApply() {
  const primaryColor = "#278659";
  const darkColor = "#11452E";

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [packageQuantities, setPackageQuantities] = useState({ A: 0, B: 0, C: 0 });
  const [userDetails, setUserDetails] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const packages = [
    { id: "A", name: "PACKAGE A", price: 20, pax: "FOR 1-3 PAX", items: ["RICE", "BREAD", "BISCUITS"] },
    { id: "B", name: "PACKAGE B", price: 50, pax: "FOR 4-6 PAX", items: ["RICE", "BREAD", "BISCUITS"] },
    { id: "C", name: "PACKAGE C", price: 70, pax: "FOR 7-10 PAX", items: ["RICE", "BREAD", "BISCUITS"] }
  ];

  const steps = ["Select Package", "Donor Details", "Payment"];

  const handleQuantityChange = (pkgId, change) => {
    setPackageQuantities(prev => {
      const newQty = Math.max(0, prev[pkgId] + change);
      return { ...prev, [pkgId]: newQty };
    });
  };

  const calculateTotal = () =>
    packages.reduce((total, pkg) => total + pkg.price * packageQuantities[pkg.id], 0);

  const getTotalItems = () =>
    Object.values(packageQuantities).reduce((sum, qty) => sum + qty, 0);

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large (max 5MB)");
      return;
    }

    if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
      alert("Invalid file type. Only PNG, JPEG, or PDF allowed.");
      return;
    }

    setUploadedFile(file);
    setFileName(file.name);
  };

  const isDonorStepValid = () =>
    userDetails.fullName && userDetails.phone && userDetails.address;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Tracker */}
      <div
        className="w-1/6 bg-white shadow-inner flex flex-col items-start py-10 px-8 overflow-y-auto"
        style={{ maxHeight: "100vh", position: "sticky", top: 0 }}
      >
        {steps.map((step, index) => (
          <div key={index} className="flex items-start relative mb-8">
            <div className="flex flex-col items-center mr-4 relative">
              <div className={`w-4 h-4 rounded-full z-10 ${index + 1 <= currentStep ? "bg-[#278659]" : "bg-gray-300"}`} />
              {index < steps.length - 1 && (
                <div
                  className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1"
                  style={{ height: "calc(100% + 20px)", backgroundColor: index + 1 < currentStep ? "#278659" : "#d1d5db" }}
                />
              )}
            </div>
            <span className={`mt-1 font-medium ${index + 1 <= currentStep ? "text-[#11452E]" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Right Form */}
      <div className="w-5/6 p-10 bg-white rounded-l-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: darkColor }}>Food Donation</h1>
        <p className="italic mt-1 mb-6 text-gray-600">Complete the donation form step by step.</p>

        <form className="space-y-12">
          {/* STEP 1: Select Package */}
          {currentStep === 1 && (
            <section>
              <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
                Select Package
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    {/* Image Placeholder */}
                    <div className="bg-gradient-to-br from-[#1a5c8a] to-[#004B7F] h-[180px] w-full flex items-center justify-center relative rounded-xl mb-4">
                      <div className="text-[64px]">📦</div>
                      {packageQuantities[pkg.id] > 0 && (
                        <div className="absolute top-3 right-3 bg-[#019461] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-[14px]">
                          {packageQuantities[pkg.id]}
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600">{pkg.pax}</p>
                    <ul className="my-4 space-y-1">
                      {pkg.items.map((item, i) => <li key={i}>• {item}</li>)}
                    </ul>

                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(pkg.id, -1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={packageQuantities[pkg.id] === 0}
                      >
                        -
                      </button>
                      <span>{packageQuantities[pkg.id]}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(pkg.id, 1)}
                        className="px-3 py-1 bg-[#278659] text-white rounded hover:bg-green-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {getTotalItems() > 0 && (
                <div className="bg-gray-100 rounded-xl p-4 mt-6 flex justify-between items-center max-w-md">
                  <span>{getTotalItems()} Package(s) Selected</span>
                  <span>Total: RM {calculateTotal()}</span>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/landing")}
                  className="px-6 py-2 mr-4 rounded-xl text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 rounded-xl text-white"
                  style={{ backgroundColor: primaryColor }}
                  disabled={getTotalItems() === 0}
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: Donor Details */}
          {currentStep === 2 && (
            <section>
              <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
                Donor Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Full Name</label>
                  <input
                    type="text"
                    value={userDetails.fullName}
                    onChange={e => setUserDetails({...userDetails, fullName: e.target.value})}
                    className="p-3 border rounded-xl"
                    style={{ borderColor: primaryColor, outlineColor: primaryColor }}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Email</label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                    className="p-3 border rounded-xl"
                    style={{ borderColor: primaryColor, outlineColor: primaryColor }}
                    placeholder="Email (optional)"
                  />
                </div>

                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Phone Number</label>
                  <input
                    type="tel"
                    value={userDetails.phone}
                    onChange={e => setUserDetails({...userDetails, phone: e.target.value})}
                    className="p-3 border rounded-xl"
                    style={{ borderColor: primaryColor, outlineColor: primaryColor }}
                    placeholder="0123456789"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label style={{ color: darkColor }}>Address</label>
                  <textarea
                    value={userDetails.address}
                    onChange={e => setUserDetails({...userDetails, address: e.target.value})}
                    rows={3}
                    className="p-3 border rounded-xl"
                    style={{ borderColor: primaryColor, outlineColor: primaryColor }}
                    placeholder="Full home address"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2 rounded-xl border"
                  style={{ borderColor: primaryColor, color: darkColor }}
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2 rounded-xl text-white"
                  style={{ backgroundColor: primaryColor }}
                  disabled={!isDonorStepValid()}
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: Payment */}
          {currentStep === 3 && (
            <section>
              <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
                Payment
              </h2>

              <div className="flex flex-col gap-4 max-w-md">
                <label className="border-dashed border-2 border-gray-300 rounded p-6 text-center cursor-pointer">
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                  {fileName ? `Uploaded: ${fileName}` : "Click to upload proof of payment"}
                  <Upload className="inline ml-2 w-5 h-5 text-gray-600" />
                </label>

                <button
                  type="button"
                  className="px-6 py-2 rounded-xl text-white"
                  style={{ backgroundColor: primaryColor }}
                  onClick={() => alert("Donation Completed!")}
                  disabled={!uploadedFile}
                >
                  Complete Donation
                </button>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 rounded-xl border"
                  style={{ borderColor: primaryColor, color: darkColor }}
                >
                  Back
                </button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
