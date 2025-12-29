const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all applications
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM application ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// GET application by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM application WHERE application_id = $1",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Application not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

// POST new application
router.post("/", async (req, res) => {
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
    family_no,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO application
        (beneficiary_id, staff_id, ic_no, address, postcode, city, state, occupation, salary, status, family_no)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [beneficiary_id, staff_id, ic_no, address, postcode, city, state, occupation, salary, status, family_no]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create application" });
  }
});

// PUT update application
router.put("/:id", async (req, res) => {
  const { id } = req.params;
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
    family_no,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE application SET 
         beneficiary_id=$1, staff_id=$2, ic_no=$3, address=$4, postcode=$5, city=$6, state=$7,
         occupation=$8, salary=$9, status=$10, family_no=$11
       WHERE application_id=$12 RETURNING *`,
      [beneficiary_id, staff_id, ic_no, address, postcode, city, state, occupation, salary, status, family_no, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Application not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update application" });
  }
});

// DELETE application
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM application WHERE application_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete application" });
  }
});

module.exports = router;
