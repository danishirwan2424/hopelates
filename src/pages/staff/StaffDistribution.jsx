// src/pages/staff/StaffDistribution.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Mail, Search } from "lucide-react";
import Swal from "sweetalert2";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

const API_BASE = "http://localhost:5000";

function StaffDistribution() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sending, setSending] = useState({});

  // ===== Helper: get staff_id from localStorage =====
  const getStaffId = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.staff_id || null;
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/staff-distribution`);
      const result = await response.json();
      const rows = Array.isArray(result?.data) ? result.data : [];

      setApplications(
        rows.map((row, index) => ({
          distributionId: String(row.distributionId ?? `DIST${String(index + 1).padStart(3, "0")}`),
          applicationId: row.applicationId ?? "N/A",
          name: row.name ?? "N/A",
          email: row.email ?? "N/A",
          package: row.package ?? "None",
          packageCount: row.packageCount ?? 1,
          dateDistributed: row.dateDistributed ?? "N/A",
          status: row.status ?? "Pending",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch staff distribution:", err);
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getPackageColor = (packageName) => {
    const colors = {
      "Package A": "text-blue-700 bg-blue-100",
      "Package B": "text-purple-700 bg-purple-100",
      "Package C": "text-yellow-700 bg-yellow-100",
      None: "text-gray-700 bg-gray-100",
    };
    return colors[packageName] || "text-gray-700 bg-gray-100";
  };

  const getStatusColor = (status) => {
    const colors = {
      Done: "text-green-700 bg-green-100",
      Pending: "text-yellow-700 bg-yellow-100",
      Cancelled: "text-red-700 bg-red-100",
      Completed: "text-blue-700 bg-blue-100",
    };
    return colors[status] || "text-gray-700 bg-gray-100";
  };

  const sendEmailInDb = async (distributionId) => {
    const staffId = getStaffId();

    if (!staffId) {
      return { success: false, message: "No staff_id found. Please login as staff." };
    }

    const url = `${API_BASE}/api/staff-distribution/${encodeURIComponent(
      String(distributionId)
    )}/send-email`;

    console.log("Sending email to:", url);

    let r;
    try {
      r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staff_id: staffId }),
      });
    } catch (e) {
      return { success: false, message: `NETWORK ERROR: ${e.message}` };
    }

    let body = null;
    try {
      body = await r.json();
    } catch {
      body = null;
    }

    if (!r.ok) {
      return {
        success: false,
        message: `HTTP ${r.status} ${r.statusText} | ${body?.message || "No body"}`,
      };
    }

    return body || { success: true };
  };

  const sendEmailAndUpdate = async (applicant) => {
    setSending((prev) => ({ ...prev, [applicant.distributionId]: true }));

    const res = await sendEmailInDb(applicant.distributionId);

    if (!res?.success) {
      Swal.fire({
        icon: "error",
        title: "Email Failed",
        text: res?.message || "Unknown error",
        confirmButtonColor: "#B91C1C",
      });
      setSending((prev) => ({ ...prev, [applicant.distributionId]: false }));
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setApplications((prev) =>
      prev.map((app) =>
        app.distributionId === applicant.distributionId 
          ? { ...app, status: "Completed", dateDistributed: today } 
          : app
      )
    );

    Swal.fire({
      icon: "success",
      title: "Email Sent",
      text: "Dummy email sent & distribution updated to Completed.",
      confirmButtonColor: "#278659",
    });

    setSending((prev) => ({ ...prev, [applicant.distributionId]: false }));
  };

  const filteredApps = applications
    .filter((app) => {
      const q = searchTerm.toLowerCase();
      return (
        String(app.name || "").toLowerCase().includes(q) ||
        String(app.email || "").toLowerCase().includes(q) ||
        String(app.applicationId || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === "dateDistributed") {
        const dA = valA && valA !== "N/A" ? new Date(valA) : new Date(0);
        const dB = valB && valB !== "N/A" ? new Date(valB) : new Date(0);
        return sortOrder === "asc" ? dA - dB : dB - dA;
      }

      valA = String(valA ?? "").toLowerCase();
      valB = String(valB ?? "").toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex min-h-screen">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          <header className="flex-shrink-0 mb-4">
            <h1 className="text-[20px] text-gray-800">Staff Distribution</h1>
            <p className="text-[12px] text-black/50">
              Manage and coordinate food aid distribution efficiently
            </p>
          </header>

          <section className="flex-1 bg-white rounded-2xl shadow-md p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="text-[16px] font-semibold text-gray-700">Applicants List</h2>

              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-72">
                <Search className="text-gray-500 w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="relative flex-1 overflow-auto rounded-xl">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr className="text-[12px] uppercase tracking-wide">
                    <th className="py-3 px-4 w-[140px] cursor-pointer whitespace-nowrap" onClick={() => handleSort("distributionId")}>
                      Distribution ID {sortBy === "distributionId" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[220px] cursor-pointer whitespace-nowrap" onClick={() => handleSort("name")}>
                      Name {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[260px] cursor-pointer whitespace-nowrap" onClick={() => handleSort("email")}>
                      Email {sortBy === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[150px] cursor-pointer whitespace-nowrap" onClick={() => handleSort("package")}>
                      Package {sortBy === "package" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[120px] cursor-pointer text-center whitespace-nowrap" onClick={() => handleSort("packageCount")}>
                      Total Count {sortBy === "packageCount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[170px] cursor-pointer whitespace-nowrap" onClick={() => handleSort("dateDistributed")}>
                      Date Distributed {sortBy === "dateDistributed" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[120px] cursor-pointer whitespace-nowrap" onClick={() => handleSort("status")}>
                      Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[170px] text-center whitespace-nowrap">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApps.map((applicant) => (
                    <tr key={applicant.distributionId} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                      <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">{applicant.distributionId}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{applicant.name}</td>
                      <td className="py-3 px-4 text-gray-600">{applicant.email}</td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPackageColor(applicant.package)}`}>
                          {applicant.package}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center text-gray-700 font-medium">{applicant.packageCount}</td>

                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{applicant.dateDistributed}</td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex justify-center">
                          {applicant.status === "Pending" ? (
                            <button
                              onClick={() => sendEmailAndUpdate(applicant)}
                              disabled={!!sending[applicant.distributionId]}
                              className="inline-flex items-center gap-2 bg-[#278659] hover:bg-[#1f6a46] disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              <Mail size={16} />
                              {sending[applicant.distributionId] ? "Sending..." : "Send Email"}
                            </button>
                          ) : (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                              {applicant.status}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-gray-500">
                        No applicants found
                      </td>
                    </tr>
                  )}
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