console.log("✅ RUNNING INDEX:", __filename);

// ==============================================
// BIGINT SERIALIZATION FIX
// ==============================================
BigInt.prototype.toJSON = function () {
  return Number(this);
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// MIDDLEWARE (ONCE)
// ======================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ======================
// HEALTH CHECK
// ======================
app.get("/ping", (req, res) => {
  res.json({ ok: true, where: __filename });
});

// ======================
// ROUTES
// ======================
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application");
const donationTestRoutes = require("./routes/donationTest");
const distributionRoutes = require("./routes/distribution");
const staffApplicationRoutes = require("./routes/staffApplication");
const staffDashRoutes = require("./routes/staffDash");

app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/test", donationTestRoutes);
app.use("/api/staff-distribution", distributionRoutes);
app.use("/api/staff-application", staffApplicationRoutes);
app.use("/api/staffDash", staffDashRoutes);

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
// START SERVER (ONCE)
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
