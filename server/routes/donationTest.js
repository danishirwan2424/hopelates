const express = require("express");
const router = express.Router();

const donationPool = require("../db/donationDb");

// ======================
// DEBUG: CHECK ENV VALUES (RUNS WHEN FILE IS LOADED)
// ======================
console.log("DONATION DB ENV CHECK:", {
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  database: process.env.DONATION_DB_NAME,
  port: process.env.DONATION_DB_PORT,
});

/**
 * TEMPORARY: MariaDB connection test
 */
router.get("/donation-db-test", async (req, res) => {
  let conn;
  try {
    conn = await donationPool.getConnection();

    const result = await conn.query("SELECT 1 AS status");

    res.json({
      message: "Donation DB connection SUCCESS",
      result
    });
  } catch (err) {
    console.error("DONATION DB ERROR FULL:", err);

    res.status(500).json({
      message: "Donation DB connection FAILED",
      error: err.message,
      code: err.code,
      errno: err.errno,
      address: err.address,
      port: err.port
    });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
