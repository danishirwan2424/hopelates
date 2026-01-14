// server/routes/staffApplication.js
console.log("✅ USING staffApplication.js FILE:", __filename);

const express = require("express");
const router = express.Router();

// ✅ USE ONLY db.js
const { beneficiaryDB, authDB, foodDB } = require("../db");

// =========================
// Helpers
// =========================
const normalizeStatus = (s) => {
  if (!s) return null;
  return String(s).trim().toUpperCase();
};

const formatStatusForUI = (s) => {
  if (!s) return "Pending";
  return s.charAt(0) + s.slice(1).toLowerCase();
};

const makeDistributionId = () =>
  `D-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// =========================
// GET ALL APPLICATIONS
// GET /api/staff-application
// =========================
router.get("/", async (req, res) => {
  try {
    const appsRes = await beneficiaryDB.query(`
      SELECT application_id, beneficiary_id, staff_id, ic_no, address, postcode,
             city, state, occupation, salary, family_no, status, created_at
      FROM application
      ORDER BY created_at DESC
    `);

    const apps = appsRes.rows || [];
    const beneficiaryIds = [
      ...new Set(apps.map(a => a.beneficiary_id).filter(Boolean))
    ];

    const benMap = {};
    if (beneficiaryIds.length > 0) {
      const benRes = await authDB.query(
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
      status: formatStatusForUI(a.status),
      score: 0,
    }));

    return res.json({ success: true, data });
  } catch (err) {
    console.error("GET APPLICATIONS ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// GET SINGLE APPLICATION
// GET /api/staff-application/:id
// =========================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appRes = await beneficiaryDB.query(
      `SELECT *
       FROM application
       WHERE application_id = $1
       LIMIT 1`,
      [String(id)]
    );

    if (appRes.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const app = appRes.rows[0];

    let full_name = "N/A";
    let email = "N/A";

    if (app.beneficiary_id) {
      const benRes = await authDB.query(
        `SELECT full_name, email
         FROM beneficiary
         WHERE beneficiary_id = $1
         LIMIT 1`,
        [String(app.beneficiary_id)]
      );

      if (benRes.rowCount > 0) {
        full_name = benRes.rows[0].full_name;
        email = benRes.rows[0].email;
      }
    }

    return res.json({
      success: true,
      data: {
        ...app,
        full_name,
        email,
        status: formatStatusForUI(app.status),
        score: 0,
      },
    });
  } catch (err) {
    console.error("GET APPLICATION BY ID ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// PATCH STATUS
// PATCH /api/staff-application/:id/status
// =========================
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const status = normalizeStatus(req.body?.status);
  const staffId = req.body?.staff_id || null;

  if (!status) {
    return res.status(400).json({ success: false, message: "Status required" });
  }

  try {
    const upd = await beneficiaryDB.query(
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

    if (status === "COMPLETED") {
      const applicationId = String(updatedApp.application_id);
      const finalStaffId = updatedApp.staff_id || staffId;

      const [rows] = await foodDB.query(
        `SELECT distribution_id
         FROM distribution
         WHERE application_id = ?
         LIMIT 1`,
        [applicationId]
      );

      if (!rows || rows.length === 0) {
        const distId = makeDistributionId();

        await foodDB.query(
          `INSERT INTO distribution
           (distribution_id, staff_id, application_id, status, total_package_count)
           VALUES (?, ?, ?, 'Pending', 1)`,
          [distId, finalStaffId, applicationId]
        );

        console.log("✅ Distribution created:", distId);
      }
    }

    return res.json({
      success: true,
      application: {
        ...updatedApp,
        status: formatStatusForUI(updatedApp.status),
      },
    });
  } catch (err) {
    console.error("PATCH STATUS ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// DELETE APPLICATION
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await beneficiaryDB.query(
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
