const express = require("express");
const router = express.Router();
const inventoryPool = require("../db/InventoryDb");

// GET all items
router.get("/", async (req, res) => {
  const conn = await inventoryPool.getConnection();
  const rows = await conn.query(
    "SELECT item_id AS id, item_name AS name, category, unit, quantity, expiry_date FROM item"
  );
  conn.release();
  res.json(rows);
});

// ADD item (with inventory tracking)
router.post("/", async (req, res) => {
  let conn;
  try {
    const { name, category, unit, quantity, expiry_date } = req.body;

    if (!name || !category || !unit || !quantity || !expiry_date) {
      return res.status(400).json({
        error: "name, category, unit, quantity, expiry_date are required"
      });
    }

    conn = await inventoryPool.getConnection();
    await conn.beginTransaction();

    // Insert item
    const result = await conn.query(
      `INSERT INTO item 
       (item_name, category, unit, expiry_date, quantity)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category, unit, expiry_date, Number(quantity)]
    );

    const itemId = Number(result.insertId);

    // Record in inventory (stock_in)
    await conn.query(
      `INSERT INTO inventory (item_id, staff_id, stock_in, stock_out, balance)
       VALUES (?, ?, ?, 0, ?)`,
      [itemId, 1, Number(quantity), Number(quantity)]
    );

    await conn.commit();
    conn.release();

    res.status(201).json({
      message: "Item added successfully",
      insertId: itemId
    });

  } catch (err) {
    console.error("ADD ITEM ERROR:", err);
    if (conn) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ error: err.message });
  }
});

// UPDATE item (with inventory tracking)
router.put("/:id", async (req, res) => {
  let conn;
  try {
    const { name, category, unit, quantity, expiry_date } = req.body;
    const itemId = req.params.id;

    conn = await inventoryPool.getConnection();
    await conn.beginTransaction();

    // Get current quantity
    const current = await conn.query(
      "SELECT quantity FROM item WHERE item_id = ?",
      [itemId]
    );

    if (current.length === 0) {
      conn.release();
      return res.status(404).json({ error: "Item not found" });
    }

    const oldQuantity = current[0].quantity;
    const newQuantity = Number(quantity);
    const quantityDiff = newQuantity - oldQuantity;

    // Update item
    await conn.query(
      "UPDATE item SET item_name=?, category=?, unit=?, quantity=?, expiry_date=? WHERE item_id=?",
      [name, category, unit, newQuantity, expiry_date, itemId]
    );

    // Update inventory if quantity increased
    if (quantityDiff > 0) {
      const inventory = await conn.query(
        "SELECT * FROM inventory WHERE item_id = ?",
        [itemId]
      );

      if (inventory.length > 0) {
        const newStockIn = inventory[0].stock_in + quantityDiff;
        const newBalance = newStockIn - inventory[0].stock_out;

        await conn.query(
          `UPDATE inventory 
           SET stock_in = ?, balance = ?
           WHERE item_id = ?`,
          [newStockIn, newBalance, itemId]
        );
      }
    }

    await conn.commit();
    conn.release();

    res.json({ 
      message: "Item updated",
      affectedRows: 1
    });
  } catch (err) {
    console.error("UPDATE ITEM ERROR:", err);
    if (conn) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  let conn;
  try {
    conn = await inventoryPool.getConnection();
    await conn.beginTransaction();

    // Delete from inventory first
    await conn.query("DELETE FROM inventory WHERE item_id=?", [req.params.id]);
    
    // Delete item
    const result = await conn.query(
      "DELETE FROM item WHERE item_id=?",
      [req.params.id]
    );

    await conn.commit();
    conn.release();

    res.json({ 
      message: "Item deleted",
      affectedRows: Number(result.affectedRows)
    });
  } catch (err) {
    console.error("DELETE ITEM ERROR:", err);
    if (conn) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
