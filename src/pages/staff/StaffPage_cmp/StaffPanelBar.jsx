import React, { useState } from "react";
import { Search } from "lucide-react";

function StaffPanelBar({ userEmail = "staff@example.com", onSearch }) {
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    // Send search value back to the parent page
    if (onSearch) {
      onSearch(value);
    }
  }

  return (
    <div
      className="flex items-center justify-between bg-[#F2F1F1] border border-gray-200 shadow-md rounded-lg px-6 py-3 mb-3"
      style={{ borderRadius: "8px" }}
    >
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-white rounded-lg px-3 py-2 shadow-sm">
        <Search className="text-gray-500 mr-2 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
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
