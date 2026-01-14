const express = require("express");
const router = express.Router();
const donationPool = require("../db/donationDb");

// GET /api/donation/donor/:donor_id
router.get("/donor/:donor_id", async (req, res) => {
    let conn;
    try {
        const { donor_id } = req.params;
        conn = await donationPool.getConnection();

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

// POST /api/donation
router.post("/", async (req, res) => {
    let conn;

    try {
        const { donor_id, total_amount, packages, payment_receipt } = req.body;

        // 🛑 ADDED: Stricter validation to ensure payment_receipt is present
        if (!donor_id || !total_amount || !Array.isArray(packages) || !payment_receipt) {
            return res.status(400).json({ message: "Invalid request data. Ensure a receipt is uploaded." });
        }

        conn = await donationPool.getConnection();
        await conn.beginTransaction();

        // Insert into donation
        const donationResult = await conn.query(
            "INSERT INTO donation (donor_id, total_amount) VALUES (?, ?)",
            [donor_id, total_amount]
        );

        const donationId = Number(donationResult.insertId);

        // Insert donation_detail
        for (const pkg of packages) {
            if (pkg.quantity > 0) {
                await conn.query(
                    "INSERT INTO donation_detail (donation_id, package_id, quantity) VALUES (?, ?, ?)",
                    [donationId, pkg.package_id, pkg.quantity]
                );
            }
        }

        // 4️⃣ Insert payment
        // ✅ REPLACED: Ensured payment_receipt is passed as the final parameter
        await conn.query(
            `INSERT INTO payment 
       (payment_amount, payment_date, payment_status, donation_id, payment_receipt)
       VALUES (?, NOW(), 'PAID', ?, ?)`,
            [total_amount, donationId, payment_receipt]
        );

        await conn.commit();

        res.status(201).json({
            message: "Donation successful",
            donation_id: donationId
        });

    } catch (err) {
        if (conn) await conn.rollback();
        
        // 🛑 ADDED: Detailed logging to the server console. 
        // This will tell you if the error is "Data too long for column" (which means you need LONGTEXT in DB)
        console.error("CRITICAL DATABASE ERROR:", err); 
        
        res.status(500).json({ message: "Server error during donation process", error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = router;
