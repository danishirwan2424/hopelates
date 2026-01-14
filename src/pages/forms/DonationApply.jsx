import React, { useState, useEffect } from "react";
import { Plus, Minus, Upload, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import DonorNav from "./Forms_cmp/DonorNav";
import axios from "axios";

import PackageA from "../../images/PACKAGEA.png";
import PackageC from "../../images/PACKAGEC.png";
import PackageB from "../../images/PACKAGEB.png";

// THE NEW IMAGE IMPORT
import QRCodeImg from "../../images/qr.png";
import { Copy } from "lucide-react";

export default function DonationApply() {
  const primaryColor = "#278659";
  const darkColor = "#11452E";
  const navigate = useNavigate();

  const stepIcons = [UserIcon, UserIcon, BanknotesIcon];

  const [currentStep, setCurrentStep] = useState(1);
  const [packageQuantities, setPackageQuantities] = useState({ A: 0, B: 0, C: 0 });
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // ✅ NEW: prevent double submit
  const [submitting, setSubmitting] = useState(false);

  // ✅ NEW: backend URL (change port if your backend not 3000)
  const API_BASE = "http://localhost:5000";

  //For Auto-fill user details if logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role === "donor") {
      setUserDetails((prev) => ({
        ...prev,
        fullName: user.full_name || "",
        email: user.email || "",
      }));
    }
  }, []);

  const packages = [
    { id: "A", name: "PACKAGE A", price: 20, pax: "FOR 1-3 PAX", items: ["RICE-1", "OIL COOKING-1", "CANNED SARDINES-1", "CHOCOLATE DRINK-1", "INSTANT NOODLES-1"] },
    { id: "B", name: "PACKAGE B", price: 50, pax: "FOR 4-6 PAX", items: ["RICE-2", "OIL COOKING-2", "CANNED SARDINES-2", "CHOCOLATE DRINK-2", "INSTANT NOODLES-2"] },
    { id: "C", name: "PACKAGE C", price: 70, pax: "FOR 7-10 PAX", items: ["RICE-3", "OIL COOKING-3", "CANNED SARDINES-3", "CHOCOLATE DRINK-3", "INSTANT NOODLES-3"]  },
  ];

  const packageImages = { A: PackageA, B: PackageB, C: PackageC };
  const steps = ["Select Package", "Donor Details", "Payment"];

  const handleQuantityChange = (pkgId, change) => {
    setPackageQuantities(prev => ({ ...prev, [pkgId]: Math.max(0, prev[pkgId] + change) }));
  };

  const isDonorStepValid = () =>
    userDetails.fullName && userDetails.phone && userDetails.address;

  const selectedPackages = packages
    .filter(pkg => packageQuantities[pkg.id] > 0)
    .map(pkg => ({ ...pkg, quantity: packageQuantities[pkg.id], subtotal: pkg.price * packageQuantities[pkg.id] }));

  const calculateTotal = () =>
    packages.reduce((total, pkg) => total + pkg.price * packageQuantities[pkg.id], 0);

  const getTotalItems = () =>
    Object.values(packageQuantities).reduce((sum, qty) => sum + qty, 0);

  //payment_receipt as base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
  // ✅ NEW: send data to backend
  const submitDonationToBackend = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.donor_id) {
      alert("No donor found. Please login again.");
      return null;
    }
    const receiptBase64 = uploadedFile ? await getBase64(uploadedFile) : null;
    const payload = {
      donor_id: user.donor_id,
      total_amount: calculateTotal(),
      payment_receipt: receiptBase64,
      packages: [
        { package_id: 1, quantity: packageQuantities.A },
        { package_id: 2, quantity: packageQuantities.B },
        { package_id: 3, quantity: packageQuantities.C }
      ]
    };

    // ✅ IMPORTANT: call backend port, not 5173
    const res = await axios.post(`${API_BASE}/api/donation`, payload);
    return res.data; // { donation_id: ... }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row p-4 sm:p-0">
      {/* Navigation */}
      <DonorNav />

      {/* Left Step Tracker */}
      <div className="hidden sm:flex w-1/6 bg-white p-6 sm:p-8 shadow-lg shadow-gray-400 flex-col sticky top-0 h-screen">
        <div className="ml-3 sm:ml-5 mt-[70px]">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            const active = index + 1 === currentStep;
            const completed = index + 1 < currentStep;

            return (
              <div key={index} className="flex items-start mb-6 sm:mb-8 relative">
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute left-4 top-10 w-0.5 h-full ${completed ? "bg-green-600" : "bg-gray-300"}`}
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
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: darkColor }}>
            Food Donation
          </h1>
          <p className="italic mt-1 mb-6 text-gray-600 text-sm md:text-base">
            Complete the donation form step by step.
          </p>

          <form className="space-y-12">
            {/* STEP 1: Select Package */}
            {currentStep === 1 && (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-6xl mx-auto">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex flex-col">
                      <div className="text-center mb-4">
                        <h3 className="text-[20px] font-bold text-gray-900 underline decoration-2 underline-offset-4 inline-block">
                          {pkg.name}
                        </h3>
                      </div>

                      <div
                        className={`bg-white rounded-[16px] shadow-md transition-all overflow-hidden ${
                          packageQuantities[pkg.id] > 0 ? "ring-4 ring-[#019461]" : "hover:shadow-lg"
                        }`}
                      >
                        <div className="h-[180px] flex items-center justify-center relative overflow-hidden">
                          <img src={packageImages[pkg.id]} alt={pkg.name} className="h-full object-contain" />
                          {packageQuantities[pkg.id] > 0 && (
                            <div className="absolute top-3 right-3 bg-[#019461] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-[14px]">
                              {packageQuantities[pkg.id]}
                            </div>
                          )}
                        </div>

                        <div className="p-6 text-center">
                          <p className="text-[28px] font-bold text-gray-900 mb-2">RM {pkg.price}</p>
                          <p className="text-[14px] font-semibold text-gray-600 mb-6">{pkg.pax}</p>

                          <ul className="space-y-2 text-left mb-6">
                            {pkg.items.map((item, index) => (
                              <li key={index} className="text-[14px] text-gray-800 font-medium flex items-center">
                                <span className="mr-2 text-gray-600">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                            <button
                              type="button"
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
                            <span className="text-[20px] font-bold text-gray-900 w-12 text-center">{packageQuantities[pkg.id]}</span>
                            <button
                              type="button"
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

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  {getTotalItems() > 0 && (
                    <div className="bg-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
                      <span className="font-medium">{getTotalItems()} Package(s) Selected</span>
                      <span className="font-bold">Total: RM {calculateTotal()}</span>
                    </div>
                  )}

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
                <h2
                  className="text-xl md:text-2xl font-semibold pl-4 border-l-4 mb-4"
                  style={{ borderColor: primaryColor, color: darkColor }}
                >
                  Donor Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {["fullName", "email"].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm md:text-base font-medium" style={{ color: darkColor }}>
                        {field === "fullName" ? "Full Name" : "Email"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={userDetails[field]}
                        onChange={(e) => setUserDetails({ ...userDetails, [field]: e.target.value })}
                        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm md:text-base"
                        placeholder={field === "fullName" ? "Enter full name" : "Email (optional)"}
                      />
                    </div>
                  ))}
                </div>

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
                    disabled={!userDetails.fullName}
                  >
                    Next
                  </button>
                </div>
              </section>
            )}

            {/* STEP 3: Payment */}
            {currentStep === 3 && (
              <section className="flex flex-col gap-8">
                {/* Order Summary */}
                <div className="bg-[#E8F5F1] p-6 rounded-[8px]">
                  <h2 className="text-[18px] font-semibold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {selectedPackages.map((pkg, index) => (
                      <div key={index} className="flex justify-between items-center text-[14px]">
                        <div>
                          <p className="text-gray-900 font-medium">{pkg.name}</p>
                          <p className="text-gray-600 text-[13px]">RM {pkg.price} × {pkg.quantity}</p>
                        </div>
                        <p className="text-gray-900 font-semibold">RM {pkg.subtotal}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-300 text-[14px]">
                    <span className="text-gray-600">Donor:</span>
                    <span className="font-semibold text-gray-900">{userDetails.fullName || "N/A"}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-[#019461] text-[16px] font-semibold">Total Amount</p>
                      <p className="text-gray-600 text-[13px]">{getTotalItems()} package{getTotalItems() > 1 ? "s" : ""}</p>
                    </div>
                    <p className="text-[#019461] text-[24px] font-bold">RM {calculateTotal()}</p>
                  </div>
                </div>

                {/* --- NEW: QR Code & Bank Account Section --- */}
<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
  <h2 className="text-[18px] font-bold text-gray-900 mb-4 text-center">Payment Information</h2>
  
  <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
    {/* QR Image Part */}
    <div className="text-center">
      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-100">
        <img src={QRCodeImg} alt="Payment QR Code" className="w-40 h-40 object-contain mx-auto" />
      </div>
      <p className="text-[12px] text-gray-500 mt-2 font-medium">Scan to Pay via DuitNow</p>
    </div>

    {/* Account Number Part */}
    <div className="space-y-4 flex-1 max-w-xs">
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-[11px] text-gray-500 uppercase font-bold">Bank Name</p>
        <p className="text-[15px] font-semibold text-gray-800">MAYBANK BERHAD</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-[11px] text-gray-500 uppercase font-bold">Account Number</p>
        <p className="text-[16px] font-mono font-bold text-[#019461]">1622 8412 3456</p>
      </div>
    </div>
  </div>
</div>


                {/* Upload Proof of Payment */}
                <div className="border-2 border-dashed border-gray-300 rounded-[8px] p-6 text-center hover:border-[#019461] transition-all duration-200">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*,.pdf"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        setUploadedFile(file);
                        setFileName(file.name);
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    {uploadedFile ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="w-16 h-16 text-[#019461] mb-3" />
                        <p className="text-[#019461] font-semibold text-[14px] mb-1">File Uploaded Successfully!</p>
                        <p className="text-gray-600 text-[13px] mb-3">{fileName}</p>
                        <button
                          type="button"
                          onClick={e => {
                            e.preventDefault();
                            document.getElementById("file-upload").click();
                          }}
                          className="text-[#019461] text-[13px] underline hover:text-[#017a54]"
                        >
                          Change file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-700 font-medium text-[14px] mb-1">Click to upload payment receipt</p>
                        <p className="text-gray-500 text-[13px]">PNG, JPG, PDF up to 10MB</p>
                      </div>
                    )}
                  </label>
                  {!uploadedFile && (
                    <p className="text-red-500 text-[13px] mt-2 text-center">
                      * Payment receipt is required to complete the transaction
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-[#E5E7EB] text-gray-700 font-semibold text-[14px] py-2.5 rounded-[6px] hover:bg-gray-300 transition-all duration-200"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={!uploadedFile || submitting}
                    onClick={async () => {
                      if (!uploadedFile) return alert("Please upload proof of payment before proceeding");
                      if (submitting) return;

                      try {
                        setSubmitting(true);

                        // ✅ insert into DB
                        const result = await submitDonationToBackend();
                        if (!result || !result.donation_id) {
                          alert("Donation failed (no donation_id returned)");
                          return;
                        }

                        const donationData = {
                          donationId: result.donation_id, // ✅ real DB id
                          packages: selectedPackages,
                          totalAmount: calculateTotal(),
                          totalItems: getTotalItems(),
                          donorName: userDetails.fullName,
                          paymentMethod: "Online Transfer",
                          transactionDate: new Date().toLocaleString(),
                        };

                        navigate("/donation/donation-confirmation", { state: donationData });

                      } catch (err) {
                        console.error(err);
                        alert("Donation failed");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className={`flex-1 font-semibold text-[14px] py-2.5 rounded-[6px] transition-all duration-200 ${
                      uploadedFile && !submitting
                        ? "bg-[#019461] text-white hover:bg-[#017a54] cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {submitting ? "Processing..." : "Complete Payment"}
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
