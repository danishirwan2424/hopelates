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
