import React, { useEffect } from "react";
import "@fontsource/inter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
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

// ✅ Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

// ✅ Fallback Page
const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
    <p className="text-gray-600 mb-6">Oops! Page not found.</p>
    <a href="/landing" className="text-[#019461] font-medium hover:underline">
      Back to Home
    </a>
  </div>
);

// ✅ Smooth Scroll to Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ✅ Page Transition Wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      key={useLocation().pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

// ✅ Persistent Layout
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />
      <main className="flex-grow">
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Redirect root → landing */}
          <Route path="/" element={<Navigate to="/landing" />} />

          {/* ✅ Main Layout Routes */}
          <Route element={<Layout />}>
            <Route path="/landing" element={<Landing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* ✅ Auth Pages (No Navbar/Footer) */}
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signp" element={<PageWrapper><SignUp /></PageWrapper>} />

          {/* ✅ Fallback */}
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
