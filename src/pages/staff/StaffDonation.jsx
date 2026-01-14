import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Plus, Minus, Search, Edit2, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";

import StaffSideBar from "./StaffPage_cmp/StaffSideBar";
import StaffPanelBar from "./StaffPage_cmp/StaffPanelBar";

function StaffPackage() {
  const API_URL = "http://localhost:5000/api/packages";
  const ITEM_API = "http://localhost:5000/api/items";

  const token = localStorage.getItem("token");

const authHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
};

  // Package data
  const [packages, setPackages] = useState([]);

  // Stock data
  const [stockList, setStockList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [totalPackages, setTotalPackages] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);

  // Add Package Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    pax: "",
    items: [], // Changed to array of {id, name, quantity}
    image: ""
  });

  // Add Stock Modal
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    name: "",
    category: "Dry Food",
    quantity: "",
    unit: "",
    expiry_date: ""
  });

  // Edit Package Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // Edit Stock Modal
  const [isEditStockModalOpen, setIsEditStockModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  // Item selection for package
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(1);

  // Add item to package
  const handleAddItemToPackage = (isEdit = false) => {
    if (!selectedItemId) {
      Swal.fire({
        icon: "warning",
        title: "No Item Selected",
        text: "Please select an item first!"
      });
      return;
    }

    const selectedStock = stockList.find(s => s.id === parseInt(selectedItemId));
    if (!selectedStock) return;

    const newItem = {
      id: selectedStock.id,
      name: selectedStock.name,
      quantity: selectedItemQuantity
    };

    if (isEdit) {
      // Check if item already exists
      const exists = editingPackage.items.find(i => i.id === newItem.id);
      if (exists) {
        Swal.fire({
          icon: "warning",
          title: "Item Already Added",
          text: "This item is already in the package. You can edit its quantity."
        });
        return;
      }
      setEditingPackage({
        ...editingPackage,
        items: [...editingPackage.items, newItem]
      });
    } else {
      // Check if item already exists
      const exists = newPackage.items.find(i => i.id === newItem.id);
      if (exists) {
        Swal.fire({
          icon: "warning",
          title: "Item Already Added",
          text: "This item is already in the package. You can edit its quantity."
        });
        return;
      }
      setNewPackage({
        ...newPackage,
        items: [...newPackage.items, newItem]
      });
    }

    // Reset selection
    setSelectedItemId("");
    setSelectedItemQuantity(1);
  };

  // Remove item from package
  const handleRemoveItemFromPackage = (itemId, isEdit = false) => {
    if (isEdit) {
      setEditingPackage({
        ...editingPackage,
        items: editingPackage.items.filter(i => i.id !== itemId)
      });
    } else {
      setNewPackage({
        ...newPackage,
        items: newPackage.items.filter(i => i.id !== itemId)
      });
    }
  };

  // Update item quantity in package
  const handleUpdateItemQuantity = (itemId, newQuantity, isEdit = false) => {
    if (newQuantity < 1) return;

    if (isEdit) {
      setEditingPackage({
        ...editingPackage,
        items: editingPackage.items.map(i =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        )
      });
    } else {
      setNewPackage({
        ...newPackage,
        items: newPackage.items.map(i =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        )
      });
    }
  };

  // Add Package Handler
  const handleAddPackage = async () => {
    if (!newPackage.name || !newPackage.price || !newPackage.pax || newPackage.items.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields and add at least one item!"
      });
      return;
    }

    const payload = {
      name: newPackage.name.toUpperCase(),
      price: Number(newPackage.price),
      pax: newPackage.pax.toUpperCase(),
      items: newPackage.items, // Array of {id, name, quantity}
      image: newPackage.image || null
    };

    try {
      await fetch(API_URL, {
  method: "POST",
  headers: authHeaders,
  body: JSON.stringify(payload)
});


      const res = await fetch(API_URL);
      setPackages(await res.json());

      setIsAddModalOpen(false);
      setNewPackage({ name: "", price: "", pax: "", items: [], image: "" });

      Swal.fire({
        icon: "success",
        title: "Package Added!",
        confirmButtonColor: "#278659"
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Package",
        text: err.message
      });
    }
  };

  // Handle image file upload
  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditingPackage({ ...editingPackage, image: reader.result });
        } else {
          setNewPackage({ ...newPackage, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Stock Handler
  const handleAddStock = async () => {
    if (!newStock.name || !newStock.quantity || !newStock.unit || !newStock.expiry_date) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields!"
      });
      return;
    }

    try {
      const response = await fetch(ITEM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStock.name,
          category: newStock.category,
          unit: newStock.unit,
          quantity: Number(newStock.quantity),
          expiry_date: newStock.expiry_date
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add stock");
      }

      // Refresh stock list
      const res = await fetch(ITEM_API);
      setStockList(await res.json());

      setIsAddStockModalOpen(false);
      setNewStock({ 
        name: "", 
        category: "Dry Food", 
        quantity: "", 
        unit: "", 
        expiry_date: "" 
      });

      Swal.fire({
        icon: "success",
        title: "Stock Added!",
        confirmButtonColor: "#278659"
      });
    } catch (error) {
      console.error("Error adding stock:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Stock",
        text: error.message
      });
    }
  };

  // Delete Package Handler
  const handleDeletePackage = (id) => {
    Swal.fire({
      title: "Delete Package?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const res = await fetch(API_URL);
      setPackages(await res.json());

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        confirmButtonColor: "#278659"
      });
    });
  };

  // Edit Package Handler
  const handleEditPackage = (pkg) => {
    setEditingPackage({ ...pkg });
    setIsEditModalOpen(true);
  };

  // Update Package Handler
  const handleUpdatePackage = async () => {
    if (!editingPackage.name || !editingPackage.price || !editingPackage.pax || editingPackage.items.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields and add at least one item!"
      });
      return;
    }

    const payload = {
      name: editingPackage.name.toUpperCase(),
      price: Number(editingPackage.price),
      pax: editingPackage.pax.toUpperCase(),
      items: editingPackage.items,
      image: editingPackage.image || null
    };

    try {
      await fetch(`${API_URL}/${editingPackage.id}`, {
  method: "PUT",
  headers: authHeaders,
  body: JSON.stringify(payload)
});


      const res = await fetch(API_URL);
      setPackages(await res.json());

      setIsEditModalOpen(false);
      setEditingPackage(null);

      Swal.fire({
        icon: "success",
        title: "Package Updated!",
        confirmButtonColor: "#278659"
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Package",
        text: err.message
      });
    }
  };

  // Delete Stock Handler
  const handleDeleteStock = (id) => {
    Swal.fire({
      title: "Delete Stock Item?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      await fetch(`${API_URL}/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`
  }
});


      const res = await fetch(ITEM_API);
      setStockList(await res.json());

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        confirmButtonColor: "#278659"
      });
    });
  };

  // Edit Stock Handler
  const handleEditStock = (stock) => {
    setEditingStock({ ...stock });
    setIsEditStockModalOpen(true);
  };

  // Update Stock Handler
  const handleUpdateStock = async () => {
    await fetch(`${ITEM_API}/${editingStock.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editingStock.name,
        category: editingStock.category,
        unit: editingStock.unit,
        quantity: Number(editingStock.quantity),
        expiry_date: editingStock.expiry_date
      })
    });

    const res = await fetch(ITEM_API);
    setStockList(await res.json());

    setIsEditStockModalOpen(false);
    setEditingStock(null);

    Swal.fire({
      icon: "success",
      title: "Stock Updated!",
      confirmButtonColor: "#278659"
    });
  };

  // SORTING
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // dynamically sorted + filtered stock
  const sortedStock = [...stockList].sort((a, b) => {
    if (!sortBy) return 0;
    let x = a[sortBy];
    let y = b[sortBy];

    if (typeof x === "string") x = x.toLowerCase();
    if (typeof y === "string") y = y.toLowerCase();

    if (sortOrder === "asc") return x > y ? 1 : -1;
    return x < y ? 1 : -1;
  });

  const filteredStock = sortedStock.filter((item) =>
    `${item.name} ${item.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch(ITEM_API)
      .then(res => res.json())
      .then(data => setStockList(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setTotalPackages(packages.length);
    const total = packages.reduce(
      (sum, pkg) => sum + Number(pkg.price || 0),
      0
    );
    setTotalValue(total);
    setAvailableStock(stockList.length);
  }, [packages, stockList]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex min-h-screen bg-gray-50">
        <StaffSideBar />
      </aside>

      <main className="flex-1 flex flex-col bg-white pt-[20px] px-8 pb-[20px] h-screen overflow-hidden">
        <StaffPanelBar />

        <section className="flex flex-col flex-1 bg-[#F2F1F1] rounded-xl shadow-sm p-4 overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <header className="flex-shrink-0">
            <h1 className="text-[20px] text-gray-800">Package Management</h1>
            <p className="text-[12px] text-black opacity-[50%] mb-2">
              Manage food packages and stock inventory
            </p>
          </header>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 flex-shrink-0">
            <div className="bg-gradient-to-b from-[#11452E] to-[#278659] rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4 text-white">
              <p className="text-[14px] opacity-90">Total Packages</p>
              <h2 className="text-[64px] text-white font-bold leading-none">{totalPackages}</h2>
              <span className="text-[12px] opacity-80">Package types</span>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4">
              <p className="text-[14px] text-gray-700">Total Value</p>
              <h2 className="text-[64px] font-bold text-green-600 leading-none">{totalValue}</h2>
              <span className="text-[12px] text-gray-500">RM Combined</span>
            </div>
            <div className="bg-white rounded-[15px] shadow-md flex flex-col items-start justify-between text-left h-[167px] p-4">
              <p className="text-[14px] text-gray-700">Available Stock Items</p>
              <h2 className="text-[64px] font-bold text-blue-600 leading-none">{availableStock}</h2>
              <span className="text-[12px] text-gray-500">Different items</span>
            </div>
          </section>

          {/* PACKAGE LIST SEGMENT */}
          <section className="bg-white rounded-[15px] shadow-md p-6 flex flex-col mb-4 flex-shrink-0">
            <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-4">
              <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Package List</h2>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-[#278659] hover:bg-[#11452E] text-white px-3 py-2 rounded-lg text-sm font-medium transition"
              >
                <Plus size={16} />
                Add Package
              </button>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
                    {/* Package Image */}
                    <div className="bg-gray-50 rounded-lg h-40 mb-4 flex items-center justify-center">
                      {pkg.image ? (
                        <img 
                          src={pkg.image} 
                          alt={pkg.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-5xl mb-1">📦</div>
                          <div className="text-xs text-gray-500">{pkg.name}</div>
                        </div>
                      )}
                    </div>

                    {/* Package Name */}
                    <h3 className="text-base font-semibold text-gray-800 text-center mb-1">
                      {pkg.name}
                    </h3>

                    {/* Price */}
                    <div className="text-center mb-3 pb-3 border-b border-gray-100">
                      <p className="text-3xl font-bold text-gray-900">RM {pkg.price}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{pkg.pax}</p>
                    </div>

                    {/* Items List */}
                    <ul className="flex-1 mb-4 space-y-1.5 text-sm">
                      {pkg.items.map((item, index) => (
                        <li key={index} className="text-gray-700 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {item.name}
                          </div>
                          <span className="text-xs font-semibold text-[#278659]">×{item.quantity}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Edit2 size={15} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STOCK LIST SEGMENT */}
          <section className="bg-white rounded-[15px] shadow-md p-6 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-between w-full bg-white rounded-lg px-3 py-2 mb-4">
              <h2 className="text-[16px] font-semibold text-gray-700 shrink-0">Stock List</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 w-64">
                  <Search className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setIsAddStockModalOpen(true)}
                  className="flex items-center gap-2 bg-[#278659] hover:bg-[#11452E] text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Plus size={16} />
                  Add Stock
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-11 cursor-pointer" onClick={() => handleSort("name")}>
                      Item {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-7 cursor-pointer" onClick={() => handleSort("category")}>
                      Category {sortBy === "category" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-11 cursor-pointer" onClick={() => handleSort("quantity")}>
                      Quantity {sortBy === "quantity" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-10 cursor-pointer" onClick={() => handleSort("unit")}>
                      Unit {sortBy === "unit" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-10 cursor-pointer" onClick={() => handleSort("expiry_date")}>
                      Expiry Date {sortBy === "expiry_date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-2 px-10 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.map((item) => {
                    const expiryDate = new Date(item.expiry_date);
                    const today = new Date();
                    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                    const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
                    const isExpired = daysUntilExpiry < 0;

                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-[12px] pl-[30px]">{item.name}</td>
                        <td className="p-[12px] pl-[30px]">{item.category}</td>
                        <td className="p-[12px] pl-[30px]">
                          <span className={`font-semibold ${
                            item.quantity < 40 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {item.quantity}
                          </span>
                        </td>
                        <td className="p-[12px] pl-[30px]">{item.unit}</td>
                        <td className="p-[12px] pl-[30px]">
                          <span className={`font-semibold ${
                            isExpired ? 'text-red-600' : isExpiringSoon ? 'text-orange-600' : 'text-gray-700'
                          }`}>
                            {new Date(item.expiry_date).toLocaleDateString('en-GB')}
                          </span>
                        </td>
                        <td className="p-[12px] text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditStock(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteStock(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <Outlet />
        </section>
      </main>

      {/* ADD PACKAGE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add New Package</h2>

            <label className="text-sm text-gray-700 font-medium">Package Name *</label>
            <input
              type="text"
              placeholder="e.g., PACKAGE D"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">Price (RM) *</label>
            <input
              type="number"
              placeholder="e.g., 100"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">PAX Information *</label>
            <input
              type="text"
              placeholder="e.g., FOR 10-15 PAX"
              value={newPackage.pax}
              onChange={(e) => setNewPackage({ ...newPackage, pax: e.target.value })}
              className="w-full p-2 border rounded mb-4 text-sm"
            />

            {/* Item Selection Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <label className="text-sm text-gray-700 font-medium block mb-2">Add Items to Package *</label>
              
              <div className="flex gap-2 mb-3">
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="flex-1 p-2 border rounded text-sm"
                >
                  <option value="">Select an item...</option>
                  {stockList.map((stock) => (
                    <option key={stock.id} value={stock.id}>
                      {stock.name} ({stock.quantity} {stock.unit} available)
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={selectedItemQuantity}
                  onChange={(e) => setSelectedItemQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 p-2 border rounded text-sm text-center"
                  placeholder="Qty"
                />

                <button
                  onClick={() => handleAddItemToPackage(false)}
                  className="px-4 py-2 bg-[#278659] text-white rounded hover:bg-[#11452E] text-sm font-medium"
                >
                  Add
                </button>
              </div>

              {/* Selected Items List */}
              {newPackage.items.length > 0 && (
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Selected Items ({newPackage.items.length}):</p>
                  <div className="space-y-2">
                    {newPackage.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateItemQuantity(item.id, item.quantity - 1, false)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-8 text-center">×{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateItemQuantity(item.id, item.quantity + 1, false)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => handleRemoveItemFromPackage(item.id, false)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <label className="text-sm text-gray-700 font-medium">Package Image (Optional)</label>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
                className="w-full p-2 border rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#278659] file:text-white hover:file:bg-[#11452E] file:cursor-pointer"
              />
              {newPackage.image && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={newPackage.image} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                  <button
                    onClick={() => setNewPackage({ ...newPackage, image: "" })}
                    className="text-red-500 text-xs hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewPackage({
                    name: "",
                    price: "",
                    pax: "",
                    items: [],
                    image: ""
                  });
                  setSelectedItemId("");
                  setSelectedItemQuantity(1);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#278659] text-white rounded hover:bg-[#11452E]"
                onClick={handleAddPackage}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STOCK MODAL */}
      {isAddStockModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">Add New Stock Item</h2>

            <label className="text-sm text-gray-700 font-medium">Item Name *</label>
            <input
              type="text"
              placeholder="e.g., Rice"
              value={newStock.name}
              onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">Category *</label>
            <select
              value={newStock.category}
              onChange={(e) => setNewStock({ ...newStock, category: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            >
              <option>Dry Food</option>
              <option>Perishable</option>
              <option>Canned Food</option>
              <option>Beverages</option>
            </select>

            <label className="text-sm text-gray-700 font-medium">Quantity *</label>
            <input
              type="number"
              placeholder="e.g., 100"
              value={newStock.quantity}
              onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">Unit *</label>
            <input
              type="text"
              placeholder="e.g., packs, cans, bottles"
              value={newStock.unit}
              onChange={(e) => setNewStock({ ...newStock, unit: e.target.value })}
              className="w-full p-2 border rounded mb-4 text-sm"
            />
            
            <label className="text-sm text-gray-700 font-medium">Expiry Date *</label>
            <input
              type="date"
              value={newStock.expiry_date}
              onChange={(e) => setNewStock({ ...newStock, expiry_date: e.target.value })}
              className="w-full p-2 border rounded mb-4 text-sm"
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setIsAddStockModalOpen(false);
                  setNewStock({
                    name: "",
                    category: "Dry Food",
                    quantity: "",
                    unit: "",
                    expiry_date: ""
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#278659] text-white rounded hover:bg-[#11452E]"
                onClick={handleAddStock}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PACKAGE MODAL */}
      {isEditModalOpen && editingPackage && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Package</h2>

            <label className="text-sm text-gray-700 font-medium">Package Name *</label>
            <input
              type="text"
              placeholder="e.g., PACKAGE D"
              value={editingPackage.name}
              onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">Price (RM) *</label>
            <input
              type="number"
              placeholder="e.g., 100"
              value={editingPackage.price}
              onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">PAX Information *</label>
            <input
              type="text"
              placeholder="e.g., FOR 10-15 PAX"
              value={editingPackage.pax}
              onChange={(e) => setEditingPackage({ ...editingPackage, pax: e.target.value })}
              className="w-full p-2 border rounded mb-4 text-sm"
            />

            {/* Item Selection Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <label className="text-sm text-gray-700 font-medium block mb-2">Package Items *</label>
              
              <div className="flex gap-2 mb-3">
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="flex-1 p-2 border rounded text-sm"
                >
                  <option value="">Select an item...</option>
                  {stockList.map((stock) => (
                    <option key={stock.id} value={stock.id}>
                      {stock.name} ({stock.quantity} {stock.unit} available)
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={selectedItemQuantity}
                  onChange={(e) => setSelectedItemQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 p-2 border rounded text-sm text-center"
                  placeholder="Qty"
                />

                <button
                  onClick={() => handleAddItemToPackage(true)}
                  className="px-4 py-2 bg-[#278659] text-white rounded hover:bg-[#11452E] text-sm font-medium"
                >
                  Add
                </button>
              </div>

              {/* Selected Items List */}
              {editingPackage.items.length > 0 && (
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Selected Items ({editingPackage.items.length}):</p>
                  <div className="space-y-2">
                    {editingPackage.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateItemQuantity(item.id, item.quantity - 1, true)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-8 text-center">×{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateItemQuantity(item.id, item.quantity + 1, true)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => handleRemoveItemFromPackage(item.id, true)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <label className="text-sm text-gray-700 font-medium">Package Image (Optional)</label>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="w-full p-2 border rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#278659] file:text-white hover:file:bg-[#11452E] file:cursor-pointer"
              />
              {editingPackage.image && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={editingPackage.image} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                  <button
                    onClick={() => setEditingPackage({ ...editingPackage, image: "" })}
                    className="text-red-500 text-xs hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingPackage(null);
                  setSelectedItemId("");
                  setSelectedItemQuantity(1);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#278659] text-white rounded hover:bg-[#11452E]"
                onClick={handleUpdatePackage}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT STOCK MODAL */}
      {isEditStockModalOpen && editingStock && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">Edit Stock Item</h2>

            <label className="text-sm text-gray-700 font-medium">Item Name *</label>
            <input
              type="text"
              placeholder="e.g., Rice"
              value={editingStock.name}
              onChange={(e) => setEditingStock({ ...editingStock, name: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">Category *</label>
            <select
              value={editingStock.category}
              onChange={(e) => setEditingStock({ ...editingStock, category: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            >
              <option>Dry Food</option>
              <option>Perishable</option>
              <option>Canned Food</option>
              <option>Beverages</option>
            </select>

            <label className="text-sm text-gray-700 font-medium">Quantity *</label>
            <input
              type="number"
              placeholder="e.g., 100"
              value={editingStock.quantity}
              onChange={(e) => setEditingStock({ ...editingStock, quantity: e.target.value })}
              className="w-full p-2 border rounded mb-3 text-sm"
            />

            <label className="text-sm text-gray-700 font-medium">Unit *</label>
            <input
              type="text"
              placeholder="e.g., packs, cans, bottles"
              value={editingStock.unit}
              onChange={(e) => setEditingStock({ ...editingStock, unit: e.target.value })}
              className="w-full p-2 border rounded mb-4 text-sm"
            />
            
            <label className="text-sm text-gray-700 font-medium">Expiry Date *</label>
            <input
              type="date"
              value={editingStock.expiry_date}
              onChange={(e) => setEditingStock({ ...editingStock, expiry_date: e.target.value })}
              className="w-full p-2 border rounded mb-4 text-sm"
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setIsEditStockModalOpen(false);
                  setEditingStock(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#278659] text-white rounded hover:bg-[#11452E]"
                onClick={handleUpdateStock}
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