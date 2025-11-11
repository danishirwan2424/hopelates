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

// ✅ Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// ✅ 404 Page (Fixed & Updated)
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // ✅ Go to last page
    } else {
      navigate("/landing"); // ✅ Fallback when no history
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

// ✅ Scroll to Top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ✅ Animation Wrapper
function AnimatedPage({ children }) {
  const location = useLocation();
  const animatedPaths = [
    "/landing",
    "/about",
    "/services",
    "/donations",
    "/contact",
    "/login",
    "/signup",
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

// ✅ Public Layout (Navbar + Footer)
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

// ✅ Staff Layout (No Navbar/Footer)
function StaffLayout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Outlet />
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
        </Route>

        {/* ✅ Auth Pages */}
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

        {/* ✅ 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
