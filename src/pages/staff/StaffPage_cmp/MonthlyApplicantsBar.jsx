import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { months, monthlyApplicants } from "../../dataExample/UserExp";

function MonthlyApplicantsBar() {
  const data = months.map((month, index) => ({
    month,
    total: monthlyApplicants[index],
  }));

  const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#14B8A6", "#EC4899", "#6366F1", "#F97316", "#06B6D4", "#8B5CF6", "#10B981"];

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Monthly Applicants</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyApplicantsBar;
