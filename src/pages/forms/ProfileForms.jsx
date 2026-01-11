// ProfileForms.jsx
import React, { useState, useEffect } from "react";
import FormNav from "./Forms_cmp/ApplicationNav";

function ProfileForms({ userData }) {
  const [form, setForm] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    coverPhoto: "",
  });

  const passwordsMatch =
    form.password === form.confirmPassword || form.confirmPassword === "";

  // Populate form from API/table
  useEffect(() => {
    if (userData) {
      setForm({
        fullName: userData.fullName || "",
        password: "",
        confirmPassword: "",
        coverPhoto: userData.coverPhoto || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <FormNav />

      <section className="flex-1 flex flex-col p-4 mt-4">
        {/* Cover + Header */}
        <div className="relative rounded-lg overflow-hidden mb-4 mt-10">
          <div
            className="h-30 w-full flex flex-col justify-end px-6 pb-4"
            style={{
              background: form.coverPhoto
                ? `linear-gradient(to right, rgba(39,134,89,0.7), rgba(17,69,46,0.7)), url(${form.coverPhoto}) center/cover no-repeat`
                : "linear-gradient(to right, #278659, #11452E)",
            }}
          >
            <p className="text-2xl font-semibold text-white">
              {form.fullName || "No Name"}
            </p>
            <p className="text-sm text-gray-200 mt-1">
              Welcome to your profile
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-[#11452E] font-semibold mb-4">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 gap-4 text-sm">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-[#11452E]">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-[#11452E]">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-[#11452E]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={`w-full p-3 border rounded-md focus:ring-1 ${
                  passwordsMatch
                    ? "focus:ring-[#278659]"
                    : "border-red-500 focus:ring-red-500"
                }`}
              />
              {!passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              disabled={!passwordsMatch || !form.password}
              className={`px-6 py-2 rounded-lg transition ${
                passwordsMatch && form.password
                  ? "bg-[#278659] text-white hover:bg-[#11452E]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileForms;
