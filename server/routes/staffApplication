// server/routes/staffApplication.js
console.log("✅ USING staffApplication.js FILE:", __filename);

const express = require("express");
const router = express.Router();

const applicationPool = require("../db/applicationDb"); // Postgres (application)
const authPool = require("../db/authDb");               // Postgres (beneficiary)
const foodPool = require("../db/foodDb");               // MySQL (distribution)

// =========================
// GET ALL APPLICATIONS
// GET /api/staff-application
// =========================
router.get("/", async (req, res) => {
  try {
    const appsRes = await applicationPool.query(`
      SELECT application_id, beneficiary_id, staff_id, ic_no, address, postcode, city, state,
             occupation, salary, family_no, status, created_at
      FROM application
      ORDER BY created_at DESC
    `);

    const apps = appsRes.rows || [];

    const beneficiaryIds = [...new Set(apps.map(a => String(a.beneficiary_id)).filter(Boolean))];

    const benMap = {};
    if (beneficiaryIds.length > 0) {
      const benRes = await authPool.query(
        `SELECT beneficiary_id, full_name, email
         FROM beneficiary
         WHERE beneficiary_id = ANY($1::text[])`,
        [beneficiaryIds]
      );

      (benRes.rows || []).forEach((b) => {
        benMap[String(b.beneficiary_id)] = b;
      });
    }

    const data = apps.map((a) => ({
      application_id: a.application_id,
      beneficiary_id: a.beneficiary_id,
      full_name: benMap[String(a.beneficiary_id)]?.full_name || "N/A",
      email: benMap[String(a.beneficiary_id)]?.email || "N/A",
      ic_no: a.ic_no,
      address: a.address,
      postcode: a.postcode,
      city: a.city,
      state: a.state,
      occupation: a.occupation,
      salary: a.salary,
      family_no: a.family_no,
      status: a.status,
      created_at: a.created_at,
      score: 0,
    }));

    return res.json({ success: true, data });
  } catch (err) {
    console.error("STAFF APPLICATION GET ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// GET ONE
// GET /api/staff-application/:id
// =========================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appRes = await applicationPool.query(
      `SELECT * FROM application WHERE application_id = $1`,
      [String(id)]
    );

    if (appRes.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const app = appRes.rows[0];

    const benRes = await authPool.query(
      `SELECT full_name, email
       FROM beneficiary
       WHERE beneficiary_id = $1`,
      [String(app.beneficiary_id)]
    );

    const ben = benRes.rows?.[0] || {};

    return res.json({
      success: true,
      data: {
        ...app,
        full_name: ben.full_name || "N/A",
        email: ben.email || "N/A",
        score: 0,
      },
    });
  } catch (err) {
    console.error("STAFF APPLICATION GET ONE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// PATCH STATUS
// PATCH /api/staff-application/:id/status
// body: { status: "COMPLETED" | "PENDING" | "REJECTED" }
// If COMPLETED -> ensure row exists in MySQL distribution as Pending
// =========================
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: "Status required" });
  }

  try {
    const upperStatus = String(status).toUpperCase();

    // 1) update Postgres application status
    const upd = await applicationPool.query(
      `UPDATE application
       SET status = $1
       WHERE application_id = $2
       RETURNING application_id, staff_id, status`,
      [upperStatus, String(id)]
    );

    if (upd.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const updatedApp = upd.rows[0];

    // 2) if COMPLETED -> ensure distribution exists in MySQL
    if (upperStatus === "COMPLETED") {
      const applicationId = String(updatedApp.application_id);

      const [exists] = await foodPool.query(
        `SELECT distribution_id
         FROM distribution
         WHERE application_id = ?
         LIMIT 1`,
        [applicationId]
      );

      if (!exists || exists.length === 0) {
        // ✅ Option A: if distribution_id is AUTO_INCREMENT, DON'T insert it.
        // ✅ Option B: if NOT auto, fallback generate id:
        const fallbackId = `D-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Try insert without distribution_id first
        try {
          await foodPool.query(
            `INSERT INTO distribution
             (staff_id, application_id, date_distributed, status, total_package_count)
             VALUES (NULL, ?, NULL, 'Pending', 1)`,
            [applicationId]
          );
        } catch (e) {
          // fallback if DB requires distribution_id
          await foodPool.query(
            `INSERT INTO distribution
             (distribution_id, staff_id, application_id, date_distributed, status, total_package_count)
             VALUES (?, NULL, ?, NULL, 'Pending', 1)`,
            [fallbackId, applicationId]
          );
        }
      }
    }

    return res.json({ success: true, application: updatedApp });
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// =========================
// DELETE
// DELETE /api/staff-application/:id
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await applicationPool.query(
      `DELETE FROM application WHERE application_id = $1`,
      [String(req.params.id)]
    );
    return res.json({ success: true });
  } catch (err) {
    console.error("DELETE APPLICATION ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
