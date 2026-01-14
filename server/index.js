console.log("✅ RUNNING INDEX:", __filename);
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// ======================
// HEALTH CHECK
// ======================
app.get("/ping", (req, res) => {
  res.json({ ok: true, where: __filename });
});

// ======================
// USER ACCESS AND MANAGEMENT ROUTES
// ======================
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ======================
// APPLICATION ROUTES
// ======================
const applicationRoutes = require("./routes/application");
app.use("/api/application", applicationRoutes);

// ======================
// DONATION TEST ROUTE
// ======================
const donationTestRoutes = require("./routes/donationTest");
console.log("donationTestRoutes loaded");
app.use("/api/test", donationTestRoutes);

// ======================
// STAFF DISTRIBUTION ROUTES
// ======================
const distributionRoutes = require("./routes/distribution");
app.use("/api/staff-distribution", distributionRoutes);

const staffDashRoutes = require("./routes/staffDash");
app.use("/api/staffDash", staffDashRoutes);


// ======================
// STAFF APPLICATION ROUTES
// ======================
const staffApplicationRoutes = require("./routes/staffApplication");
app.use("/api/staff-application", staffApplicationRoutes);

// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ success: false, message: err.message });
});

// ======================
// 404 HANDLER
// ======================
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

