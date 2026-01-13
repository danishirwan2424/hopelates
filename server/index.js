require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ ping
app.get("/ping", (req, res) => res.json({ ok: true }));

// ✅ ROUTES
const distributionRoutes = require("./routes/distribution");
app.use("/api/staff-distribution", distributionRoutes);

// ✅ IMPORTANT: mount staff-application route
const staffApplicationRoutes = require("./routes/staffApplication");
app.use("/api/staff-application", staffApplicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
