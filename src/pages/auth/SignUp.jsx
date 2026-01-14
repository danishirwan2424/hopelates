import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import leaves from "../../images/leaves.jpg";
import logo from "../../images/Logo2.png";
import "../../index.css";

function SignUp() {
  const navigate = useNavigate();

  // ======================
  // STATE
  // ======================
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("donor");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword || !role) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email.trim().toLowerCase(),
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
      console.error("Signup error:", err);
      alert("Server error during signup");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row font-sans overflow-hidden bg-white">
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src={logo} alt="HopePlates Logo" className="h-10 mx-auto mb-3" />
            <h2 className="text-[30px] font-bold text-gray-800 mb-3">
              Join HopePlates <br /> And Make a Difference
            </h2>
            <p className="text-gray-500 text-[14px]">
              Create your account and start helping communities today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#019461]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#019461]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-[#019461]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-[#019461]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <p className="text-gray-600 text-sm mb-2">I am a</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    checked={role === "donor"}
                    onChange={() => setRole("donor")}
                  />
                  Donor
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="applicant"
                    checked={role === "applicant"}
                    onChange={() => setRole("applicant")}
                  />
                  Applicant
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#019461] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#017b54]"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-gray-600">
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

      {/* RIGHT */}
      <div className="hidden md:flex w-1/2 h-full">
        <img src={leaves} alt="Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default SignUp;
