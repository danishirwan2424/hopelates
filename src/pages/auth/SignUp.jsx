import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Eye, EyeOff, Heart } from "lucide-react";
import leavesImg from "../../images/leaves.jpg";
=======
import { Eye, EyeOff } from "lucide-react";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";
import '../../index.css';
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
<<<<<<< HEAD
  const [userType, setUserType] = useState("Donor");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add your signup logic here
    navigate("/landing");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Heart Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-gray-900 mb-2">
              Join HopeLates<br />And Make a Difference
            </h1>
=======

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden bg-white">
      {/* 🟢 Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <div className="w-full max-w-sm">
          {/* Title Section */}
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="HopeLates Logo"
              className="h-10 w-auto object-contain mx-auto mb-3"
            />
            <h2 className="text-[30px] font-bold text-gray-800 leading-snug mb-3">
              Join HopeLates <br /> And Make a Difference
            </h2>
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
            <p className="text-gray-500 text-[14px]">
              Create your account and start helping communities today.
            </p>
          </div>

          {/* Form */}
<<<<<<< HEAD
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-2">
=======
          <form className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                Full Name
              </label>
              <input
                type="text"
<<<<<<< HEAD
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-2">
=======
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                Email Address
              </label>
              <input
                type="email"
<<<<<<< HEAD
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px]"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-2">
=======
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
<<<<<<< HEAD
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] pr-12"
                  required
=======
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
=======
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

<<<<<<< HEAD
            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-2">
=======
            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
<<<<<<< HEAD
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
=======
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

<<<<<<< HEAD
            {/* User Type Radio Buttons */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-3">
                I am a
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="Donor"
                    checked={userType === "Donor"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4 text-[#019461] focus:ring-[#019461] focus:ring-2 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700 text-[14px]">Donor</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="Applicant"
                    checked={userType === "Applicant"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4 text-[#019461] focus:ring-[#019461] focus:ring-2 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700 text-[14px]">Applicant</span>
=======
            {/* Role Selection */}
            <div className="mb-4">
              <p className="block text-gray-600 text-sm font-medium mb-2">I am a</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    className="w-4 h-4 text-[#019461] focus:ring-[#019461] border-gray-300"
                  />
                  <span className="text-gray-700 text-sm">Donor</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="applicant"
                    className="w-4 h-4 text-[#019461] focus:ring-[#019461] border-gray-300"
                  />
                  <span className="text-gray-700 text-sm">Applicant</span>
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                </label>
              </div>
            </div>

<<<<<<< HEAD
            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#019461] text-white font-semibold text-[15px] py-3 rounded-[8px] hover:bg-[#017a54] transition-all duration-200 mt-6"
            >
              Sign Up
            </button>
          </form>

          {/* Log in Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-[14px]">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#019461] font-semibold cursor-pointer hover:underline"
              >
                Log in
              </span>
            </p>
=======

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-3">
              <button
                type="submit"
                className="bg-[#019461] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#017b54] transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-5 text-[14px] text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#019461] font-medium hover:underline"
            >
              Log in
            </button>
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={leavesImg}
          alt="Green leaves background"
          className="absolute inset-0 w-full h-full object-cover"
=======
      {/* 🟢 Right Side - Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 h-full">
        <img
          src={leaves}
          alt="Charity theme background"
          className="w-full h-full object-cover"
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
        />
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default SignUp;
=======
export default SignUp;
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
