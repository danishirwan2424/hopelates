import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../../LandingPage_cmp/Navigator";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Application() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: "",
    icNumber: "",
    dateOfBirth: "",
    phoneNumber: "",
    homeAddress: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    // Step 2 - Household Info
    householdSize: "",
    // Step 3 - Financial Info
    financialOccupation: "",
    monthlyIncome: "",
    // Step 4 - Confirmation
    confirmInfo: false,
    agreePrivacy: false,
    agreeTerms: false
  });

  // Function to convert IC number to date of birth
  const convertICToDateOfBirth = (icNumber) => {
    // Remove any non-digit characters
    const digits = icNumber.replace(/\D/g, '');
    
    // Check if we have at least 6 digits
    if (digits.length < 6) return "";
    
    // Extract first 6 digits: YYMMDD
    const year = digits.substring(0, 2);
    const month = digits.substring(2, 4);
    const day = digits.substring(4, 6);
    
    // Validate month and day
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    
    if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
      return "";
    }
    
    // Determine century (assume current year cutoff at 25)
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of current year
    const fullYear = yearNum <= currentYear + 10 ? `20${year}` : `19${year}`;
    
    // Return in YYYY-MM-DD format for input[type="date"]
    return `${fullYear}-${month}-${day}`;
  };

  // Update date of birth when IC number changes
  useEffect(() => {
    if (formData.icNumber) {
      const dob = convertICToDateOfBirth(formData.icNumber);
      if (dob && dob !== formData.dateOfBirth) {
        setFormData(prev => ({
          ...prev,
          dateOfBirth: dob
        }));
      }
    }
  }, [formData.icNumber]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.confirmInfo || !formData.agreeTerms) {
      alert("Please agree to all terms before submitting");
      return;
    }
    setShowSuccessModal(true);
  };

  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Household Info" },
    { num: 3, label: "Financial Info" },
    { num: 4, label: "Confirmation" }
  ];

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      <Navigator />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[20px] p-8 max-w-md w-full border-2 border-[#019461] shadow-2xl"
          >
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-[#019461] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-[28px] font-bold text-gray-900 mb-3">
                Application Successful!
              </h2>
              
              {/* Description */}
              <p className="text-gray-600 text-[14px] mb-6">
                Thank you for applying for food assistance with HOPEPLATES.
              </p>

              {/* Application Details */}
              <div className="bg-[#F9F9F9] rounded-[12px] p-5 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-[13px]">Application ID:</span>
                  <span className="text-gray-900 font-semibold text-[14px]">AP{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-[13px]">Applicant:</span>
                  <span className="text-gray-900 font-semibold text-[14px]">{formData.fullName || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-[13px]">Date:</span>
                  <span className="text-gray-900 font-semibold text-[14px]">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/landing")}
                  className="flex-1 bg-[#019461] text-white py-3 rounded-[25px] text-[14px] font-semibold hover:bg-[#017a54] transition-all duration-200"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setCurrentStep(1);
                    setFormData({
                      fullName: "",
                      icNumber: "",
                      dateOfBirth: "",
                      phoneNumber: "",
                      homeAddress: "",
                      city: "",
                      state: "",
                      postalCode: "",
                      email: "",
                      householdSize: "",
                      financialOccupation: "",
                      monthlyIncome: "",
                      confirmInfo: false,
                      agreePrivacy: false,
                      agreeTerms: false
                    });
                  }}
                  className="flex-1 bg-white border-2 border-[#019461] text-[#019461] py-3 rounded-[25px] text-[14px] font-semibold hover:bg-[#019461] hover:text-white transition-all duration-200"
                >
                  Apply Again
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="pt-[120px] px-8 pb-16">
        <div className="max-w-[1400px] mx-auto flex gap-8">
          {/* Left Sidebar - Steps */}
          <div className="w-[200px] flex-shrink-0 pt-8">
            <div className="relative">
              {steps.map((step, index) => (
                <div key={step.num} className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-[14px] ${
                      currentStep === step.num 
                        ? "bg-[#019461] text-white" 
                        : currentStep > step.num
                        ? "bg-[#019461] text-white"
                        : "bg-[#D9D9D9] text-gray-500"
                    }`}>
                      {currentStep > step.num ? "✓" : step.num}
                    </div>
                    <span className={`text-[14px] font-medium ${
                      currentStep === step.num ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className={`absolute left-4 top-8 w-[2px] h-8 -translate-x-1/2 ${
                        currentStep > step.num ? "bg-[#019461]" : "bg-[#D9D9D9]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="flex-1 bg-white rounded-[8px] shadow-sm">
            <div className="p-12">
              <div className="mb-10">
                <h1 className="text-[32px] font-bold text-gray-900 mb-1">
                  Food Aid Application
                </h1>
                <p className="text-gray-500 text-[14px]">
                  Fill out the form for food assistance.
                </p>
              </div>

              {/* Step 1 - Personal Information */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                  <div className="border-l-4 border-[#019461] pl-4 mb-8">
                    <h2 className="text-[18px] font-semibold text-gray-900">
                      Personal Information
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter full name"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          IC Number / Serial
                        </label>
                        <input
                          type="text"
                          name="icNumber"
                          value={formData.icNumber}
                          onChange={handleInputChange}
                          placeholder="e.g., 040605040505"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                        <p className="text-[11px] text-gray-500 mt-1">Date of birth will be auto-filled</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] bg-gray-50"
                          readOnly
                        />
                        <p className="text-[11px] text-gray-500 mt-1">Auto-filled from IC number</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="e.g., 0123456789"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-[13px] font-medium mb-2">
                        Home Address
                      </label>
                      <textarea
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        placeholder="Enter your full home address"
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="Postal Code"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Email (optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g., example@mail.com"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-10">
                    <button
                      onClick={handleNext}
                      className="bg-[#019461] text-white font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 - Household Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-l-4 border-[#019461] pl-4 mb-8">
                    <h2 className="text-[18px] font-semibold text-gray-900">
                      Household Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {[
                      { value: "1-3", label: "1-3 Members", icon: "👤" },
                      { value: "4-7", label: "4-7 Members", icon: "👥" },
                      { value: "8+", label: "8+ Members", icon: "👨‍👩‍👧‍👦" }
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => setFormData({ ...formData, householdSize: option.value })}
                        className={`border-2 rounded-[8px] p-6 cursor-pointer text-center transition-all ${
                          formData.householdSize === option.value
                            ? "border-[#019461] bg-[#E8F5F1]"
                            : "border-gray-300 hover:border-[#019461]"
                        }`}
                      >
                        <div className="text-[48px] mb-3">{option.icon}</div>
                        <p className="text-[14px] font-medium text-gray-700">{option.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-10">
                    <button
                      onClick={handleBack}
                      className="bg-white border-2 border-gray-300 text-gray-700 font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-gray-50 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-[#019461] text-white font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Financial Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-l-4 border-[#019461] pl-4 mb-8">
                    <h2 className="text-[18px] font-semibold text-gray-900">
                      Financial Information
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Occupation
                        </label>
                        <input
                          type="text"
                          name="financialOccupation"
                          value={formData.financialOccupation}
                          onChange={handleInputChange}
                          placeholder="Enter occupation"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Monthly Income (RM)
                        </label>
                        <input
                          type="text"
                          name="monthlyIncome"
                          value={formData.monthlyIncome}
                          onChange={handleInputChange}
                          placeholder="Enter monthly income"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-10">
                    <button
                      onClick={handleBack}
                      className="bg-white border-2 border-gray-300 text-gray-700 font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-gray-50 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-[#019461] text-white font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4 - Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-l-4 border-[#019461] pl-4 mb-8">
                    <h2 className="text-[18px] font-semibold text-gray-900">
                      Confirmation
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Checkbox 1 */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="confirmInfo"
                        checked={formData.confirmInfo}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <div>
                        <p className="text-[14px] text-gray-700 font-medium mb-2">
                          I confirm all information provided is accurate and complete.
                        </p>
                        <p className="text-[12px] text-gray-500 leading-relaxed">
                          We respect your privacy and will only use your personal information to process your application. Your data will not be shared with third parties without your consent and will be stored securely.
                        </p>
                      </div>
                    </div>

                    {/* Checkbox 3 */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <div>
                        <p className="text-[14px] text-gray-700 font-medium mb-2">
                          I have read and agree to the Terms & Conditions.
                        </p>
                        <p className="text-[12px] text-gray-500 leading-relaxed">
                          By submitting this form, you agree to follow all guidelines for receiving aid. Misrepresentation of information may result in disqualification. We reserve the right to modify or cancel the program at any time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-10">
                    <button
                      onClick={handleBack}
                      className="bg-white border-2 border-gray-300 text-gray-700 font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-gray-50 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-[#019461] text-white font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;