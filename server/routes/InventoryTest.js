const express = require("express");
const router = express.Router();
const inventoryPool = require("../db/InventoryDb");

// GET /api/inventory/health
router.get("/health", async (req, res) => {
  let conn;
  try {
    conn = await inventoryPool.getConnection();
    res.json({
      status: "Inventory DB connected",
      time: new Date()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Inventory DB connection failed"
    });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
