// StaffReport.jsx
import React, { useState, useEffect, useRef } from "react";
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
const GRADIENT_TOP = "#8B5CF6";
const GRADIENT_BOTTOM = "#6366F1";
const GRADIENT_LIGHT = "#A78BFA";

function StaffReport() {
  // Animated Stats
  const [totalItems, setTotalItems] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [monthlyDonations, setMonthlyDonations] = useState(0);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

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
        borderColor: '#3B82F6',
        backgroundColor: (ctx) =>
          ctx.chart
            .ctx.createLinearGradient(0, 0, 0, ctx.chart.height)
            .addColorStop
            ? // use a light translucent gradient stop
              (function () {
                const grad = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                grad.addColorStop(0, "rgba(59,130,246,0.28)");
                grad.addColorStop(1, "rgba(59,130,246,0.05)");
                return grad;
              })()
            : "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        _shadow: { color: "rgba(59,130,246,0.18)", blur: 10, offsetY: 6 },
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
<<<<<<< HEAD
        backgroundColor: ['#3B82F6', '#A855F7', '#EC4899'],
        hoverBackgroundColor: [
          "#5B9DF8",
          "#BA6FF9",
          "#F06BA8",
=======
        backgroundColor: ["#10B981", "#3B82F6", "#EF4444"],
        hoverBackgroundColor: [
          "#34D399",
          "#60A5FA",
          "#F87171",
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
        ],
        borderWidth: 0,
        _shadow: { color: "rgba(0,0,0,0.12)", blur: 12, offsetY: 6 },
      },
    ],
  };

  const handleDownloadPDF = () => {
    setShowPDFPreview(true);
  };

  const handleClosePDFPreview = () => {
    setShowPDFPreview(false);
  };

  const handleSavePDF = () => {
    window.print();
  };

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
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
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c } = chart;
          const height = chart.height || 200;
          const gradient = c.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, '#3B82F6');
          gradient.addColorStop(1, '#A855F7');
          return gradient;
        },
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        _shadow: { color: "rgba(59,130,246,0.14)", blur: 10, offsetY: 6 },
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
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="flex min-h-screen bg-gray-50">
          <StaffSideBar />
        </aside>

<<<<<<< HEAD
        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen">
          <StaffPanelBar />

=======
      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen">
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
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
              className="bg-[#11452E] hover:bg-[#0d3a26] text-white px-4 py-2 rounded-lg shadow-md transition"
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

          {/* Donation Stock Section */}
          <div className="mb-4">
            {/* Donation Stock */}
<<<<<<< HEAD
            <div className="bg-white rounded-[15px] shadow-md w-full p-6 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-5">Donation Stock</h2>
              <div className="flex flex-col gap-6 mt-2">
                {[
                  { item: 'Rice', percentage: 85 },
                  { item: 'Canned Sardines', percentage: 55 },
                  { item: 'Cooking Oil', percentage: 40 },
                  { item: 'Instant Noodle', percentage: 65 },
                  { item: 'Chocolate Drink', percentage: 30 }
                ].map((data, index) => {
                  const colors = ['#3B82F6', '#A855F7', '#EC4899', '#3B82F6', '#A855F7'];
                  const color = colors[index % colors.length];
=======
            <div className="bg-white rounded-[15px] shadow-md flex-1 min-w-[400px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Donation Stock (Category Breakdown)</h2>
              <div className="flex flex-col gap-4 mt-2 overflow-y-auto max-h-[300px] pb-7">
                {Object.entries(categoryData).map(([category, qty], index) => {
                  const widthPercent = Math.min((qty / maxCategoryQty) * 100, 100);
                  const colors = [
                    { start: "#3B82F6", end: "#6366F1" },
                    { start: "#10B981", end: "#14B8A6" },
                    { start: "#F59E0B", end: "#F97316" },
                    { start: "#8B5CF6", end: "#A78BFA" },
                    { start: "#EC4899", end: "#F472B6" },
                    { start: "#EF4444", end: "#F87171" },
                  ];
                  const colorPair = colors[index % colors.length];
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[14px] text-gray-700">{data.item}</p>
                      </div>
                      <div className="h-4 w-full bg-gray-200 rounded">
<<<<<<< HEAD
                        <div className="h-4 rounded" style={{ width: `${data.percentage}%`, backgroundColor: color }} />
=======
                        <div className="h-4 rounded" style={{ width: `${widthPercent}%`, background: `linear-gradient(90deg, ${colorPair.start}, ${colorPair.end})` }} />
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    {/* PDF Preview Modal - POPUP */}
    {showPDFPreview && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Report Preview</h2>
            <div className="flex gap-3">
              <button
                onClick={handleSavePDF}
                className="bg-[#11452E] hover:bg-[#0d3a26] text-white px-5 py-2.5 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 font-medium"
              >
                Save as PDF
              </button>
              <button
                onClick={handleClosePDFPreview}
                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 font-medium"
              >
                Close
              </button>
            </div>
          </div>

          {/* PDF Preview Content */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <div id="pdf-content" className="bg-white p-8 max-w-4xl mx-auto shadow-xl rounded-xl">
              {/* Report Header */}
              <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Donation & Applicant Report</h1>
                  <p className="text-gray-600">Comprehensive Analysis and Statistics</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Generated on</p>
                  <p className="text-lg font-semibold text-gray-800">{getCurrentDate()}</p>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-xl p-6 text-white shadow-md">
                  <p className="text-sm opacity-90 mb-2">Total Items in Stock</p>
                  <p className="text-5xl font-bold">{donationStats.totalItemsInStock}</p>
                </div>
                <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                  <p className="text-sm text-gray-700 mb-2">Low Stock Alerts</p>
                  <p className="text-5xl font-bold text-red-600">{donationStats.lowStockAlerts}</p>
                </div>
                <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                  <p className="text-sm text-gray-700 mb-2">Monthly Donations</p>
                  <p className="text-5xl font-bold text-green-600">{donationStats.monthlyDonations}</p>
                </div>
              </div>

              {/* Applicant Status Breakdown */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Applicants Status Breakdown</h3>
                <div className="grid grid-cols-3 gap-4">
                  {pieData.map((item, index) => {
                    const colors = ['#3B82F6', '#A855F7', '#EC4899'];
                    return (
                      <div key={index} className="border-2 border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto mb-3 shadow-md"
                          style={{ backgroundColor: colors[index] }}
                        ></div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">{item.name}</p>
                        <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {((item.value / doughnutTotal) * 100).toFixed(1)}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Applications */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applicant Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{app.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`font-semibold ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Donation Stock */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Donation Stock</h3>
                <div className="space-y-4">
                  {[
                    { item: 'Rice', percentage: 85 },
                    { item: 'Canned Sardines', percentage: 55 },
                    { item: 'Cooking Oil', percentage: 40 },
                    { item: 'Instant Noodle', percentage: 65 },
                    { item: 'Chocolate Drink', percentage: 30 }
                  ].map((data, index) => {
                    const colors = ['#3B82F6', '#A855F7', '#EC4899', '#3B82F6', '#A855F7'];
                    const color = colors[index % colors.length];
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-gray-700 font-semibold">{data.item}</p>
                          <p className="text-sm text-gray-600 font-medium">{data.percentage}%</p>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${data.percentage}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Donors */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Donors</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Donor</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {topDonors.map((donor, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-700">{donor.donor}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{donor.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default StaffReport;