import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import mysql from "mysql2/promise";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =============================
// 1️⃣ PostgreSQL Connection
// =============================
let pgPool;
if (process.env.DB_TYPE === "postgres") {
  pgPool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  pgPool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch((err) => console.error("❌ PostgreSQL connection error:", err));
}

// =============================
// 2️⃣ MySQL Connection
// =============================
let mysqlPool;
if (process.env.DB_TYPE === "mysql") {
  (async () => {
    try {
      mysqlPool = await mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
      });
      console.log("✅ Connected to MySQL");
    } catch (err) {
      console.error("❌ MySQL connection error:", err);
    }
  })();
}

// =============================
// 3️⃣ MongoDB Connection
// =============================
if (process.env.DB_TYPE === "mongodb") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// =============================
// API Routes
// =============================

// Example: Get users from whichever DB is active
app.get("/users", async (req, res) => {
  try {
    let users = [];

    if (process.env.DB_TYPE === "postgres" && pgPool) {
      const result = await pgPool.query("SELECT * FROM users");
      users = result.rows;
    } 
    else if (process.env.DB_TYPE === "mysql" && mysqlPool) {
      const [rows] = await mysqlPool.query("SELECT * FROM users");
      users = rows;
    } 
    else if (process.env.DB_TYPE === "mongodb") {
      const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
      users = await User.find();
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// =============================
// Server Start
// =============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
