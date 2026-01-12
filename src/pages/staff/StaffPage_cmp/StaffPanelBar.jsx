import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { staffPages } from "../../staff/StaffPage_cmp/staffPages"; // import the array

function StaffPanelBar({ userEmail = "staff@example.com" }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Filter pages based on query and keywords
  const filteredSuggestions = staffPages.filter((page) => {
    const q = query.toLowerCase();
    return (
      page.label.toLowerCase().includes(q) ||
      (page.keywords && page.keywords.some((kw) => kw.toLowerCase().includes(q)))
    );
  });

  function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion.label);
    setShowSuggestions(false);
    navigate(suggestion.link); // navigate to the selected page
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between bg-[#F2F1F1] border border-gray-200 shadow-md rounded-lg px-6 py-3 mb-3">
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-md bg-white rounded-lg px-3 py-2 shadow-sm">
          <Search className="text-gray-500 mr-2 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
              {filteredSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="font-medium text-gray-800">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User Email */}
        <div className="text-gray-700 font-semibold ml-6 whitespace-nowrap">
          {userEmail}
        </div>
      </div>
    </div>
  );
}

export default StaffPanelBar;
