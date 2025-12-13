import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart } from "lucide-react";
import leavesImg from "../../images/leaves.jpg";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            <p className="text-gray-500 text-[14px]">
              Create your account and start helping communities today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
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
                Email Address
              </label>
              <input
                type="email"
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 text-[14px] font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
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
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

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
                </label>
              </div>
            </div>

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
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={leavesImg}
          alt="Green leaves background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignUp;