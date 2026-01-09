// File: MyDonation.jsx
import React, { useState, useEffect } from "react";
import DonorNav from "./Forms_cmp/DonorNav";

function MyDonation() {
  const [donations, setDonations] = useState([]);

  // Example: fetch donor donations from API or local data
  useEffect(() => {
    // Replace this with real API call
    const mockData = [
      {
        id: 1,
        date: "2026-01-05",
        package: "PACKAGE A",
        quantity: 2,
        amount: 40,
        status: "Completed",
      },
      {
        id: 2,
        date: "2026-01-07",
        package: "PACKAGE B",
        quantity: 1,
        amount: 50,
        status: "Pending",
      },
      {
        id: 3,
        date: "2026-01-08",
        package: "PACKAGE C",
        quantity: 3,
        amount: 210,
        status: "Completed",
      },
    ];
    setDonations(mockData);
  }, []);

  // Helper to color status
  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Donor Navigation */}
      <DonorNav />

      {/* Main Content */}
      <section className="flex-1 flex flex-col p-4 mt-4">
        <h1 className="text-3xl font-extrabold text-[#11452E] mb-3 mt-9">
          My Donations
        </h1>

        <div className="bg-white rounded-lg shadow-sm border h- w-full flex-1 overflow-auto p-4">
          {donations.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              You have not made any donations yet.
            </p>
          ) : (
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Package</th>
                  <th className="p-3 border-b">Quantity</th>
                  <th className="p-3 border-b">Amount (RM)</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{donation.date}</td>
                    <td className="p-3 border-b">{donation.package}</td>
                    <td className="p-3 border-b">{donation.quantity}</td>
                    <td className="p-3 border-b font-semibold">{donation.amount}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          donation.status
                        )}`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyDonation;
