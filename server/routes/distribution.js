const express = require("express");
const router = express.Router();
const pool = require("../db2"); // MySQL pool

// ======================
// GET ALL DISTRIBUTIONS
// ======================
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.promise().query(`
      SELECT
        distribution_id,
        staff_id,
        application_id,
        DATE_FORMAT(date_distributed, '%Y-%m-%d') AS date_distributed,
        status,
        total_package_count
      FROM distribution
      ORDER BY date_distributed DESC
    `);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("GET DISTRIBUTION ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch distribution",
      error: err.message,
    });
  }
});

// ======================
// UPDATE STATUS
// ======================
router.patch("/:applicationId/status", async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "status required" });
  }

  try {
    const [result] = await pool.promise().query(
      "UPDATE distribution SET status = ? WHERE application_id = ?",
      [status, applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Distribution not found" });
    }

    res.json({ success: true, applicationId, status });
  } catch (err) {
    console.error("PATCH STATUS ERROR:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// ======================
// UPDATE DISTRIBUTED DATE
// ======================
router.patch("/:applicationId/date", async (req, res) => {
  const { applicationId } = req.params;
  const { dateDistributed } = req.body;

  if (!dateDistributed) {
    return res.status(400).json({ message: "dateDistributed required" });
  }

  try {
    const [result] = await pool.promise().query(
      "UPDATE distribution SET date_distributed = ? WHERE application_id = ?",
      [dateDistributed, applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Distribution not found" });
    }

    res.json({ success: true, applicationId, dateDistributed });
  } catch (err) {
    console.error("PATCH DATE ERROR:", err);
    res.status(500).json({ message: "Failed to update date" });
  }
});

module.exports = router;
