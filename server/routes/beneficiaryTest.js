const express = require("express");
const router = express.Router();
const beneficiaryPool = require("../db/beneficiaryDb");

// GET /api/beneficiary/health
router.get("/health", async (req, res) => {
  try {
    const client = await beneficiaryPool.connect();
    client.release();

    res.json({
      status: "Beneficiary DB connected",
      time: new Date()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Beneficiary DB connection failed"
    });
  }
});

module.exports = router;
