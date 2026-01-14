const express = require("express");
const router = express.Router();
const donationPool = require("../db/donationDb");

/*
Expected request body:
{
  donor_id: "DN002",
  total_amount: 150,
  packages: [
    { package_id: 1, quantity: 1 },
    { package_id: 2, quantity: 2 },
    { package_id: 3, quantity: 0 }
  ]
}
*/
// GET /api/donation/donor/:donor_id
router.get("/donor/:donor_id", async (req, res) => {
  let conn;
  try {
    const { donor_id } = req.params;
    conn = await donationPool.getConnection();

    // SQL query to join donation with details and status
    // Adjust 'package_name' logic based on your packages (A, B, or C)
    const query = `
      SELECT 
        d.donation_id AS id,
        p.payment_date AS date,
        GROUP_CONCAT(CONCAT('Package ', dd.package_id)) AS package_list,
        SUM(dd.quantity) AS total_quantity,
        d.total_amount AS amount,
        p.payment_status AS status
      FROM DONATION d
      JOIN DONATION_DETAIL dd ON d.donation_id = dd.donation_id
      JOIN PAYMENT p ON d.donation_id = p.donation_id
      WHERE d.donor_id = ?
      GROUP BY d.donation_id
      ORDER BY p.payment_date DESC
    `;

    const rows = await conn.query(query, [donor_id]);
    
    // Convert BigInt to Number for JSON safety if necessary
    const formattedRows = rows.map(row => ({
      ...row,
      id: Number(row.id),
      amount: Number(row.amount)
    }));

    res.json(formattedRows);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching donations" });
  } finally {
    if (conn) conn.release();
  }
});

// 
router.post("/", async (req, res) => {
  let conn;

  try {
    const { donor_id, total_amount, packages } = req.body;

    // 🛑 Basic validation
    if (!donor_id || !total_amount || !Array.isArray(packages)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // 1️⃣ Get connection
    conn = await donationPool.getConnection();
    await conn.beginTransaction();

    // 2️⃣ Insert into donation
    const donationResult = await conn.query(
      "INSERT INTO donation (donor_id, total_amount) VALUES (?, ?)",
      [donor_id, total_amount]
    );

   const donationId = Number(donationResult.insertId);

    // 3️⃣ Insert donation_detail (only quantity > 0)
    for (const pkg of packages) {
      if (pkg.quantity > 0) {
        await conn.query(
          "INSERT INTO donation_detail (donation_id, package_id, quantity) VALUES (?, ?, ?)",
          [donationId, pkg.package_id, pkg.quantity]
        );
      }
    }

    // 4️⃣ Insert payment
    await conn.query(
      `INSERT INTO payment 
       (payment_amount, payment_date, payment_status, donation_id)
       VALUES (?, NOW(), 'PAID', ?)`,
      [total_amount, donationId]
    );

    // 5️⃣ Commit transaction
    await conn.commit();

    res.status(201).json({
  message: "Donation successful",
  donation_id: donationId // now NUMBER, JSON-safe
});


  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Donation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
