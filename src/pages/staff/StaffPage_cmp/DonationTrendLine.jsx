import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const donationTrend = [
  { month: "Jan", items: 40 },
  { month: "Feb", items: 45 },
  { month: "Mar", items: 50 },
  { month: "Apr", items: 48 },
  { month: "May", items: 60 },
  { month: "Jun", items: 55 },
];

function DonationTrendLine() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Donation Trend</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={donationTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="items" stroke="#8B5CF6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DonationTrendLine;
