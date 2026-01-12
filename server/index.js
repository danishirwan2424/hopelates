// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// CORE ROUTES
// ======================
const applicationRoutes = require("./routes/application");
const authRoutes = require("./routes/auth");

// ✅ ADD THIS (you already committed distribution.js)
const distributionRoutes = require("./routes/distribution");

app.use("/api/application", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/distribution", distributionRoutes);
app.use("/api/staff-distribution", distributionRoutes); // optional alias

// ======================
// OPTIONAL / TEST ROUTES
// ======================
try {
  const donationTestRoutes = require("./routes/donationTest");
  app.use("/api/test", donationTestRoutes);
} catch (e) {
  console.warn("donationTestRoutes not loaded");
}

try {
  // ⚠️ make sure filename matches EXACT case
  const inventoryTestRoutes = require("./routes/InventoryTest");
  app.use("/api/inventory", inventoryTestRoutes);
} catch (e) {
  console.warn("inventoryTestRoutes not loaded");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
