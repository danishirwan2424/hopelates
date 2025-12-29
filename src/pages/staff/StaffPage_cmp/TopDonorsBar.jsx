import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { donationStock } from "../../dataExample/DonationExp";

function TopDonorsBar() {
  const data = donationStock.map(d => ({ donor: d.donor, quantity: d.quantity }));
  const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#14B8A6", "#EC4899", "#6366F1"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="donor" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopDonorsBar;
