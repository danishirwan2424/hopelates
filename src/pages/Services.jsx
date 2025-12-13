import React from "react";

function Services() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          We provide a range of services to support individuals and families in need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Food Aid</h3>
            <p className="text-gray-600">
              Providing nutritious meals and food assistance to those in need.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
            <p className="text-gray-600">
              Building stronger communities through collaboration and care.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
            <p className="text-gray-600">
              Empowering individuals through knowledge and resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
