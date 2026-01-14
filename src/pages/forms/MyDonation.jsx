import React, { useState, useEffect } from "react";
import DonorNav from "./Forms_cmp/DonorNav";
import axios from "axios"; // Ensure axios is installed

function MyDonation() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.donor_id) return;

        const response = await axios.get(`${API_BASE}/api/donation/donor/${user.donor_id}`);
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donation history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "PAID": // Changed from 'Completed' to match your DB 'PAID'
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DonorNav />
      <section className="flex-1 flex flex-col p-4 mt-4">
        <h1 className="text-3xl font-extrabold text-[#11452E] mb-3 mt-9">
          My Donations
        </h1>

        <div className="bg-white rounded-lg shadow-sm border w-full flex-1 overflow-auto p-4">
          {loading ? (
            <p className="text-center py-10">Loading history...</p>
          ) : donations.length === 0 ? (
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
                    <td className="p-3 border-b">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b uppercase">
                      {donation.package_list}
                    </td>
                    <td className="p-3 border-b">{donation.total_quantity}</td>
                    <td className="p-3 border-b font-semibold">
                      {donation.amount.toFixed(2)}
                    </td>
                    <td className="p-3 border-b">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(donation.status)}`}>
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