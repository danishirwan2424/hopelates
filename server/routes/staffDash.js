const express = require("express");
const router = express.Router();
const { beneficiaryDB, foodDB } = require("../db");

router.get("/", async (req, res) => {
  try {
    // 1. TOTAL APPLICATIONS QUERY
    const appResult = await beneficiaryDB.query(
      "SELECT COUNT(application_id) AS total_applications FROM public.application"
    );
    const totalApplications = Number(appResult.rows[0]?.total_applications) || 0;

    // 2. COMPLETED DISTRIBUTIONS - MySQL (Food Database)
    const [distRows] = await foodDB.query(
      "SELECT COUNT(*) AS completed_distributions FROM distribution WHERE status = 'COMPLETED'"
    );
    const completedDistributions = Number(distRows[0]?.completed_distributions) || 0;

    // 3. APPLICATIONS BY STATUS - Postgres (Beneficiary Database)
    const statusResult = await beneficiaryDB.query(
      `SELECT status, COUNT(*) AS count 
       FROM public.application 
       GROUP BY status`
    );

    const applicationsByStatus = { Approved: 0, Pending: 0, Rejected: 0 };
    
// staffDash.js snippet
statusResult.rows.forEach((row) => {
  const status = row.status ? row.status.toUpperCase() : "";

  if (status === "APPROVED" || status === "COMPLETED") {
    // This correctly increments the counter for the "Application Approved" card
    applicationsByStatus.Approved += Number(row.count);
  } else if (status === "PENDING") {
    applicationsByStatus.Pending = Number(row.count);
  } else if (status === "REJECTED") {
    applicationsByStatus.Rejected = Number(row.count);
  }
});

    // 4. FETCH LATEST APPLICATIONS (To populate the Monthly Bar Chart)
    const latestAppsResult = await beneficiaryDB.query(
      "SELECT created_at FROM public.application ORDER BY created_at DESC LIMIT 200"
    );

    res.status(200).json({
      totalApplications,
      completedDistributions,
      applicationsByStatus,
      latestApplications: latestAppsResult.rows, // This fixes your empty charts
    });
  } catch (err) {
    console.error("Error retrieving dashboard data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;