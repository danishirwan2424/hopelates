import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";
import "../../index.css";

function SignUp() {
  const navigate = useNavigate();

  // existing states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔴 ADDED: form states
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("donor");

  // 🔴 ADDED: submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!full_name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src={logo} alt="HopeLates Logo" className="h-10 w-auto object-contain mx-auto mb-3" />
            <h2 className="text-[30px] font-bold text-gray-800 leading-snug mb-3">
              Join HopePlates <br /> And Make a Difference
            </h2>
            <p className="text-gray-500 text-[14px]">
              Create your account and start helping communities today.
            </p>
          </div>

          {/* 🔴 ONLY CHANGE: add onSubmit */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
                value={full_name}                         // 🔴 added
                onChange={(e) => setFullName(e.target.value)} // 🔴 added
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
                value={email}                             // 🔴 added
                onChange={(e) => setEmail(e.target.value)} // 🔴 added
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
                  value={password}                         // 🔴 added
                  onChange={(e) => setPassword(e.target.value)} // 🔴 added
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#019461] focus:outline-none"
                  value={confirmPassword}                         // 🔴 added
                  onChange={(e) => setConfirmPassword(e.target.value)} // 🔴 added
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="block text-gray-600 text-sm font-medium mb-2">I am a</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "donor"}           // 🔴 added
                    onChange={() => setRole("donor")}    // 🔴 added
                    className="w-4 h-4 text-[#019461] focus:ring-[#019461] border-gray-300"
                  />
                  <span className="text-gray-700 text-sm">Donor</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "applicant"}        // 🔴 added
                    onChange={() => setRole("applicant")} // 🔴 added
                    className="w-4 h-4 text-[#019461] focus:ring-[#019461] border-gray-300"
                  />
                  <span className="text-gray-700 text-sm">Applicant</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-3">
              <button
                type="submit"
                className="bg-[#019461] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#017b54] transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-5 text-[14px] text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#019461] font-medium hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 h-full">
        <img src={leaves} alt="Charity theme background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default SignUp;
