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
  // ===== Dummy Data =====
  const applicationsDummy = [
    { id: 1, status: "Completed" },
    { id: 2, status: "Pending" },
    { id: 3, status: "Completed" },
    { id: 4, status: "Rejected" },
    { id: 5, status: "Pending" },
  ];

  const statusCountsDummy = {
    Completed: applicationsDummy.filter(a => a.status === "Completed").length,
    Pending: applicationsDummy.filter(a => a.status === "Pending").length,
    Rejected: applicationsDummy.filter(a => a.status === "Rejected").length,
  };

  const monthsDummy = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyApplicantsDummy = [5, 8, 3, 6, 2, 7, 4, 9, 1, 5, 3, 6];

  const donationStockDummy = [
    { category: "Rice", quantity: 50 },
    { category: "Canned Sardines", quantity: 30 },
    { category: "Cooking Oil", quantity: 20 },
    { category: "Instant Noodle", quantity: 40 },
    { category: "Chocolate Drink", quantity: 25 },
  ];

  const colorMap = {
    Rice: "#3B82F6",
    "Canned Sardines": "#8B5CF6",
    "Cooking Oil": "#EC4899",
    "Instant Noodle": "#3B82F6",
    "Chocolate Drink": "#8B5CF6",
  };

  // ===== Animated Stats State =====
  const [dailyTotal, setDailyTotal] = useState(0);
  const [completedDist, setCompletedDist] = useState(0);
  const [approvedApp, setApprovedApp] = useState(0);
  const [pendingApp, setPendingApp] = useState(0);

  // Totals
  const totalDaily = applicationsDummy.length;
  const totalCompleted = applicationsDummy.filter(a => a.status === "Completed").length;
  const totalApproved = totalCompleted; // same as completed
  const totalPending = applicationsDummy.filter(a => a.status === "Pending").length;

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

  // Donation Stock calculations
  const categoryData = donationStockDummy.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.quantity;
    return acc;
  }, {});
  const maxQuantity = Math.max(...Object.values(categoryData));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </div>

      {/* Main Content */}
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

            {/* Stats Panels */}
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

            {/* Charts Panels */}
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
                          data: [
                            statusCountsDummy.Completed,
                            statusCountsDummy.Pending,
                            statusCountsDummy.Rejected
                          ],
                          backgroundColor: ["#3B82F6", "#8B5CF6", "#EC4899"],
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
                      labels: monthsDummy,
                      datasets: [
                        {
                          label: "Applicants",
                          data: monthlyApplicantsDummy,
                          backgroundColor: monthlyApplicantsDummy.map((_, index) => {
                            const colors = ["#3B82F6", "#8B5CF6", "#EC4899"];
                            return colors[index % 3];
                          }),
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
            </div>

            {/* Donation Stock & Calendar */}
            <div className="flex flex-wrap gap-2 mb-0">
              {/* Donation Stock */}
              <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[400px] p-4 flex flex-col">
                <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Donation Stock</h2>
                <div className="flex flex-col gap-4 mt-2 overflow-scroll pb-7">
                  {Object.entries(categoryData).map(([category, qty]) => {
                    const widthPercent = Math.min((qty / maxQuantity) * 100, 100);
                    const color = colorMap[category] || "#278659";

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
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Deliveries (Calendar) */}
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

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDash;
