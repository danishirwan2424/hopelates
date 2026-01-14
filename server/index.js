require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Load all database connections
const { donationDB, inventoryDB, foodDB, beneficiaryDB } = require("./db");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

// ======================
// HELPER: Safe route loader
// ======================
function safeRoute(routePath, mountPath) {
  const fullPath = path.resolve(__dirname, routePath);
  if (fs.existsSync(fullPath + ".js")) {
    try {
      const route = require(fullPath);
      app.use(mountPath, route);
      console.log(`✅ Route loaded: ${routePath} at ${mountPath}`);
    } catch (err) {
      console.warn(`⚠️  Failed to load route ${routePath} at ${mountPath}`);
      console.warn(`    Error: ${err.message}`);
    }
  } else {
    console.warn(`⚠️  Route file not found: ${routePath}, skipping ${mountPath}`);
  }
}

// ======================
// YOUR EXISTING ROUTES
// ======================
safeRoute("./routes/staffDash", "/api/staffDash");
safeRoute("./routes/auth", "/api/auth");

// ======================
// TEMP TEST ROUTES
// ======================
safeRoute("./routes/donationTest", "/api/test");
safeRoute("./routes/inventoryTest", "/api/inventory");
safeRoute("./routes/foodTest", "/api/food");
safeRoute("./routes/beneficiaryTest", "/api/beneficiary");
safeRoute("./routes/dbStatus", "/api/db-status");

// ======================
// FRIEND'S ADDITIONAL ROUTES
// ======================
safeRoute("./routes/distribution", "/api/staff-distribution");
safeRoute("./routes/staffApplication", "/api/staff-application");

// ======================
// PING
// ======================
app.get("/ping", (req, res) => res.json({ ok: true }));

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
