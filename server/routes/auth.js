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

    const hashedPassword = await bcrypt.hash(password, 10);

    // =====================
    // DONOR SIGNUP
    // =====================
    if (role === "donor") {
      const existing = await pool.query(
        "SELECT 1 FROM donor WHERE email = $1",
        [email]
      );

      if (existing.rowCount > 0) {
        return res.status(409).json({ message: "Email already registered as donor" });
      }

      await pool.query(
        "INSERT INTO donor (full_name, email, password) VALUES ($1, $2, $3)",
        [full_name, email, hashedPassword]
      );

      return res.status(201).json({ message: "Donor signup successful" });
    }

    // =====================
    // APPLICANT SIGNUP
    // =====================
    if (role === "applicant") {
      const existing = await pool.query(
        "SELECT 1 FROM beneficiary WHERE email = $1",
        [email]
      );

      if (existing.rowCount > 0) {
        return res.status(409).json({ message: "Email already registered as applicant" });
      }

      await pool.query(
        "INSERT INTO beneficiary (full_name, email, password) VALUES ($1, $2, $3)",
        [full_name, email, hashedPassword]
      );

      return res.status(201).json({ message: "Applicant signup successful" });
    }

    // =====================
    // INVALID ROLE
    // =====================
    return res.status(400).json({ message: "Invalid role" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;   // 🔴 THIS LINE IS CRITICAL
