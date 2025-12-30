const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

/* ======================
   REGISTER
====================== */
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (role !== "donor") {
      return res.status(400).json({ message: "Only donor supported for now" });
    }

    const existing = await pool.query(
      "SELECT 1 FROM donor WHERE email = $1",
      [email]
    );

    if (existing.rowCount > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO donor (full_name, email, password) VALUES ($1, $2, $3)",
      [full_name, email, hashedPassword]
    );

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;   // 🔴 THIS LINE IS CRITICAL
