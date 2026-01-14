// server/routes/distribution.js
console.log("✅ USING distribution.js FILE:", __filename);

const express = require("express");
const router = express.Router();

const foodPool = require("../db/foodDb");               // MySQL (distribution) ✅ source of truth
const applicationPool = require("../db/applicationDb"); // Postgres (application)
const authPool = require("../db/authDb");               // Postgres (beneficiary)

const normalizeStatus = (s) => {
  if (!s) return "Pending";
  const up = String(s).toUpperCase();
  if (up === "PENDING") return "Pending";
  if (up === "DONE") return "Done";
  if (up === "CANCELLED") return "Cancelled";
  if (up === "COMPLETED") return "Completed";
  return s;
};

// ✅ Handle preflight just in case
router.options("*", (req, res) => {
  return res.sendStatus(204);
});

// ======================
// GET /api/staff-distribution
// ✅ show ONLY rows that exist in MySQL distribution
// ✅ pull name/email from Postgres (application + beneficiary)
// ======================
router.get("/", async (req, res) => {
  try {
    const [distRows] = await foodPool.query(
      `SELECT distribution_id, staff_id, application_id, date_distributed, status, total_package_count
       FROM distribution
       ORDER BY distribution_id DESC`
    );

    const dists = distRows || [];
    if (dists.length === 0) return res.json({ success: true, data: [] });

    const appIds = [...new Set(dists.map(d => String(d.application_id)).filter(Boolean))];

    const appsRes = await applicationPool.query(
      `SELECT application_id, beneficiary_id
       FROM application
       WHERE application_id = ANY($1::text[])`,
      [appIds]
    );

    const appMap = {};
    (appsRes.rows || []).forEach(a => {
      appMap[String(a.application_id)] = a;
    });

    const beneficiaryIds = [
      ...new Set((appsRes.rows || []).map(a => String(a.beneficiary_id)).filter(Boolean)),
    ];

    const benMap = {};
    if (beneficiaryIds.length > 0) {
      const benRes = await authPool.query(
        `SELECT beneficiary_id, full_name, email
         FROM beneficiary
         WHERE beneficiary_id = ANY($1::text[])`,
        [beneficiaryIds]
      );

      (benRes.rows || []).forEach(b => {
        benMap[String(b.beneficiary_id)] = b;
      });
    }

    const data = dists.map((d, idx) => {
      const appId = String(d.application_id);
      const app = appMap[appId] || {};
      const ben = benMap[String(app.beneficiary_id)] || {};

      return {
        // ✅ IMPORTANT: frontend should use this
        distributionId: String(d.distribution_id || `dist-${idx}`),
        applicationId: appId,
        staff_id: d.staff_id,
        name: ben.full_name || "N/A",
        email: ben.email || "N/A",
        package: "None",
        packageCount: d.total_package_count ?? 1,
        dateDistributed: d.date_distributed
          ? new Date(d.date_distributed).toISOString().slice(0, 10)
          : "N/A",
        status: normalizeStatus(d.status),
      };
    });

    return res.json({ success: true, data });
  } catch (err) {
    console.error("STAFF DISTRIBUTION GET ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ======================
// POST /api/staff-distribution/:distributionId/send-email
// ✅ Dummy email: update status Completed + set staff_id + date_distributed
// ======================
router.post("/:distributionId/send-email", async (req, res) => {
  const { distributionId } = req.params;
  const { staff_id } = req.body || {};

  console.log("➡️ HIT POST /api/staff-distribution/:distributionId/send-email", {
    distributionId,
    staff_id,
  });

  if (!staff_id) {
    return res.status(400).json({ success: false, message: "staff_id required" });
  }

  try {
    const [rows] = await foodPool.query(
      `SELECT distribution_id FROM distribution WHERE distribution_id = ? LIMIT 1`,
      [String(distributionId)]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Distribution not found for distribution_id=${distributionId}`,
      });
    }

    const [result] = await foodPool.query(
      `UPDATE distribution
       SET status='Completed',
           staff_id=?,
           date_distributed = COALESCE(date_distributed, NOW())
       WHERE distribution_id=?`,
      [String(staff_id), String(distributionId)]
    );

    return res.json({
      success: true,
      message: "Dummy email sent & marked Completed",
      affectedRows: result?.affectedRows ?? 0,
    });
  } catch (err) {
    console.error("SEND EMAIL ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ if route mismatch, you will see JSON here instead of default HTML 404
router.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found in distribution router: ${req.method} ${req.originalUrl}`,
  });
});

module.exports = router;
