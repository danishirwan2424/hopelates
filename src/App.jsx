import React, { useEffect } from "react";
import "@fontsource/inter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

// Layout Components
import Navbar from "./LandingPage_cmp/Navigator";
import Footer from "./LandingPage_cmp/Footer";

// Main Pages
import Landing from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";

// Staff Pages
import StaffDash from "./pages/staff/StaffDash";
import StaffApplication from "./pages/staff/StaffApplication";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffDistribution from "./pages/staff/StaffDistribution";
import StaffDonation from "./pages/staff/StaffDonation";
import StaffReport from "./pages/staff/StaffReport";
import StaffReceipt from "./pages/staff/StaffReceipt";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// Forms
import Application_donate from "./pages/forms/ApplicationApply";
import DonationApply from "./pages/forms/DonationApply";
import ProfileApplicants from "./pages/forms/ProfileForms";
import ProfileDonor from "./pages/forms/ProfileDonor";
import MyDonation from "./pages/forms/MyDonation";
import DonationConfirmation from "./pages/forms/Forms_cmp/DonationConfirmation";

// PDF Export
import PdfExp from "./pages/staff/StaffPage_cmp/pdfExp";

// 404
import NotFound from "./pages/NotFound";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

// Public Layout
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

// Staff Layout
function StaffLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}

// Donation Layout (NO animation, NO remount)
function DonationLayout() {
  return <Outlet />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Staff Pages */}
        <Route element={<StaffLayout />}>
          <Route path="/staff-dashboard" element={<StaffDash />} />
          <Route path="/staff-application" element={<StaffApplication />} />
          <Route path="/staff-profile" element={<StaffProfile />} />
          <Route path="/staff-distribution" element={<StaffDistribution />} />
          <Route path="/staff-donation" element={<StaffDonation />} />
          <Route path="/staff-report" element={<StaffReport />} />
          <Route path="/staff-receipt" element={<StaffReceipt />} />
          <Route path="/pdf-report" element={<PdfExp />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Forms */}
        <Route path="/application" element={<Application_donate />} />
        <Route path="/applicants-profile" element={<ProfileApplicants />} />
        <Route path="/donor-profile" element={<ProfileDonor />} />
        <Route path="/donation-tracking" element={<MyDonation />} />

        {/* ✅ DONATION FLOW (FINAL & STABLE) */}
        <Route path="/donation" element={<DonationLayout />}>
          <Route index element={<DonationApply />} />
          <Route
            path="donation-confirmation"
            element={<DonationConfirmation />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
