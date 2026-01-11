import React, { useState, useEffect } from "react";
import DonorNav from "./Forms_cmp/DonorNav";

function ProfileDonor() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    coverPhoto: "",
  });

  // Populate form from localStorage (logged-in user)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const donorId = user?.donor_id || user?.id;

    if (!donorId) {
      alert("User not found");
      return;
    }

    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        password: "", // always blank
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Allow user to update and save their profile
  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ DONOR ID (keep your logic)
    const donorId = user?.id || user?.donor_id;

    console.log("DEBUG donorId:", donorId);

    if (!donorId) {
      alert("User not found");
      return;
    }

    // ✅ BUILD PAYLOAD (IMPORTANT FIX)
    const payload = {
      fullName: form.fullName,
      email: form.email,
    };

    // ✅ only include password if user typed one
    if (form.password && form.password.trim() !== "") {
      payload.password = form.password;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/donor/profile/${donorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      // ✅ UPDATE localStorage (KEEP YOUR STRUCTURE)
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: data.full_name,
          email: data.email,
        })
      );

      // clear password field after save
      setForm((prev) => ({ ...prev, password: "" }));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Donor Navigation */}
      <DonorNav />

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
                {form.fullName || "No Name"}
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
                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-[#11452E]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-[#11452E]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#278659] text-white rounded-lg hover:bg-[#11452E] transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileDonor;
