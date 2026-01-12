import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

const API_URL = "http://localhost:5000/api/packages";

function StaffPackage() {
  // ======================
  // STATE
  // ======================
  const [packages, setPackages] = useState([]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  // Add Package Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    pax: "",
    items: "",
    image: ""
  });

  // Edit Package Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // ======================
  // LOAD PACKAGES FROM DB
  // ======================
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await axios.get(API_URL);
    setPackages(res.data);
    setTotalPackages(res.data.length);
    setTotalValue(res.data.reduce((sum, p) => sum + Number(p.price), 0));
    return res.data; // ✅ return list so we can use it in fallback checks
  };

  // ======================
  // ADD PACKAGE (DB)
  // ======================
  const handleAddPackage = async () => {
    if (!newPackage.name || !newPackage.price || !newPackage.pax || !newPackage.items) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    // normalize what we send + what we check
    const payload = {
      name: newPackage.name.toUpperCase(),
      price: Number(newPackage.price),
      pax: newPackage.pax.toUpperCase(),
      items: newPackage.items.split(",").map(i => i.trim().toUpperCase()),
      image: newPackage.image || null
    };

    try {
      await axios.post(API_URL, payload);

      await fetchPackages();

      setIsAddModalOpen(false);
      setNewPackage({ name: "", price: "", pax: "", items: "", image: "" });

      Swal.fire("Success", "Package added successfully", "success");
    } catch (err) {
      console.error("ADD PACKAGE ERROR:", err);

      // ✅ FALLBACK: even if axios says "error", refetch and verify if it was inserted
      try {
        const latest = await fetchPackages();

        const exists = latest.some(p =>
          String(p.name).toUpperCase() === payload.name &&
          Number(p.price) === payload.price &&
          String(p.pax).toUpperCase() === payload.pax
        );

        if (exists) {
          setIsAddModalOpen(false);
          setNewPackage({ name: "", price: "", pax: "", items: "", image: "" });

          Swal.fire("Success", "Package added successfully", "success");
          return;
        }
      } catch (e) {
        console.error("FALLBACK FETCH ERROR:", e);
      }

      Swal.fire("Error", "Failed to add package", "error");
    }
  };

  // ======================
  // EDIT PACKAGE
  // ======================
  const handleEditPackage = (pkg) => {
    setEditingPackage({
      ...pkg,
      items: pkg.items.join(", ")
    });
    setIsEditModalOpen(true);
  };

  const handleUpdatePackage = async () => {
    if (!editingPackage) return;

    const payload = {
      name: editingPackage.name,
      price: Number(editingPackage.price),
      pax: editingPackage.pax,
      items: editingPackage.items.split(",").map(i => i.trim().toUpperCase()),
      image: editingPackage.image || null
    };

    try {
      await axios.put(`${API_URL}/${editingPackage.id}`, payload);

      await fetchPackages();

      setIsEditModalOpen(false);
      setEditingPackage(null);

      Swal.fire("Success", "Package updated successfully", "success");
    } catch (err) {
      console.error("UPDATE ERROR:", err);

      // ✅ FALLBACK: refetch and verify update exists
      try {
        const latest = await fetchPackages();

        const exists = latest.some(p =>
          String(p.id) === String(editingPackage.id) &&
          String(p.name) === String(payload.name) &&
          Number(p.price) === Number(payload.price)
        );

        if (exists) {
          setIsEditModalOpen(false);
          setEditingPackage(null);

          Swal.fire("Success", "Package updated successfully", "success");
          return;
        }
      } catch (e) {
        console.error("FALLBACK FETCH ERROR:", e);
      }

      Swal.fire("Error", "Failed to update package", "error");
    }
  };

  // ======================
  // DELETE PACKAGE
  // ======================
  const handleDeletePackage = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Package?",
      text: "This cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33"
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchPackages();
      Swal.fire("Deleted", "Package removed", "success");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      Swal.fire("Error", "Failed to delete package", "error");
    }
  };

  // ======================
  // IMAGE UPLOAD
  // ======================
  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditingPackage(prev => ({ ...prev, image: reader.result }));
      } else {
        setNewPackage(prev => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // ======================
  // RENDER
  // ======================
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSideBar />

      <main className="flex-1 px-8 py-4">
        <StaffPanelBar />

        <section className="bg-[#F2F1F1] rounded-xl p-4">
          <h1 className="text-xl font-semibold mb-4">Package Management</h1>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-700 text-white p-4 rounded-xl">
              <p>Total Packages</p>
              <h2 className="text-4xl">{totalPackages}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p>Total Value</p>
              <h2 className="text-4xl text-green-600">RM {totalValue}</h2>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Package List</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Add Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white p-4 rounded-xl shadow">
                <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  {pkg.image ? (
                    <img src={pkg.image} alt="" className="h-full w-full object-cover rounded" />
                  ) : "📦"}
                </div>

                <h3 className="font-semibold text-center">{pkg.name}</h3>
                <p className="text-center font-bold">RM {pkg.price}</p>
                <p className="text-xs text-center">{pkg.pax}</p>

                <ul className="text-sm mt-2">
                  {pkg.items.map((i, idx) => (
                    <li key={idx}>• {i}</li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Outlet />
        </section>
      </main>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px]">
            <h2 className="font-semibold mb-3">Add Package</h2>

            <input
              className="input"
              placeholder="Name"
              value={newPackage.name}
              onChange={e => setNewPackage({ ...newPackage, name: e.target.value })}
            />
            <input
              className="input"
              placeholder="Price"
              value={newPackage.price}
              onChange={e => setNewPackage({ ...newPackage, price: e.target.value })}
            />
            <input
              className="input"
              placeholder="PAX"
              value={newPackage.pax}
              onChange={e => setNewPackage({ ...newPackage, pax: e.target.value })}
            />
            <textarea
              className="input"
              placeholder="Items (comma separated)"
              value={newPackage.items}
              onChange={e => setNewPackage({ ...newPackage, items: e.target.value })}
            />

            <input type="file" onChange={e => handleImageUpload(e)} />

            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-1 rounded"
                onClick={handleAddPackage}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px]">
            <h2 className="font-semibold mb-3">Edit Package</h2>

            <input
              className="input"
              value={editingPackage.name}
              onChange={e => setEditingPackage({ ...editingPackage, name: e.target.value })}
            />
            <input
              className="input"
              value={editingPackage.price}
              onChange={e => setEditingPackage({ ...editingPackage, price: e.target.value })}
            />
            <input
              className="input"
              value={editingPackage.pax}
              onChange={e => setEditingPackage({ ...editingPackage, pax: e.target.value })}
            />
            <textarea
              className="input"
              value={editingPackage.items}
              onChange={e => setEditingPackage({ ...editingPackage, items: e.target.value })}
            />

            <input type="file" onChange={e => handleImageUpload(e, true)} />

            <div className="flex justify-end gap-2 mt-3">
              <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded"
                onClick={handleUpdatePackage}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPackage;
