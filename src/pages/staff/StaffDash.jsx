import React, { useState, useEffect } from "react";
import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffDash() {
  const [totalApplications, setTotalApplications] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);

  // Fetch total applications from API
  useEffect(() => {
    async function fetchTotalApplications() {
      try {
        const res = await fetch("/api/staffDash");
        const data = await res.json();
        console.log("Total Applications (API):", data.totalApplications);
        setTotalApplications(data.totalApplications || 0);
      } catch (error) {
        console.error("Error fetching total applications:", error);
        setTotalApplications(0);
      }
    }
    fetchTotalApplications();
  }, []);

  // Animate counter
  useEffect(() => {
    let current = 0;
    const step = 1;
    const timer = setInterval(() => {
      if (current < totalApplications) {
        current += step;
        setAnimatedCount(Math.min(current, totalApplications));
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [totalApplications]);

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

          {/* Total Applications Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">
              <p className="text-[15px] text-white mb-2">Total Applications</p>
              <h2 className="text-[64px] font-bold text-white leading-none">{animatedCount}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDash;
