<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";

function StaffDash() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Applications", value: "124", color: "bg-blue-500" },
    { label: "Pending Review", value: "45", color: "bg-yellow-500" },
    { label: "Approved", value: "67", color: "bg-green-500" },
    { label: "Rejected", value: "12", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
          <button
            onClick={() => navigate("/staff-profile")}
            className="bg-[#019461] text-white px-4 py-2 rounded-lg hover:bg-[#017a54]"
          >
            My Profile
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back, Staff</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div>
                  <p className="font-semibold text-gray-900">Application #{1000 + item}</p>
                  <p className="text-sm text-gray-600">Submitted on 2025-01-{10 + item}</p>
                </div>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/staff-application")}
            className="mt-6 w-full bg-[#019461] text-white font-semibold py-3 rounded-lg hover:bg-[#017a54]"
          >
            View All Applications
          </button>
=======
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

import { applications, statusCounts, months, monthlyApplicants } from "../dataExample/UserExp";
import { donationStock, donationStats } from "../dataExample/DonationExp";

// Components
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";


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
  // ===== Animated Stats State =====
  const [dailyTotal, setDailyTotal] = useState(0);
  const [completedDist, setCompletedDist] = useState(0);
  const [approvedApp, setApprovedApp] = useState(0);
  const [pendingApp, setPendingApp] = useState(0);

  // Totals
  const totalDaily = applications.length;
  const totalCompleted = applications.filter(a => a.status === "Completed").length;
  const totalApproved = totalCompleted; // same as completed
  const totalPending = applications.filter(a => a.status === "Pending").length;

  // Group by category and sum quantities
  const categoryData = donationStock.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.quantity;
    return acc;
  }, {});

  // Find max quantity for scaling bars
  const maxQuantity = Math.max(...Object.values(categoryData));


  // Animate numbers
  useEffect(() => {
    let dt = 0, cd = 0, ap = 0, pd = 0;
    const step = 1;

    const timer = setInterval(() => {
      if (dt < totalDaily) dt += step;
      if (cd < totalCompleted) cd += step;
      if (ap < totalApproved) ap += step;
      if (pd < totalPending) pd += step;

      setDailyTotal(dt > totalDaily ? totalDaily : dt);
      setCompletedDist(cd > totalCompleted ? totalCompleted : cd);
      setApprovedApp(ap > totalApproved ? totalApproved : ap);
      setPendingApp(pd > totalPending ? totalPending : pd);

      if (dt >= totalDaily && cd >= totalCompleted && ap >= totalApproved && pd >= totalPending) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [totalDaily, totalCompleted, totalApproved, totalPending]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <div className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0">
          <StaffPanelBar />

          <div
            className="flex-1 overflow-auto rounded-xl shadow-sm p-4 pb-1"
            style={{ backgroundColor: "#F2F1F1" }}
          >
            {/* Dashboard Header */}
            <h1 className="text-[20px] text-gray-800">Dashboard</h1>
            <h3 className="text-[12px] text-black opacity-[50%] mb-2">
              Plan, prioritize and accomplish your task with ease
            </h3>

            {/* ===== Stats Panels ===== */}
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

            {/* Charts, Stock & Calendar panels remain unchanged... */}
            {/* <Your existing JSX code here> */}
                      {/* ===== Charts Panels ===== */}
          <div className="flex flex-wrap gap-2 mb-2">
            {/* Applicants Category (Doughnut) */}
            <div className="bg-white rounded-[15px] shadow-md h-[283px] w-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Applicants Category
              </h2>

              <div className="flex-1 flex items-center justify-center">
                <Doughnut
                  data={{
                    labels: ["Completed", "Pending", "Rejected"],
                    datasets: [
                      {
                        label: "Applicants",
                        data: [statusCounts.Completed, statusCounts.Pending, statusCounts.Rejected],
                        backgroundColor: ["#278659", "#11452E", "#9BC6B3"],
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
                        backgroundColor: "#278659",
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

              </div>
            </div>
          </div>

          {/* ===== Stock & Calendar Panels ===== */}
          <div className="flex flex-wrap gap-2 mb-0">
            {/* Donation Stock */}
            <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[400px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Donation Stock
              </h2>

<div className="flex flex-col gap-4 mt-2 overflow-scroll pb-7">
  {Object.entries(categoryData).map(([category, qty]) => {
    const widthPercent = Math.min((qty / maxQuantity) * 100, 100);

    // If the bar is less than 20% of the max, use dark green for low stock
    const color = widthPercent < 20 ? "#11452E" : "#278659";

    return (
      <div key={category}>
        {/* Category title and quantity in same row */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-[13px] text-gray-600">{category}</p>
          <span className="text-[13px] text-black/50 font-semibold pr-6">{qty}</span>
        </div>

        {/* Progress bar */}
        <div className="h-4 w-full bg-gray-200 rounded">
          <div
            className="h-4 rounded"
            style={{ width: `${widthPercent}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  })}
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

            <Outlet />
          </div>
>>>>>>> b014efa4548877040a1c34ae1895bec6c9b3ff3c
        </div>
      </div>
    </div>
  );
}

export default StaffDash;
