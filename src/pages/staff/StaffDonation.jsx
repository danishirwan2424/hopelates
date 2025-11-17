    import React, { useState, useEffect } from "react";
    import { Outlet } from "react-router-dom";
    import { Edit, Trash2, Search } from "lucide-react";
    import "react-calendar/dist/Calendar.css";
    
    import { applications } from "../dataExample/UserExp";
    
    import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
    import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";
    
    function StaffDonation() {
      return (
        <div className="flex min-h-screen bg-gray-50">
          <aside className="w-64 bg-white">
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
    
              {/* Stats */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
                <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">

                </div>
                <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">

                </div>
                <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-start text-left h-[167px] p-4">

                </div>
              </section>
    
              {/* Application List with Search & Sort */}
              <section className="flex-1 bg-white rounded-[15px] shadow-md p-4 flex flex-col overflow-hidden">
                
    
                
              </section>    
              <Outlet />
            </section>
          </main>
        </div>
      );
    }
    
    export default StaffDonation;
    
