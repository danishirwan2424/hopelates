import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

<<<<<<< HEAD
// ======================================================
=======
import { applications, statusCounts, months, monthlyApplicants } from "../dataExample/UserExp";

>>>>>>> fd360aa98d21368072743ebea494a58444b42054
// Components
// ======================================================
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

<<<<<<< HEAD
// ======================================================
// ChartJS Setup
// ======================================================
=======
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

function StaffDash() {

  // ======================================================
  // PANEL 1: APPLICATION LIST
  // ======================================================
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();
        setApplications(data || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      }
    }
    fetchApplications();
  }, []);

  const totalDaily = applications.length || 0;
  const totalCompleted = applications.filter(a => a.status === "Completed").length || 0;
  const totalApproved = totalCompleted;
  const totalPending = applications.filter(a => a.status === "Pending").length || 0;

  // ======================================================
  // PANEL 3: ANIMATED STAT STATES
  // ======================================================
  const [dailyTotal, setDailyTotal] = useState(0);
  const [completedDist, setCompletedDist] = useState(0);
  const [approvedApp, setApprovedApp] = useState(0);
  const [pendingApp, setPendingApp] = useState(0);

<<<<<<< HEAD
=======
  // Totals
  const totalDaily = applications.length;
  const totalCompleted = applications.filter(a => a.status === "Completed").length;
  const totalApproved = totalCompleted; // same as completed
  const totalPending = applications.filter(a => a.status === "Pending").length;

  // Animate numbers
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
  useEffect(() => {
    let dt = 0, cd = 0, ap = 0, pd = 0;
    const step = 1;

    const timer = setInterval(() => {
      if (dt < totalDaily) dt += step;
      if (cd < totalCompleted) cd += step;
      if (ap < totalApproved) ap += step;
      if (pd < totalPending) pd += step;

      setDailyTotal(Math.min(dt, totalDaily));
      setCompletedDist(Math.min(cd, totalCompleted));
      setApprovedApp(Math.min(ap, totalApproved));
      setPendingApp(Math.min(pd, totalPending));

      if (dt >= totalDaily && cd >= totalCompleted && ap >= totalApproved && pd >= totalPending) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [totalDaily, totalCompleted, totalApproved, totalPending]);

  // ======================================================
  // PANEL 4: APPLICANT STATUS (Doughnut Chart)
  // ======================================================
  const statusLabels = ["Completed", "Pending", "Rejected"];
  const statusCounts = {
    Completed: totalCompleted,
    Pending: totalPending,
    Rejected: applications.filter(a => a.status === "Rejected").length,
  };

  const doughnutData = statusLabels.map(label => statusCounts[label] || 0);
  const doughnutColors = doughnutData.some(val => val > 0)
    ? ["#3B82F6", "#8B5CF6", "#EC4899"]
    : ["#d1d5db", "#d1d5db", "#d1d5db"]; // grey if no data

  // ======================================================
  // PANEL 5: MONTHLY APPLICANTS (Bar Chart)
  // ======================================================
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [monthlyApplicants, setMonthlyApplicants] = useState([]);

  useEffect(() => {
    async function fetchMonthlyApplicants() {
      try {
        const res = await fetch("/api/monthly-applicants");
        const data = await res.json();
        setMonthlyApplicants(data || Array(12).fill(0));
      } catch (error) {
        console.error("Error fetching monthly applicants:", error);
        setMonthlyApplicants(Array(12).fill(0));
      }
    }
    fetchMonthlyApplicants();
  }, []);

  const barData = monthlyApplicants.length ? monthlyApplicants : Array(12).fill(0);
  const barColors = barData.some(val => val > 0)
    ? barData.map((_, i) => ["#3B82F6", "#8B5CF6", "#EC4899"][i % 3])
    : Array(12).fill("#d1d5db"); // grey bars if no data

  // ======================================================
  // PANEL 6: DONATION STOCK
  // ======================================================
  const [donationStock, setDonationStock] = useState([]);
  const colorMap = {
    Rice: "#3B82F6",
    "Canned Sardines": "#8B5CF6",
    "Cooking Oil": "#EC4899",
    "Instant Noodle": "#3B82F6",
    "Chocolate Drink": "#8B5CF6",
  };

  useEffect(() => {
    async function fetchDonationStock() {
      try {
        const res = await fetch("/api/donation-stock");
        const data = await res.json();
        setDonationStock(data || []);
      } catch (error) {
        console.error("Error fetching donation stock:", error);
        setDonationStock([]);
      }
    }
    fetchDonationStock();
  }, []);

  // Always show all categories even if empty
  const allCategories = Object.keys(colorMap);
  const categoryData = allCategories.reduce((acc, category) => {
    const item = donationStock.find(d => d.category === category);
    acc[category] = item ? item.quantity : 0;
    return acc;
  }, {});

  const maxQuantity = Math.max(...Object.values(categoryData), 1);

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div className="flex min-h-screen bg-gray-50">
<<<<<<< HEAD
      {/* Sidebar */}
      <div className="flex min-h-screen bg-gray-50">
=======
      {/* ===== Sidebar ===== */}
      <div className="w-64 bg-white">
>>>>>>> fd360aa98d21368072743ebea494a58444b42054
        <StaffSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0">
          <StaffPanelBar />
          <div className="flex-1 overflow-auto rounded-xl shadow-sm p-4 pb-1" style={{ backgroundColor: "#F2F1F1" }}>
            <h1 className="text-[20px] text-gray-800">Dashboard</h1>
            <h3 className="text-[12px] text-black opacity-[50%] mb-2">
              Plan, prioritize and accomplish your task with ease
            </h3>

            {/* ================= STAT PANELS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
              <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                <p className="text-[15px] text-white mb-2">Daily Total Application</p>
                <h2 className="text-[64px] font-bold text-white leading-none">{dailyTotal}</h2>
              </div>
              <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                <p className="text-[15px] text-black mb-2">Completed Distributions</p>
                <h2 className="text-[64px] font-bold text-black leading-none">{completedDist}</h2>
              </div>
              <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                <p className="text-[15px] text-black mb-2">Application Approved</p>
                <h2 className="text-[64px] font-bold text-black leading-none">{approvedApp}</h2>
              </div>
              <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
                <p className="text-[15px] text-black mb-2">Pending Approvement</p>
                <h2 className="text-[64px] font-bold text-black leading-none">{pendingApp}</h2>
              </div>
            </div>

            {/* ================= CHART PANELS ================= */}
            <div className="flex flex-wrap gap-2 mb-2">
              {/* Doughnut Chart */}
              <div className="bg-white rounded-[15px] shadow-md h-[283px] w-[283px] p-4 flex flex-col">
                <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Applicants Category</h2>
                <div className="flex-1 flex items-center justify-center">
                  <Doughnut
                    data={{ labels: statusLabels, datasets: [{ data: doughnutData, backgroundColor: doughnutColors }] }}
                    options={{
                      plugins: { legend: { position: "bottom" } },
                      cutout: "70%",
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>

<<<<<<< HEAD
              {/* Bar Chart */}
              <div className="bg-white rounded-[15px] shadow-md h-[283px] flex-1 min-w-[200px] p-4 flex flex-col">
                <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Monthly Applicants</h2>
                <div className="flex-1 flex items-center justify-center">
                  <Bar
                    data={{ labels: months, datasets: [{ data: barData, backgroundColor: barColors, borderRadius: 6 }] }}
                    options={{
                      plugins: { legend: { display: false } },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ================= DONATION + CALENDAR ================= */}
            <div className="flex flex-wrap gap-2 mb-0">
              {/* Donation Stock */}
              <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[400px] p-4 flex flex-col">
                <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Donation Stock</h2>
                <div className="flex flex-col gap-4 mt-2 overflow-scroll pb-7">
                  {Object.entries(categoryData).map(([category, qty]) => {
                    const widthPercent = Math.min((qty / maxQuantity) * 100, 100);
                    const color = qty > 0 ? colorMap[category] : "#d1d5db"; // grey if empty
                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-[13px] text-gray-600">{category}</p>
                          <span className="text-[13px] text-black/50 font-semibold pr-6">{qty}</span>
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded">
                          <div className="h-4 rounded" style={{ width: `${widthPercent}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
=======
              <div className="flex-1 flex items-center justify-center">
                <Doughnut
                  data={{
                    labels: ["Completed", "Pending", "Rejected"],
                    datasets: [
                      {
                        label: "Applicants",
                        data: [statusCounts.Completed, statusCounts.Pending, statusCounts.Rejected],
                        backgroundColor: ["#10B981", "#3B82F6", "#EF4444"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { position: "bottom", labels: { color: "#000", boxWidth: 12 } },
                    },
                    cutout: "70%",
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Monthly Applicants (Bar Chart) */}
            <div className="bg-white rounded-[15px] shadow-md h-[283px] flex-1 min-w-[200px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Monthly Applicants
              </h2>

              <div className="flex-1 flex items-center justify-center">
                <Bar
                  data={{
                    labels: months,
                    datasets: [
                      {
                        label: "Applicants",
                        data: monthlyApplicants,
                        backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#14B8A6", "#EC4899", "#6366F1", "#F97316", "#06B6D4", "#8B5CF6", "#10B981"],
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { 
                        ticks: { color: "#000" }, 
                        grid: { display: false } 
                      },
                      y: { 
                        ticks: { 
                          color: "#000",
                          stepSize: 1,      
                        },
                        grid: { color: "#E5E7EB" },
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
>>>>>>> fd360aa98d21368072743ebea494a58444b42054

              {/* Calendar */}
              <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[283px] p-4 flex flex-col border-0">
                <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Upcoming Deliveries</h2>
                <div className="flex-1 overflow-auto flex">
                  <Calendar
                    className="custom-calendar flex-1 border-0 border-none"
                    prevLabel="<"
                    nextLabel=">"
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={false}
                  />
                </div>
              </div>
            </div>
<<<<<<< HEAD
=======
          </div>

          {/* ===== Stock & Calendar Panels ===== */}
          <div className="flex flex-wrap gap-2 mb-0">
            {/* Donation Stock */}
            <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[400px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Donation Stock
              </h2>

              <div className="flex flex-col gap-4 mt-2">
                <div>
                  <p className="text-[13px] text-gray-600 mb-1">Snack</p>
                  <div className="h-4 w-full bg-gray-200 rounded">
                    <div className="h-4 w-[70%] bg-green-600 rounded"></div>
                  </div>
                </div>

                <div>
                  <p className="text-[13px] text-gray-600 mb-1">Beverages</p>
                  <div className="h-4 w-full bg-gray-200 rounded">
                    <div className="h-4 w-[50%] bg-blue-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Deliveries (Calendar) */}
            <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Upcoming Deliveries
              </h2>

              <div className="flex-1 overflow-auto flex">
                <Calendar
                  className="custom-calendar flex-1"
                  prevLabel="<"
                  nextLabel=">"
                  prev2Label={null}
                  next2Label={null}
                  showNeighboringMonth={false}
                />
                <style>{`
                  .custom-calendar {
                    width: 100% !important;
                    height: 100% !important;
                    font-family: 'Inter', sans-serif !important;
                    background-color: #ffffff !important;
                  }

                  .custom-calendar__navigation {
                    background-color: #278659 !important;
                    color: white !important;
                    border-radius: 0.5rem !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    padding: 0.25rem 0.5rem !important;
                    font-weight: 600 !important;
                    margin-bottom: 0.5rem !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                  }

                  .custom-calendar__navigation button {
                    color: white !important;
                    font-weight: bold !important;
                    padding: 0.25rem 0.5rem !important;
                    border-radius: 0.25rem !important;
                  }

                  .custom-calendar__month-view__weekdays {
                    color: #11452E !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                  }

                  .custom-calendar__tile {
                    color: #11452E !important;
                    background-color: transparent !important;
                    border-radius: 0 !important;
                    height: 3rem !important;
                    width: 3rem !important;
                    margin: 0.15rem !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    cursor: pointer !important;
                    transition: all 0.25s ease-in-out !important;
                  }

                  .custom-calendar__tile:hover {
                    background-color: #27a06c !important;
                    color: #11452E !important;
                    border-radius: 9999px !important;
                    transform: scale(1.05) !important;
                  }

                  .custom-calendar__tile--now {
                    background-color: #a8e6cf !important;
                    color: #11452E !important;
                    border-radius: 9999px !important;
                    font-weight: 600 !important;
                  }

                  .custom-calendar__tile--active {
                    background-color: #a8e6cf !important;
                    color: #11452E !important;
                    border-radius: 9999px !important;
                    font-weight: 600 !important;
                  }

                  .custom-calendar, .custom-calendar * {
                    border: none !important;
                    box-shadow: none !important;
                  }
                `}</style>
              </div>
            </div>
          </div>
>>>>>>> fd360aa98d21368072743ebea494a58444b42054

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDash;