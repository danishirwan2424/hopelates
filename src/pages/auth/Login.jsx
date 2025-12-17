import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Eye, EyeOff, Heart } from "lucide-react";
import leavesImg from "../../images/leaves.jpg";
=======
import { Eye, EyeOff } from "lucide-react";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";
import "../../index.css";
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
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
=======
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === "staff@email.com" && password === "password") {
        navigate("/staff-dashboard");
      } else if (email === "applicants@email.com" && password === "password") {
        navigate("/application");
      } else if (email === "donor@email.com" && password === "password") {
        navigate("/donation");
      } else {
        alert("Invalid email or password");
        setLoading(false);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        {/* Minimal spinner */}
        <div className="border-4 border-gray-200 border-t-[#019461] rounded-full w-16 h-16 animate-spin mb-4"></div>
        <p className="text-gray-700 text-lg font-medium animate-fade-in">
          Logging in...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden bg-white">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <div className="w-full max-w-sm text-center">
          <img
            src={logo}
            alt="HopeLates Logo"
            className="h-10 w-auto object-contain mx-auto mb-4"
          />
          <h2 className="text-[30px] font-bold text-gray-800 leading-snug mb-3">
            Start Your Charity <br /> Journey Here
          </h2>
          <p className="text-gray-500 text-[14px] mb-8">
            Welcome back! Please log in to continue making an impact.
          </p>

          <form className="space-y-4 text-left" onSubmit={handleLogin}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#019461] focus:outline-none"
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#019461]/20 focus:border-[#019461] text-[14px] pr-12"
                  required
=======
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#019461] focus:outline-none"
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
=======
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
                </button>
              </div>
            </div>

<<<<<<< HEAD
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
=======
            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-3">
              <button
                type="submit"
                className="bg-[#019461] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#017b54] transition-colors duration-200"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/landing")}
                className="border border-[#019461] text-[#019461] py-2.5 rounded-lg text-sm font-medium hover:bg-[#019461] hover:text-white transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
          </form>

          <div className="text-center mt-5 text-[14px] text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signUp")}
              className="text-[#019461] font-medium hover:underline"
            >
              Sign up
            </button>
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
<<<<<<< HEAD
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={leavesImg}
          alt="Green leaves background"
          className="absolute inset-0 w-full h-full object-cover"
=======
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
export default Login;
=======
export default Login;
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
