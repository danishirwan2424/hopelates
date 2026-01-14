const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const donationPool = require("../db/donationDb");

/**
 * GET all donation packages with their items
 */
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await donationPool.getConnection();
    
    const packages = await conn.query(
      `SELECT package_id AS id, name, price, pax, package_img AS image 
       FROM donation_package`
    );

    for (let pkg of packages) {
      const items = await conn.query(
        `SELECT i.item_id, i.item_name AS name, pi.quantity
         FROM package_item pi
         JOIN item i ON pi.item_id = i.item_id
         WHERE pi.package_id = ?
         ORDER BY i.item_name`,
        [pkg.id]
      );
      
      pkg.items = items.map(item => ({
        id: item.item_id,
        name: item.name,
        quantity: item.quantity
      }));
    }

    conn.release();
    res.json(packages);

  } catch (err) {
    console.error("GET PACKAGES ERROR:", err);
    if (conn) conn.release();
    res.status(500).json({ error: err.message });
  }
});

/**
 * ADD package (with inventory stock deduction)
 */
router.post("/", auth, async (req, res) => {
   console.log("🔥 ADD PACKAGE HIT");
  let conn;
  try {
    const { name, price, pax, items, image } = req.body;
    const staffId = req.user.staff_id;

    if (!name || !price || !pax || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    conn = await donationPool.getConnection();
    await conn.beginTransaction();

    // Check if sufficient stock available
    for (let item of items) {
      const stockCheck = await conn.query(
        "SELECT quantity FROM item WHERE item_id = ?",
        [item.id]
      );

      if (stockCheck.length === 0) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ 
          error: `Item ID ${item.id} not found` 
        });
      }

      if (stockCheck[0].quantity < item.quantity) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ 
          error: `Insufficient stock for item: ${item.name}. Available: ${stockCheck[0].quantity}, Required: ${item.quantity}` 
        });
      }
    }

    // Insert package
    const result = await conn.query(
      `INSERT INTO donation_package 
       (name, description, price, package_img, staff_id, pax, items)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, "", price, image, staffId, pax, null]
    );

    const packageId = Number(result.insertId);

    // Insert items and deduct stock
    for (let item of items) {
      // Add to package_item
      await conn.query(
        `INSERT INTO package_item (package_id, item_id, quantity)
         VALUES (?, ?, ?)`,
        [packageId, item.id, item.quantity]
      );

      // Deduct from item.quantity
      await conn.query(
        `UPDATE item 
         SET quantity = quantity - ?
         WHERE item_id = ?`,
        [item.quantity, item.id]
      );

      // Update inventory (stock_out)
      const inventory = await conn.query(
        "SELECT * FROM inventory WHERE item_id = ?",
        [item.id]
      );

      if (inventory.length > 0) {
        const newStockOut = inventory[0].stock_out + item.quantity;
        const newBalance = inventory[0].stock_in - newStockOut;

        await conn.query(
          `UPDATE inventory 
           SET stock_out = ?, balance = ?
           WHERE item_id = ?`,
          [newStockOut, newBalance, item.id]
        );
      } else {
        // Create inventory record if doesn't exist
        await conn.query(
          `INSERT INTO inventory (item_id, staff_id, stock_in, stock_out, balance)
           VALUES (?, ?, 0, ?, ?)`,
          [item.id, staffId, item.quantity, -item.quantity]
        );
      }
    }

    await conn.commit();
    conn.release();
    
    res.status(201).json({ 
      message: "Package added successfully",
      packageId: packageId 
    });

  } catch (err) {
    console.error("ADD PACKAGE ERROR:", err);
    if (conn) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE package (with inventory adjustments)
 */
router.put("/:id", auth, async (req, res) => {
  let conn;
  try {
    const { name, price, pax, items, image } = req.body;
    const { id } = req.params;

    if (!name || !price || !pax || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    conn = await donationPool.getConnection();
    await conn.beginTransaction();

    // Get old items to restore stock
    const oldItems = await conn.query(
      `SELECT item_id, quantity FROM package_item WHERE package_id = ?`,
      [id]
    );

    // Restore stock for old items
    for (let oldItem of oldItems) {
      await conn.query(
        `UPDATE item 
         SET quantity = quantity + ?
         WHERE item_id = ?`,
        [oldItem.quantity, oldItem.item_id]
      );

      // Update inventory (restore stock_out)
      const inventory = await conn.query(
        "SELECT * FROM inventory WHERE item_id = ?",
        [oldItem.item_id]
      );

      if (inventory.length > 0) {
        const newStockOut = Math.max(0, inventory[0].stock_out - oldItem.quantity);
        const newBalance = inventory[0].stock_in - newStockOut;

        await conn.query(
          `UPDATE inventory 
           SET stock_out = ?, balance = ?
           WHERE item_id = ?`,
          [newStockOut, newBalance, oldItem.item_id]
        );
      }
    }

    // Check new items stock availability
    for (let item of items) {
      const stockCheck = await conn.query(
        "SELECT quantity FROM item WHERE item_id = ?",
        [item.id]
      );

      if (stockCheck.length === 0) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ 
          error: `Item ID ${item.id} not found` 
        });
      }

      if (stockCheck[0].quantity < item.quantity) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ 
          error: `Insufficient stock for item: ${item.name}. Available: ${stockCheck[0].quantity}, Required: ${item.quantity}` 
        });
      }
    }

    // Update package
    await conn.query(
      `UPDATE donation_package 
       SET name=?, price=?, pax=?, package_img=?
       WHERE package_id=?`,
      [name, price, pax, image, id]
    );

    // Delete old package items
    await conn.query(
      `DELETE FROM package_item WHERE package_id=?`,
      [id]
    );

    // Insert new items and deduct stock
    for (let item of items) {
      await conn.query(
        `INSERT INTO package_item (package_id, item_id, quantity)
         VALUES (?, ?, ?)`,
        [id, item.id, item.quantity]
      );

      await conn.query(
        `UPDATE item 
         SET quantity = quantity - ?
         WHERE item_id = ?`,
        [item.quantity, item.id]
      );

      // Update inventory
      const inventory = await conn.query(
        "SELECT * FROM inventory WHERE item_id = ?",
        [item.id]
      );

      if (inventory.length > 0) {
        const newStockOut = inventory[0].stock_out + item.quantity;
        const newBalance = inventory[0].stock_in - newStockOut;

        await conn.query(
          `UPDATE inventory 
           SET stock_out = ?, balance = ?
           WHERE item_id = ?`,
          [newStockOut, newBalance, item.id]
        );
      }
    }

    await conn.commit();
    conn.release();

    res.json({ message: "Package updated successfully" });

  } catch (err) {
    console.error("UPDATE PACKAGE ERROR:", err);
    if (conn) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE package (restore stock)
 */
router.delete("/:id", auth, async (req, res) => {
  let conn;
  try {
    conn = await donationPool.getConnection();
    await conn.beginTransaction();

    // Get package items to restore stock
    const packageItems = await conn.query(
      `SELECT item_id, quantity FROM package_item WHERE package_id = ?`,
      [req.params.id]
    );

    // Restore stock
    for (let item of packageItems) {
      await conn.query(
        `UPDATE item 
         SET quantity = quantity + ?
         WHERE item_id = ?`,
        [item.quantity, item.item_id]
      );

      // Update inventory (restore stock_out)
      const inventory = await conn.query(
        "SELECT * FROM inventory WHERE item_id = ?",
        [item.item_id]
      );

      if (inventory.length > 0) {
        const newStockOut = Math.max(0, inventory[0].stock_out - item.quantity);
        const newBalance = inventory[0].stock_in - newStockOut;

        await conn.query(
          `UPDATE inventory 
           SET stock_out = ?, balance = ?
           WHERE item_id = ?`,
          [newStockOut, newBalance, item.item_id]
        );
      }
    }

    // Delete package items
    await conn.query(
      "DELETE FROM package_item WHERE package_id=?",
      [req.params.id]
    );

    // Delete package
    await conn.query(
      "DELETE FROM donation_package WHERE package_id=?",
      [req.params.id]
    );

    await conn.commit();
    conn.release();

    res.json({ message: "Package deleted successfully" });

  } catch (err) {
    console.error("DELETE PACKAGE ERROR:", err);
    if (conn) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;