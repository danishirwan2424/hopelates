import React from "react";
import { Search } from "lucide-react";

function StaffPanelBar({ userEmail = "staff@example.com" }) {
  return (
    <div
      className="flex items-center justify-between bg-white border border-gray-200 shadow-md rounded-lg px-6 py-3 mb-3"
      style={{ 
        borderRadius: "8px",
        backgroundColor: "#F2F1F1",
        }}
    >
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-white rounded-lg px-3 py-2">
        <Search className="text-gray-500 mr-2 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* User Email */}
      <div className="text-gray-700 font-semibold ml-6 whitespace-nowrap">
        {userEmail}
      </div>
    </div>
  );
}

export default StaffPanelBar;
