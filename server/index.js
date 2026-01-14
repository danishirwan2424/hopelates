// ==============================================
// BIGINT SERIALIZATION FIX - MUST BE FIRST!
// ==============================================
BigInt.prototype.toJSON = function() {
  return Number(this);
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ======================
// ROUTES
// ======================
const staffDashRoutes = require("./routes/staffDash");
const authRoutes = require("./routes/auth");
const donationTestRoutes = require("./routes/donationTest");
const inventoryTestRoutes = require("./routes/InventoryTest");
const foodTestRoutes = require("./routes/foodTest");
const beneficiaryTestRoutes = require("./routes/beneficiaryTest");
const packageRoutes = require("./routes/packageRoutes");
const itemRoutes = require("./routes/itemRoutes");
const inventoryRoutes = require("./routes/InventoryRoutes"); // NEW

// ======================
// MOUNT ROUTES (ONCE ONLY)
// ======================
app.use("/api/staffDash", staffDashRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/test", donationTestRoutes);
app.use("/api/inventory", inventoryTestRoutes);
app.use("/api/food", foodTestRoutes);
app.use("/api/beneficiary", beneficiaryTestRoutes);

app.use("/api/packages", packageRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/inventory-tracking", inventoryRoutes); // NEW

// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});