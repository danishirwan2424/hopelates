import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Edit, Trash2, Search } from "lucide-react";
import "react-calendar/dist/Calendar.css";

import { donationStock, donationStats } from "../dataExample/DonationExp";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffDonation() {
  const [stock, setStock] = useState(donationStock);
  const [dashboardStats, setDashboardStats] = useState(donationStats);

  const [totalCount, setTotalCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setStock((prev) =>
      prev.map((s) => (s.id === editItem.id ? editItem : s))
    );
    setIsModalOpen(false);
  };

  // SORTING
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // dynamically sorted + filtered stock
  const sortedStock = [...stock].sort((a, b) => {
    if (!sortBy) return 0;
    let x = a[sortBy];
    let y = b[sortBy];

    // convert to lowercase if string
    if (typeof x === "string") x = x.toLowerCase();
    if (typeof y === "string") y = y.toLowerCase();

    if (sortOrder === "asc") return x > y ? 1 : -1;
    return x < y ? 1 : -1;
  });

  const filteredStock = sortedStock.filter((item) =>
    `${item.item} ${item.category} ${item.donor}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Animated counters
  useEffect(() => {
    let t = 0, l = 0, m = 0;
    const step = 1;
    const timer = setInterval(() => {
      if (t < donationStats.totalItemsInStock) t += step;
      if (l < donationStats.lowStockAlerts) l += step;
      if (m < donationStats.monthlyDonations) m += step;

      setTotalCount(t > donationStats.totalItemsInStock ? donationStats.totalItemsInStock : t);
      setLowStockCount(l > donationStats.lowStockAlerts ? donationStats.lowStockAlerts : l);
      setMonthlyCount(m > donationStats.monthlyDonations ? donationStats.monthlyDonations : m);

      if (t >= donationStats.totalItemsInStock &&
          l >= donationStats.lowStockAlerts &&
          m >= donationStats.monthlyDonations
      ) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0">
            <h1 className="text-[20px] text-gray-800">Staff Donation Stock</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Track, manage, and monitor all food donation inventory
            </p>
          </header>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4 text-white">
              <p className="text-[14px] opacity-90">Total Items in Stock</p>
              <h2 className="text-[64px] text-white font-bold leading-none">{totalCount}</h2>
              <span className="text-[12px] opacity-80">Updated today</span>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4">
              <p className="text-[14px] text-gray-700">Low Stock Alerts</p>
              <h2 className="text-[64px] font-bold text-red-600 leading-none">{lowStockCount}</h2>
              <span className="text-[12px] text-gray-500">Items below minimum</span>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4">
              <p className="text-[14px] text-gray-700">Monthly Donations</p>
              <h2 className="text-[64px] font-bold text-green-600 leading-none">{monthlyCount}</h2>
              <span className="text-[12px] text-gray-500">Received this month</span>
            </div>
          </section>

          {/* Donation Table */}
          <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
                      <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-0">
                        <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Stock List</h2>
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
            <div className="overflow-auto flex-1 rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-11 cursor-pointer" onClick={() => handleSort("item")}>
                      Item {sortBy === "item" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-7 cursor-pointer" onClick={() => handleSort("category")}>
                      Category {sortBy === "category" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-11 cursor-pointer" onClick={() => handleSort("quantity")}>
                      Qty {sortBy === "quantity" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-10 cursor-pointer" onClick={() => handleSort("expiry")}>
                      Expiry {sortBy === "expiry" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-8 cursor-pointer" onClick={() => handleSort("donor")}>
                      Donor {sortBy === "donor" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort("status")}>
                      Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-[12px] pl-[30px]">{item.item}</td>
                      <td className="p-[12px] pl-[30px]">{item.category}</td>
                      <td className="p-[12px] pl-[30px]">{item.quantity} {item.unit}</td>
                      <td className="p-[12px] pl-[30px]">{item.expiry}</td>
                      <td className="p-[12px] pl-[30px]">{item.donor}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.status === "OK"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(item)}>
                            <Edit size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
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

          <Outlet />
        </section>
      </main>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3">Edit Donation Item</h2>

            <label className="text-sm text-gray-700">Item Name</label>
            <input
              type="text"
              value={editItem.item}
              onChange={(e) => setEditItem({ ...editItem, item: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="text-sm text-gray-700">Category</label>
            <select
              value={editItem.category}
              onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            >
              <option>Dry Food</option>
              <option>Perishable</option>
              <option>Canned Food</option>
              <option>Beverages</option>
            </select>

            <label className="text-sm text-gray-700">Quantity</label>
            <input
              type="number"
              value={editItem.quantity}
              onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="text-sm text-gray-700">Unit</label>
            <input
              type="text"
              value={editItem.unit}
              onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="text-sm text-gray-700">Expiry Date</label>
            <input
              type="date"
              value={editItem.expiry}
              onChange={(e) => setEditItem({ ...editItem, expiry: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="text-sm text-gray-700">Donor</label>
            <input
              type="text"
              value={editItem.donor}
              onChange={(e) => setEditItem({ ...editItem, donor: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDonation;
