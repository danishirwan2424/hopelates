import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { statusCounts } from "../../dataExample/UserExp";

function ApplicantsStatusPie() {
  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  const COLORS = ["#10B981", "#3B82F6", "#EF4444"]; // green, blue, red

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Applicants Status</h2>
      <PieChart width={350} height={260}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
        >
          {pieData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ApplicantsStatusPie;
