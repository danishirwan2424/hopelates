import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Edit, Trash2, Search } from "lucide-react";
import "react-calendar/dist/Calendar.css";

import axios from "axios";
import Swal from "sweetalert2";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffApplication() {
  // ===== Search & Sort =====
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // ===== Application List =====
  const [appList, setAppList] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/staff-application");
      const rows = res.data?.data || [];

      const mapped = rows.map((a) => ({
        id: a.application_id,
        applicationId: a.application_id,

        name: a.full_name || "N/A",
        email: a.email || "N/A",

        date: a.created_at ? new Date(a.created_at).toLocaleDateString() : "N/A",
        status: a.status || "Pending",

        ic: a.ic_no || "N/A",
        address: a.address || "N/A",
        postcode: a.postcode || "N/A",
        city: a.city || "N/A",
        state: a.state || "N/A",
        occupation: a.occupation || "N/A",
        salary: a.salary ?? "N/A",
        household: a.family_no ?? "N/A",

        // ⚠️ your DB table doesn't show score column, so fallback
        score: a.score ?? 0,
      }));

      setAppList(mapped);
    } catch (err) {
      console.error("Fetch applications error:", err);
      setAppList([]);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ===== Delete =====
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#278659",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await axios.delete(`http://localhost:5000/api/staff-application/${id}`);
        setAppList((prev) => prev.filter((app) => app.id !== id));
        Swal.fire("Deleted!", "The application has been deleted.", "success");
      } catch (e) {
        console.error(e);
        Swal.fire("Error", "Failed to delete application.", "error");
      }
    });
  };

  // ===== Modal =====
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);

  const openEditModal = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/staff-application/${user.id}`
      );
      const detail = res.data?.data || res.data;

      setSelectedUser({
        ...user,
        ...detail,
        id: detail.application_id ?? user.id,
        applicationId: detail.application_id ?? user.applicationId,
        name: detail.full_name || user.name,
        email: detail.email || user.email,
        ic: detail.ic_no || user.ic,
        household: detail.family_no ?? user.household,
        score: detail.score ?? user.score ?? 0,
      });

      setShowModal(true);
    } catch (e) {
      console.error("Fetch detail error:", e);
      setSelectedUser(user);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (showModal && selectedUser) {
      let start = 0;
      const end = selectedUser.score || 0;
      const step = Math.ceil(end / 30) || 1;

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

  // ===== Status Color =====
  const getStatusColor = (status) => {
    const colors = {
      Completed: "text-green-700 bg-green-100",
      Pending: "text-yellow-700 bg-yellow-100",
      Rejected: "text-red-700 bg-red-100",
    };
    return colors[status] || "text-gray-700 bg-gray-100";
  };

  // ===== Approve / Reject =====
  const updateStatus = async (id, newStatus) => {
    await axios.patch(
      `http://localhost:5000/api/staff-application/${id}/status`,
      { status: newStatus }
    );

    setAppList((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );

    if (selectedUser?.id === id)
      setSelectedUser((p) => ({ ...p, status: newStatus }));
  };

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Application?",
      text: "This applicant will be marked as approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#278659",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Approve",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await updateStatus(id, "Completed");
        Swal.fire("Approved!", "The application is now approved.", "success");
        closeModal();
      } catch (e) {
        console.error(e);
        Swal.fire("Error", "Failed to approve application.", "error");
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Application?",
      text: "This applicant will be marked as rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await updateStatus(id, "Rejected");
        Swal.fire("Rejected!", "The application has been rejected.", "success");
        closeModal();
      } catch (e) {
        console.error(e);
        Swal.fire("Error", "Failed to reject application.", "error");
      }
    });
  };

  // ===== Stats =====
  const totalPending = appList.filter((a) => a.status === "Pending").length;
  const totalApproved = appList.filter((a) => a.status === "Completed").length;
  const totalRejected = appList.filter((a) => a.status === "Rejected").length;

  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    let p = 0,
      a = 0,
      r = 0;
    const step = 1;

    const timer = setInterval(() => {
      if (p < totalPending) p += step;
      if (a < totalApproved) a += step;
      if (r < totalRejected) r += step;

      setPendingCount(p > totalPending ? totalPending : p);
      setApprovedCount(a > totalApproved ? totalApproved : a);
      setRejectedCount(r > totalRejected ? totalRejected : r);

      if (p >= totalPending && a >= totalApproved && r >= totalRejected)
        clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [totalPending, totalApproved, totalRejected]);

  // ===== Filter + Sort =====
  const filteredApps = appList
    .filter((app) => {
      const q = searchTerm.toLowerCase();
      return (
        String(app.applicationId || "").toLowerCase().includes(q) ||
        String(app.name || "").toLowerCase().includes(q) ||
        String(app.email || "").toLowerCase().includes(q) ||
        String(app.status || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === "date") {
        const dA = new Date(valA);
        const dB = new Date(valB);
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
      <aside className="w-64 bg-white">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          <header className="flex-shrink-0 mb-4">
            <h1 className="text-[20px] text-gray-800">Staff Application</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Review and manage all food aid applications
            </p>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-3 flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-2xl shadow-md flex flex-col items-start justify-start h-[150px] p-4">
              <p className="text-[14px] text-white/90 mb-2">Pending</p>
              <h2 className="text-[56px] text-white font-bold leading-none">
                {pendingCount}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-md flex flex-col items-start justify-start h-[150px] p-4">
              <p className="text-[14px] text-black/80 mb-2">Approved</p>
              <h2 className="text-[56px] text-black font-bold leading-none">
                {approvedCount}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-md flex flex-col items-start justify-start h-[150px] p-4">
              <p className="text-[14px] text-black/80 mb-2">Rejected</p>
              <h2 className="text-[56px] text-black font-bold leading-none">
                {rejectedCount}
              </h2>
            </div>
          </section>

          {/* Table */}
          <section className="flex-1 bg-white rounded-2xl shadow-md p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="text-[16px] font-semibold text-gray-700">
                Applicants List
              </h2>

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
                    <th
                      className="py-3 px-4 cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort("applicationId")}
                    >
                      Application ID{" "}
                      {sortBy === "applicationId"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th
                      className="py-3 px-4 cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort("name")}
                    >
                      Name{" "}
                      {sortBy === "name"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th
                      className="py-3 px-4 cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      {sortBy === "email"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th
                      className="py-3 px-4 cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort("date")}
                    >
                      Date Applied{" "}
                      {sortBy === "date"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th
                      className="py-3 px-4 cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort("status")}
                    >
                      Status{" "}
                      {sortBy === "status"
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                        {app.applicationId}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {app.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{app.email}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        {app.date}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            app.status
                          )}`}
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
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDelete(app.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredApps.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-gray-500"
                      >
                        No applications found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white w-[420px] p-6 rounded-2xl shadow-lg relative">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 text-gray-600 hover:text-black"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Applicant Details
                </h2>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <strong>Full Name:</strong> {selectedUser?.name}
                  </p>
                  <p>
                    <strong>IC Number / Serial:</strong> {selectedUser?.ic}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser?.email}
                  </p>
                  <p>
                    <strong>Home Address:</strong> {selectedUser?.address}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedUser?.city}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedUser?.state}
                  </p>
                  <p>
                    <strong>Post Code:</strong> {selectedUser?.postcode}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {selectedUser?.occupation}
                  </p>
                  <p>
                    <strong>Monthly Salary (RM):</strong> {selectedUser?.salary}
                  </p>
                  <p>
                    <strong>Household Members:</strong> {selectedUser?.household}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Eligibility Score
                  </p>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        (selectedUser?.score ?? 0) < 60
                          ? "bg-red-500"
                          : "bg-green-600"
                      }`}
                      style={{ width: `${displayScore}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-600 mt-1">
                    {displayScore}% Match
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedUser.id)}
                    className="w-1/2 bg-[#278659] text-white py-2 rounded-lg hover:bg-[#11452E]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedUser.id)}
                    className="w-1/2 bg-[#EF4444] text-white py-2 rounded-lg hover:bg-[#B91C1C]"
                  >
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
