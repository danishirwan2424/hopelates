import React, { useState, useEffect } from "react";
import { Edit, Trash2, Search } from "lucide-react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { donationStock } from "../dataExample/DonationExp";
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import Swal from "sweetalert2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

function StaffReceipt() {
  // ===== Search & Sort =====
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

  // ===== Table Data =====
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    setDonations(donationStock);
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

  // ===== Category Data for Chart =====
  const categoryData = donationStock.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.quantity;
    return acc;
  }, {});

  const categories = Object.keys(categoryData);
  const quantities = Object.values(categoryData);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-screen overflow-hidden">
        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0">
            <h1 className="text-[20px] text-gray-800">Staff Receipt</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Manage and review all donation records efficiently
            </p>
          </header>

          {/* Stats Panels */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Total Donations</p>
              <h2 className="text-[64px] text-white font-bold leading-none">
                {donations.length}
              </h2>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Low Stock Items</p>
              <h2 className="text-[64px] text-black font-bold leading-none">
                {donations.filter((d) => d.quantity <= 20).length}
              </h2>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Perishable Items</p>
              <h2 className="text-[64px] text-black font-bold leading-none">
                {donations.filter((d) => d.category === "Perishable").length}
              </h2>
            </div>
          </section>

          {/* Search + Table */}
          <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
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
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th
                      className="py-3 px-4 w-[200px] cursor-pointer"
                      onClick={() => handleSort("item")}
                    >
                      Item {sortBy === "item" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th
                      className="py-3 px-4 w-[150px] cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      Category {sortBy === "category" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th
                      className="py-3 px-4 w-[100px] cursor-pointer"
                      onClick={() => handleSort("quantity")}
                    >
                      Quantity {sortBy === "quantity" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[80px]">Unit</th>
                    <th
                      className="py-3 px-4 w-[120px] cursor-pointer"
                      onClick={() => handleSort("expiry")}
                    >
                      Expiry {sortBy === "expiry" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th
                      className="py-3 px-4 w-[150px] cursor-pointer"
                      onClick={() => handleSort("donor")}
                    >
                      Donor {sortBy === "donor" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th
                      className="py-3 px-4 w-[100px] cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4 w-[100px] text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="border-none">
                  {donations
                    .filter(
                      (d) =>
                        d.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.status.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .sort((a, b) => {
                      if (!sortBy) return 0;
                      let valA = a[sortBy];
                      let valB = b[sortBy];
                      if (sortBy === "quantity") {
                        valA = Number(valA);
                        valB = Number(valB);
                      }
                      if (sortBy === "expiry") {
                        valA = new Date(valA);
                        valB = new Date(valB);
                      }
                      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                      return 0;
                    })
                    .map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 font-medium text-gray-800 pl-[10px]">{d.item}</td>
                        <td className="py-3 px-4 text-gray-600">{d.category}</td>
                        <td className="py-3 px-4 text-gray-600">{d.quantity}</td>
                        <td className="py-3 px-4 text-gray-600">{d.unit}</td>
                        <td className="py-3 px-4 text-gray-600">{d.expiry}</td>
                        <td className="py-3 px-4 text-gray-600">{d.donor}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              d.status === "OK"
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-3">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDelete(d.id)}
                            >
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

          {/* Bar Chart */}
          <div className="mt-4 bg-white p-4 rounded-xl shadow-md h-[300px] flex flex-col">
            <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
              Donations by Category
            </h2>
            <div className="flex-1">
              <Bar
                data={{
                  labels: categories,
                  datasets: [
                    {
                      label: "Quantity",
                      data: quantities,
                      backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#14B8A6", "#EC4899", "#6366F1"],
                      borderRadius: 6,
                    },
                  ],
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StaffReceipt;
