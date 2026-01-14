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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const staffId = storedUser?.staff_id;

    await axios.patch(
      `http://localhost:5000/api/staff-application/${id}/status`,
      { status: newStatus, staff_id: staffId }
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
              <p className="text-[32px] font-bold text-white">{pendingCount}</p>
              <p className="text-[12px] text-white/70">Applications</p>
            </div>

            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-2xl shadow-md flex flex-col items-start justify-start h-[150px] p-4">
              <p className="text-[14px] text-white/90 mb-2">Approved</p>
              <p className="text-[32px] font-bold text-white">{approvedCount}</p>
              <p className="text-[12px] text-white/70">Applications</p>
            </div>

            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-2xl shadow-md flex flex-col items-start justify-start h-[150px] p-4">
              <p className="text-[14px] text-white/90 mb-2">Rejected</p>
              <p className="text-[32px] font-bold text-white">{rejectedCount}</p>
              <p className="text-[12px] text-white/70">Applications</p>
            </div>
          </section>

          {/* Search */}
          <section className="flex items-center bg-white rounded-lg px-4 py-2 mb-4 flex-shrink-0">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search applications..."
              className="flex-1 outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </section>

          {/* Table */}
          <section className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="overflow-auto flex-1">
              <table className="w-full text-left">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-[12px] font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("applicationId")}>
                      Application ID
                    </th>
                    <th className="px-4 py-3 text-[12px] font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("name")}>
                      Name
                    </th>
                    <th className="px-4 py-3 text-[12px] font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("email")}>
                      Email
                    </th>
                    <th className="px-4 py-3 text-[12px] font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("date")}>
                      Date
                    </th>
                    <th className="px-4 py-3 text-[12px] font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("status")}>
                      Status
                    </th>
                    <th className="px-4 py-3 text-[12px] font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-[12px] text-gray-700">{app.applicationId}</td>
                      <td className="px-4 py-3 text-[12px] text-gray-700">{app.name}</td>
                      <td className="px-4 py-3 text-[12px] text-gray-700">{app.email}</td>
                      <td className="px-4 py-3 text-[12px] text-gray-700">{app.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex space-x-2">
                        <button
                          onClick={() => openEditModal(app)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Application ID</label>
                <p className="text-sm text-gray-900">{selectedUser.applicationId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">IC Number</label>
                <p className="text-sm text-gray-900">{selectedUser.ic}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="text-sm text-gray-900">{selectedUser.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <p className="text-sm text-gray-900">{selectedUser.postcode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <p className="text-sm text-gray-900">{selectedUser.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <p className="text-sm text-gray-900">{selectedUser.state}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation</label>
                <p className="text-sm text-gray-900">{selectedUser.occupation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <p className="text-sm text-gray-900">{selectedUser.salary}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Household Size</label>
                <p className="text-sm text-gray-900">{selectedUser.household}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="text-sm text-gray-900">{selectedUser.status}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${(displayScore / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{displayScore}/100</p>
            </div>
            <div className="flex justify-end space-x-2">
              {selectedUser.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApprove(selectedUser.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedUser.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffApplication;