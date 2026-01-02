import React, { useEffect } from "react";
import "@fontsource/inter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Layout Components
import Navbar from "./LandingPage_cmp/Navigator";
import Footer from "./LandingPage_cmp/Footer";

// ✅ Main Pages
import Landing from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";

// ✅ Staff Pages
import StaffDash from "./pages/staff/StaffDash";
import StaffApplication from "./pages/staff/StaffApplication";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffDistribution from "./pages/staff/StaffDistribution";
import StaffDonation from "./pages/staff/StaffDonation";
import StaffReport from "./pages/staff/StaffReport";
import StaffReceipt from "./pages/staff/StaffReceipt";

// ✅ Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// ✅ Forms
import Application_donate from "./pages/forms/ApplicationApply"; 
import DonationApply from "./pages/forms/DonationApply";


// ✅  PDF Export Page
import PdfExp from "./pages/staff/StaffPage_cmp/pdfExp";

// ✅ 404 Page
import NotFound from "./pages/NotFound"; 


// ✅ Scroll to Top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ✅ Animation Wrapper (for public & auth pages only)
function AnimatedPage({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ✅ Public Layout (Navbar + Footer + animation)
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// ✅ Staff Layout (No Navbar/Footer, instant render)
function StaffLayout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Outlet /> {/* instantly render staff pages */}
    </div>
  );
}

// ✅ Main App Router
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Redirect root → landing */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* ✅ Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ✅ Staff Routes */}
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

        {/* ✅ Auth Pages (animated) */}
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <Login />
            </AnimatedPage>
          }
        />
        <Route
          path="/signUp"
          element={
            <AnimatedPage>
              <SignUp />
            </AnimatedPage>
          }
        />
        <Route
          path="/application"
          element={
            <AnimatedPage>
              <Application_donate />
            </AnimatedPage>
          }
        />
        <Route
          path="/donation"
          element={
            <AnimatedPage>
              <DonationApply />
            </AnimatedPage>
          }
        />
        {/* ✅ 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
