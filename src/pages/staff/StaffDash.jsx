import React from "react";
import { Outlet } from "react-router-dom";
import { Users, ClipboardList, Settings } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Components
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

// Chart.js Setup
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
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <div className="w-64 bg-white">
        <StaffSideBar />
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0">
        {/* Top Search/Panel Bar */}
        <StaffPanelBar />

        {/* ===== Dashboard Panel ===== */}
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
            {/* Daily Total Application */}
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Daily Total Application</p>
              <h2 className="text-[64px] font-bold text-white leading-none">239</h2>
            </div>

            {/* Completed Distributions */}
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Completed Distributions</p>
              <h2 className="text-[64px] font-bold text-black leading-none">104</h2>
            </div>

            {/* Application Approved */}
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Application Approved</p>
              <h2 className="text-[64px] font-bold text-black leading-none">234</h2>
            </div>

            {/* Pending Approvement */}
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Pending Approvement</p>
              <h2 className="text-[64px] font-bold text-black leading-none">5</h2>
            </div>
          </div>

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
                    labels: ["Approved", "Pending", "Rejected"],
                    datasets: [
                      {
                        label: "Applicants",
                        data: [60, 25, 15],
                        backgroundColor: ["#278659", "#11452E", "#9BC6B3"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { color: "#000", boxWidth: 12 },
                      },
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
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Applicants",
                        data: [120, 150, 100, 180, 130, 160],
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
                        grid: { display: false },
                      },
                      y: {
                        ticks: { color: "#000" },
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

          <Outlet />
        </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDash;
