const express = require("express");
const router = express.Router();
const { beneficiaryDB, foodDB } = require("../db");

router.get("/", async (req, res) => {
  try {
    // =============================
    // 1. TOTAL APPLICATIONS (Postgres) - Dummy JOIN
    // =============================
    const appResult = await beneficiaryDB.query(`
      SELECT COUNT(a.application_id) AS total_applications
      FROM public.application a
      LEFT JOIN public.users u
        ON a.created_by = u.user_id
    `);

    const totalApplications =
      Number(appResult.rows[0]?.total_applications) || 0;

    // =============================
    // 2. COMPLETED DISTRIBUTIONS (MySQL) - Dummy JOIN
    // =============================
    const [distRows] = await foodDB.query(`
      SELECT COUNT(d.id) AS completed_distributions
      FROM distribution d
      LEFT JOIN food f
        ON d.food_id = f.id
      WHERE d.status = 'COMPLETED'
    `);

    const completedDistributions =
      Number(distRows[0]?.completed_distributions) || 0;

    // =============================
    // 3. APPLICATIONS BY STATUS (Postgres) - Dummy JOIN
    // =============================
    const statusResult = await beneficiaryDB.query(`
      SELECT a.status, COUNT(*) AS count
      FROM public.application a
      LEFT JOIN public.beneficiary b
        ON a.beneficiary_id = b.id
      GROUP BY a.status
    `);

    const applicationsByStatus = {
      Approved: 0,
      Pending: 0,
      Rejected: 0,
    };

    statusResult.rows.forEach((row) => {
      const status = row.status ? row.status.toUpperCase() : "";

      if (status === "APPROVED" || status === "COMPLETED") {
        applicationsByStatus.Approved += Number(row.count);
      } else if (status === "PENDING") {
        applicationsByStatus.Pending += Number(row.count);
      } else if (status === "REJECTED") {
        applicationsByStatus.Rejected += Number(row.count);
      }
    });

    // =============================
    // 4. LATEST APPLICATIONS (Postgres) - Dummy JOIN
    // =============================
    const latestAppsResult = await beneficiaryDB.query(`
      SELECT a.created_at
      FROM public.application a
      LEFT JOIN public.staff s
        ON a.assigned_staff_id = s.id
      ORDER BY a.created_at DESC
      LIMIT 200
    `);

    // =============================
    // RESPONSE
    // =============================
    res.status(200).json({
      totalApplications,
      completedDistributions,
      applicationsByStatus,
      latestApplications: latestAppsResult.rows,
    });
  } catch (err) {
    console.error("❌ Error retrieving dashboard data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
