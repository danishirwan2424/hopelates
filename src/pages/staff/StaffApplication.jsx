import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import "react-calendar/dist/Calendar.css";

import { applications } from "../dataExample/UserExp";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffApplication() {
  // ===== Modal State =====
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const [displayScore, setDisplayScore] = useState(0);

useEffect(() => {
  if (showModal && selectedUser) {
    let start = 0;
    const end = selectedUser.score || 0;

    const step = Math.ceil(end / 30); // controls speed
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayScore(start);
    }, 30);

    return () => clearInterval(timer);
  }
}, [showModal, selectedUser]);

  // ===== Status Color Mapping =====
  const getStatusColor = (status) => {
    const colors = {
      Completed: "text-green-600 bg-green-100",
      Pending: "text-yellow-600 bg-yellow-100",
      Rejected: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };


// ===== Stats Animation State =====
const [pendingCount, setPendingCount] = useState(0);
const [approvedCount, setApprovedCount] = useState(0);
const [rejectedCount, setRejectedCount] = useState(0);

// Calculate totals dynamically from applications array
const totalPending = applications.filter(a => a.status === "Pending").length;
const totalApproved = applications.filter(a => a.status === "Completed").length;
const totalRejected = applications.filter(a => a.status === "Rejected").length;

// Animate numbers from 0 -> total
useEffect(() => {
  let p = 0, a = 0, r = 0;
  const step = 1;

  const timer = setInterval(() => {
    if (p < totalPending) p += step;
    if (a < totalApproved) a += step;
    if (r < totalRejected) r += step;

    setPendingCount(p > totalPending ? totalPending : p);
    setApprovedCount(a > totalApproved ? totalApproved : a);
    setRejectedCount(r > totalRejected ? totalRejected : r);

    if (p >= totalPending && a >= totalApproved && r >= totalRejected) {
      clearInterval(timer);
    }
  }, 30);

  return () => clearInterval(timer);
}, [totalPending, totalApproved, totalRejected]);


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <aside className="w-64 bg-white">
        <StaffSideBar />
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <StaffPanelBar />

        {/* ===== Page Container ===== */}
        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          {/* ===== Page Header ===== */}
          <header className="flex-shrink-0">
            <h1 className="text-[20px] text-gray-800">Staff Application</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Review and manage all food aid applications
            </p>
          </header>

          {/* ===== Stats Section ===== */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2           flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md           flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Pending</p>
              <h2 className="text-[64px] text-white font-bold leading-none">{pendingCount}</h2>
            </div>
            
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start           text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Approved</p>
              <h2 className="text-[64px] text-black font-bold leading-none">{approvedCount}</h2>
            </div>
            
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start           text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Rejected</p>
              <h2 className="text-[64px] text-black font-bold leading-none">{rejectedCount}</h2>
            </div>
          </section>


          {/* ===== Application List ===== */}
          <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
            <h2 className="text-[16px] font-semibold text-gray-700 mb-4 flex-shrink-0">
              Application List
            </h2>

            <div className="relative flex-1 overflow-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 w-[50px]"></th>
                    <th className="py-3 px-4 w-[250px]">Name</th>
                    <th className="py-3 px-4 w-[150px]">Phone Number</th>
                    <th className="py-3 px-4 w-[150px]">Application Date</th>
                    <th className="py-3 px-4 w-[120px]">Status</th>
                    <th className="py-3 px-4 w-[100px] text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="border-none">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <input type="checkbox" />
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {app.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{app.phone}</td>
                      <td className="py-3 px-4 text-gray-600">{app.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => openEditModal(app)}
                          >
                            <Edit size={18} />
                          </button>

                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </section>

          {/* ===== Edit Modal ===== */}
{showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] p-6 rounded-xl shadow-lg relative">

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute right-4 top-4 text-gray-600 hover:text-black"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Applicant Details
      </h2>

      {/* Applicant Info */}
      <div className="space-y-2 text-gray-700 text-sm">
        <p><strong>Full Name:</strong> {selectedUser?.name}</p>
        <p><strong>IC Number / Serial:</strong> {selectedUser?.ic}</p>
        <p><strong>Date of Birth:</strong> {selectedUser?.dob}</p>
        <p><strong>Phone Number:</strong> {selectedUser?.phone}</p>
        <p><strong>Home Address:</strong> {selectedUser?.address}</p>
        <p><strong>City:</strong> {selectedUser?.city}</p>
        <p><strong>State:</strong> {selectedUser?.state}</p>
        <p><strong>Post Code:</strong> {selectedUser?.postcode}</p>
        <p><strong>Occupation:</strong> {selectedUser?.occupation}</p>
        <p><strong>Monthly Salary (RM):</strong> {selectedUser?.salary}</p>
        <p><strong>Email:</strong> {selectedUser?.email}</p>
        <p><strong>Household Members:</strong> {selectedUser?.household}</p>
      </div>

      {/* Eligibility Progress Bar */}
{/* Eligibility Progress Bar */}
<div className="mt-5">
  <p className="text-sm font-medium text-gray-700 mb-1">
    Eligibility Score
  </p>

  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
    <div
      className={`h-full transition-all duration-700 ${
        (selectedUser?.score || 0) < 60
          ? "bg-red-500"
          : "bg-green-600"
      }`}
      style={{
        width: `${displayScore}%`,
      }}
    ></div>
  </div>

  <p className="text-right text-sm text-gray-600 mt-1">
    {displayScore}% Match
  </p>
</div>


      {/* Approve / Reject Buttons */}
      <div className="mt-6 flex gap-3">
        <button className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Approve
        </button>
        <button className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          Reject
        </button>
      </div>

    </div>
  </div>
)}



          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default StaffApplication;
