import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  UsersIcon,
  UserIcon,
  HomeIcon,
  BanknotesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
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

  // ✅ Red * component
  const RequiredStar = () => (
    <span className="text-red-500 font-bold ml-1">*</span>
  );

  // ✅ Malaysia states list
  const malaysiaStates = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Wilayah Persekutuan Kuala Lumpur",
    "Wilayah Persekutuan Labuan",
    "Wilayah Persekutuan Putrajaya",
  ];

  // ✅ Malaysia cities by state
  const malaysiaCitiesByState = {
    Johor: ["Johor Bahru", "Batu Pahat", "Muar", "Kluang", "Pontian", "Kulai"],
    Kedah: ["Alor Setar", "Sungai Petani", "Kulim", "Jitra", "Langkawi"],
    Kelantan: ["Kota Bharu", "Pasir Mas", "Tanah Merah", "Tumpat", "Machang"],
    Melaka: ["Melaka City", "Ayer Keroh", "Alor Gajah", "Jasin"],
    "Negeri Sembilan": ["Seremban", "Port Dickson", "Nilai", "Tampin", "Rembau"],
    Pahang: ["Kuantan", "Temerloh", "Bentong", "Raub", "Pekan"],
    Perak: ["Ipoh", "Taiping", "Teluk Intan", "Lumut", "Sitiawan"],
    Perlis: ["Kangar", "Arau", "Kuala Perlis"],
    "Pulau Pinang": ["George Town", "Butterworth", "Bayan Lepas", "Bukit Mertajam"],
    Sabah: ["Kota Kinabalu", "Sandakan", "Tawau", "Lahad Datu", "Keningau"],
    Sarawak: ["Kuching", "Miri", "Sibu", "Bintulu", "Sri Aman"],
    Selangor: [
      "Shah Alam",
      "Petaling Jaya",
      "Klang",
      "Subang Jaya",
      "Kajang",
      "Bangi",
      "Ampang",
    ],
    Terengganu: ["Kuala Terengganu", "Dungun", "Kemaman", "Marang"],
    "Wilayah Persekutuan Kuala Lumpur": ["Kuala Lumpur"],
    "Wilayah Persekutuan Putrajaya": ["Putrajaya"],
    "Wilayah Persekutuan Labuan": ["Labuan"],
  };

  const filteredCities = state ? malaysiaCitiesByState[state] || [] : [];

  // ✅ IC format (xxxxxx-xx-xxxx)
  const formatIC = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);

    let formatted = digits;

    if (digits.length > 6) {
      formatted = `${digits.slice(0, 6)}-${digits.slice(6)}`;
    }
    if (digits.length > 8) {
      formatted = `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(
        8
      )}`;
    }

    return formatted;
  };

  const handleICChange = (e) => {
    const formatted = formatIC(e.target.value);
    setIcNumber(formatted);
  };

  // ✅ Auto-fill from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;

    const user = JSON.parse(raw);
    setFullName(user?.full_name || "");
    setEmail(user?.email || "");
  }, []);

  const steps = ["Personal Info", "Household Info", "Financial Info", "Confirmation"];
  const householdOptions = [{ label: "1–3" }, { label: "4–6" }, { label: "7–9" }];
  const stepIcons = [UserIcon, HomeIcon, BanknotesIcon, CheckCircleIcon];

  // ✅ VALIDATION FUNCTIONS
  const validateStep1 = () => {
    if (!fullName.trim()) return "Full Name is required";
    if (!email.trim()) return "Email is required";
    if (!icNumber.trim()) return "IC Number is required";
    if (!/^\d{6}-\d{2}-\d{4}$/.test(icNumber))
      return "IC Number must be in format xxxxxx-xx-xxxx";
    return null;
  };

  const validateStep2 = () => {
    if (!householdSize) return "Please select household size";
    if (!homeAddress.trim()) return "Home Address is required";
    if (!postcode.trim()) return "Postcode is required";
    if (!state.trim()) return "State is required";
    if (!city.trim()) return "City is required";
    return null;
  };

  const validateStep3 = () => {
    if (!occupation.trim()) return "Occupation is required";
    if (salary === "" || salary === null) return "Salary is required";
    if (Number(salary) <= 0) return "Salary must be more than RM0";
    if (!payslip) return "Payslip image upload is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!beneficiaryId) {
      alert("User not logged in");
      return;
    }

    const err1 = validateStep1();
    const err2 = validateStep2();
    const err3 = validateStep3();

    if (err1 || err2 || err3) {
      alert(err1 || err2 || err3);
      return;
    }

    let familyNo = 0;
    if (householdSize === "1–3") familyNo = 3;
    else if (householdSize === "4–6") familyNo = 6;
    else if (householdSize === "7–9") familyNo = 9;

    const payload = {
      beneficiary_id: beneficiaryId,
      ic_no: icNumber,
      address: homeAddress,
      postcode,
      city,
      state,
      occupation,
      salary,
      family_no: familyNo,
    };

    try {
      const res = await fetch("http://localhost:5000/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }

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
      className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl border transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 w-full sm:w-auto mb-2 sm:mb-0"
      style={{ borderColor: darkColor, color: darkColor }}
    >
      {children}
    </button>
  );

  const goStep2 = () => {
    const err = validateStep1();
    if (err) return alert(err);
    setCurrentStep(2);
  };

  const goStep3 = () => {
    const err = validateStep2();
    if (err) return alert(err);
    setCurrentStep(3);
  };

  const goStep4 = () => {
    const err = validateStep3();
    if (err) return alert(err);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row p-4 sm:p-0">
      <FormNav />

      {/* LEFT STEPS */}
      <div className="hidden pt-[100px] sm:flex w-1/6 bg-white p-8 shadow-inner flex-col">
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          const active = index + 1 === currentStep;
          const completed = index + 1 < currentStep;

          return (
            <div key={index} className="flex items-start mb-8 relative">
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-4 top-10 w-0.5 h-full ${
                    completed ? "bg-green-600" : "bg-gray-300"
                  }`}
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
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Full Name <RequiredStar />
                </label>
                <input
                  className={`w-full border p-3 rounded ${
                    fullName ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
                  }`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly={!!fullName}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email <RequiredStar />
                </label>
                <input
                  type="email"
                  className={`w-full border p-3 rounded ${
                    email ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!!email}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  IC Number <RequiredStar />
                </label>
                <input
                  placeholder="xxxxxx-xx-xxxx"
                  className="w-full border p-3 rounded"
                  value={icNumber}
                  onChange={handleICChange}
                  maxLength={14}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <BackButton onClick={() => navigate("/landing")}>Back</BackButton>
                <HoverButton onClick={goStep2}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <section className="space-y-4">
              <h2 className="font-semibold mb-2">
                Family Household <RequiredStar />
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {householdOptions.map((opt) => {
                  const selected = householdSize === opt.label;

                  return (
                    <motion.div
                      key={opt.label}
                      onClick={() => setHouseholdSize(opt.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer border rounded-xl p-4 sm:p-6 text-center w-full transition-all duration-200
                        ${
                          selected
                            ? "border-green-600 bg-green-100 shadow-md"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                    >
                      <UsersIcon
                        className={`h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 ${
                          selected ? "text-green-700" : "text-gray-500"
                        }`}
                      />
                      <div
                        className={`font-semibold ${selected ? "text-green-700" : "text-gray-800"}`}
                      >
                        {opt.label}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">People</div>
                    </motion.div>
                  );
                })}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Home Address <RequiredStar />
                </label>
                <textarea
                  className="w-full border p-3 rounded"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Postcode <RequiredStar />
                </label>
                <input
                  className="w-full border p-3 rounded"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  State <RequiredStar />
                </label>
                <select
                  className="w-full border p-3 rounded bg-white"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                  required
                >
                  <option value="">Select State</option>
                  {malaysiaStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  City <RequiredStar />
                </label>
                <select
                  className={`w-full border p-3 rounded bg-white ${
                    !state ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state}
                  required
                >
                  <option value="">
                    {!state ? "Select State First" : "Select City"}
                  </option>
                  {filteredCities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <BackButton onClick={() => setCurrentStep(1)}>Back</BackButton>
                <HoverButton onClick={goStep3}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <section className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Occupation <RequiredStar />
                </label>
                <select
                  className="w-full border p-3 rounded bg-white"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                >
                  <option value="">Select Occupation</option>
                  <option value="Student">Student</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Private Sector">Private Sector</option>
                  <option value="Government Sector">Government Sector</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Retired">Retired</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Salary (RM) <RequiredStar />
                </label>
                <p className="text-sm text-gray-600 mb-2">Selected: RM {salary || 0}</p>
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

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Upload Payslip / Proof <RequiredStar />
                </label>

                <div
                  {...getRootProps()}
                  className={`w-full h-40 border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center
                    ${
                      isDragActive
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                >
                  <input {...getInputProps()} />

                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <svg
                      className="w-14 h-14 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>

                    {payslip ? (
                      <p className="text-gray-700 font-medium">{payslip.name}</p>
                    ) : (
                      <>
                        <p className="text-gray-700 font-medium">Drop Image Here</p>
                        <p className="text-sm text-gray-400">or click to upload</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <BackButton onClick={() => setCurrentStep(2)}>Back</BackButton>
                <HoverButton onClick={goStep4}>Next</HoverButton>
              </div>
            </section>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <section className="space-y-4">
              <label className="flex items-center mb-3 font-medium text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={confirmInfo}
                  onChange={(e) => setConfirmInfo(e.target.checked)}
                  required
                />
                I confirm the information is correct <RequiredStar />
              </label>

              <label className="flex items-center mb-3 font-medium text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  required
                />
                I agree to the Privacy Policy <RequiredStar />
              </label>

              <label className="flex items-center mb-6 font-medium text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                I agree to the Terms & Conditions <RequiredStar />
              </label>

              <div className="flex flex-col sm:flex-row justify-between">
                <BackButton onClick={() => setCurrentStep(3)}>Back</BackButton>
                <HoverButton
                  type="submit"
                  disabled={!(confirmInfo && agreePrivacy && agreeTerms)}
                >
                  Submit
                </HoverButton>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}
