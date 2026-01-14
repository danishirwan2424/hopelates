const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authPool = require("../db/authDb"); // PostgreSQL Pool
const router = express.Router();

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body); // Debug

    const { full_name, email, password, role } = req.body;
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "donor") {
      const existing = await authPool.query("SELECT 1 FROM donor WHERE email = $1", [email]);
      if (existing.rowCount > 0) return res.status(409).json({ message: "Email already registered as donor" });

      await authPool.query("INSERT INTO donor (full_name, email, password) VALUES ($1,$2,$3)", [full_name, email, hashedPassword]);
      return res.status(201).json({ message: "Donor signup successful" });
    }

    if (role === "applicant") {
      const existing = await authPool.query("SELECT 1 FROM beneficiary WHERE email = $1", [email]);
      if (existing.rowCount > 0) return res.status(409).json({ message: "Email already registered as applicant" });

      await authPool.query("INSERT INTO beneficiary (full_name, email, password) VALUES ($1,$2,$3)", [full_name, email, hashedPassword]);
      return res.status(201).json({ message: "Applicant signup successful" });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    // Check staff
const staffResult = await authPool.query(
  "SELECT * FROM staff WHERE email = $1",
  [email]
);

if (staffResult.rowCount > 0) {
  const staff = staffResult.rows[0];
  const match = await bcrypt.compare(password, staff.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  // ✅ CREATE JWT WITH staff_id
  const token = jwt.sign(
    {
      staff_id: staff.staff_id,   // IMPORTANT
      role: "staff"
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    message: "Login successful",
    role: "staff",
    token,
    user: {
      staff_id: staff.staff_id,
      full_name: staff.full_name,
      email: staff.email
    }
  });
}

    // Check donor
    const donorResult = await authPool.query("SELECT * FROM donor WHERE email = $1", [email]);
    if (donorResult.rowCount > 0) {
      const donor = donorResult.rows[0];
      const match = await bcrypt.compare(password, donor.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      return res.json({ message: "Login successful", role: "donor", user: { donor_id: donor.donor_id, full_name: donor.full_name, email: donor.email } });
    }

    // Check applicant
    const beneficiaryResult = await authPool.query("SELECT * FROM beneficiary WHERE email = $1", [email]);
    if (beneficiaryResult.rowCount > 0) {
      const beneficiary = beneficiaryResult.rows[0];
      const match = await bcrypt.compare(password, beneficiary.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      return res.json({ message: "Login successful", role: "applicant", user: { beneficiary_id: beneficiary.beneficiary_id, full_name: beneficiary.full_name, email: beneficiary.email } });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
