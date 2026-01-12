require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// ✅ FIX: allow large image payloads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ======================
// EXISTING ROUTES (DO NOT TOUCH)
// ======================
const applicationRoutes = require("./routes/application");
const authRoutes = require("./routes/auth");

app.use("/api/application", applicationRoutes);
app.use("/api/auth", authRoutes);

// ======================
// DONATION DB ROUTES
// ======================
const donationTestRoutes = require("./routes/donationTest");
console.log("donationTestRoutes loaded");
app.use("/api/packages", donationTestRoutes);

// ======================
// INVENTORY DB TEST ROUTE
// ======================
const inventoryTestRoutes = require("./routes/InventoryTest");
console.log("inventoryTestRoutes loaded");
app.use("/api/inventory", inventoryTestRoutes);

// ======================
// FOOD DISTRIBUTION DB TEST ROUTE
// ======================
const foodTestRoutes = require("./routes/foodTest");
console.log("foodTestRoutes loaded");
app.use("/api/food", foodTestRoutes);

// ======================
// BENEFICIARY DB TEST ROUTE
// ======================
const beneficiaryTestRoutes = require("./routes/beneficiaryTest");
console.log("beneficiaryTestRoutes loaded");
app.use("/api/beneficiary", beneficiaryTestRoutes);

// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
