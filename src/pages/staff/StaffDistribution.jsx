<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
=======
import React, { useState } from "react";
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
import { Mail, Search } from "lucide-react";
import Swal from "sweetalert2";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";

function StaffDistribution() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sending, setSending] = useState({});

  // ====== Fetch Applications ======
  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/applications"); // Replace with your API
      const data = await response.json();

      if (data && data.length > 0) {
        setApplications(
          data.map((app, index) => ({
            ...app,
            applicationId: app.applicationId || `AP${String(index + 1).padStart(3, "0")}`,
            status: app.status || "Pending",
            packageCount: app.packageCount || 1,
            dateDistributed: app.dateDistributed || new Date(new Date(app.date).getTime() + 24*60*60*1000).toISOString().split("T")[0],
            id: app.id || `db-${index}`,
          }))
        );
      } else {
        // Default row if no data
        setApplications([{
          applicationId: "AP000",
          name: "Person Name",
          phone: "012-7237276",
          package: "Package A",
          packageCount: 1,
          date: "1-1-2026",
          dateDistributed: "2-1-2026",
          status: "Pending",
          id: "default"
        }]);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setApplications([{
        applicationId: "AP000",
        name: "Person Name",
        phone: "012-7237276",
        package: "Package A",
        packageCount: 1,
        date: "1-1-2026",
        dateDistributed: "2-1-2026",
        status: "Pending",
        id: "default"
      }]);
    }
  };

  // Fetch initially and every 10 seconds
  useEffect(() => {
    fetchApplications(); // Initial fetch
    const interval = setInterval(fetchApplications, 10000); // Refresh every 10s
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
      "Package A": "text-blue-600 bg-blue-100",
      "Package B": "text-purple-600 bg-purple-100",
      "Package C": "text-yellow-600 bg-yellow-100",
    };
    return colors[packageName] || "text-gray-600 bg-gray-100";
  };

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
      const response = await fetch("http://localhost:5000/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicant),
      });
      const result = await response.json();

      if (result.success) {
        // SweetAlert2 success
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: `Approval email successfully sent to ${applicant.name}`,
          confirmButtonColor: '#3085d6'
        });

        setApplications(prev =>
          prev.map(app => app.id === applicant.id ? { ...app, status: "Done" } : app)
        );
      } else {
        // SweetAlert2 error
        Swal.fire({
          icon: 'error',
          title: 'Email Failed',
          text: `Failed to send email: ${result.error}`,
          confirmButtonColor: '#d33'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Email Failed',
        text: 'Failed to send email. Check server connection.',
        confirmButtonColor: '#d33'
      });
    }

    setSending(prev => ({ ...prev, [applicant.id]: false }));
  };

  // Filter & sort applications
  const filteredApps = applications
    .filter(app =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      let valA, valB;
      if (sortBy === "name") { valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); }
      else if (sortBy === "phone") { valA = a.phone; valB = b.phone; }
      else if (sortBy === "applicationId") { valA = a.applicationId; valB = b.applicationId; }
      else if (sortBy === "date") { valA = new Date(a.date); valB = new Date(b.date); }
      else if (sortBy === "dateDistributed") { valA = new Date(a.dateDistributed); valB = new Date(b.dateDistributed); }
      else if (sortBy === "status") { valA = a.status.toLowerCase(); valB = b.status.toLowerCase(); }
      else if (sortBy === "package") { valA = a.package.toLowerCase(); valB = b.package.toLowerCase(); }
      else if (sortBy === "packageCount") { valA = a.packageCount; valB = b.packageCount; }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          <header className="flex-shrink-0 mb-4">
            <h1 className="text-[20px] text-gray-800">Staff Distribution</h1>
            <p className="text-[12px] text-black opacity-[50%]">
              Manage and coordinate food aid distribution efficiently
            </p>
          </header>

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
                    <th className="py-3 px-4 w-[120px] cursor-pointer" onClick={() => handleSort("applicationId")}>Application ID</th>
                    <th className="py-3 px-4 w-[200px] cursor-pointer" onClick={() => handleSort("name")}>Name</th>
                    <th className="py-3 px-4 w-[140px] cursor-pointer" onClick={() => handleSort("phone")}>Phone Number</th>
                    <th className="py-3 px-4 w-[130px] cursor-pointer" onClick={() => handleSort("package")}>Package</th>
                    <th className="py-3 px-4 w-[100px] cursor-pointer text-center" onClick={() => handleSort("packageCount")}>Total Count</th>
                    <th className="py-3 px-4 w-[140px] cursor-pointer" onClick={() => handleSort("date")}>Date Applied</th>
                    <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("dateDistributed")}>Date Distributed</th>
                    <th className="py-3 px-4 w-[110px] cursor-pointer" onClick={() => handleSort("status")}>Status</th>
                    <th className="py-3 px-4 w-[180px] text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="border-none">
                  {filteredApps.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-medium text-gray-800 pl-[20px]">{applicant.applicationId}</td>
                      <td className="py-3 px-4 font-medium text-gray-800">{applicant.name}</td>
                      <td className="py-3 px-4 text-gray-600">{applicant.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPackageColor(applicant.package)}`}>
                          {applicant.package}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 font-medium">{applicant.packageCount}</td>
                      <td className="py-3 px-4 text-gray-600">{applicant.date}</td>
                      <td className="py-3 px-4 text-gray-600">{applicant.dateDistributed}</td>
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
                            {sending[applicant.id] ? "Sending..." : "Send Email"}
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
        </section>
      </main>
    </div>
  );
}

export default StaffDistribution;
