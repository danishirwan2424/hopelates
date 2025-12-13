// App.jsx

import React, { useEffect } from "react";
import "@fontsource/inter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  useNavigate
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Layout Components
import Navbar from "./LandingPage_cmp/Navigator"; // Assuming Navigator is your Navbar
import Footer from "./LandingPage_cmp/Footer";

// ✅ Main Pages
import Landing from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// ✅ Staff Pages
import StaffDash from "./pages/staff/StaffDash";
import StaffApplication from "./pages/staff/StaffApplication";
import StaffProfile from "./pages/staff/StaffProfile";

// ✅ Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// ✅ Forms & Donation Flow
import Application from "./pages/forms/Application";
import Donation from "./pages/forms/Donations";
import CheckDetails from "./pages/forms/CheckDetails";
import Payment from "./pages/forms/Payment";

// --------------------------------------------------------
// ✅ Donation Confirmation Page Component
// --------------------------------------------------------
const DonationConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    donationId, 
    packageName, 
    totalAmount, 
    transactionDate 
  } = location.state || {};

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f2f2f2',
      fontFamily: 'Inter, Arial, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        textAlign: 'center',
        border: '2px solid #11ab72',
      }}>
        <div style={{fontSize: '4em', color: '#11ab72', marginBottom: '20px'}}>✓</div>
        <h1 style={{color: '#333', marginBottom: '10px'}}>Donation Successful!</h1>
        <p style={{color: '#666', marginBottom: '30px'}}>
          Thank you for your generous contribution to HOPEPLATES.
        </p>
        
        <div style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px',
        }}>
          <div style={{marginBottom: '10px'}}>
            <span style={{color: '#666'}}>Donation ID: </span>
            <strong style={{color: '#333'}}>{donationId || 'XX001'}</strong>
          </div>
          <div style={{marginBottom: '10px'}}>
            <span style={{color: '#666'}}>Package: </span>
            <strong style={{color: '#333'}}>{packageName || 'Package A'}</strong>
          </div>
          <div style={{marginBottom: '10px'}}>
            <span style={{color: '#666'}}>Amount: </span>
            <strong style={{color: '#11ab72', fontSize: '1.2em'}}>RM {totalAmount || '100'}</strong>
          </div>
          <div>
            <span style={{color: '#666'}}>Date: </span>
            <strong style={{color: '#333'}}>{transactionDate || new Date().toLocaleDateString()}</strong>
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
          <button
            onClick={() => navigate('/landing')}
            style={{
              backgroundColor: '#11ab72',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '1em',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/donate')}
            style={{
              backgroundColor: 'transparent',
              color: '#11ab72',
              border: '2px solid #11ab72',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '1em',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Donate Again
          </button>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------
// ✅ 404 Page Component
// --------------------------------------------------------
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/landing");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
      <p className="text-gray-600 mb-6">Oops! Page not found.</p>
      <a
        onClick={handleGoBack}
        className="text-[#019461] font-medium hover:underline cursor-pointer"
      >
        Go Back
      </a>
    </div>
  );
};

// --------------------------------------------------------
// ✅ Scroll to Top Hook
// --------------------------------------------------------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// --------------------------------------------------------
// ✅ Animation Wrapper Component
// --------------------------------------------------------
function AnimatedPage({ children }) {
  const location = useLocation();
  const animatedPaths = [
    "/landing",
    "/about",
    "/services",
    "/contact",
    "/login",
    "/signup",
    "/donate",
    "/check-details",
    "/payment",
    "/donation-confirmation",
    "/application"
  ];

  const shouldAnimate = animatedPaths.includes(location.pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.key}
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={shouldAnimate ? { opacity: 0 } : false}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// --------------------------------------------------------
// ✅ Public Layout (Navbar + Footer)
// --------------------------------------------------------
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow">
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </main>
      <Footer />
    </div>
  );
}

// --------------------------------------------------------
// ✅ Donation Layout (Special layout for donation flow/forms)
// --------------------------------------------------------
function DonationLayout() {
  // Note: This layout omits the Navbar, suggesting a cleaner form experience,
  // but keeps the Footer.
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow">
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </main>
      <Footer />
    </div>
  );
}

// --------------------------------------------------------
// ✅ Staff Layout (No Navbar/Footer - typically for dashboard)
// --------------------------------------------------------
function StaffLayout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Outlet />
    </div>
  );
}

// --------------------------------------------------------
// ✅ Main App Router
// --------------------------------------------------------
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Redirect root → landing */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* ===================================== */}
        {/* ✅ Public Routes (Uses PublicLayout) */}
        {/* ===================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ===================================== */}
        {/* ✅ Donation/Forms Routes (Uses DonationLayout) */}
        {/* ===================================== */}
        <Route element={<DonationLayout />}>
          <Route path="/donate" element={<Donation />} />
          <Route path="/check-details" element={<CheckDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/donation-confirmation" element={<DonationConfirmation />} />
          <Route path="/application" element={<Application />} /> {/* The new Application route */}
        </Route>

        {/* ===================================== */}
        {/* ✅ Staff Routes (Uses StaffLayout) */}
        {/* ===================================== */}
        <Route element={<StaffLayout />}>
          <Route path="/staff-dashboard" element={<StaffDash />} />
          <Route path="/staff-application" element={<StaffApplication />} />
          <Route path="/staff-profile" element={<StaffProfile />} />
        </Route>

        {/* ===================================== */}
        {/* ✅ Auth Pages (Individual Animation) */}
        {/* ===================================== */}
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

        {/* ===================================== */}
        {/* ✅ 404 Fallback */}
        {/* ===================================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;