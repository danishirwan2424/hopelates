import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UsersIcon, UserIcon, HomeIcon, BanknotesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import FormNav from "./Forms_cmp/ApplicationNav";


export default function Application_donate() {
  const primaryColor = "#278659";
  const darkColor = "#11452E";
  const navigate = useNavigate();

  // 🔐 Get logged-in beneficiary
  const user = JSON.parse(localStorage.getItem("user"));
  const beneficiaryId = user?.beneficiary_id;

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // STEP 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [icNumber, setIcNumber] = useState("");

  // STEP 2
  const [householdSize, setHouseholdSize] = useState(null);
  const [homeAddress, setHomeAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // STEP 3
  const [occupation, setOccupation] = useState("");
  const [salary, setSalary] = useState("");
  const [payslip, setPayslip] = useState(null);

  // STEP 4
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  //Auto-fill from localStorage
  useEffect(() => {
  const raw = localStorage.getItem("user");
  if (!raw) return;

  const user = JSON.parse(raw);
  console.log("AUTO-FILL application sees:", user);

  setFullName(user?.full_name || "");
  setEmail(user?.email || "");
}, []);

  const steps = ["Personal Info", "Household Info", "Financial Info", "Confirmation"];
  const householdOptions = [{ label: "1–3" }, { label: "4–6" }, { label: "7–9" }];
  const stepIcons = [UserIcon, HomeIcon, BanknotesIcon, CheckCircleIcon];

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔐 Safety check
  if (!beneficiaryId) {
    alert("User not logged in");
    return;
  }

  // 🔁 Map household size to family_no
  let familyNo = 0;
  if (householdSize === "1–3") familyNo = 3;
  else if (householdSize === "4–6") familyNo = 6;
  else if (householdSize === "7–9") familyNo = 9;

  if (familyNo === 0) {
    alert("Please select household size");
    return;
  }

  // 📦 Build payload for backend
  const payload = {
    beneficiary_id: beneficiaryId,
    ic_no: icNumber,
    address: homeAddress,
    postcode,
    city,
    state,
    occupation,
    salary,
    family_no: familyNo
  };

  try {
    const res = await fetch("http://localhost:5000/api/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Submission failed");
      return;
    }

    // ✅ Success
    setSubmitted(true);

  } catch (error) {
    console.error("Submit error:", error);
    alert("Server error. Please try again.");
  }
};



  // Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setPayslip(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Confetti recycle={false} />
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: darkColor }}>
            🎉 Application Submitted!
          </h1>
          <p className="text-gray-600">Thank you for applying for food aid.</p>
        </div>
      </div>
    );
  }

  const HoverButton = ({ children, onClick, disabled, type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white transition-colors duration-200 ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {children}
    </button>
  );

  const BackButton = ({ children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl border transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 w-full sm:w-auto mb-2 sm:mb-0`}
      style={{ borderColor: darkColor, color: darkColor }}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row p-4 sm:p-0">
      <FormNav />
      {/* LEFT STEPS - hidden on mobile */}
      <div className="hidden pt-[100px] sm:flex w-1/6 bg-white p-8 shadow-inner flex-col">
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

      {/* RIGHT FORM */}
      <div className="flex-grow pt-[80px] px-4 sm:px-10 bg-white rounded-xl sm:rounded-l-2xl shadow-xl">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: darkColor }}>
          Food Aid Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <section className="space-y-4">
              <input placeholder="Full Name" className="w-full border p-3 rounded" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input placeholder="Email" type="email" className="w-full border p-3 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input placeholder="IC Number" className="w-full border p-3 rounded" value={icNumber} onChange={(e) => setIcNumber(e.target.value)} required />

              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <BackButton onClick={() => navigate("/landing")}>Back</BackButton>
                <HoverButton onClick={() => setCurrentStep(2)}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <section className="space-y-4">
              <h2 className="font-semibold mb-2">Family Household</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {householdOptions.map((opt) => (
                    <motion.div
                      key={opt.label}
                      onClick={() => setHouseholdSize(opt.label)}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer border rounded-xl p-4 sm:p-6 text-center w-full $                {householdSize === opt.label ? "border-green-600 bg-green-100" : "border-gray-300"}`}
                    >
                      <UsersIcon className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-gray-500" />
                      <div className="font-semibold">{opt.label}</div>
                      <div className="text-xs sm:text-sm text-gray-500">People</div>
                    </motion.div>
                  ))}
                </div>


              <textarea placeholder="Home Address" className="w-full border p-3 rounded mb-4" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />

              <input placeholder="Postcode" className="w-full border p-3 rounded" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
              <input placeholder="City" className="w-full border p-3 rounded" value={city} onChange={(e) => setCity(e.target.value)} required />
              <input placeholder="State" className="w-full border p-3 rounded" value={state} onChange={(e) => setState(e.target.value)} required />

              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <BackButton onClick={() => setCurrentStep(1)}>Back</BackButton>
                <HoverButton onClick={() => setCurrentStep(3)} disabled={!householdSize}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <section className="space-y-4">
              <input placeholder="Occupation" className="w-full border p-3 rounded" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />

              <div className="space-y-2">
                <label className="font-medium text-gray-700">Salary (RM): {salary || 0}</label>
                <input type="range" min="0" max="10000" step="100" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg accent-green-600 cursor-pointer" />
              </div>

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
                {payslip ? <p className="text-gray-700">{payslip.name}</p> : <p className="text-gray-500">Drop Image</p>}
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <BackButton onClick={() => setCurrentStep(2)}>Back</BackButton>
                <HoverButton onClick={() => setCurrentStep(4)}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <section className="space-y-4">
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" onChange={(e) => setConfirmInfo(e.target.checked)} /> I confirm the information is correct
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" onChange={(e) => setAgreePrivacy(e.target.checked)} /> I agree to the Privacy Policy
              </label>
              <label className="flex items-center mb-6">
                <input type="checkbox" className="mr-2" onChange={(e) => setAgreeTerms(e.target.checked)} /> I agree to the Terms & Conditions
              </label>

              <div className="flex flex-col sm:flex-row justify-between">
                <BackButton onClick={() => setCurrentStep(3)}>Back</BackButton>
                <HoverButton type="submit" disabled={!(confirmInfo && agreePrivacy && agreeTerms)}>Submit</HoverButton>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
