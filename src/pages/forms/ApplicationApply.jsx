import React, { useState } from "react";
import { UserIcon, UsersIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { motion } from "framer-motion";

export default function Application_donate() {
  const primaryColor = "#278659";  // lighter green
  const darkColor = "#11452E";     // darker green
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmInfo, setConfirmInfo] = useState(false);
const [agreePrivacy, setAgreePrivacy] = useState(false);
const [agreeTerms, setAgreeTerms] = useState(false);
const [householdSize, setHouseholdSize] = useState('');



  const steps = [
    { name: "Personal Info" },
    { name: "Household Info" },
    { name: "Financial Info" },
    { name: "Confirmation" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Tracker */}
      <div
        className="w-1/6 bg-white shadow-inner flex flex-col items-start py-10 px-8       overflow-y-auto"
        style={{ maxHeight: "100vh", position: "sticky", top: 0 }}
      >
        {steps.map((step, index) => (
          <div key={index} className="flex items-start relative mb-8">
            <div className="flex flex-col items-center mr-4 relative">
              {/* Dot */}
              <div
                className={`w-4 h-4 rounded-full z-10 ${index + 1 <= currentStep ? "bg-[#278659]      " : "bg-gray-300"}`}
              />

              {/* Green Line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1"
                  style={{
                    height: "calc(100% + 20px)", // connect to next dot
                    backgroundColor: index + 1 < currentStep ? "#278659" : "#d1d5db",
                  }}
                />
              )}
            </div>
            
            {/* Step Label */}
            <span
              className={`mt-1 font-medium ${index + 1 <= currentStep ? "text-[#11452E]" :      "text-gray-400"}`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>




      {/* Right Form */}
      <div className="w-4/4 p-10 bg-white rounded-l-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: darkColor }}>
          Food Aid Application
        </h1>
        <p className="italic mt-1 mb-6 text-gray-600">
          Fill out the form for food assistance.
        </p>

        <form className="space-y-12">
          {/* STEP 1 */}
{currentStep === 1 && (
  <section>
    <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
      Personal Information
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Full Name */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Full Name</label>
        <input 
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }} 
          placeholder="Enter full name"
        />
      </div>

      {/* IC Number / Serial */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>IC Number / Serial</label>
        <input 
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }} 
          placeholder="e.g., 020304040505"
        />
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Date of Birth</label>
        <input 
          type="date"
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }}
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Phone Number</label>
        <input 
          type="tel"
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }}
          placeholder="e.g., 0123456789"
        />
      </div>

      {/* Home Address */}
      <div className="flex flex-col col-span-2">
        <label style={{ color: darkColor }}>Home Address</label>
        <textarea
          className="p-3 border rounded-xl"
          style={{ borderColor: primaryColor, outlineColor: primaryColor }}
          placeholder="Enter your full home address"
          rows={3}
        />
      </div>

      {/* City */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>City</label>
        <input 
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }}
          placeholder="City"
        />
      </div>

      {/* State */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>State</label>
        <input 
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }}
          placeholder="State"
        />
      </div>

      {/* Postal Code */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Postal Code</label>
        <input 
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }}
          placeholder="Postal Code"
        />
      </div>

      {/* Occupation */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Occupation</label>
        <input 
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }} 
          placeholder="e.g., Teacher, Driver"
        />
      </div>

      {/* Monthly Salary */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Monthly Salary (RM)</label>
        <input 
          type="number"
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }} 
          placeholder="e.g., 2000"
        />
      </div>

      {/* Email (optional) */}
      <div className="flex flex-col">
        <label style={{ color: darkColor }}>Email (optional)</label>
        <input 
          type="email"
          className="p-3 border rounded-xl" 
          style={{ borderColor: primaryColor, outlineColor: primaryColor }} 
          placeholder="e.g., example@mail.com"
        />
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button 
        type="button" 
        onClick={() => setCurrentStep(2)} 
        className="px-6 py-2 rounded-xl text-white" 
        style={{ backgroundColor: primaryColor }}
      >
        Next
      </button>
    </div>
  </section>
)}



          {/* STEP 2 */}
{currentStep === 2 && (
  <section>
    <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
      Household Information
    </h2>

    {/* State for selected household */}
    {/*
      At the top of your component:
      const [householdSize, setHouseholdSize] = useState('');
    */}

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button 
        type="button" 
        className={`flex flex-col items-center p-4 rounded-xl border transition ${
          householdSize === '1-3' ? 'bg-[#278659]/20 border-[#278659]' : 'border-gray-300 hover:bg-[#278659]/10'
        }`} 
        style={{ borderColor: primaryColor }}
        onClick={() => setHouseholdSize('1-3')}
      >
        <UserIcon className="w-12 h-12" style={{ color: primaryColor }} />
        <span style={{ color: darkColor }}>1-3 Members</span>
      </button>

      <button 
        type="button" 
        className={`flex flex-col items-center p-4 rounded-xl border transition ${
          householdSize === '4-7' ? 'bg-[#278659]/20 border-[#278659]' : 'border-gray-300 hover:bg-[#278659]/10'
        }`} 
        style={{ borderColor: primaryColor }}
        onClick={() => setHouseholdSize('4-7')}
      >
        <UsersIcon className="w-12 h-12" style={{ color: primaryColor }} />
        <span style={{ color: darkColor }}>4-7 Members</span>
      </button>

      <button 
        type="button" 
        className={`flex flex-col items-center p-4 rounded-xl border transition ${
          householdSize === '8-12' ? 'bg-[#278659]/20 border-[#278659]' : 'border-gray-300 hover:bg-[#278659]/10'
        }`} 
        style={{ borderColor: primaryColor }}
        onClick={() => setHouseholdSize('8-12')}
      >
        <UserGroupIcon className="w-12 h-12" style={{ color: primaryColor }} />
        <span style={{ color: darkColor }}>8-12 Members</span>
      </button>
    </div>

    <div className="flex justify-between mt-6">
      <button type="button" onClick={() => setCurrentStep(1)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
      <button 
        type="button" 
        onClick={() => setCurrentStep(3)} 
        className="px-6 py-2 rounded-xl text-white" 
        style={{ backgroundColor: primaryColor }}
        disabled={!householdSize} // prevent next without selecting
      >
        Next
      </button>
    </div>
  </section>
)}


          {/* STEP 3 */}
          {currentStep === 3 && (
            <section>
              <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
                Financial Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Occupation</label>
                  <input className="p-3 border rounded-xl" style={{ borderColor: primaryColor, outlineColor: primaryColor }}/>
                </div>
                <div className="flex flex-col">
                  <label style={{ color: darkColor }}>Monthly Income (RM)</label>
                  <input className="p-3 border rounded-xl" style={{ borderColor: primaryColor, outlineColor: primaryColor }}/>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
                <button type="button" onClick={() => setCurrentStep(4)} className="px-6 py-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }}>Next</button>
              </div>
            </section>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
  <section>
    <h2 className="text-xl font-semibold pl-4 border-l-4 mb-4" style={{ borderColor: primaryColor, color: darkColor }}>
      Confirmation
    </h2>

    {/* State for checkboxes */}
    {/*
      We add these at the top of the component:
      const [confirmInfo, setConfirmInfo] = useState(false);
      const [agreePrivacy, setAgreePrivacy] = useState(false);
      const [agreeTerms, setAgreeTerms] = useState(false);
    */}

    {/* Info Confirmation */}
    <label className="flex items-start gap-3 cursor-pointer mb-3">
      <input 
        type="checkbox" 
        style={{ accentColor: primaryColor }}
        checked={confirmInfo}
        onChange={() => setConfirmInfo(!confirmInfo)}
      />
      <span style={{ color: darkColor }}>I confirm all information provided is accurate and complete.</span>
    </label>

    {/* Privacy Policy */}
    <label className="flex flex-col gap-2 mb-3">
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          style={{ accentColor: primaryColor }}
          checked={agreePrivacy}
          onChange={() => setAgreePrivacy(!agreePrivacy)}
        />
        <span style={{ color: darkColor }}>I have read and agree to the Privacy Policy:</span>
      </div>
      <div className="p-3 border rounded-xl h-32 overflow-y-auto text-sm text-gray-700" style={{ borderColor: primaryColor }}>
        <p>
          We respect your privacy and will only use your personal information to process your application. 
          Your data will not be shared with third parties without your consent, and will be stored securely.
        </p>
      </div>
    </label>

    {/* Terms & Conditions */}
    <label className="flex flex-col gap-2 mb-3">
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          style={{ accentColor: primaryColor }}
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
        />
        <span style={{ color: darkColor }}>I have read and agree to the Terms & Conditions:</span>
      </div>
      <div className="p-3 border rounded-xl h-32 overflow-y-auto text-sm text-gray-700" style={{ borderColor: primaryColor }}>
        <p>
          By submitting this form, you agree to follow all guidelines for receiving aid. 
          Misrepresentation of information may result in disqualification. We reserve the right to modify or cancel the program at any time.
        </p>
      </div>
    </label>

    <div className="flex justify-between mt-6">
      <button type="button" onClick={() => setCurrentStep(3)} className="px-6 py-2 rounded-xl border" style={{ borderColor: primaryColor, color: darkColor }}>Back</button>
      <button 
        type="submit" 
        className="px-6 py-2 rounded-xl text-white" 
        style={{ backgroundColor: primaryColor }}
        disabled={!(confirmInfo && agreePrivacy && agreeTerms)}
      >
        Submit
      </button>
    </div>
  </section>
)}


        </form>
      </div>
    </div>
  );
}
