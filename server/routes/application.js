const express = require("express");
const applicationPool = require("../db/applicationDb");

const router = express.Router();

/* ==========================
   CREATE APPLICATION
   ========================== */
router.post("/", async (req, res) => {
  try {
    const {
      beneficiary_id,
      ic_no,
      address,
      postcode,
      city,
      state,
      occupation,
      salary,
      family_no
    } = req.body;

    // 🔐 backend validation
    if (!beneficiary_id || !ic_no || !address || !postcode || !city || !state || !family_no) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const query = `
      INSERT INTO application (
        beneficiary_id,
        staff_id,
        ic_no,
        address,
        postcode,
        city,
        state,
        occupation,
        salary,
        family_no,
        status
      )
      VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, 'PENDING')
      RETURNING *;
    `;

    const values = [
      beneficiary_id,
      ic_no,
      address,
      postcode,
      city,
      state,
      occupation,
      salary,
      family_no
    ];

    const result = await applicationPool.query(query, values);

    res.status(201).json({
      message: "Application submitted successfully",
      application: result.rows[0],
    });

  } catch (err) {
    console.error("APPLICATION INSERT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
