const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//ROUTES//
// Routes
const applicationRoutes = require("./routes/application");
app.use("/api/application", applicationRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});


