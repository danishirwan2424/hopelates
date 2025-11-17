import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Mail, Search } from "lucide-react";

import { applications as initialApplications } from "../dataExample/UserExp";
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffDistribution() {
  // ===== Local state: Completed -> Pending by default =====
  const [applications, setApplications] = useState(
    initialApplications
      .filter(app => app.status === "Completed") // Only take Completed entries
      .map(app => ({ ...app, status: "Pending" })) // Set default to Pending
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sending, setSending] = useState({});

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

// Package Badge Colors
const getPackageColor = (packageName) => {
  const colors = {
    "None": "text-gray-600 bg-gray-100",
    "Basic Pack": "text-blue-600 bg-blue-100",
    "Standard Pack": "text-purple-600 bg-purple-100",
    "Premium Pack": "text-yellow-600 bg-yellow-100",
  };
  return colors[packageName] || "text-gray-600 bg-gray-100";
};


  // Filtered & Sorted Applications based on search
  const filteredApps = applications
    .filter(app =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      let valA, valB;
      if (sortBy === "name") { valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); }
      else if (sortBy === "phone") { valA = a.phone; valB = b.phone; }
      else if (sortBy === "date") { valA = new Date(a.date); valB = new Date(b.date); }
      else if (sortBy === "status") { valA = a.status.toLowerCase(); valB = b.status.toLowerCase(); }
      else if (sortBy === "package") { 
        valA = a.package.toLowerCase(); 
        valB = b.package.toLowerCase(); 
      }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Status Badge Color
  const getStatusColor = (status) => {
    const colors = {
      Done: "text-green-600 bg-green-100",
      Pending: "text-yellow-600 bg-yellow-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  // Send Email + QR: Pending -> Done
  const sendEmailWithQR = async (applicant) => {
    setSending(prev => ({ ...prev, [applicant.id]: true }));

    try {
      const response = await fetch("http://localhost:5173/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicant),
      });
      const result = await response.json();

      if (result.success) {
        alert(`Approval email sent to ${applicant.name}`);
        setApplications(prev =>
          prev.map(app => app.id === applicant.id ? { ...app, status: "Done" } : app)
        );
      } else {
        alert(`Failed to send email: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send email. Check server.");
    }

    setSending(prev => ({ ...prev, [applicant.id]: false }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0 mb-4">
            <h1 className="text-[20px] text-gray-800">Staff Distribution</h1>
            <p className="text-[12px] text-black opacity-[50%]">
              Manage and coordinate food aid distribution efficiently
            </p>
          </header>

          {/* Applicants Table */}
          <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-2">
              <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Applicants List</h2>
              <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 w-64">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="relative flex-1 overflow-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                      <span className="ml-[30px]">
                        Name {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                      </span>
                    </th>
                    <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("package")}>
                    <span className="ml-[20px]">
                      Package {sortBy === "package" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </span>                      
                    </th>
                    <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("phone")}>
                    <span className="ml-[20px]">
                      Phone {sortBy === "phone" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </span>                      
                    </th>
                    <th className="py-3 px-[10px] w-[150px] cursor-pointer" onClick={() => handleSort("date")}>
                    <span className="mr-[0px]">
                      Date Applied {sortBy === "date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </span>                      
                    </th>
                    <th className="py-3 px-4 w-[120px] cursor-pointer" onClick={() => handleSort("status")}>
                    <span className="ml-[10px]">
                      Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </span>                      
                    </th>
                    <th className="py-3 px-4 w-[180px] text-center">Action</th>
                  </tr>
                </thead>


<tbody className="border-none">
  {filteredApps.map((applicant) => (
    <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-3 font-medium text-gray-800 pl-[30px]">{applicant.name}</td>
      <td className="py-3 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPackageColor(applicant.     package)}`}>
          {applicant.package}
        </span>
      </td>
      <td className="py-3 px-4 text-gray-600">{applicant.phone}</td>
      <td className="py-3 px-4 text-gray-600">{applicant.date}</td>
      <td className="py-3 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
          {applicant.status}
        </span>
      </td>
      <td className="py-3 px-4 text-center flex justify-center gap-2">
        {applicant.status === "Pending" && (
          <button
            onClick={() => sendEmailWithQR(applicant)}
            className="flex items-center gap-1 bg-[#278659] hover:bg-[#1f6a46] text-white px-3 py-1 rounded-lg text-sm"
          >
            <Mail size={16} />
            {sending[applicant.id] ? "Sending..." : "Send Email + QR"}
          </button>
        )}
        {applicant.status === "Done" && (
          <span className="px-3 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">Done</span>
        )}
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

export default StaffDistribution;
