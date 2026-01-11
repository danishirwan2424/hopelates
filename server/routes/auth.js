const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../db/authDb");

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
      const existing = await authPool.query(
        "SELECT 1 FROM donor WHERE email = $1",
        [email]
      );

      if (existing.rowCount > 0) {
        return res
          .status(409)
          .json({ message: "Email already registered as donor" });
      }

      await authPool.query(
        "INSERT INTO donor (full_name, email, password) VALUES ($1, $2, $3)",
        [full_name, email, hashedPassword]
      );

      return res.status(201).json({ message: "Donor signup successful" });
    }

    // =====================
    // APPLICANT SIGNUP
    // =====================
    if (role === "applicant") {
      const existing = await authPool.query(
        "SELECT 1 FROM beneficiary WHERE email = $1",
        [email]
      );

      if (existing.rowCount > 0) {
        return res
          .status(409)
          .json({ message: "Email already registered as applicant" });
      }

      await authPool.query(
        "INSERT INTO beneficiary (full_name, email, password) VALUES ($1, $2, $3)",
        [full_name, email, hashedPassword]
      );

      return res
        .status(201)
        .json({ message: "Applicant signup successful" });
    }

    return res.status(400).json({ message: "Invalid role" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
    LOGIN
====================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // =====================
    // CHECK DONOR
    // =====================
    const donorResult = await authPool.query(
      "SELECT * FROM donor WHERE email = $1",
      [email]
    );

    if (donorResult.rowCount > 0) {
      const donor = donorResult.rows[0];

      const match = await bcrypt.compare(password, donor.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.json({
        message: "Login successful",
        role: "donor",
        user: {
          donor_id: donor.donor_id,
          full_name: donor.full_name,
          email: donor.email,
        },
      });
    }

    // =====================
    // CHECK BENEFICIARY
    // =====================
    const beneficiaryResult = await authPool.query(
      "SELECT * FROM beneficiary WHERE email = $1",
      [email]
    );

    if (beneficiaryResult.rowCount > 0) {
      const beneficiary = beneficiaryResult.rows[0];

      const match = await bcrypt.compare(password, beneficiary.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.json({
        message: "Login successful",
        role: "applicant",
        user: {
          beneficiary_id: beneficiary.beneficiary_id,
          full_name: beneficiary.full_name,
          email: beneficiary.email,
        },
      });
    }

    return res.status(401).json({ message: "Invalid credentials" });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   UPDATE DONOR PROFILE
====================== */
router.put("/donor/profile/:donor_id", async (req, res) => {
  try {
    const { donor_id } = req.params;
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email required" });
    }

    const result = await authPool.query(
      `UPDATE donor
       SET full_name = $1,
           email = $2
       WHERE donor_id = $3
       RETURNING donor_id, full_name, email`,
      [fullName, email, donor_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json({
      donor_id: result.rows[0].donor_id,
      full_name: result.rows[0].full_name,
      email: result.rows[0].email,
      role: "donor",
    });
  } catch (err) {
    console.error("UPDATE DONOR ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
