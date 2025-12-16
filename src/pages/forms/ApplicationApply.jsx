import React, { useState, useEffect } from "react";
import { UserIcon, UsersIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Application_donate() {
  const primaryColor = "#278659";  
  const darkColor = "#11452E";     
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [householdSize, setHouseholdSize] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const steps = [
    { name: "Personal Info" },
    { name: "Household Info" },
    { name: "Financial Info" },
    { name: "Confirmation" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Automatically navigate after 1.5 seconds
    setTimeout(() => {
      navigate("/landing");
    }, 1500);
  };

  // If submitted, show success screen with confetti
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative">
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          numberOfPieces={150} 
          recycle={false} 
        />
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white p-10 rounded-2xl shadow-xl text-center z-10"
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: darkColor }}>
            🎉 Donation Completed!
          </h1>
          <p className="text-gray-700 mb-6">
            Thank you for your contribution. You are helping those in need!
          </p>
          <motion.div 
            className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ✅
          </motion.div>
        </motion.div>
      </div>
    );
  }

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
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Right Form */}
      <div className="w-5/6 p-10 bg-white rounded-l-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: darkColor }}>
          Food Aid Application
        </h1>
        <p className="italic mt-1 mb-6 text-gray-600">
          Fill out the form for food assistance.
        </p>

        <form className="space-y-12" onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {currentStep === 1 && (
            <section>
              {/* ... STEP 1 fields ... */}
              <div className="flex justify-end mt-6">
                <button type="button" onClick={() => navigate("/landing")} className="px-6 py-2 mr-4 rounded-xl text-white" style={{ backgroundColor: primaryColor }}>Back</button>
                <button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }}>Next</button>
              </div>
            </section>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <section>
              {/* ... Household selection ... */}
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(1)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
                <button type="button" onClick={() => setCurrentStep(3)} className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }} disabled={!householdSize}>Next</button>
              </div>
            </section>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <section>
              {/* ... Financial info ... */}
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
                <button type="button" onClick={() => setCurrentStep(4)} className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }}>Next</button>
              </div>
            </section>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <section>
              {/* ... Confirmation checkboxes ... */}
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(3)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
                <button type="submit" className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }} disabled={!(confirmInfo && agreePrivacy && agreeTerms)}>
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
