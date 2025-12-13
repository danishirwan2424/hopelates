import React, { useState } from "react";
import Navigator from "../../LandingPage_cmp/Navigator";

function Application() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    icNumber: "",
    dateOfBirth: "",
    phoneNumber: "",
    homeAddress: "",
    city: "",
    state: "",
    postalCode: "",
    occupation: "",
    monthlySalary: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
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
                  {/* Connector Line */}
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

              {currentStep === 1 && (
                <div>
                  <div className="border-l-4 border-[#019461] pl-4 mb-8">
                    <h2 className="text-[18px] font-semibold text-gray-900">
                      Personal Information
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name and IC Number */}
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
                          placeholder="e.g., 020304040505"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                    </div>

                    {/* Date of Birth and Phone Number */}
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
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
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

                    {/* Home Address */}
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

                    {/* City and State */}
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

                    {/* Postal Code and Occupation */}
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
                          Occupation
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          placeholder="e.g., Teacher, Driver"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                        />
                      </div>
                    </div>

                    {/* Monthly Salary and Email */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-[13px] font-medium mb-2">
                          Monthly Salary (RM)
                        </label>
                        <input
                          type="text"
                          name="monthlySalary"
                          value={formData.monthlySalary}
                          onChange={handleInputChange}
                          placeholder="e.g., 2000"
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

                  {/* Next Button */}
                  <div className="flex justify-end mt-10">
                    <button
                      onClick={handleNext}
                      className="bg-[#019461] text-white font-semibold text-[14px] px-8 py-2.5 rounded-[6px] hover:bg-[#017a54] transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {currentStep > 1 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-[15px]">
                    Step {currentStep} content will be added here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;