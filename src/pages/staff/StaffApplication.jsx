import React, { useState, useEffect } from "react";
import { Edit, Trash2, Search } from "lucide-react";
import "react-calendar/dist/Calendar.css";

import Swal from "sweetalert2";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";

function StaffApplication() {
  // ===== Search & Sort States =====
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // ===== Application List (Dummy Data) =====
  const dummyApplications = [
    {
      id: 1,
      name: "Ahmad bin Abdullah",
      phone: "012-3456789",
      date: "1/15/2025",
      status: "Pending",
      ic: "920315-10-5432",
      address: "No. 45, Jalan Merdeka",
      postcode: "75200",
      city: "Melaka",
      state: "Melaka",
      occupation: "Factory Worker",
      salary: "1800",
      household: "5",
      email: "ahmad.abdullah@email.com",
      score: 75,
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      phone: "013-9876543",
      date: "1/20/2025",
      status: "Completed",
      ic: "880922-08-3421",
      address: "No. 12, Taman Harmoni",
      postcode: "75100",
      city: "Melaka",
      state: "Melaka",
      occupation: "Part-time Cleaner",
      salary: "1200",
      household: "4",
      email: "siti.nurhaliza@email.com",
      score: 82,
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      phone: "014-2345678",
      date: "1/22/2025",
      status: "Pending",
      ic: "950605-14-7654",
      address: "No. 88, Jalan Bunga Raya",
      postcode: "75050",
      city: "Melaka",
      state: "Melaka",
      occupation: "Security Guard",
      salary: "1500",
      household: "6",
      email: "rajesh.kumar@email.com",
      score: 68,
    },
    {
      id: 4,
      name: "Tan Mei Ling",
      phone: "016-5432109",
      date: "1/25/2025",
      status: "Rejected",
      ic: "900418-12-8765",
      address: "No. 23, Lorong Bahagia",
      postcode: "75260",
      city: "Melaka",
      state: "Melaka",
      occupation: "Restaurant Server",
      salary: "1600",
      household: "3",
      email: "tan.meiling@email.com",
      score: 45,
    },
    {
      id: 5,
      name: "Mohd Faizal",
      phone: "017-8765432",
      date: "1/28/2025",
      status: "Pending",
      ic: "850730-01-4321",
      address: "No. 67, Jalan Cemerlang",
      postcode: "75150",
      city: "Melaka",
      state: "Melaka",
      occupation: "Delivery Rider",
      salary: "1400",
      household: "7",
      email: "mohd.faizal@email.com",
      score: 78,
    },
    {
      id: 6,
      name: "Lim Hui Ying",
      phone: "018-3456789",
      date: "2/1/2025",
      status: "Completed",
      ic: "930210-07-2345",
      address: "No. 34, Taman Sentosa",
      postcode: "75300",
      city: "Melaka",
      state: "Melaka",
      occupation: "Shop Assistant",
      salary: "1350",
      household: "4",
      email: "lim.huiying@email.com",
      score: 71,
    },
    {
      id: 7,
      name: "Kumar a/l Subramaniam",
      phone: "019-6543210",
      date: "2/3/2025",
      status: "Pending",
      ic: "870825-10-6789",
      address: "No. 56, Jalan Impian",
      postcode: "75200",
      city: "Melaka",
      state: "Melaka",
      occupation: "Construction Worker",
      salary: "1700",
      household: "5",
      email: "kumar.subra@email.com",
      score: 65,
    },
    {
      id: 8,
      name: "Nur Aisyah",
      phone: "011-2345678",
      date: "2/5/2025",
      status: "Pending",
      ic: "960512-06-5432",
      address: "No. 78, Lorong Sejahtera",
      postcode: "75100",
      city: "Melaka",
      state: "Melaka",
      occupation: "Tailor",
      salary: "1100",
      household: "6",
      email: "nur.aisyah@email.com",
      score: 80,
    },
  ];

  const [appList, setAppList] = useState(dummyApplications);

  // ===== Delete Application =====
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#278659",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAppList((prev) => prev.filter((app) => app.id !== id));
        Swal.fire("Deleted!", "The application has been deleted.", "success");
      }
    });
  };

  // ===== Modal States =====
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (showModal && selectedUser) {
      let start = 0;
      const end = selectedUser.score || 0;
      const step = Math.ceil(end / 30);
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

  // ===== Status Color Helper =====
  const getStatusColor = (status) => {
    const colors = {
      Completed: "text-green-600 bg-green-100",
      Pending: "text-yellow-600 bg-yellow-100",
      Rejected: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  // ===== Approve & Reject =====
  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Application?",
      text: "This applicant will be marked as approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#278659",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        setAppList((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: "Completed" } : app
          )
        );
        Swal.fire("Approved!", "The application is now approved.", "success");
        closeModal();
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
    }).then((result) => {
      if (result.isConfirmed) {
        setAppList((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app))
        );
        Swal.fire("Rejected!", "The application has been rejected.", "success");
        closeModal();
      }
    });
  };

  // ===== Stats =====
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const totalPending = appList.filter((a) => a.status === "Pending").length;
  const totalApproved = appList.filter((a) => a.status === "Completed").length;
  const totalRejected = appList.filter((a) => a.status === "Rejected").length;

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

      if (p >= totalPending && a >= totalApproved && r >= totalRejected) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [totalPending, totalApproved, totalRejected]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0">
            <h1 className="text-[20px] text-gray-800">Staff Application</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Review and manage all food aid applications
            </p>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Pending</p>
              <h2 className="text-[64px] text-white font-bold leading-none">{pendingCount}</h2>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Approved</p>
              <h2 className="text-[64px] text-black font-bold leading-none">{approvedCount}</h2>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Rejected</p>
              <h2 className="text-[64px] text-black font-bold leading-none">{rejectedCount}</h2>
            </div>
          </section>

          {/* Application Table */}
          <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-0">
              <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Application List</h2>
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
                      <span className="ml-[30px]">Name {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</span>
                    </th>
                    <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("phone")}>
                      Phone Number {sortBy === "phone" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("date")}>
                      Date Applied {sortBy === "date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[120px] cursor-pointer" onClick={() => handleSort("status")}>
                      Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[100px] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="border-none">
                  {appList
                    .filter(
                      (app) =>
                        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.status.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .sort((a, b) => {
                      if (!sortBy) return 0;
                      let valA, valB;
                      if (sortBy === "phone") {
                        valA = a.phone;
                        valB = b.phone;
                      } else if (sortBy === "date") {
                        valA = new Date(a.date);
                        valB = new Date(b.date);
                      } else if (sortBy === "status") {
                        valA = a.status.toLowerCase();
                        valB = b.status.toLowerCase();
                      } else if (sortBy === "name") {
                        valA = a.name.toLowerCase();
                        valB = b.name.toLowerCase();
                      }
                      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                      return 0;
                    })
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 font-medium text-gray-800 pl-[30px]">{app.name}</td>
                        <td className="py-3 px-4 text-gray-600">{app.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{app.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-3">
                            <button className="text-blue-600 hover:text-blue-800" onClick={() => openEditModal(app)}>
                              <Edit size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(app.id)}>
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

          {/* Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white w-[420px] p-6 rounded-xl shadow-lg relative">
                <button onClick={closeModal} className="absolute right-4 top-4 text-gray-600 hover:text-black">
                  ✕
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Applicant Details</h2>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p><strong>Full Name:</strong> {selectedUser?.name}</p>
                  <p><strong>IC Number / Serial:</strong> {selectedUser?.ic}</p>
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

                <div className="mt-5">
                  <p className="text-sm font-medium text-gray-700 mb-1">Eligibility Score</p>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${selectedUser?.score < 60 ? "bg-red-500" : "bg-green-600"}`}
                      style={{ width: `${displayScore}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-gray-600 mt-1">{displayScore}% Match</p>
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
        </section>
      </main>
    </div>
  );
}

export default StaffApplication;