import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { donationStock } from "../../dataExample/DonationExp";

function TopDonorsBar() {
  const data = donationStock.map(d => ({ donor: d.donor, quantity: d.quantity }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="donor" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" fill="#278659" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopDonorsBar;
