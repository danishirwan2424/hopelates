const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../server/db");

const router = express.Router();

// =====================
// REGISTER (UNCHANGED)
// =====================
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// LOGIN (ADDED ONLY)
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await pool.query(
      "SELECT * FROM donor WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const donor = result.rows[0];

    const match = await bcrypt.compare(password, donor.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔴 THIS IS THE IMPORTANT PART
    res.json({
      donor_id: donor.donor_id,
      full_name: donor.full_name,
      email: donor.email,
      role: "donor",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
