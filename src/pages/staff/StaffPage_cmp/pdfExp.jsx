import React, { useEffect } from "react";
import { donationStock, donationStats } from "../../dataExample/DonationExp";
import { applications, statusCounts, months, monthlyApplicants } from "../../dataExample/UserExp";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, DoughnutController, ArcElement, BarController, BarElement, Legend, Tooltip } from "chart.js";

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, DoughnutController, ArcElement, BarController, BarElement, Legend, Tooltip);

const PdfExp = () => {
  useEffect(() => {
    // ===== LINE CHART =====
    new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Applicants",
            data: monthlyApplicants,
            borderColor: "#278659",
            backgroundColor: "rgba(39,134,89,0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#11452E",
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    // ===== DOUGHNUT CHART =====
    new Chart(document.getElementById("doughnutChart"), {
      type: "doughnut",
      data: {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
            hoverOffset: 10,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } },
    });

    // ===== BAR CHART =====
    const topDonors = donationStock.sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    new Chart(document.getElementById("barChart"), {
      type: "bar",
      data: {
        labels: topDonors.map((d) => d.donor),
        datasets: [
          {
            label: "Quantity",
            data: topDonors.map((d) => d.quantity),
            backgroundColor: "#278659",
            borderRadius: 6,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
    });
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 20, background: "#f9fafb", color: "#1f2937" }}>
      <h1>Donation & Applicant Report</h1>

      {/* KPI Summary Cards */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ flex: "1 1 250px", background: "linear-gradient(135deg, #278659, #11452E)", color: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          <h3 style={{ fontSize: 16, marginBottom: 10, opacity: 0.85 }}>Total Items in Stock</h3>
          <p style={{ fontSize: 32, fontWeight: "bold", margin: 0 }}>{donationStats.totalItemsInStock}</p>
        </div>
        <div style={{ flex: "1 1 250px", background: "#fff", color: "#111827", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          <h3 style={{ fontSize: 16, marginBottom: 10, opacity: 0.85 }}>Low Stock Alerts</h3>
          <p style={{ fontSize: 32, fontWeight: "bold", margin: 0 }}>{donationStats.lowStockAlerts}</p>
        </div>
        <div style={{ flex: "1 1 250px", background: "#fff", color: "#111827", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          <h3 style={{ fontSize: 16, marginBottom: 10, opacity: 0.85 }}>Monthly Donations</h3>
          <p style={{ fontSize: 32, fontWeight: "bold", margin: 0 }}>{donationStats.monthlyDonations}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px", background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2>Monthly Applicant Trend</h2>
          <canvas id="lineChart" width="400" height="200"></canvas>
        </div>
        <div style={{ flex: "1 1 300px", background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2>Applicants Status Breakdown</h2>
          <canvas id="doughnutChart" width="200" height="200"></canvas>
        </div>
        <div style={{ flex: "1 1 300px", background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2>Top Donors</h2>
          <canvas id="barChart" width="400" height="200"></canvas>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div style={{ marginTop: 25 }}>
        <h2>Recent Applications</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", color: "#111827", fontWeight: 600, fontSize: 14 }}>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} style={{ background: "#f9fafb" }}>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td>{app.date}</td>
                <td style={{ color: app.status === "Completed" ? "#22c55e" : app.status === "Pending" ? "#facc15" : "#ef4444", fontWeight: 600 }}>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PdfExp;
