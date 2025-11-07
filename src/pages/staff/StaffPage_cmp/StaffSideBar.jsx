import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Logo
import Logo from "../../../images/Logo3.png";

// Icons
import DashboardIcon from "../../../images/DashboardIcon.png";  
import ApplicationIcon from "../../../images/Application.png";
import DistributionIcon from "../../../images/Distribution.png";
import DonationStockIcon from "../../../images/DonationStock.png";
import ProfileIcon from "../../../images/Profile.png";
import ReportsIcon from "../../../images/Reports.png";

function StaffSideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to homepage
  };

  // ✅ Added icon property for each menu
  const menuItems = [
    { name: "DASHBOARD", path: "/staff-dashboard", icon: DashboardIcon },
    { name: "APPLICATION", path: "/staff-application", icon: ApplicationIcon },
    { name: "DISTRIBUTION", path: "/staff-distribution", icon: DistributionIcon },
    { name: "DONATION STOCK", path: "/staff-donation-stock", icon: DonationStockIcon },
    { name: "PROFILE", path: "/staff-profile", icon: ProfileIcon },
    { name: "REPORTS", path: "/staff-reports", icon: ReportsIcon },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transform fixed lg:static top-0 left-0 h-[calc(100vh-40px)] w-64 bg-white border border-gray-200 shadow-md transition-transform duration-300 ease-in-out z-40`}
        style={{
          marginLeft: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "#F2F1F1",
        }}
      >
        {/* Logo Header */}
        <div className="flex items-center justify-center mb-6 px-4 mt-4">
          <img src={Logo} alt="Logo" className="h-18 w-auto object-contain" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col px-4 space-y-2">
          <h1 className="text-black opacity-50 pl-3 pt-10">Menu</h1>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "text-[#019461]"
                    : "text-gray-700 hover:text-[#019461] hover:bg-gray-50"
                }`}
              >
                {/* ✅ Use icon dynamically */}
                <img src={item.icon} alt={`${item.name} Icon`} className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors font-semibold tracking-wide"
          >
            <LogOut size={20} />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default StaffSideBar;
