import React, { useState, useEffect } from "react";
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
import ReceiptIcon from "../../../images/Receipt.png";

function StaffSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(window.innerWidth >= 770);

  // 🔐 Get role
  const role = localStorage.getItem("role"); // "admin" | "superadmin"

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 770);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Common menu
  const menuItems = [
    { name: "DASHBOARD", path: "/staff-dashboard", icon: DashboardIcon },
    { name: "APPLICATION", path: "/staff-application", icon: ApplicationIcon },
    { name: "DISTRIBUTION", path: "/staff-distribution", icon: DistributionIcon },
    { name: "INVENTORY", path: "/staff-donation", icon: DonationStockIcon },
    { name: "DONATION LIST", path: "/staff-receipt", icon: ReceiptIcon },
    { name: "REPORTS", path: "/staff-report", icon: ReportsIcon },
    { name: "PROFILE", path: "/staff-profile", icon: ProfileIcon },
  ];

  // Superadmin-only menu
  const superAdminMenu = [
    {
      name: "STAFF MANAGEMENT",
      path: "/staff-manage",
      icon: ProfileIcon,
    },
  ];

  const roleLabel =
  role === "superadmin"
    ? "SUPER ADMIN"
    : role === "admin"
    ? "ADMIN"
    : "STAFF";


  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform fixed md:static top-0 left-0 h-[calc(100vh-40px)] w-64 border border-gray-200 shadow-md transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
        style={{
          marginLeft: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          backgroundColor: "#F2F1F1",
        }}
      >
        <div className="flex flex-col h-full px-4">
          {/* Logo */}
{/* Logo + Role */}
<div className="flex flex-col items-center justify-center mb-6 mt-4">
  <img
    src={Logo}
    alt="Logo"
    className="h-18 w-auto object-contain"
  />

  <span
    className={`mt-2 text-xs font-semibold tracking-widest px-3 py-1 rounded-full
      ${
        role === "superadmin"
          ? "bg-purple-100 text-purple-700"
          : role === "admin"
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-200 text-gray-700"
      }
    `}
  >
    {roleLabel}
  </span>
</div>


          {/* Menu */}
          <nav className="flex flex-col space-y-2">
            <h1 className="text-black opacity-50 pl-3 pt-10">Menu</h1>

            {/* Common Menu */}
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
                  <img src={item.icon} alt={`${item.name} Icon`} className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Superadmin Menu */}
            {role === "superadmin" && (
              <>
                {superAdminMenu.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={`super-${index}`}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold tracking-wide transition-colors ${
                        isActive
                          ? "text-[#019461]"
                          : "text-gray-700 hover:text-[#019461] hover:bg-gray-50"
                      }`}
                    >
                      <img src={item.icon} alt={`${item.name} Icon`} className="w-5 h-5" />
                       <span>{item.name}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>

          {/* Logout */}
          <div className="mt-1 mb-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors font-semibold tracking-wide"
            >
              <LogOut size={20} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default StaffSideBar;
