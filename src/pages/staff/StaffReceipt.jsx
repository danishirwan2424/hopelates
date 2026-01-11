import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Edit, Trash2, Search, X } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";
import Swal from "sweetalert2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

function StaffReceipt() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true); // Loading for main data
  const [modalLoading, setModalLoading] = useState(false); // Loading for modal

  const defaultDonations = [
    { id: "default1", item: "Rice (kg)", category: "Dry Food", quantity: 1, unit: "Packs", expiry: "31-12-2026", donor: "Person Name", status: "Pending", receipt: "https://via.placeholder.com/150" },
    { id: "default2", item: "Canned Sardines", category: "Canned Food", quantity: 1, unit: "Cans", expiry: "31-12-2026", donor: "Person Name", status: "Pending", receipt: "https://via.placeholder.com/150" },
    { id: "default3", item: "Fresh Milk", category: "Perishable", quantity: 1, unit: "Bottles", expiry: "31-12-2026", donor: "Person Name", status: "Pending", receipt: "https://via.placeholder.com/150" },
    { id: "default4", item: "Mineral Water", category: "Beverages", quantity: 1, unit: "Bottles", expiry: "31-12-2026", donor: "Person Name", status: "Pending", receipt: "https://via.placeholder.com/150" },
  ];

  // Sorting
  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Fetch donations
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/donations");
      const data = await response.json();
      if (data && data.length > 0) {
        setDonations(
          data.map((d, index) => ({
            id: d.id || `db-${index}`,
            item: d.item || "Rice (kg)",
            category: d.category || "Dry Food",
            quantity: d.quantity || 1,
            unit: d.unit || "Packs",
            expiry: d.expiry || "31-12-2026",
            donor: d.donor || "Person Name",
            status: d.status || "Pending",
            receipt: d.receipt || "https://via.placeholder.com/150",
          }))
        );
      } else {
        setDonations(defaultDonations);
      }
    } catch (err) {
      console.error("Failed to fetch donations:", err);
      setDonations(defaultDonations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#278659",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDonations((prev) => prev.filter((d) => d.id !== id));
        Swal.fire("Deleted!", "The record has been deleted.", "success");
      }
    });
  };

  const fetchDonationDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/${id}`);
      const data = await response.json();
      if (data) {
        return {
          id: data.id || id,
          item: data.item || "Rice (kg)",
          category: data.category || "Dry Food",
          quantity: data.quantity || 1,
          unit: data.unit || "Packs",
          expiry: data.expiry || "31-12-2026",
          donor: data.donor || "Person Name",
          status: data.status || "Pending",
          receipt: data.receipt || "https://via.placeholder.com/150",
        };
      } else {
        return defaultDonations.find((d) => d.id === id) || defaultDonations[0];
      }
    } catch (err) {
      console.error("Failed to fetch donation details:", err);
      return defaultDonations.find((d) => d.id === id) || defaultDonations[0];
    }
  };

  const openDonationModal = async (donation) => {
    setModalLoading(true);
    const donationDetails = await fetchDonationDetails(donation.id);
    setSelectedDonation(donationDetails);
    setModalLoading(false);
  };

  const handleStatusChange = (status) => {
    if (!selectedDonation) return;
    setDonations((prev) =>
      prev.map((d) => (d.id === selectedDonation.id ? { ...d, status } : d))
    );
    setSelectedDonation({ ...selectedDonation, status });
  };

  const categoryData = donations.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.quantity;
    return acc;
  }, {});
  const allCategories = ["Dry Food", "Perishable", "Canned Food", "Beverages"];
  const categories = allCategories;
  const quantities = allCategories.map((cat) => categoryData[cat] || 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSideBar />
      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] max-h-screen">
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 max-h-screen overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0">
            <h1 className="text-[20px] text-gray-800">Staff Receipt</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Manage and review all donation records efficiently
            </p>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-[15px] h-[167px]" />
                ))
              : <>
                  <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                    <p className="text-[15px] text-white mb-2">Total Donations</p>
                    <h2 className="text-[64px] text-white font-bold leading-none">{donations.length}</h2>
                  </div>
                  <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                    <p className="text-[15px] text-black mb-2">Low Stock Items</p>
                    <h2 className="text-[64px] text-black font-bold leading-none">{donations.filter(d => d.quantity <= 20).length}</h2>
                  </div>
                  <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                    <p className="text-[15px] text-black mb-2">Perishable Items</p>
                    <h2 className="text-[64px] text-black font-bold leading-none">{donations.filter(d => d.category === "Perishable").length}</h2>
                  </div>
                </>
            }
          </section>

          {/* Donation List + Chart */}
          <section className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Donation List */}
            <div className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-auto">
              <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-0">
                <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Donation List</h2>
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

              <div className="relative flex-1 overflow-auto rounded-lg border border-gray-200 mt-2">
                {loading ? (
                  <div className="animate-pulse">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="flex gap-4 p-3 border-b border-gray-200">
                        <div className="bg-gray-200 h-6 w-32 rounded" />
                        <div className="bg-gray-200 h-6 w-24 rounded" />
                        <div className="bg-gray-200 h-6 w-12 rounded" />
                        <div className="bg-gray-200 h-6 w-12 rounded" />
                        <div className="bg-gray-200 h-6 w-20 rounded" />
                        <div className="bg-gray-200 h-6 w-24 rounded" />
                        <div className="bg-gray-200 h-6 w-16 rounded" />
                        <div className="bg-gray-200 h-6 w-16 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-4 w-[200px] cursor-pointer" onClick={() => handleSort("item")}>Item {sortBy === "item" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                        <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("category")}>Category {sortBy === "category" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                        <th className="py-3 px-4 w-[100px] cursor-pointer" onClick={() => handleSort("quantity")}>Quantity {sortBy === "quantity" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                        <th className="py-3 px-4 w-[80px]">Unit</th>
                        <th className="py-3 px-4 w-[120px] cursor-pointer" onClick={() => handleSort("expiry")}>Expiry {sortBy === "expiry" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                        <th className="py-3 px-4 w-[150px] cursor-pointer" onClick={() => handleSort("donor")}>Donor {sortBy === "donor" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                        <th className="py-3 px-4 w-[100px] cursor-pointer" onClick={() => handleSort("status")}>Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                        <th className="py-3 px-4 w-[100px] text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="border-none">
                      {donations
                        .filter(d =>
                          d.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.status.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .sort((a, b) => {
                          if (!sortBy) return 0;
                          let valA = a[sortBy], valB = b[sortBy];
                          if (sortBy === "quantity") { valA = Number(valA); valB = Number(valB); }
                          if (sortBy === "expiry") { valA = new Date(valA); valB = new Date(valB); }
                          if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                          if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                          return 0;
                        })
                        .map(d => (
                          <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 font-medium text-gray-800 pl-[10px]">{d.item}</td>
                            <td className="py-3 px-4 text-gray-600">{d.category}</td>
                            <td className="py-3 px-4 text-gray-600">{d.quantity}</td>
                            <td className="py-3 px-4 text-gray-600">{d.unit}</td>
                            <td className="py-3 px-4 text-gray-600">{d.expiry}</td>
                            <td className="py-3 px-4 text-gray-600">{d.donor}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${d.status === "Approved" ? "text-green-600 bg-green-100" : d.status === "Rejected" ? "text-red-600 bg-red-100" : "text-yellow-600 bg-yellow-100"}`}>
                                {d.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex justify-center gap-3">
                                <button className="text-blue-600 hover:text-blue-800" onClick={() => openDonationModal(d)}><Edit size={18} /></button>
                                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(d.id)}><Trash2 size={18} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Donations by Category Chart */}
            <div className="h-[300px] bg-white p-4 rounded-xl shadow-md flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Donations by Category</h2>
              <div className="flex-1">
                {loading ? (
                  <div className="h-full w-full bg-gray-200 animate-pulse rounded" />
                ) : (
                  <Bar
                    data={{
                      labels: categories,
                      datasets: [{ label: "Quantity", data: quantities, backgroundColor: "#278659", borderRadius: 6 }],
                    }}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { color: "#000" }, grid: { display: false } },
                        y: { ticks: { color: "#000", stepSize: 1 }, grid: { color: "#E5E7EB" } },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}
              </div>
            </div>
          </section>

          {/* ===== Donation Modal ===== */}
          {selectedDonation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={() => setSelectedDonation(null)}>
                  <X size={24} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Donation Details</h2>
                <div className="flex flex-col gap-4">
                  {modalLoading ? (
                    <div className="animate-pulse flex flex-col gap-3">
                      <div className="w-full h-48 bg-gray-200 rounded-md" />
                      {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-6 bg-gray-200 rounded w-full" />
                      ))}
                      <div className="flex gap-4 mt-4">
                        <div className="h-10 w-24 bg-gray-200 rounded" />
                        <div className="h-10 w-24 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <img src={selectedDonation.receipt} alt="Receipt" className="w-full h-48 object-cover rounded-md" />
                      <p><strong>Item:</strong> {selectedDonation.item}</p>
                      <p><strong>Category:</strong> {selectedDonation.category}</p>
                      <p><strong>Quantity:</strong> {selectedDonation.quantity} {selectedDonation.unit}</p>
                      <p><strong>Expiry:</strong> {selectedDonation.expiry}</p>
                      <p><strong>Donor:</strong> {selectedDonation.donor}</p>
                      <p><strong>Status:</strong> {selectedDonation.status}</p>

                      <div className="flex justify-end gap-4 mt-4">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700" onClick={() => handleStatusChange("Rejected")}>
                          Reject
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700" onClick={() => handleStatusChange("Approved")}>
                          Approve
                        </button>
                      </div>
                    </>
                  )}
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

export default StaffReceipt;
