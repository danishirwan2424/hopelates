import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin } from "lucide-react";

function StaffProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Staff Member",
    email: "staff@hopelates.com",
    phone: "+60 12-345 6789",
    address: "Malacca, Malaysia",
    role: "Application Reviewer"
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => navigate("/staff-dashboard")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center gap-6 mb-8 pb-6 border-b">
            <div className="w-24 h-24 bg-[#019461] rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.role}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <User className="w-6 h-6 text-[#019461] mt-1" />
              <div className="flex-1">
                <label className="block text-gray-600 text-sm mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#019461] mt-1" />
              <div className="flex-1">
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#019461] mt-1" />
              <div className="flex-1">
                <label className="block text-gray-600 text-sm mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#019461] mt-1" />
              <div className="flex-1">
                <label className="block text-gray-600 text-sm mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019461]"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#019461] text-white font-semibold py-3 rounded-lg hover:bg-[#017a54] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-[#019461] text-white font-semibold py-3 rounded-lg hover:bg-[#017a54] transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffProfile;
