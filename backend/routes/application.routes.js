const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE application
router.post("/", async (req, res) => {
  try {
    const {
      beneficiary_id,
      staff_id,
      ic_no,
      address,
      postcode,
      city,
      state,
      occupation,
      salary,
      status,
      family_no
    } = req.body;

    const result = await pool.query(
      `INSERT INTO application (
        beneficiary_id, staff_id, ic_no, address,
        postcode, city, state, occupation,
        salary, status, family_no
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        beneficiary_id,
        staff_id,
        ic_no,
        address,
        postcode,
        city,
        state,
        occupation,
        salary,
        status,
        family_no
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create application" });
  }
});

// GET all applications
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM application");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

module.exports = router;
