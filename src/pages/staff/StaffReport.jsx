import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { donationStock, donationStats } from "../dataExample/DonationExp";
import { applications, statusCounts, months, monthlyApplicants } from "../dataExample/UserExp";

// Components
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

// Colors for Pie/Doughnut Charts
const COLORS = ["#278659", "#11452E", "#9BC6B3"];

function StaffReport() {
  // Animated Stats
  const [totalItems, setTotalItems] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [monthlyDonations, setMonthlyDonations] = useState(0);

  useEffect(() => {
    let t = 0, l = 0, m = 0;
    const step = 1;
    const timer = setInterval(() => {
      if (t < donationStats.totalItemsInStock) t += step;
      if (l < donationStats.lowStockAlerts) l += step;
      if (m < donationStats.monthlyDonations) m += step;

      setTotalItems(Math.min(t, donationStats.totalItemsInStock));
      setLowStock(Math.min(l, donationStats.lowStockAlerts));
      setMonthlyDonations(Math.min(m, donationStats.monthlyDonations));

      if (
        t >= donationStats.totalItemsInStock &&
        l >= donationStats.lowStockAlerts &&
        m >= donationStats.monthlyDonations
      ) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // Charts Data
  const lineData = months.map((month, i) => ({
    month,
    donations: monthlyApplicants[i], // dummy mapping
  }));

  const pieData = [
    { name: "Completed", value: statusCounts.Completed },
    { name: "Pending", value: statusCounts.Pending },
    { name: "Rejected", value: statusCounts.Rejected },
  ];

  const topDonors = donationStock.map(d => ({ donor: d.donor, quantity: d.quantity }));

  // Category Breakdown for progress bars
  const categoryData = donationStock.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.quantity;
    return acc;
  }, {});
  const maxCategoryQty = Math.max(...Object.values(categoryData));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen">
        <StaffPanelBar />

        {/* Scrollable Section */}
        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-y-auto overflow-x-hidden">

          {/* Header */}
          <header className="flex-shrink-0 mb-4">
            <h1 className="text-[20px] text-gray-800">Donation Report</h1>
            <p className="text-[12px] text-black opacity-[50%]">
              Track, monitor, and analyze donation activities
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4 text-white">
              <p className="text-[14px] opacity-90">Total Items in Stock</p>
              <h2 className="text-[64px] font-bold">{totalItems}</h2>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4">
              <p className="text-[14px] text-gray-700">Low Stock Alerts</p>
              <h2 className="text-[64px] font-bold text-red-600">{lowStock}</h2>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4">
              <p className="text-[14px] text-gray-700">Monthly Donations</p>
              <h2 className="text-[64px] font-bold text-green-600">{monthlyDonations}</h2>
            </div>
          </div>

          {/* Charts Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Line Chart */}
            <div className="bg-white rounded-[15px] shadow-md flex-1 min-w-[300px] h-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Monthly Donation Trend</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="donations" stroke="#278659" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-[15px] shadow-md h-[283px] w-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Applicants Category</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-[15px] shadow-md flex-1 min-w-[300px] h-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Top Donors</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topDonors}>
                  <XAxis dataKey="donor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#278659" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stock & Category Progress Bars */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Donation Stock */}
            <div className="bg-white rounded-[15px] shadow-md flex-1 min-w-[400px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Donation Stock</h2>
              <div className="flex flex-col gap-4 mt-2 overflow-y-auto max-h-[300px] pb-7">
                {Object.entries(categoryData).map(([category, qty]) => {
                  const widthPercent = Math.min((qty / maxCategoryQty) * 100, 100);
                  const color = widthPercent < 20 ? "#11452E" : "#278659";

                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[13px] text-gray-600">{category}</p>
                        <span className="text-[13px] text-black/50 font-semibold pr-6">{qty}</span>
                      </div>
                      <div className="h-4 w-full bg-gray-200 rounded">
                        <div
                          className="h-4 rounded"
                          style={{ width: `${widthPercent}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expiry & Low Stock Warnings */}
            <div className="bg-white rounded-[15px] shadow-md flex-1 min-w-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Expiry & Low Stock Warnings</h2>
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
                {donationStock.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[13px]">
                    <span>{item.item}</span>
                    {item.status === "OK" ? (
                      <span className="text-green-600 font-semibold">{item.status}</span>
                    ) : (
                      <span className="text-red-600 font-semibold">{item.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default StaffReport;
