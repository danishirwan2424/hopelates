import React, { useState, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UserIcon, HomeIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function DonationApply() {
  const primaryColor = "#278659";
  const darkColor = "#11452E";

  const navigate = useNavigate();
  const stepIcons = [UserIcon, UserIcon, BanknotesIcon];

  const [currentStep, setCurrentStep] = useState(1);
  const [packageQuantities, setPackageQuantities] = useState({ A: 0, B: 0, C: 0 });
  const [userDetails, setUserDetails] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [uploadedFile, setUploadedFile] = useState(null);

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

  // Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].size > 5 * 1024 * 1024) {
      alert("File is too large (max 5MB)");
      return;
    }
    setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] },
    multiple: false,
  });

  const isDonorStepValid = () =>
    userDetails.fullName && userDetails.phone && userDetails.address;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row p-4 sm:p-0">
      {/* Left Step Tracker */}
{/* Left Step Tracker */}
<div className="hidden sm:flex w-1/6 bg-white p-8 shadow-inner flex-col">
    {steps.map((step, index) => {
      const Icon = stepIcons[index];
      const active = index + 1 === currentStep;
      const completed = index + 1 < currentStep;

      return (
        <div key={index} className="flex items-start mb-8 relative">
          {index !== steps.length - 1 && (
            <div
              className={`absolute left-4 top-10 w-0.5 h-full ${completed ? "bg-green-600" : "bg-gray-300"}`}
            />
          )}
          <div
            className={`p-2 rounded-full z-10 ${
              completed
                ? "bg-green-600 text-white"
                : active
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`ml-4 mt-2 text-sm ${
              completed || active ? "text-green-700 font-medium" : "text-gray-400"
            }`}
          >
            {step}
          </span>
        </div>
      );
    })}
  </div>


      {/* Right Form */}
      <div className="flex-grow bg-white p-4 sm:p-10 rounded-xl sm:rounded-l-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: darkColor }}>Food Donation</h1>
        <p className="italic mt-1 mb-6 text-gray-600">Complete the donation form step by step.</p>

        <form className="space-y-12">
          {/* STEP 1: Select Package */}
          {currentStep === 1 && (
            <section>
              <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>Select Package</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
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
                    <ul className="my-4 space-y-1">{pkg.items.map((item, i) => <li key={i}>• {item}</li>)}</ul>

                    <div className="flex items-center gap-3 mt-auto">
                      <button type="button" onClick={() => handleQuantityChange(pkg.id, -1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" disabled={packageQuantities[pkg.id] === 0}>-</button>
                      <span>{packageQuantities[pkg.id]}</span>
                      <button type="button" onClick={() => handleQuantityChange(pkg.id, 1)} className="px-3 py-1 bg-[#278659] text-white rounded hover:bg-green-700">+</button>
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
                <button type="button" onClick={() => navigate("/landing")} className="px-6 py-2 mr-4 rounded-xl text-white" style={{ backgroundColor: primaryColor }}>Back</button>
                <button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }} disabled={getTotalItems() === 0}>Next</button>
              </div>
            </section>
          )}

          {/* STEP 2: Donor Details */}
          {currentStep === 2 && (
            <section>
              <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>Donor Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Full Name</label>
                  <input type="text" value={userDetails.fullName} onChange={e => setUserDetails({...userDetails, fullName: e.target.value})} className="p-3 border rounded-xl" style={{ borderColor: primaryColor, outlineColor: primaryColor }} placeholder="Enter full name" />
                </div>

                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Email</label>
                  <input type="email" value={userDetails.email} onChange={e => setUserDetails({...userDetails, email: e.target.value})} className="p-3 border rounded-xl" style={{ borderColor: primaryColor, outlineColor: primaryColor }} placeholder="Email (optional)" />
                </div>

                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Phone Number</label>
                  <input type="tel" value={userDetails.phone} onChange={e => setUserDetails({...userDetails, phone: e.target.value})} className="p-3 border rounded-xl" style={{ borderColor: primaryColor, outlineColor: primaryColor }} placeholder="0123456789" />
                </div>

                <div className="flex flex-col col-span-2">
                  <label style={{ color: darkColor }}>Address</label>
                  <textarea value={userDetails.address} onChange={e => setUserDetails({...userDetails, address: e.target.value})} rows={3} className="p-3 border rounded-xl" style={{ borderColor: primaryColor, outlineColor: primaryColor }} placeholder="Full home address" />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(1)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
                <button type="button" onClick={() => setCurrentStep(3)} className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }} disabled={!isDonorStepValid()}>Next</button>
              </div>
            </section>
          )}

          {/* STEP 3: Payment */}
{/* STEP 3: Payment */}
{currentStep === 3 && (
  <section>
    <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
      Payment
    </h2>

    <div
      {...getRootProps()}
      className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${
        isDragActive ? "border-green-600 bg-green-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l4-4m0 0l4 4m-4-4v12" />
      </svg>
      {uploadedFile ? <p className="text-gray-700">{uploadedFile.name}</p> : <p className="text-gray-500">Drop file here or click to upload (PNG, JPEG, PDF, max 5MB)</p>}
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

      <button
        type="button"
        onClick={() => alert("Donation Completed!")}
        className="px-6 py-2 rounded-xl text-white"
        style={{ backgroundColor: primaryColor }}
        disabled={!uploadedFile}
      >
        Complete Donation
      </button>
    </div>
  </section>
)}

        </form>
      </div>
    </div>
  );
}
