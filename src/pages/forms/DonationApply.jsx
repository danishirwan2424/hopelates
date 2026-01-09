import React, { useState, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UserIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import DonorNav from "./Forms_cmp/DonorNav";

import PackageA from "../../images/PackageA.png";
import PackageB from "../../images/PackageB.png";
import PackageC from "../../images/PackageC.png";

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
    { id: "C", name: "PACKAGE C", price: 70, pax: "FOR 7-10 PAX", items: ["RICE", "BREAD", "BISCUITS"] },
  ];

  const packageImages = { A: PackageA, B: PackageB, C: PackageC };
  const steps = ["Select Package", "Donor Details", "Payment"];

  const handleQuantityChange = (pkgId, change) => {
    setPackageQuantities(prev => ({ ...prev, [pkgId]: Math.max(0, prev[pkgId] + change) }));
  };

  const calculateTotal = () =>
    packages.reduce((total, pkg) => total + pkg.price * packageQuantities[pkg.id], 0);

  const getTotalItems = () =>
    Object.values(packageQuantities).reduce((sum, qty) => sum + qty, 0);

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
      {/* Navigation */}
      <DonorNav />

      {/* Left Step Tracker */}
      <div className="hidden sm:flex w-1/6 bg-white p-6 sm:p-8 shadow-inner flex-col">
        <div className="ml-3 sm:ml-5 mt-[70px]">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            const active = index + 1 === currentStep;
            const completed = index + 1 < currentStep;

            return (
              <div key={index} className="flex items-start mb-6 sm:mb-8 relative">
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute left-4 top-10 w-0.5 h-full ${
                      completed ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}

                <div
                  className={`p-2 rounded-full z-10 flex items-center justify-center ${
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
                  className={`ml-4 mt-2 text-sm sm:text-base ${
                    completed || active ? "text-green-700 font-medium" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-grow bg-white p-4 sm:p-10 rounded-xl sm:rounded-l-2xl shadow-xl">
        <div className="mt-[50px]">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: darkColor }}>Food Donation</h1>
          <p className="italic mt-1 mb-6 text-gray-600 text-sm md:text-base">Complete the donation form step by step.</p>

          <form className="space-y-12">
            {/* STEP 1: Select Package */}
            {currentStep === 1 && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto max-w-7xl">
                  {packages.map(pkg => (
                    <div
                      key={pkg.id}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 flex flex-col items-center border border-gray-100 hover:-translate-y-1 w-full"
                      style={{ minHeight: "350px" }}
                    >
                      {/* Image */}
                      <div className="bg-white w-full flex items-center justify-center relative rounded-2xl mb-4 overflow-hidden h-[200px] sm:h-[250px] md:h-[280px]">
                        <img
                          src={packageImages[pkg.id]}
                          alt={pkg.name}
                          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                        />
                        {packageQuantities[pkg.id] > 0 && (
                          <div className="absolute top-2 right-2 bg-[#019461] text-white rounded-full min-w-[32px] h-8 px-2 flex items-center justify-center font-semibold text-sm shadow-md">
                            {packageQuantities[pkg.id]}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 text-center">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{pkg.pax}</p>

                      {/* Items */}
                      <ul className="my-2 space-y-1 text-sm text-gray-700">
                        {pkg.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-green-600">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-auto pt-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(pkg.id, -1)}
                          disabled={packageQuantities[pkg.id] === 0}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                          aria-label={`Decrease ${pkg.name}`}
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-semibold text-lg text-gray-800 min-w-[20px] text-center">
                          {packageQuantities[pkg.id]}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleQuantityChange(pkg.id, 1)}
                          className="p-2 rounded-lg bg-[#278659] text-white hover:bg-green-700 transition"
                          aria-label={`Increase ${pkg.name}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total + Buttons Row */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  {getTotalItems() > 0 && (
                    <div className="bg-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
                      <span className="font-medium">{getTotalItems()} Package(s) Selected</span>
                      <span className="font-bold">Total: RM {calculateTotal()}</span>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4 w-full md:w-auto justify-between md:justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/landing")}
                      className="px-6 py-2 rounded-xl text-white w-full md:w-auto"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 rounded-xl text-white w-full md:w-auto"
                      style={{ backgroundColor: primaryColor }}
                      disabled={getTotalItems() === 0}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* STEP 2: Donor Details */}
            {currentStep === 2 && (
              <section>
                <h2 className="text-xl md:text-2xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>Donor Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {["fullName", "email", "phone"].map(field => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm md:text-base font-medium" style={{ color: darkColor }}>
                        {field === "fullName" ? "Full Name" : field === "phone" ? "Phone Number" : "Email"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={userDetails[field]}
                        onChange={e => setUserDetails({ ...userDetails, [field]: e.target.value })}
                        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm md:text-base"
                        placeholder={field === "fullName" ? "Enter full name" : field === "phone" ? "0123456789" : "Email (optional)"}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col col-span-1 sm:col-span-2">
                    <label className="text-sm md:text-base font-medium" style={{ color: darkColor }}>Address</label>
                    <textarea
                      value={userDetails.address}
                      onChange={e => setUserDetails({ ...userDetails, address: e.target.value })}
                      rows={3}
                      className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm md:text-base"
                      placeholder="Full home address"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between sm:justify-end mt-6 gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 rounded-xl border w-full sm:w-auto"
                    style={{ borderColor: primaryColor, color: darkColor }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2 rounded-xl text-white w-full sm:w-auto"
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
                <h2 className="text-xl md:text-2xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>Payment</h2>

                <div
                  {...getRootProps()}
                  className={`w-full h-32 sm:h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
                    isDragActive ? "border-green-600 bg-green-50" : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  {uploadedFile ? (
                    <p className="text-gray-700 text-sm sm:text-base">{uploadedFile.name}</p>
                  ) : (
                    <p className="text-gray-500 text-sm sm:text-base">Drop file here or click to upload (PNG, JPEG, PDF, max 5MB)</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between sm:justify-end mt-6 gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2 rounded-xl border w-full sm:w-auto"
                    style={{ borderColor: primaryColor, color: darkColor }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Donation Completed!")}
                    className="px-6 py-2 rounded-xl text-white w-full sm:w-auto"
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
    </div>
  );
}
