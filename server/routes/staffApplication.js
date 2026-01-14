// server/routes/staffApplication.js
console.log("✅ USING staffApplication.js FILE:", __filename);

const express = require("express");
const router = express.Router();

const applicationPool = require("../db/applicationDb"); // Postgres
const authPool = require("../db/authDb");               // Postgres
const foodPool = require("../db/foodDb");               // MySQL
const inventoryPool = require("../db/InventoryDb");     // MariaDB

// =========================
// Helper
// =========================
const normalizeStatus = (s) => {
  if (!s) return null;
  return String(s).trim().toUpperCase();
};

const makeDistributionId = () =>
  `D-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const getPackageName = (familyNo) => {
  const num = Number(familyNo);
  if (num >= 1 && num <= 3) return 'PACKAGE A';
  if (num >= 4 && num <= 7) return 'PACKAGE B';
  if (num >= 8) return 'PACKAGE C';
  return 'PACKAGE A'; // default
};

// =========================
// GET ALL APPLICATIONS
// GET /api/staff-application
// =========================
router.get("/", async (req, res) => {
  try {
    const appsRes = await applicationPool.query(`
      SELECT application_id, beneficiary_id, staff_id, ic_no, address, postcode,
             city, state, occupation, salary, family_no, status, created_at
      FROM application
      ORDER BY created_at DESC
    `);

    const apps = appsRes.rows || [];
    const beneficiaryIds = [...new Set(apps.map(a => a.beneficiary_id).filter(Boolean))];

    const benMap = {};
    if (beneficiaryIds.length > 0) {
      const benRes = await authPool.query(
        `SELECT beneficiary_id, full_name, email
         FROM beneficiary
         WHERE beneficiary_id = ANY($1::text[])`,
        [beneficiaryIds]
      );
      benRes.rows.forEach(b => {
        benMap[String(b.beneficiary_id)] = b;
      });
    }

    const data = apps.map(a => ({
      ...a,
      full_name: benMap[String(a.beneficiary_id)]?.full_name || "N/A",
      email: benMap[String(a.beneficiary_id)]?.email || "N/A",
      score: 0,
    }));

    return res.json({ success: true, data });
  } catch (err) {
    console.error("GET APPLICATIONS ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// PATCH STATUS
// PATCH /api/staff-application/:id/status
// body: { status, staff_id }
// =========================
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const status = normalizeStatus(req.body?.status);
  const staffId = req.body?.staff_id || null;

  if (!status) {
    return res.status(400).json({ success: false, message: "Status required" });
  }

  try {
    // 1️⃣ Update Postgres
    const upd = await applicationPool.query(
      `UPDATE application
       SET status = $1,
           staff_id = COALESCE($2, staff_id)
       WHERE application_id = $3
       RETURNING application_id, staff_id, status`,
      [status, staffId, String(id)]
    );

    if (upd.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const updatedApp = upd.rows[0];

    // 2️⃣ If COMPLETED → ensure MySQL distribution
    if (status === "COMPLETED") {
      const applicationId = String(updatedApp.application_id);
      const finalStaffId = updatedApp.staff_id || staffId;

      const [rows] = await foodPool.query(
        `SELECT distribution_id FROM distribution WHERE application_id = ? LIMIT 1`,
        [applicationId]
      );

      if (!rows || rows.length === 0) {
        const distId = makeDistributionId();
        console.log("📍 Creating distribution with ID:", distId);

        const [insertResult] = await foodPool.query(
          `INSERT INTO distribution
           (distribution_id, staff_id, application_id, status, total_package_count)
           VALUES (?, ?, ?, 'Pending', 1)`,
          [distId, finalStaffId, applicationId]
        );

        console.log("✅ Distribution created:", {
          distribution_id: distId,
          staff_id: finalStaffId,
          application_id: applicationId
        });

        // 3️⃣ Insert distribution_detail based on family_no
        const appDetail = await applicationPool.query(
          `SELECT family_no FROM application WHERE application_id = $1`,
          [applicationId]
        );
        const familyNo = appDetail.rows[0]?.family_no;
        console.log("👨‍👩‍👧‍👦 Family size:", familyNo);
        
        if (familyNo) {
          const packageName = getPackageName(familyNo);
          console.log("📦 Package determined:", packageName);
          
          const conn = await inventoryPool.getConnection();
          try {
            const packageRows = await conn.query(
              `SELECT package_id FROM donation_package WHERE name = ?`,
              [packageName]
            );
            if (packageRows.length > 0) {
              const packageId = packageRows[0].package_id;
              console.log("✓ Package found:", { packageName, packageId });
              
              const [detailResult] = await foodPool.query(
                `INSERT INTO distribution_detail (distribution_id, package_id, quantity) VALUES (?, ?, 1)`,
                [distId, packageId]
              );
              console.log("✅ Distribution detail inserted with same distribution_id:", {
                distribution_id: distId,
                package_id: packageId,
                quantity: 1,
                insertId: detailResult.insertId
              });
            } else {
              console.warn("⚠️ Package not found for:", packageName);
            }
          } catch (err) {
            console.error("❌ Error inserting distribution_detail:", err);
          } finally {
            conn.release();
          }
        }
      }
    }

    return res.json({ success: true, application: updatedApp });
  } catch (err) {
    console.error("PATCH STATUS ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// DELETE
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await applicationPool.query(
      `DELETE FROM application WHERE application_id = $1`,
      [String(req.params.id)]
    );
    return res.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;