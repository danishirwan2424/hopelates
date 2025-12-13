import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart } from "lucide-react";
import leavesImg from "../../images/leaves.jpg";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate("/staff-dashboard");
  };

  const handleBackToHome = () => {
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
              Start Your Charity<br />Journey Here
            </h1>
            <p className="text-gray-500 text-[14px]">
              Welcome back! Please log in to continue making an impact.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Enter your password"
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#019461] text-white font-semibold text-[15px] py-3 rounded-[8px] hover:bg-[#017a54] transition-all duration-200"
            >
              Login
            </button>

            {/* Back to Home Button */}
            <button
              type="button"
              onClick={handleBackToHome}
              className="w-full bg-white text-[#019461] border-2 border-[#019461] font-semibold text-[15px] py-3 rounded-[8px] hover:bg-[#019461]/5 transition-all duration-200"
            >
              Back to Home
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-[14px]">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signUp")}
                className="text-[#019461] font-semibold cursor-pointer hover:underline"
              >
                Sign up
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

export default Login;