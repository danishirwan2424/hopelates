// StaffReport.jsx
import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

import { donationStock, donationStats } from "../dataExample/DonationExp";
import { applications, statusCounts, months, monthlyApplicants } from "../dataExample/UserExp";

// Components
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Title
);

// Small plugin to add shadow to dataset drawing
const shadowPlugin = {
  id: "shadowPlugin",
  beforeDatasetsDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    // set shadow only if dataset option requests it
    chart.data.datasets.forEach((ds, i) => {
      if (ds._shadow) {
        ctx.shadowColor = ds._shadow.color || "rgba(0,0,0,0.15)";
        ctx.shadowBlur = ds._shadow.blur || 10;
        ctx.shadowOffsetX = ds._shadow.offsetX || 0;
        ctx.shadowOffsetY = ds._shadow.offsetY || 4;
      }
    });
  },
  afterDatasetsDraw: (chart) => {
    chart.ctx.restore();
  },
};

ChartJS.register(shadowPlugin);

// theme colors / gradient stops
const GRADIENT_TOP = "#278659";
const GRADIENT_BOTTOM = "#11452E";
const GRADIENT_LIGHT = "#9BC6B3";

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
  const applicantTrendData = months.map((month, i) => ({
    month,
    applicants: monthlyApplicants[i] || 0,
  }));

  const pieData = [
    { name: "Completed", value: statusCounts.Completed || 0 },
    { name: "Pending", value: statusCounts.Pending || 0 },
    { name: "Rejected", value: statusCounts.Rejected || 0 },
  ];

  const topDonors = donationStock.map((d) => ({ donor: d.donor, quantity: d.quantity || 0 }));

  const recentApplications = applications.slice(0, 5);

  // Category Breakdown for progress bars
  const categoryData = donationStock.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.quantity;
    return acc;
  }, {});
  const maxCategoryQty = Math.max(...Object.values(categoryData), 1);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Chart refs (react-chartjs-2 uses refs if we need canvas context)
  const lineRef = useRef(null);
  const barRef = useRef(null);
  const doughnutRef = useRef(null);

  /* ---------- Chart Configs ---------- */

  // Utility scriptable gradient used by datasets (scriptable option)
  const gradientScriptable = (ctx, colorA = GRADIENT_TOP, colorB = GRADIENT_BOTTOM) => {
    const chart = ctx.chart;
    const { ctx: c } = chart;
    const height = chart.height || 200;
    const gradient = c.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    return gradient;
  };

  // Line Chart (Monthly Applicants)
  const lineData = {
    labels: applicantTrendData.map((d) => d.month),
    datasets: [
      {
        label: "Applicants",
        data: applicantTrendData.map((d) => d.applicants),
        borderColor: (ctx) => gradientScriptable(ctx, GRADIENT_TOP, GRADIENT_BOTTOM),
        backgroundColor: (ctx) =>
          ctx.chart
            .ctx.createLinearGradient(0, 0, 0, ctx.chart.height)
            .addColorStop
            ? // use a light translucent gradient stop
              (function () {
                const grad = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                grad.addColorStop(0, "rgba(39,134,89,0.28)");
                grad.addColorStop(1, "rgba(17,69,46,0.05)");
                return grad;
              })()
            : "rgba(39,134,89,0.2)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        _shadow: { color: "rgba(39,134,89,0.18)", blur: 10, offsetY: 6 },
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y ?? context.parsed;
            // percent relative to max of dataset
            const data = context.dataset.data || [];
            const max = Math.max(...data, 1);
            const pct = ((value / max) * 100).toFixed(1);
            return `${context.dataset.label || ""}: ${value} — ${pct}% of peak`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, autoSkip: true },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
    animation: {
      duration: 900,
      easing: "easeOutCubic",
    },
  };

  // Doughnut (Applicants Status)
  const doughnutTotal = pieData.reduce((s, p) => s + p.value, 0) || 1;
  const doughnutData = {
    labels: pieData.map((p) => p.name),
    datasets: [
      {
        data: pieData.map((p) => p.value),
        backgroundColor: [GRADIENT_TOP, GRADIENT_BOTTOM, GRADIENT_LIGHT],
        hoverBackgroundColor: [
          "#33a06b",
          "#1b593d",
          "#cfe9dd",
        ],
        borderWidth: 0,
        _shadow: { color: "rgba(0,0,0,0.12)", blur: 12, offsetY: 6 },
      },
    ],
  };

  const handleDownloadPDF = () => {
    window.open("http://localhost:5000/api/export-report", "_blank");
  };


  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "55%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const pct = ((value / doughnutTotal) * 100).toFixed(1);
            return `${label}: ${value} — ${pct}%`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      duration: 900,
      easing: "easeOutQuart",
    },
  };

  // Bar Chart (Top Donors)
  const barTotal = topDonors.reduce((s, d) => s + (d.quantity || 0), 0) || 1;
  const barData = {
    labels: topDonors.map((d) => d.donor),
    datasets: [
      {
        label: "Quantity",
        data: topDonors.map((d) => d.quantity),
        backgroundColor: (ctx) => gradientScriptable(ctx, GRADIENT_TOP, GRADIENT_BOTTOM),
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        _shadow: { color: "rgba(17,69,46,0.14)", blur: 10, offsetY: 6 },
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y ?? context.parsed;
            const pct = ((value / barTotal) * 100).toFixed(1);
            return `${context.dataset.label || ""}: ${value} — ${pct}% of donors' total`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
    animation: {
      duration: 900,
      easing: "easeOutCubic",
    },
  };

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
          <header className="flex-shrink-0 mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-[20px] text-gray-800">Donation & Applicant Report</h1>
              <p className="text-[12px] text-black opacity-[50%]">
                Track, monitor, and analyze donation and application activities
              </p>
            </div>

            {/* Export PDF Button */}
            <button
              className="bg-[#11452E] hover:bg-[#0d3a26] text-white px-4 py-2 rounded-lg shadow-md          transition"
              onClick={handleDownloadPDF}
            >
              Export as PDF
            </button>
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
            <div className="bg-white rounded-[15px] shadow-lg flex-1 min-w-[300px] h-[320px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Monthly Applicant Trend</h2>
              <div className="flex-1">
                <Line ref={lineRef} data={lineData} options={lineOptions} />
              </div>
            </div>

            {/* Doughnut Chart */}
            <div className="bg-white rounded-[15px] shadow-lg h-[320px] w-[320px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Applicants Status Breakdown</h2>
              <div className="flex-1">
                <Doughnut ref={doughnutRef} data={doughnutData} options={doughnutOptions} />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-[15px] shadow-lg flex-1 min-w-[300px] h-[320px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Top Donors</h2>
              <div className="flex-1">
                <Bar ref={barRef} data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          {/* Recent Applications Table */}
<div className="bg-white rounded-[15px] shadow-md mb-4 p-4">
  {/* Title (not scrollable) */}
  <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
    Recent Applications
  </h2>

  {/* Scroll container ONLY for rows */}
  <div className="overflow-y-auto max-h-[310px]">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Applicant Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {recentApplications.map((app) => (
          <tr key={app.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
              <span className={getStatusColor(app.status)}>{app.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {recentApplications.length === 0 && (
      <p className="text-center py-4 text-gray-500 text-sm">No recent applications found.</p>
    )}
  </div>
</div>


          {/* Stock & Category Progress Bars */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Donation Stock */}
            <div className="bg-white rounded-[15px] shadow-md flex-1 min-w-[400px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Donation Stock (Category Breakdown)</h2>
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
                        <div className="h-4 rounded" style={{ width: `${widthPercent}%`, background: `linear-gradient(90deg, ${color}, ${GRADIENT_BOTTOM})` }} />
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
