const express = require("express");
const router = express.Router();
const donationPool = require("../db/donationDb");

// ======================
// DEBUG: CHECK ENV VALUES
// ======================
console.log("DONATION DB ENV CHECK:", {
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  database: process.env.DONATION_DB_NAME,
  port: process.env.DONATION_DB_PORT,
});

/**
 * ======================
 * DB CONNECTION TEST
 * ======================
 */
router.get("/donation-db-test", async (req, res) => {
  let conn;
  try {
    conn = await donationPool.getConnection();
    const result = await conn.query("SELECT 1 AS status");
    res.json({
      message: "Donation DB connection SUCCESS",
      result,
    });
  } catch (err) {
    console.error("❌ DONATION DB ERROR:", err);
    res.status(500).json({
      message: "Donation DB connection FAILED",
      error: err.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

/**
 * ======================
 * GET all donation packages
 * ======================
 */
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await donationPool.getConnection();

    const rows = await conn.query(
      "SELECT * FROM donation_package ORDER BY package_id DESC"
    );

    const packages = rows.map(pkg => {
      let parsedItems = [];

      try {
        parsedItems = pkg.items ? JSON.parse(pkg.items) : [];
        if (!Array.isArray(parsedItems)) parsedItems = [];
      } catch {
        parsedItems =
          typeof pkg.items === "string"
            ? pkg.items.split(",").map(i => i.trim().toUpperCase())
            : [];
      }

      return {
        id: pkg.package_id,
        name: pkg.name,
        price: Number(pkg.price),
        pax: pkg.pax,
        items: parsedItems,
        image: pkg.package_img,
        staff_id: pkg.staff_id,
      };
    });

    res.json(packages);
  } catch (err) {
    console.error("GET PACKAGES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch packages" });
  } finally {
    if (conn) conn.release();
  }
});

/**
 * ======================
 * ADD new donation package
 * ======================
 */
router.post("/", async (req, res) => {
  const { name, price, pax, items, image } = req.body;

  if (!name || !price || !pax || !items) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const STAFF_ID_FALLBACK = 1; // ✅ IMPORTANT

  let conn;
  try {
    conn = await donationPool.getConnection();

    const result = await conn.query(
      `INSERT INTO donation_package
       (name, price, pax, items, package_img, staff_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        price,
        pax,
        JSON.stringify(items),
        image || null,
        STAFF_ID_FALLBACK,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      price,
      pax,
      items,
      image: image || null,
      staff_id: STAFF_ID_FALLBACK,
    });
  } catch (err) {
    console.error("ADD PACKAGE ERROR FULL:", err);
    res.status(500).json({
      message: "Failed to add package",
      error: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage,
    });
  } finally {
    if (conn) conn.release();
  }
});

/**
 * ======================
 * UPDATE donation package
 * ======================
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, pax, items, image } = req.body;

  if (!name || !price || !pax || !items) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let conn;
  try {
    conn = await donationPool.getConnection();

    await conn.query(
      `UPDATE donation_package
       SET name = ?, price = ?, pax = ?, items = ?, package_img = ?
       WHERE package_id = ?`,
      [
        name,
        price,
        pax,
        JSON.stringify(items),
        image || null,
        id,
      ]
    );

    res.json({ message: "Package updated successfully" });
  } catch (err) {
    console.error("UPDATE PACKAGE ERROR:", err);
    res.status(500).json({ message: "Failed to update package" });
  } finally {
    if (conn) conn.release();
  }
});

/**
 * ======================
 * DELETE donation package
 * ======================
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  let conn;
  try {
    conn = await donationPool.getConnection();

    await conn.query(
      "DELETE FROM donation_package WHERE package_id = ?",
      [id]
    );

    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error("DELETE PACKAGE ERROR:", err);
    res.status(500).json({ message: "Failed to delete package" });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
