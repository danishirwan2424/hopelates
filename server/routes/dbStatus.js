// server/routes/dbStatus.js
const express = require("express");
const router = express.Router();
const {
  donationDB,
  inventoryDB,
  foodDB,
  beneficiaryDB,
  authDB,
} = require("../db");

async function checkDB(db, name) {
  const info = {
    host: db.config?.host || db.options?.host || "",
    user: db.config?.user || db.options?.user || "",
    database: db.config?.database || db.options?.database || "",
    port: db.config?.port || db.options?.port || "",
    status: false,
  };

  try {
    if (db.query) await db.query("SELECT 1");
    info.status = true;
  } catch (err) {
    info.status = false;
    info.error = err.message;
  }

  return info;
}

router.get("/", async (req, res) => {
  try {
    const results = {
      donation: await checkDB(donationDB, "donation"),
      inventory: await checkDB(inventoryDB, "inventory"),
      food: await checkDB(foodDB, "food"),
      beneficiary: await checkDB(beneficiaryDB, "beneficiary"),
      auth: await checkDB(authDB, "auth"),
    };
    res.json(results);
  } catch (err) {
    console.error("DB status fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch DB status" });
  }
});

module.exports = router;
