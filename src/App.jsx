import React from "react";
import "@fontsource/inter";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Page Imports
import Landing from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs"; 
import Services from "./pages/Services";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to landing */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* ✅ Main Pages */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
