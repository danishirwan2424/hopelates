// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< Updated upstream
// ======================
// APPLICATION ROUTES (DO NOT TOUCH)
// ======================
const applicationRoutes = require("./routes/application");
const authRoutes = require("./routes/auth");
=======
// Routes
const applicationRoutes = require("./routes/application"); // Postgres
const authRoutes = require("./routes/auth");               // (your existing)
const distributionRoutes = require("./routes/distribution"); // MySQL
>>>>>>> Stashed changes

app.use("/api/application", applicationRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/distribution", distributionRoutes);
app.use("/api/staff-distribution", distributionRoutes); // optional alias

// keep your other routes (if files exist)
try {
  const donationTestRoutes = require("./routes/donationTest");
  app.use("/api/test", donationTestRoutes);
} catch {}

try {
  const inventoryTestRoutes = require("./routes/InventoryTest");
  app.use("/api/inventory", inventoryTestRoutes);
} catch {}

<<<<<<< Updated upstream
// ======================
=======
try {
  const foodTestRoutes = require("./routes/foodTest");
  app.use("/api/food", foodTestRoutes);
} catch {}

try {
  const beneficiaryTestRoutes = require("./routes/beneficiaryTest");
  app.use("/api/beneficiary", beneficiaryTestRoutes);
} catch {}

>>>>>>> Stashed changes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
