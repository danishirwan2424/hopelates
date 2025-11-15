import React from "react";
import { Outlet } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import "react-calendar/dist/Calendar.css";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffApplication() {
  // ===== Mock Application Data =====
  const applications = [
    { id: 1, name: "Aisyah Binti Rahman", phone: "012-3456789", date: "2025-11-02", status: "Pending" },
    { id: 2, name: "Muhammad Danish", phone: "019-8765432", date: "2025-11-01", status: "Completed" },
    { id: 3, name: "Lim Wei Jun", phone: "017-1122334", date: "2025-10-30", status: "Rejected" },
    { id: 4, name: "Siti Hajar", phone: "010-1122445", date: "2025-10-29", status: "Pending" },
    { id: 5, name: "Ahmad Faiz", phone: "018-3344556", date: "2025-10-27", status: "Completed" },
    { id: 6, name: "Nur Ain", phone: "011-8899001", date: "2025-10-26", status: "Rejected" },
    { id: 7, name: "Ali Hamzah", phone: "012-2233445", date: "2025-10-25", status: "Pending" },
    { id: 8, name: "Farah Zain", phone: "017-6677889", date: "2025-10-24", status: "Completed" },
  ];

  // ===== Status Color Mapping =====
  const getStatusColor = (status) => {
    const colors = {
      Completed: "text-green-600 bg-green-100",
      Pending: "text-yellow-600 bg-yellow-100",
      Rejected: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

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
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
            {/* Pending */}
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Pending</p>
              <h2 className="text-[64px] text-white font-bold leading-none">12</h2>
            </div>

            {/* Approved */}
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Approved</p>
              <h2 className="text-[64px] text-black font-bold leading-none">37</h2>
            </div>

            {/* Rejected */}
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Rejected</p>
              <h2 className="text-[64px] text-black font-bold leading-none">8</h2>
            </div>
          </section>

{/* ===== Application List ===== */}
<section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
  <h2 className="text-[16px] font-semibold text-gray-700 mb-4 flex-shrink-0">
    Application List
  </h2>

  <div className="relative flex-1 overflow-auto rounded-lg border border-gray-200">
    <table className="min-w-full text-sm text-left border-collapse">
      {/* ===== Table Header (Sticky) ===== */}
      <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
        <tr>
          <th className="py-3 px-4 w-[50px]">
          </th>
          <th className="py-3 px-4 w-[250px]">Name</th>
          <th className="py-3 px-4 w-[150px]">Phone Number</th>
          <th className="py-3 px-4 w-[150px]">Application Date</th>
          <th className="py-3 px-4 w-[120px]">Status</th>
          <th className="py-3 px-4 w-[100px] text-center">Action</th>
        </tr>
      </thead>

      {/* ===== Table Body ===== */}
      <tbody classname="border-none">
        {applications.map((app) => (
          <tr
            key={app.id}
            className="hover:bg-gray-50 transition-colors"
          >
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
                <button className="text-blue-600 hover:text-blue-800">
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


          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default StaffApplication;