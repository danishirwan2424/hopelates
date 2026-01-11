const express = require("express");
const router = express.Router();
const foodPool = require("../db/foodDb");

// GET /api/food/health
router.get("/health", async (req, res) => {
  try {
    const conn = await foodPool.getConnection();
    conn.release();

    res.json({
      status: "Food Distribution DB connected",
      time: new Date()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Food Distribution DB connection failed"
    });
  }
});

module.exports = router;
