import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Search, UserPlus, Trash2, Edit } from "lucide-react";
import Swal from "sweetalert2";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffManage() {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [editStaff, setEditStaff] = useState(null);
  const [addStaffModal, setAddStaffModal] = useState(false);

  // ====== Fetch Staff ======
  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/staff"); // Replace with your API
      const data = await response.json();

      if (data && data.length > 0) {
        setStaffList(
          data.map((staff, index) => ({
            ...staff,
            staffId: staff.staffId || `ST${String(index + 1).padStart(3, "0")}`,
            firstName: staff.firstName || "",
            lastName: staff.lastName || "",
            phone: staff.phone || "",
            positions: staff.positions || "Staff",
            gender: staff.gender || "Male",
            ic_num: staff.ic_num || "",
            address: staff.address || "",
            email: staff.email || "",
            password: staff.password || "",
            status: staff.status || "Active",
            id: staff.id || `db-${index}`,
          }))
        );
      } else {
        setStaffList([{
          staffId: "ST000",
          firstName: "Staff",
          lastName: "Name",
          email: "staff@example.com",
          phone: "012-3456789",
          positions: "Volunteer",
          gender: "Male",
          ic_num: "000000-00-0000",
          address: "Default Address",
          password: "password",
          status: "Active",
          id: "default"
        }]);
      }
    } catch (err) {
      console.error("Failed to fetch staff:", err);
      setStaffList([{
        staffId: "ST000",
        firstName: "Staff",
        lastName: "Name",
        email: "staff@example.com",
        phone: "012-3456789",
        positions: "Volunteer",
        gender: "Male",
        ic_num: "000000-00-0000",
        address: "Default Address",
        password: "password",
        status: "Active",
        id: "default"
      }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStaff();
    const interval = setInterval(fetchStaff, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: "text-green-600 bg-green-100",
      Inactive: "text-gray-600 bg-gray-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  const deleteStaff = (staff) => {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Staff?',
      text: `Are you sure you want to delete ${staff.firstName} ${staff.lastName}?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        setStaffList(prev => prev.filter(s => s.id !== staff.id));
        Swal.fire('Deleted!', `${staff.firstName} ${staff.lastName} has been removed.`, 'success');
      }
    });
  };

  const saveStaffChanges = (updatedStaff) => {
    setStaffList(prev =>
      prev.map(s => s.id === updatedStaff.id ? updatedStaff : s)
    );
    setEditStaff(null);
    Swal.fire('Saved!', `${updatedStaff.firstName} ${updatedStaff.lastName} has been updated.`, 'success');
  };

  // ===== Add Staff =====
  const addStaff = (newStaff) => {
    const newId = `db-${Date.now()}`;
    const newStaffData = {
      ...newStaff,
      staffId: `ST${String(staffList.length + 1).padStart(3, "0")}`,
      id: newId,
    };
    setStaffList(prev => [newStaffData, ...prev]);
    setAddStaffModal(false);
    Swal.fire('Added!', `${newStaff.firstName} ${newStaff.lastName} has been added.`, 'success');
  };

  const filteredStaff = staffList
    .filter(staff =>
      `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      let valA, valB;
      switch(sortBy){
        case "firstName": valA = a.firstName.toLowerCase(); valB = b.firstName.toLowerCase(); break;
        case "lastName": valA = a.lastName.toLowerCase(); valB = b.lastName.toLowerCase(); break;
        case "email": valA = a.email.toLowerCase(); valB = b.email.toLowerCase(); break;
        case "phone": valA = a.phone; valB = b.phone; break;
        case "positions": valA = a.positions.toLowerCase(); valB = b.positions.toLowerCase(); break;
        case "gender": valA = a.gender.toLowerCase(); valB = b.gender.toLowerCase(); break;
        case "ic_num": valA = a.ic_num.toLowerCase(); valB = b.ic_num.toLowerCase(); break;
        case "address": valA = a.address.toLowerCase(); valB = b.address.toLowerCase(); break;
        case "password": valA = a.password.toLowerCase(); valB = b.password.toLowerCase(); break;
        case "staffId": valA = a.staffId.toLowerCase(); valB = b.staffId.toLowerCase(); break;
        case "status": valA = a.status.toLowerCase(); valB = b.status.toLowerCase(); break;
        default: return 0;
      }
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
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          <header className="flex-shrink-0 mb-4">
            <h1 className="text-[20px] text-gray-800">Staff Management</h1>
            <p className="text-[12px] text-black opacity-[50%]">
              Add, view, edit, and manage staff efficiently
            </p>
          </header>

          <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-2">
              <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Staff List</h2>
              <div className="flex items-center gap-2">
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
                <button
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => setAddStaffModal(true)}
                >
                  <UserPlus size={16} />
                  Add Staff
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("staffId")}>Staff ID</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("firstName")}>First Name</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("lastName")}>Last Name</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("phone")}>Phone</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("positions")}>Positions</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("gender")}>Gender</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("ic_num")}>IC Number</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("address")}>Address</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("email")}>Email</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("password")}>Password</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("status")}>Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="border-none">
                  {loading
                    ? Array.from({ length: 5 }).map((_, idx) => (
                        <tr key={idx} className="animate-pulse">
                          {Array.from({ length: 12 }).map((__, i) => (
                            <td key={i} className="py-3 px-4 bg-gray-200 rounded">&nbsp;</td>
                          ))}
                        </tr>
                      ))
                    : filteredStaff.map((staff) => (
                        <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 font-medium text-gray-800 pl-[20px]">{staff.staffId}</td>
                          <td className="py-3 px-4 font-medium text-gray-800">{staff.firstName}</td>
                          <td className="py-3 px-4 font-medium text-gray-800">{staff.lastName}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.phone}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.positions}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.gender}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.ic_num}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.address}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.email}</td>
                          <td className="py-3 px-4 text-gray-600">{staff.password}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                              {staff.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center flex justify-center gap-2">
                            <button
                              onClick={() => setEditStaff(staff)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit Staff"
                            >
                              <Edit size={20} />
                            </button>
                            <button
                              onClick={() => deleteStaff(staff)}
                              className="text-red-600 hover:text-red-800"
                              title="Remove Staff"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </section>

          <Outlet />
        </section>

        {/* Edit Staff Modal */}
        {editStaff && (
          <StaffModal
            staff={editStaff}
            setStaff={setEditStaff}
            onSave={saveStaffChanges}
            onCancel={() => setEditStaff(null)}
            title="Edit Staff"
          />
        )}

        {/* Add Staff Modal */}
        {addStaffModal && (
          <StaffModal
            staff={{
              firstName: "",
              lastName: "",
              phone: "",
              positions: "",
              gender: "Male",
              ic_num: "",
              address: "",
              email: "",
              password: "",
              status: "Active",
            }}
            setStaff={() => {}}
            onSave={addStaff}
            onCancel={() => setAddStaffModal(false)}
            title="Add New Staff"
          />
        )}
      </main>
    </div>
  );
}

export default StaffManage;

// ===== StaffModal Component =====
function StaffModal({ staff, setStaff, onSave, onCancel, title }) {
  const [localStaff, setLocalStaff] = useState(staff);

  useEffect(() => {
    setLocalStaff(staff);
  }, [staff]);

  const handleChange = (field, value) => {
    setLocalStaff(prev => ({ ...prev, [field]: value }));
    if (setStaff) setStaff(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-96 p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex flex-col gap-3">
          <input type="text" className="border px-3 py-2 rounded" value={localStaff.firstName} onChange={e => handleChange("firstName", e.target.value)} placeholder="First Name" />
          <input type="text" className="border px-3 py-2 rounded" value={localStaff.lastName} onChange={e => handleChange("lastName", e.target.value)} placeholder="Last Name" />
          <input type="text" className="border px-3 py-2 rounded" value={localStaff.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="Phone" />
          <input type="text" className="border px-3 py-2 rounded" value={localStaff.positions} onChange={e => handleChange("positions", e.target.value)} placeholder="Positions" />
          <select className="border px-3 py-2 rounded" value={localStaff.gender} onChange={e => handleChange("gender", e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" className="border px-3 py-2 rounded" value={localStaff.ic_num} onChange={e => handleChange("ic_num", e.target.value)} placeholder="IC Number" />
          <input type="text" className="border px-3 py-2 rounded" value={localStaff.address} onChange={e => handleChange("address", e.target.value)} placeholder="Address" />
          <input type="email" className="border px-3 py-2 rounded" value={localStaff.email} onChange={e => handleChange("email", e.target.value)} placeholder="Email" />
          <input type="password" className="border px-3 py-2 rounded" value={localStaff.password} onChange={e => handleChange("password", e.target.value)} placeholder="Password" />
          <select className="border px-3 py-2 rounded" value={localStaff.status} onChange={e => handleChange("status", e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white" onClick={() => onSave(localStaff)}>Save</button>
        </div>
      </div>
    </div>
  );
}
