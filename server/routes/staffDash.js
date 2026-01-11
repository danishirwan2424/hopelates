// routes/application.js
const express = require("express");
const router = express.Router();
const authPool = require("../db/authDb"); // PostgreSQL pool connection

// ======================
// GET /api/application/stats
// Retrieve dashboard stats
// ======================
router.get("/stats", async (req, res) => {
  try {
    // 1️⃣ Daily Total Applications (submitted today)
    const dailyApplicationsResult = await authPool.query(
      `SELECT COUNT(*) AS count 
       FROM beneficiary 
       WHERE DATE(created_at) = CURRENT_DATE`
    );
    const dailyTotalApplications = parseInt(dailyApplicationsResult.rows[0].count) || 0;

    // 2️⃣ Completed Distributions
    const completedDistributionsResult = await authPool.query(
      `SELECT COUNT(*) AS count 
       FROM distributions 
       WHERE status = 'completed'`
    );
    const completedDistributions = parseInt(completedDistributionsResult.rows[0].count) || 0;

    // 3️⃣ Applications Approved
    const applicationsApprovedResult = await authPool.query(
      `SELECT COUNT(*) AS count 
       FROM beneficiary 
       WHERE status = 'approved'`
    );
    const applicationsApproved = parseInt(applicationsApprovedResult.rows[0].count) || 0;

    // 4️⃣ Pending Approvals
    const pendingApprovalsResult = await authPool.query(
      `SELECT COUNT(*) AS count 
       FROM beneficiary 
       WHERE status = 'pending'`
    );
    const pendingApprovals = parseInt(pendingApprovalsResult.rows[0].count) || 0;

    // 5️⃣ Weekly Applications (for bar chart)
    const weeklyApplicationsResult = await authPool.query(
      `SELECT TO_CHAR(created_at, 'Dy') AS day, COUNT(*) AS count
       FROM beneficiary
       WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
       GROUP BY day
       ORDER BY MIN(created_at)`
    );
    const weekLabels = [];
    const weeklyApplications = [];
    weeklyApplicationsResult.rows.forEach(row => {
      weekLabels.push(row.day);
      weeklyApplications.push(parseInt(row.count));
    });

    res.json({
      dailyTotalApplications,
      completedDistributions,
      applicationsApproved,
      pendingApprovals,
      weekLabels: weekLabels.length ? weekLabels : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      weeklyApplications: weeklyApplications.length ? weeklyApplications : [0,0,0,0,0,0,0],
    });

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
});

module.exports = router;
