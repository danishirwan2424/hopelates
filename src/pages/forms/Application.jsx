import React from "react";

export default function Application() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          APPLY FOR DONATION
        </h1>
        <p className="text-gray-600 italic mb-8">
          Please fill in the form correctly to apply for donation
        </p>

        <form>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Full Name (Beneficiary)
              </label>
              <input
                type="text"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* IC Number */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                IC Number
              </label>
              <input
                type="text"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* Address full width */}
            <div className="flex flex-col sm:col-span-2">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Address
              </label>
              <input
                type="text"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* Postcode */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Postcode
              </label>
              <input
                type="text"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                City
              </label>
              <select className="p-3 border border-gray-300 rounded bg-gray-50">
                <option value="">Input text</option>
                <option value="kuala_lumpur">Kuala Lumpur</option>
                <option value="penang">Penang</option>
                <option value="johor_bahru">Johor Bahru</option>
              </select>
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                State
              </label>
              <select className="p-3 border border-gray-300 rounded bg-gray-50">
                <option value="">Input text</option>
                <option value="selangor">Selangor</option>
                <option value="pahang">Pahang</option>
                <option value="perak">Perak</option>
              </select>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* Occupation */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Pekerjaan
              </label>
              <input
                type="text"
                placeholder="Input text"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>

            {/* Salary */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-600 mb-2 text-sm uppercase">
                Gaji (RM)
              </label>
              <input
                type="number"
                placeholder="Input Number"
                className="p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mb-6 space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 accent-purple-700"
              />
              <span className="text-gray-800 text-sm">
                I hereby confirm that the information provided is true
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 accent-purple-700"
              />
              <span className="text-gray-800 text-sm">
                I accept all the terms and conditions
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-900 text-white px-8 py-3 rounded shadow text-lg transition"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
