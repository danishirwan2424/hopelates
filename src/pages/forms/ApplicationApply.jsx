import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UsersIcon, UserIcon, HomeIcon, BanknotesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Application_donate() {
  const primaryColor = "#278659";
  const darkColor = "#11452E";
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // STEP 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const [status, setStatus] = useState("");
  const [payslip, setPayslip] = useState(null);

  // STEP 4
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const steps = ["Personal Info", "Household Info", "Financial Info", "Confirmation"];
  const householdOptions = [{ label: "1–3" }, { label: "4–6" }, { label: "7–9" }];
  const stepIcons = [UserIcon, HomeIcon, BanknotesIcon, CheckCircleIcon];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/landing"), 1500);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Confetti recycle={false} />
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-3" style={{ color: darkColor }}>
            🎉 Application Submitted!
          </h1>
          <p className="text-gray-600">Thank you for applying for food aid.</p>
        </div>
      </div>
    );
  }

  // Reusable button style for hover effect
  const HoverButton = ({ children, onClick, disabled }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-xl text-white transition-colors duration-200 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {children}
    </button>
  );

  const BackButton = ({ children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 rounded-xl border transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800`}
      style={{ borderColor: darkColor, color: darkColor }}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* LEFT STEPS */}
      <div className="w-1/6 bg-white p-8 shadow-inner">
        <div className="relative">
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
                    completed ? "bg-green-600 text-white" : active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-4 mt-2 text-sm ${completed || active ? "text-green-700 font-medium" : "text-gray-400"}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-5/6 bg-white p-10 rounded-l-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6" style={{ color: darkColor }}>
          Food Aid Application
        </h1>

        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {currentStep === 1 && (
            <section className="space-y-4">
              <input placeholder="Full Name" className="w-full border p-3 rounded" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input placeholder="Email" type="email" className="w-full border p-3 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input placeholder="Password" type="password" className="w-full border p-3 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input placeholder="IC Number" className="w-full border p-3 rounded" value={icNumber} onChange={(e) => setIcNumber(e.target.value)} required />

              <div className="flex justify-between mt-6">
                <BackButton onClick={() => navigate("/landing")}>Back</BackButton>
                <HoverButton onClick={() => setCurrentStep(2)}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <section>
              <h2 className="font-semibold mb-4">Family Household</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {householdOptions.map((opt) => (
                  <motion.div
                    key={opt.label}
                    onClick={() => setHouseholdSize(opt.label)}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer border rounded-xl p-6 text-center ${householdSize === opt.label ? "border-green-600 bg-green-100" : "border-gray-300"}`}
                  >
                    <UsersIcon className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-sm text-gray-500">People</div>
                  </motion.div>
                ))}
              </div>

              <textarea placeholder="Home Address" className="w-full border p-3 rounded mb-4" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />
              <div className="grid grid-cols-3 gap-4 mb-6">
                <input placeholder="Postcode" className="border p-3 rounded" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
                <input placeholder="City" className="border p-3 rounded" value={city} onChange={(e) => setCity(e.target.value)} required />
                <input placeholder="State" className="border p-3 rounded" value={state} onChange={(e) => setState(e.target.value)} required />
              </div>

              <div className="flex justify-between">
                <BackButton onClick={() => setCurrentStep(1)}>Back</BackButton>
                <HoverButton onClick={() => setCurrentStep(3)} disabled={!householdSize}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <section className="space-y-6">
              <input
                placeholder="Occupation"
                className="w-full border p-3 rounded"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              />

              <div className="space-y-2">
                <label className="font-medium text-gray-700">Salary (RM): {salary || 0}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg accent-green-600 cursor-pointer"
                />
              </div>

              <input
                placeholder="Employment Status"
                className="w-full border p-3 rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />

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

              <div className="flex justify-between mt-6">
                <BackButton onClick={() => setCurrentStep(2)}>Back</BackButton>
                <HoverButton onClick={() => setCurrentStep(4)}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <section>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" onChange={(e) => setConfirmInfo(e.target.checked)} /> I confirm the information is correct
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" onChange={(e) => setAgreePrivacy(e.target.checked)} /> I agree to the Privacy Policy
              </label>
              <label className="flex items-center mb-6">
                <input type="checkbox" className="mr-2" onChange={(e) => setAgreeTerms(e.target.checked)} /> I agree to the Terms & Conditions
              </label>

              <div className="flex justify-between">
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
