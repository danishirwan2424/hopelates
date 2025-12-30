const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const applicationRoutes = require("./routes/application");
const authRoutes = require("./routes/auth");

app.use("/api/application", applicationRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
