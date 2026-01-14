import React, { useEffect, useMemo, useState } from "react";
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

// ChartJS Setup
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
  // STATE: DASHBOARD DATA
  // ======================================================
  const [dashboardData, setDashboardData] = useState({
    totalApplications: 0,
    completedDistributions: 0,
    applicationsByStatus: { Approved: 0, Pending: 0, Rejected: 0 },
    latestApplications: [],
  });

  // Animated counters
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedCompleted, setAnimatedCompleted] = useState(0);
  const [animatedApproved, setAnimatedApproved] = useState(0);
  const [animatedPending, setAnimatedPending] = useState(0);

  // ======================================================
  // FETCH DASHBOARD DATA FROM BACKEND
  // ======================================================
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // IMPORTANT: relative path so Vite proxy can work
        const res = await fetch("/api/staffDash");
        const data = await res.json();

        setDashboardData({
          totalApplications: data?.totalApplications || 0,
          completedDistributions: data?.completedDistributions || 0,
          applicationsByStatus:
            data?.applicationsByStatus || { Approved: 0, Pending: 0, Rejected: 0 },
          latestApplications: data?.latestApplications || [],
        });

        console.log("Dashboard data received:", data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData({
          totalApplications: 0,
          completedDistributions: 0,
          applicationsByStatus: { Approved: 0, Pending: 0, Rejected: 0 },
          latestApplications: [],
        });
      }
    }

    fetchDashboardData();
  }, []);

  // ======================================================
  // ANIMATE TOTALS (whenever dashboardData changes)
  // ======================================================
  useEffect(() => {
    const totalApps = Number(dashboardData?.totalApplications || 0);
    const completed = Number(dashboardData?.completedDistributions || 0);
    const approved = Number(dashboardData?.applicationsByStatus?.Approved || 0);
    const pending = Number(dashboardData?.applicationsByStatus?.Pending || 0);

    let t = 0,
      c = 0,
      a = 0,
      p = 0;
    const step = 1;

    const timer = setInterval(() => {
      let finished = true;

      if (t < totalApps) {
        t += step;
        finished = false;
      }
      if (c < completed) {
        c += step;
        finished = false;
      }
      if (a < approved) {
        a += step;
        finished = false;
      }
      if (p < pending) {
        p += step;
        finished = false;
      }

      setAnimatedTotal(Math.min(t, totalApps));
      setAnimatedCompleted(Math.min(c, completed));
      setAnimatedApproved(Math.min(a, approved));
      setAnimatedPending(Math.min(p, pending));

      if (finished) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [dashboardData]);

  // ======================================================
  // CHARTS: DOUGHNUT & BAR
  // ======================================================
  const statusLabels = ["Approved", "Pending", "Rejected"];

  const doughnutData = useMemo(
    () => statusLabels.map((label) => dashboardData?.applicationsByStatus?.[label] || 0),
    [dashboardData]
  );

  const doughnutColors = doughnutData.some((val) => val > 0)
    ? ["#3B82F6", "#8B5CF6", "#EC4899"]
    : ["#d1d5db", "#d1d5db", "#d1d5db"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyApplicants = useMemo(() => {
    const arr = Array(12).fill(0);
    (dashboardData?.latestApplications || []).forEach((app) => {
      if (app?.created_at) {
        const monthIndex = new Date(app.created_at).getMonth();
        if (monthIndex >= 0 && monthIndex <= 11) arr[monthIndex] += 1;
      }
    });
    return arr;
  }, [dashboardData]);

  const barColors = monthlyApplicants.some((val) => val > 0)
    ? monthlyApplicants.map((_, i) => ["#3B82F6", "#8B5CF6", "#EC4899"][i % 3])
    : Array(12).fill("#d1d5db");

  // ======================================================
  // DONATION STOCK PANEL (optional; keep your existing endpoint)
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
        setDonationStock(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching donation stock:", error);
        setDonationStock([]);
      }
    }
    fetchDonationStock();
  }, []);

  const categoryData = useMemo(() => {
    const allCategories = Object.keys(colorMap);
    return allCategories.reduce((acc, category) => {
      const item = donationStock?.find((d) => d?.category === category);
      acc[category] = item?.quantity || 0;
      return acc;
    }, {});
  }, [donationStock]);

  const maxQuantity = Math.max(...Object.values(categoryData), 1);

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSideBar />

      <div className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] min-h-0 h-screen overflow-hidden">
        <StaffPanelBar />

        <div
          className="flex-1 overflow-auto rounded-xl shadow-sm p-4 pb-1"
          style={{ backgroundColor: "#F2F1F1" }}
        >
          <h1 className="text-[20px] text-gray-800">Dashboard</h1>
          <h3 className="text-[12px] text-black opacity-[50%] mb-2">
            Plan, prioritize and accomplish your task with ease
          </h3>

          {/* ================= STAT PANELS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Daily Total Application</p>
              <h2 className="text-[64px] font-bold text-white leading-none">
                {animatedTotal}
              </h2>
            </div>

            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Completed Distributions</p>
              <h2 className="text-[64px] font-bold text-black leading-none">
                {animatedCompleted}
              </h2>
            </div>

            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Application Approved</p>
              <h2 className="text-[64px] font-bold text-black leading-none">
                {animatedApproved}
              </h2>
            </div>

            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-black mb-2">Pending Approvement</p>
              <h2 className="text-[64px] font-bold text-black leading-none">
                {animatedPending}
              </h2>
            </div>
          </div>

          {/* ================= CHART PANELS ================= */}
          <div className="flex flex-wrap gap-2 mb-2">
            {/* Doughnut Chart */}
            <div className="bg-white rounded-[15px] shadow-md h-[283px] w-[283px] p-4 flex flex-col">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Applicants Category
              </h2>
              <div className="flex-1 flex items-center justify-center">
                <Doughnut
                  data={{
                    labels: statusLabels,
                    datasets: [{ data: doughnutData, backgroundColor: doughnutColors }],
                  }}
                  options={{
                    plugins: { legend: { position: "bottom" } },
                    cutout: "70%",
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Bar Chart */}
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
                        data: monthlyApplicants,
                        backgroundColor: barColors,
                        borderRadius: 6,
                      },
                    ],
                  }}
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
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Donation Stock
              </h2>

              <div className="flex flex-col gap-4 mt-2 overflow-scroll pb-7">
                {Object.entries(categoryData).map(([category, qty]) => {
                  const widthPercent = Math.min((qty / maxQuantity) * 100, 100);
                  const color = qty > 0 ? colorMap[category] : "#d1d5db";

                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[13px] text-gray-600">{category}</p>
                        <span className="text-[13px] text-black/50 font-semibold pr-6">
                          {qty}
                        </span>
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

            {/* Calendar */}
            <div className="bg-white rounded-[15px] shadow-md h-[273px] flex-1 min-w-[283px] p-4 flex flex-col border-0">
              <h2 className="text-[15px] font-semibold text-gray-700 mb-3">
                Upcoming Deliveries
              </h2>
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
  );
}

export default StaffDash;
