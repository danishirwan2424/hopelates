import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User, Mail, Phone, MapPin, Package, ArrowLeft } from "lucide-react";

function CheckDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageQuantities, packages, total, totalItems } = location.state || {};

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    state: ""
  });

  const [errors, setErrors] = useState({});

  // Redirect if no packages selected
  useEffect(() => {
    if (!packageQuantities || !packages || totalItems === 0) {
      navigate("/donations");
    }
  }, [packageQuantities, packages, totalItems, navigate]);

  // Get selected packages with details
  const getSelectedPackages = () => {
    if (!packages || !packageQuantities) return [];
    
    return packages
      .filter(pkg => packageQuantities[pkg.id] > 0)
      .map(pkg => ({
        ...pkg,
        quantity: packageQuantities[pkg.id],
        subtotal: pkg.price * packageQuantities[pkg.id]
      }));
  };

  const selectedPackages = getSelectedPackages();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = "Postcode is required";
    } else if (!/^\d{5}$/.test(formData.postcode)) {
      newErrors.postcode = "Postcode must be 5 digits";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Navigate to payment page with all data
      navigate("/payment", {
        state: {
          packageQuantities,
          packages,
          total,
          totalItems,
          donorInfo: formData
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/donations")}
            className="flex items-center gap-2 text-[#019461] hover:text-[#017a54] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Packages</span>
          </button>
          <h1 className="text-[36px] font-bold text-gray-900 tracking-tight">
            CHECK DETAILS
          </h1>
          <p className="text-gray-600 mt-2">Review your donation and enter your details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="text-[#019461]" size={28} />
                Your Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.fullName ? "border-red-500" : "border-gray-200"
                    } focus:border-[#019461] focus:outline-none transition-colors`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-[#019461] focus:outline-none transition-colors`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      } focus:border-[#019461] focus:outline-none transition-colors`}
                      placeholder="+60 12-345 6789"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.address ? "border-red-500" : "border-gray-200"
                    } focus:border-[#019461] focus:outline-none transition-colors resize-none`}
                    placeholder="Enter your full address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City, Postcode, State */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      } focus:border-[#019461] focus:outline-none transition-colors`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      maxLength="5"
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.postcode ? "border-red-500" : "border-gray-200"
                      } focus:border-[#019461] focus:outline-none transition-colors`}
                      placeholder="12345"
                    />
                    {errors.postcode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.state ? "border-red-500" : "border-gray-200"
                      } focus:border-[#019461] focus:outline-none transition-colors`}
                    >
                      <option value="">Select State</option>
                      <option value="Johor">Johor</option>
                      <option value="Kedah">Kedah</option>
                      <option value="Kelantan">Kelantan</option>
                      <option value="Melaka">Melaka</option>
                      <option value="Negeri Sembilan">Negeri Sembilan</option>
                      <option value="Pahang">Pahang</option>
                      <option value="Penang">Penang</option>
                      <option value="Perak">Perak</option>
                      <option value="Perlis">Perlis</option>
                      <option value="Sabah">Sabah</option>
                      <option value="Sarawak">Sarawak</option>
                      <option value="Selangor">Selangor</option>
                      <option value="Terengganu">Terengganu</option>
                      <option value="Kuala Lumpur">Kuala Lumpur</option>
                      <option value="Labuan">Labuan</option>
                      <option value="Putrajaya">Putrajaya</option>
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#019461] text-white font-bold text-lg hover:bg-[#017a54] transition-colors shadow-lg"
                >
                  PROCEED TO PAYMENT
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="text-[#019461]" size={28} />
                Order Summary
              </h2>

              {/* Selected Packages */}
              <div className="space-y-4 mb-6">
                {selectedPackages.map((pkg) => (
                  <div key={pkg.id} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                        <p className="text-xs text-gray-500">{pkg.pax}</p>
                      </div>
                      <span className="text-sm text-gray-600">x{pkg.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">RM {pkg.price} each</span>
                      <span className="font-bold text-[#019461]">RM {pkg.subtotal}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Items */}
              <div className="flex justify-between items-center mb-4 text-gray-700">
                <span className="font-medium">Total Items:</span>
                <span className="font-bold">{totalItems}</span>
              </div>

              {/* Total Amount */}
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">TOTAL AMOUNT:</span>
                  <span className="text-2xl font-black text-[#019461]">RM {total}</span>
                </div>
              </div>

              {/* Info Note */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your donation will help families in need. Thank you for your generosity!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckDetails;