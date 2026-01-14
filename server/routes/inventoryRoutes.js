const express = require("express");
const router = express.Router();
const inventoryPool = require("../db/InventoryDb");

/**
 * GET all inventory records with item details
 */
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await inventoryPool.getConnection();
    
    const rows = await conn.query(`
      SELECT 
        inv.inventory_id AS id,
        inv.item_id,
        i.item_name AS item_name,
        inv.staff_id,
        inv.stock_in,
        inv.stock_out,
        inv.balance
      FROM inventory inv
      LEFT JOIN item i ON inv.item_id = i.item_id
      ORDER BY inv.inventory_id DESC
    `);
    
    conn.release();
    res.json(rows);
  } catch (err) {
    console.error("GET INVENTORY ERROR:", err);
    if (conn) conn.release();
    res.status(500).json({ error: err.message });
  }
});

/**
 * Record stock IN (when item is added or quantity increased)
 */
router.post("/stock-in", async (req, res) => {
  let conn;
  try {
    const { item_id, quantity, staff_id } = req.body;

    if (!item_id || !quantity) {
      return res.status(400).json({ error: "item_id and quantity required" });
    }

    conn = await inventoryPool.getConnection();
    
    // Check if inventory record exists for this item
    const existing = await conn.query(
      "SELECT * FROM inventory WHERE item_id = ?",
      [item_id]
    );

    if (existing.length > 0) {
      // Update existing record
      const newStockIn = existing[0].stock_in + Number(quantity);
      const newBalance = newStockIn - existing[0].stock_out;

      await conn.query(
        `UPDATE inventory 
         SET stock_in = ?, balance = ?
         WHERE item_id = ?`,
        [newStockIn, newBalance, item_id]
      );
    } else {
      // Create new inventory record
      await conn.query(
        `INSERT INTO inventory (item_id, staff_id, stock_in, stock_out, balance)
         VALUES (?, ?, ?, 0, ?)`,
        [item_id, staff_id || 1, Number(quantity), Number(quantity)]
      );
    }

    conn.release();
    res.json({ message: "Stock in recorded successfully" });
  } catch (err) {
    console.error("STOCK IN ERROR:", err);
    if (conn) conn.release();
    res.status(500).json({ error: err.message });
  }
});

/**
 * Record stock OUT (when items are used in packages)
 */
router.post("/stock-out", async (req, res) => {
  let conn;
  try {
    const { item_id, quantity } = req.body;

    if (!item_id || !quantity) {
      return res.status(400).json({ error: "item_id and quantity required" });
    }

    conn = await inventoryPool.getConnection();
    
    const existing = await conn.query(
      "SELECT * FROM inventory WHERE item_id = ?",
      [item_id]
    );

    if (existing.length === 0) {
      conn.release();
      return res.status(404).json({ error: "Inventory record not found" });
    }

    const newStockOut = existing[0].stock_out + Number(quantity);
    const newBalance = existing[0].stock_in - newStockOut;

    await conn.query(
      `UPDATE inventory 
       SET stock_out = ?, balance = ?
       WHERE item_id = ?`,
      [newStockOut, newBalance, item_id]
    );

    conn.release();
    res.json({ message: "Stock out recorded successfully" });
  } catch (err) {
    console.error("STOCK OUT ERROR:", err);
    if (conn) conn.release();
    res.status(500).json({ error: err.message });
  }
});

/**
 * Restore stock (when package is deleted or items removed)
 */
router.post("/restore-stock", async (req, res) => {
  let conn;
  try {
    const { item_id, quantity } = req.body;

    if (!item_id || !quantity) {
      return res.status(400).json({ error: "item_id and quantity required" });
    }

    conn = await inventoryPool.getConnection();
    
    const existing = await conn.query(
      "SELECT * FROM inventory WHERE item_id = ?",
      [item_id]
    );

    if (existing.length === 0) {
      conn.release();
      return res.status(404).json({ error: "Inventory record not found" });
    }

    const newStockOut = Math.max(0, existing[0].stock_out - Number(quantity));
    const newBalance = existing[0].stock_in - newStockOut;

    await conn.query(
      `UPDATE inventory 
       SET stock_out = ?, balance = ?
       WHERE item_id = ?`,
      [newStockOut, newBalance, item_id]
    );

    conn.release();
    res.json({ message: "Stock restored successfully" });
  } catch (err) {
    console.error("RESTORE STOCK ERROR:", err);
    if (conn) conn.release();
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;