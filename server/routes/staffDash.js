const express = require("express");
const router = express.Router();
const { beneficiaryDB } = require("../db");

// GET total applications
router.get("/", async (req, res) => {
  try {
    const result = await beneficiaryDB.query(
      "SELECT COUNT(*) AS total_applications FROM public.application"
    );
    const totalApplications = parseInt(result.rows[0].total_applications) || 0;
    res.status(200).json({ totalApplications });
  } catch (err) {
    console.error("Error retrieving total applications:", err);
    res.status(500).json({ totalApplications: 0, error: "Internal server error" });
  }
});

module.exports = router;
