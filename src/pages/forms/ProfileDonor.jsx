// File: ProfileDonor.jsx
import React, { useState, useEffect } from "react";
import DonorNav from "./Forms_cmp/DonorNav";

function ProfileDonor({ userData }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    ic: "",
    address: "",
    coverPhoto: "",
  });

  // Populate form with API/table data
  useEffect(() => {
    if (userData) {
      setForm({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        ic: userData.ic || "",
        address: userData.address || "",
        coverPhoto: userData.coverPhoto || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const displayName = `${form.firstName || ""} ${form.lastName || ""}`.trim();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Donor Navigation */}
      <DonorNav />

      {/* Main Page Container */}
      <section className="flex-1 flex flex-col p-4 mt-4">
        {/* Cover + Header */}
        <div className="relative rounded-lg overflow-hidden mb-4 mt-10 flex-shrink-0">
          <div
            className="h-30 w-full flex flex-col justify-end px-6 pb-4 relative"
            style={{
              background: form.coverPhoto
                ? `linear-gradient(to right, rgba(39,134,89,0.7), rgba(17,69,46,0.7)), url(${form.coverPhoto}) center/cover no-repeat`
                : "linear-gradient(to right, #278659, #11452E)",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-10 rounded-b-xl pointer-events-none"></div>
            <div className="relative">
              <p className="text-2xl font-semibold text-white drop-shadow-md">
                {displayName || "No Name"}
              </p>
              <p className="text-sm text-gray-200 drop-shadow-md mt-1">
                Welcome to your donor profile
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border w-full flex-1 overflow-auto p-4">
          <h3 className="text-[#11452E] font-semibold mb-4">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {["firstName", "lastName", "email", "phone", "gender", "ic"].map((field) => (
              <div key={field}>
                <label className="text-xs font-semibold text-[#11452E]">
                  {field === "ic"
                    ? "IC / Passport"
                    : field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                </label>
                {field === "gender" ? (
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
                  />
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-[#11452E]">Address</label>
              <textarea
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-[#278659] text-white rounded-lg hover:bg-[#11452E] transition">
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileDonor;
