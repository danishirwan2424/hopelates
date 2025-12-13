import React from "react";
import { useNavigate } from "react-router-dom";

function StaffDash() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Applications", value: "124", color: "bg-blue-500" },
    { label: "Pending Review", value: "45", color: "bg-yellow-500" },
    { label: "Approved", value: "67", color: "bg-green-500" },
    { label: "Rejected", value: "12", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
          <button
            onClick={() => navigate("/staff-profile")}
            className="bg-[#019461] text-white px-4 py-2 rounded-lg hover:bg-[#017a54]"
          >
            My Profile
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back, Staff</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div>
                  <p className="font-semibold text-gray-900">Application #{1000 + item}</p>
                  <p className="text-sm text-gray-600">Submitted on 2025-01-{10 + item}</p>
                </div>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/staff-application")}
            className="mt-6 w-full bg-[#019461] text-white font-semibold py-3 rounded-lg hover:bg-[#017a54]"
          >
            View All Applications
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffDash;
