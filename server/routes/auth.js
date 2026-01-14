const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../db/authDb"); // PostgreSQL Pool
const router = express.Router();

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body);

    // 🔴 FIX: use let, not const
    let { full_name, email, password, role, accessCode } = req.body;

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // normalize
    email = email.toLowerCase().trim();
    full_name = full_name.toUpperCase().trim();

    const hashedPassword = await bcrypt.hash(password, 10);

    // =====================
    // DONOR
    // =====================
    if (role === "donor") {
      const existing = await authPool.query(
        "SELECT 1 FROM donor WHERE email = $1",
        [email]
      );
      if (existing.rowCount > 0)
        return res.status(409).json({ message: "Email already registered as donor" });

      await authPool.query(
        "INSERT INTO donor (full_name, email, password) VALUES ($1,$2,$3)",
        [full_name, email, hashedPassword]
      );
      return res.status(201).json({ message: "Donor signup successful" });
    }

    // =====================
    // BENEFICIARY
    // =====================
    if (role === "beneficiary") {
      const existing = await authPool.query(
        "SELECT 1 FROM beneficiary WHERE email = $1",
        [email]
      );
      if (existing.rowCount > 0)
        return res.status(409).json({ message: "Email already registered as beneficiary" });

      await authPool.query(
        "INSERT INTO beneficiary (full_name, email, password) VALUES ($1,$2,$3)",
        [full_name, email, hashedPassword]
      );
      return res.status(201).json({ message: "Beneficiary signup successful" });
    }

    // =====================
    // STAFF
    // =====================
    if (role === "staff") {
  // access code check
  if (accessCode !== "8888") {
    return res.status(403).json({ message: "Invalid staff access code" });
  }

  // split full name
  const parts = full_name.trim().split(/\s+/);
  const first_name = parts[0];
  const last_name = parts.slice(1).join(" ") || "-";

  // ✅ REQUIRED DEFAULT VALUES (VERY IMPORTANT)
  const phone_number = null;
  const gender = "Male";
  const ic_num = null;
  const positions = "Staff";

  const existing = await authPool.query(
    "SELECT 1 FROM staff WHERE email = $1",
    [email]
  );

  if (existing.rowCount > 0) {
    return res.status(409).json({ message: "Email already registered as staff" });
  }

  await authPool.query(
  `INSERT INTO staff
   (first_name, last_name, phone_number, positions, gender, ic_num, email, password)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
  [
    first_name,
    last_name,
    phone_number || null,   // ✅ IMPORTANT
    positions,
    gender,
    ic_num || null,         // ✅ IMPORTANT
    email,
    hashedPassword
  ]
);


  return res.status(201).json({ message: "Staff signup successful" });
}


    return res.status(400).json({ message: "Invalid role" });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 you will no longer see const error
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

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // =====================
    // CHECK STAFF
    // =====================
    const staffResult = await authPool.query(
    "SELECT * FROM staff WHERE email = $1",
    [email]
    );

    if (staffResult.rowCount > 0) {
    const staff = staffResult.rows[0];

    // ✅ bcrypt comparison (CORRECT)
    const match = await bcrypt.compare(password, staff.password);
    if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
    message: "Login successful",
    role: "staff",
    user: {
      staff_id: staff.staff_id,
      full_name: `${staff.first_name} ${staff.last_name}`,
      email: staff.email,
      },
      });
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
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      return res.json({ message: "Login successful", role: "donor", user: { donor_id: donor.donor_id, full_name: donor.full_name, email: donor.email } });
    }

    // Check applicant
    const beneficiaryResult = await authPool.query("SELECT * FROM beneficiary WHERE email = $1", [email]);
    if (beneficiaryResult.rowCount > 0) {
      const beneficiary = beneficiaryResult.rows[0];
      const match = await bcrypt.compare(password, beneficiary.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      return res.json({
        message: "Login successful",
        role: "beneficiary",
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
    return res.status(500).json({ message: "Server error during login" });
  }
});

/* ======================
   UPDATE DONOR PROFILE
====================== */
router.put("/donor/profile/:donor_id", async (req, res) => {
  try {
    const { donor_id } = req.params;
    const { fullName, email, password } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email required" });
    }

    let result;

    // 🔐 If user wants to change password
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      result = await authPool.query(
        `UPDATE donor
         SET full_name = $1,
             email = $2,
             password = $3
         WHERE donor_id = $4
         RETURNING donor_id, full_name, email`,
        [fullName, email, hashedPassword, donor_id]
      );
    } 
    // ✏️ No password change
    else {
      result = await authPool.query(
        `UPDATE donor
         SET full_name = $1,
             email = $2
         WHERE donor_id = $3
         RETURNING donor_id, full_name, email`,
        [fullName, email, donor_id]
      );
    }

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

/* ======================
   UPDATE BENEFICIARY PROFILE
====================== */
router.put("/beneficiary/profile/:beneficiary_id", async (req, res) => {
  try {
    const { beneficiary_id } = req.params;
    const { full_name, password } = req.body;

    if (!full_name) {
      return res.status(400).json({ message: "Full name required" });
    }

    let result;

    // 🔐 If password is provided → hash & update
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      result = await authPool.query(
        `UPDATE beneficiary
         SET full_name = $1,
             password = $2
         WHERE beneficiary_id = $3
         RETURNING beneficiary_id, full_name, email`,
        [full_name, hashedPassword, beneficiary_id]
      );
    }
    // ✏️ Name only
    else {
      result = await authPool.query(
        `UPDATE beneficiary
         SET full_name = $1
         WHERE beneficiary_id = $2
         RETURNING beneficiary_id, full_name, email`,
        [full_name, beneficiary_id]
      );
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        beneficiary_id: result.rows[0].beneficiary_id,
        full_name: result.rows[0].full_name,
        email: result.rows[0].email,
      },
    });

  } catch (err) {
    console.error("UPDATE BENEFICIARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   GET STAFF PROFILE
====================== */
router.post("/staff/profile", async (req, res) => {
  try {
    const { staff_id } = req.body;

    if (!staff_id) {
      return res.status(400).json({ message: "Staff ID required" });
    }

    const result = await authPool.query(
      `SELECT
        staff_id,
        first_name,
        last_name,
        phone_number,
        positions,
        gender,
        ic_num,
        address,
        email
       FROM staff
       WHERE staff_id = $1`,
      [staff_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("STAFF PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
  UPDATE STAFF PROFILE
====================== */
router.put("/staff/profile/:staff_id", async (req, res) => {
  const { staff_id } = req.params;
  const {
    first_name,
    last_name,
    phone_number,
    gender,
    ic_num,
    address,
  } = req.body;

  try {
    await authPool.query(
      `
      UPDATE staff
      SET
        first_name = $1,
        last_name = $2,
        phone_number = $3,
        gender = $4,
        ic_num = $5,
        address = $6
      WHERE staff_id = $7
      `,
      [
        first_name,
        last_name,
        phone_number,
        gender,
        ic_num,
        address,
        staff_id,
      ]
    );

    return res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("UPDATE STAFF ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});








module.exports = router;
