require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ======================
// USER ACCESS AND MANAGEMENT ROUTES (DO NOT TOUCH)
// ======================
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ======================
// APPLICATION ROUTES (DO NOT TOUCH)
// ======================
const applicationRoutes = require("./routes/application");
app.use("/api/application", applicationRoutes);

// ======================
// TEMPORARY DONATION DB TEST ROUTE
// ======================
const donationTestRoutes = require("./routes/donationTest");
console.log("donationTestRoutes loaded");
app.use("/api/test", donationTestRoutes);

// ======================
// NEW: INVENTORY DB TEST ROUTE (CONNECTION ONLY)
// ======================
const inventoryTestRoutes = require("./routes/inventoryTest");
console.log("inventoryTestRoutes loaded");
app.use("/api/inventory", inventoryTestRoutes);

// ======================
// FOOD DISTRIBUTION DB TEST ROUTE
// ======================
const foodTestRoutes = require("./routes/foodTest");
console.log("foodTestRoutes loaded");
app.use("/api/food", foodTestRoutes);

// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

