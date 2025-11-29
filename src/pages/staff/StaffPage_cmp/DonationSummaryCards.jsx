import React from "react";
import { donationStats } from "../../dataExample/DonationExp";

function DonationSummaryCards() {
  return (
    <div className="grid grid-cols-3 gap-5 mb-6">
      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="text-sm text-gray-500">Total Items in Stock</h3>
        <p className="text-3xl font-bold mt-2">{donationStats.totalItemsInStock}</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="text-sm text-gray-500">Low Stock Alerts</h3>
        <p className="text-3xl font-bold mt-2 text-red-500">{donationStats.lowStockAlerts}</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow">
        <h3 className="text-sm text-gray-500">Monthly Donations</h3>
        <p className="text-3xl font-bold mt-2">{donationStats.monthlyDonations}</p>
      </div>
    </div>
  );
}

export default DonationSummaryCards;
