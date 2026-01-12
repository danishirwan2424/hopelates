// StaffProfile.jsx
import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Edit } from "lucide-react";
import axios from "axios";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

/*
  Full Staff Profile page with:
  - Cover photo + profile photo
  - Editable modal with photo preview (profile + cover)
  - Save changes via multipart/form-data to API
  - Activity logs view (fetched + appended on save)
  - Uses color palette: #278659 (primary), #11452E (dark)
*/

const API_BASE = "/api"; // change to your base URL if needed
const storedUser = JSON.parse(localStorage.getItem("user"));
const STAFF_ID = storedUser?.staff_id;

function StaffProfile() {
  // UI state
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Staff data
 const [staff, setStaff] = useState({
  staff_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  positions: "",
  gender: "",
  ic_num: "",
  address: "",
  profileImage: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  coverPhoto: "",
});


  // Editable form state (separate so we can cancel)
  const [form, setForm] = useState({ ...staff });

  // previews for newly selected files (object URLs)
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const profileFileRef = useRef(null);
  const coverFileRef = useRef(null);

  // activity logs
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);

  // fetch staff & logs on mount
  useEffect(() => {
  async function fetchStaff() {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.staff_id) return;

     const res = await axios.post(
        "http://localhost:5000/api/auth/staff/profile",
        {
          staff_id: storedUser.staff_id,
        }
      );


      setStaff(res.data);
      setForm(res.data);
    } catch (err) {
      console.error("Failed to fetch staff profile", err);
    } finally {
      setLoading(false);
    }
  }

  fetchStaff();
}, []);


  // helpers: open edit modal & set form
  const openEdit = () => {
    setForm({
      ...staff,
      // split name if needed
      firstName: staff.firstName || staff.name?.split?.(" ")?.[0] || "",
      lastName: staff.lastName || staff.name?.split?.(" ").slice(1).join(" ") || "",
    });
    setProfilePreview(null);
    setCoverPreview(null);
    setEditing(true);
  };

  // handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // handle profile file pick
  const handleProfilePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // optional: validate size/type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file for profile picture.");
      return;
    }
    // cleanup old preview
    if (profilePreview) URL.revokeObjectURL(profilePreview);
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
    profileFileRef.current = file;
  };

  // handle cover pick
  const handleCoverPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file for cover photo.");
      return;
    }
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
    coverFileRef.current = file;
  };

  // Save handler: send to API as multipart/form-data
  const handleSave = async () => {
    setSaving(true);

    try {
      const fd = new FormData();
     fd.append("first_name", form.first_name);
    fd.append("last_name", form.last_name);
    fd.append("phone_number", form.phone_number);
    fd.append("positions", form.positions);
    fd.append("gender", form.gender);
    fd.append("ic_num", form.ic_num);
    fd.append("address", form.address);


      if (profileFileRef.current) {
        fd.append("profile_picture", profileFileRef.current);
      }
      if (coverFileRef.current) {
        fd.append("cover_photo", coverFileRef.current);
      }

      // Example: PATCH to /api/staff/:id
      const res = await axios.patch(`${API_BASE}/staff/${STAFF_ID}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // use returned data if provided
      const updated = res?.data || { ...staff, ...form };

      // update local state
      setStaff((s) => ({ ...s, ...updated }));

      // create activity log entry and push to logs (you should let backend create it too)
      const newLog = {
        id: Date.now(),
        action: "Updated profile",
        detail: "Profile fields updated",
        actor: "current_user", // replace with actual actor id / name
        timestamp: new Date().toISOString(),
      };

      // optionally post log to backend
      try {
        await axios.post(`${API_BASE}/staff/${STAFF_ID}/logs`, newLog);
      } catch {
        // ignore if logs API missing — still append locally
      }

      setLogs((prev) => [newLog, ...prev]);

      // update image URLs if backend returned them
      if (updated.profileImage) setProfilePreview(null);
      if (updated.coverPhoto) setCoverPreview(null);

      alert("Profile saved successfully.");
      setEditing(false);
    } catch (err) {
      console.error("save error", err);
      alert("Failed to save profile. See console for details.");
    } finally {
      setSaving(false);
      // cleanup file refs
      profileFileRef.current = null;
      coverFileRef.current = null;
    }
  };

  // cancel edit: cleanup previews and close
  const handleCancel = () => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
      setProfilePreview(null);
      profileFileRef.current = null;
    }
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
      setCoverPreview(null);
      coverFileRef.current = null;
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  // formatting helper
 const displayName = `${staff.first_name || ""} ${staff.last_name || ""}`.trim();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64">
        <StaffSideBar />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-white pt-6 px-8 pb-5 h-screen overflow-auto">
        <StaffPanelBar />

        {/* Page Container */}
        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">

          {/* Cover + header */}
          <div className="relative rounded-lg overflow-hidden h-50">
            {/* Cover + header */}
<div className="relative rounded-lg overflow-hidden mb-20">

  {/* --- Cover Banner --- */}
<div
  className="h-48 w-full relative"
  style={{
    background: staff.coverPhoto || coverPreview
      ? `linear-gradient(to right, #278659, #11452E), url(${coverPreview || staff.coverPhoto}) center/cover no-repeat`
      : "linear-gradient(to right, #278659, #11452E)",
  }}
>

    {/* ===== Profile Picture INSIDE Banner ===== */}
    <div className="absolute left-6 bottom-4 flex items-center">
      <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg">
        <img
          src={profilePreview || staff.profileImage}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name & Position (inside banner next to picture) */}
      <div className="ml-4">
        <p className="text-2xl font-semibold text-white drop-shadow-md">
          {displayName}
        </p>
        <p className="text-sm text-gray-200 drop-shadow-md">
          {staff.positions}
        </p>
      </div>
    </div>

    {/* Edit button (top right inside banner) */}
    <button
      onClick={openEdit}
      className="absolute right-4 top-4 flex items-center gap-2 bg-[#278659] text-white px-4 py-2 rounded-lg hover:bg-[#11452E] transition"
    >
      <Edit size={16} />
      Edit Profile
    </button>
  </div>
</div>

          </div>

          {/* Content grid: left details + right logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: details card */}
            <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-[#11452E] font-semibold mb-4">Personal Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">First Name</p>
                  <p className="text-gray-800">{staff.first_Name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Last Name</p>
                  <p className="text-gray-800">{staff.last_Name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-gray-800">{staff.phone_number}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Position</p>
                  <p className="text-gray-800">{staff.positions}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-gray-800">{staff.gender}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500">IC / Passport</p>
                  <p className="text-gray-800">{staff.ic_num}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-gray-800">{staff.address}</p>
                </div>
              </div>
            </div>      
          </div>

          <Outlet />
        </section>
      </main>

      {/* ===== Edit Modal (simple) ===== */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-1 w-full">
  <div className="bg-white rounded-lg max-w-4xl shadow-xl overflow-auto max-h-[90vh]">
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b">
      <h4 className="text-lg font-semibold text-[#11452E]">Edit Profile</h4>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCancel}
          className="px-3 py-1 rounded-md text-sm border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded-md text-sm bg-[#278659] text-white disabled:opacity-60 hover:bg-[#1f6b49]"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Profile and Cover Photo Side-by-Side */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        {/* Profile Photo */}
{/* Profile Photo */}
<div className="flex flex-col items-center relative">
  <p className="text-sm font-semibold text-[#11452E] mb-2">Profile Photo</p>

  <div className="relative w-44 h-44">
    {/* Profile Image */}
    <img
      src={profilePreview || staff.profileImage}
      alt="profile preview"
      className="w-full h-full object-cover rounded-full border-2 border-[#278659]"
    />

    {/* Pencil Icon overlay */}
    <button
      type="button"
      onClick={() => document.getElementById("profileFile").click()}
      className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-[#278659]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
      </svg>
    </button>

    {/* Hidden File Input */}
    <input
      id="profileFile"
      type="file"
      accept="image/*"
      onChange={handleProfilePick}
      className="hidden"
    />
  </div>
</div>


        
      </div>

      {/* Right: Editable Fields */}
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#11452E]">First Name</label>
            <input
              name="firstName"
              value={form.first_Name || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#11452E]">Last Name</label>
            <input
              name="lastName"
              value={form.last_Name || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#11452E]">Phone</label>
            <input
              name="phone"
              value={form.phone_number || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#11452E]">Position</label>
            <input
              name="position"
              value={form.positions || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#11452E]">Gender</label>
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-[#11452E]">IC / Passport</label>
            <input
              name="ic"
              value={form.ic_num || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-[#11452E]">Address</label>
            <textarea
              name="address"
              rows="3"
              value={form.address || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-1 focus:ring-[#278659] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="p-4 border-t text-xs text-gray-500">
      Changes will be saved to the server and an activity log entry will be created.
    </div>
  </div>
</div>

      )}

    </div>
  );
}

export default StaffProfile;