import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { staffPages } from "../../staff/StaffPage_cmp/staffPages";

function StaffPanelBar({ userEmail = "staff@example.com" }) {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* ------------------ Debounce search input ------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  /* ------------------ Memoized filtering ------------------ */
  const filteredSuggestions = useMemo(() => {
    if (!debouncedQuery) return [];

    return staffPages.filter((page) =>
      page.searchText.includes(debouncedQuery)
    );
  }, [debouncedQuery]);

  /* ------------------ Click outside to close ------------------ */
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ------------------ Handlers ------------------ */
  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (page) => {
    setQuery(page.label);
    setShowSuggestions(false);
    navigate(page.link);
  };

  /* ------------------ Render ------------------ */
  return (
    <div className="flex flex-col w-full" ref={wrapperRef}>
      <div className="flex items-center justify-between bg-[#F2F1F1] border border-gray-200 shadow-md rounded-lg px-6 py-3 mb-3">
        
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-md bg-white rounded-lg px-3 py-2 shadow-sm">
          <Search className="text-gray-500 mr-2 w-5 h-5" />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />

          {/* Suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 z-10 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
              {filteredSuggestions.map((item) => (
                <li
                  key={item.link}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  <div className="font-medium text-gray-800">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User Email */}
        <div className="ml-6 text-gray-700 font-semibold whitespace-nowrap">
          {userEmail}
        </div>
      </div>
    </div>
  );
}

export default StaffPanelBar;
