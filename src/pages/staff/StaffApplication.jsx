import React, { useState, useEffect } from "react";
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

  // ===== Loading =====
  const [isLoading, setIsLoading] = useState(true);

  // ===== Application List =====
  const [appList, setAppList] = useState([]);

  const fetchApplications = async () => {
    setIsLoading(true);
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
        score: a.score ?? 0,
      }));

      setAppList(mapped);
    } catch (err) {
      console.error("Fetch applications error:", err);
      setAppList([]);
    } finally {
      setIsLoading(false);
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
      } catch {
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
      const res = await axios.get(`http://localhost:5000/api/staff-application/${user.id}`);
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
    } catch {
      setSelectedUser(user);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!showModal || !selectedUser) return;

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
        String(app.applicationId).toLowerCase().includes(q) ||
        String(app.name).toLowerCase().includes(q) ||
        String(app.email).toLowerCase().includes(q) ||
        String(app.status).toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      let A = a[sortBy];
      let B = b[sortBy];

      if (sortBy === "date") {
        return sortOrder === "asc" ? new Date(A) - new Date(B) : new Date(B) - new Date(A);
      }

      A = String(A).toLowerCase();
      B = String(B).toLowerCase();

      if (A < B) return sortOrder === "asc" ? -1 : 1;
      if (A > B) return sortOrder === "asc" ? 1 : -1;
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
          <section className="flex items-center bg-white rounded-lg px-4 py-2 mb-4">
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
                    {["Application ID", "Name", "Email", "Date", "Status", "Actions"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-[12px] font-semibold text-gray-600 cursor-pointer"
                          onClick={() =>
                            handleSort(
                              h === "Application ID"
                                ? "applicationId"
                                : h.toLowerCase()
                            )
                          }
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-t">
                          {Array.from({ length: 6 }).map((__, j) => (
                            <td key={j} className="px-4 py-3">
                              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : filteredApps.map((app) => (
                        <tr key={app.id} className="border-t border-gray-300 hover:bg-gray-50">
                          <td className="px-4 py-3 text-[12px]">{app.applicationId}</td>
                          <td className="px-4 py-3 text-[12px]">{app.name}</td>
                          <td className="px-4 py-3 text-[12px]">{app.email}</td>
                          <td className="px-4 py-3 text-[12px]">{app.date}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] ${getStatusColor(
                                app.status
                              )}`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex space-x-2">
                            <Edit
                              onClick={() => openEditModal(app)}
                              className="w-4 h-4 cursor-pointer text-blue-500"
                            />
                            <Trash2
                              onClick={() => handleDelete(app.id)}
                              className="w-4 h-4 cursor-pointer text-red-500"
                            />
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
              {[
                ["Application ID", selectedUser.applicationId],
                ["Name", selectedUser.name],
                ["Email", selectedUser.email],
                ["IC Number", selectedUser.ic],
                ["Address", selectedUser.address],
                ["Postcode", selectedUser.postcode],
                ["City", selectedUser.city],
                ["State", selectedUser.state],
                ["Occupation", selectedUser.occupation],
                ["Salary", selectedUser.salary],
                ["Household Size", selectedUser.household],
                ["Status", selectedUser.status],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <p className="text-sm text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${(displayScore / 100) * 100}%` }}
                />
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
