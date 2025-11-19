import React from "react";
import Navigator from "../LandingPage_cmp/Navigator";
import Footer from "../LandingPage_cmp/Footer";
import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      title: "Food Distribution",
      desc: "We provide nutritious meals to underprivileged families and individuals in need, ensuring no one goes hungry.",
      icon: "🍱",
    },
    {
      title: "Community Kitchens",
      desc: "Our community kitchens serve fresh meals daily, offering a safe space for people to eat and connect.",
      icon: "🥣",
    },
    {
      title: "Food Donation Drives",
      desc: "We organize food collection campaigns with local partners and donors to stock up on essentials for the poor.",
      icon: "🛒",
    },
    {
      title: "Volunteer Programs",
      desc: "Join our volunteer network to help pack, deliver, and distribute meals to those who need them most.",
      icon: "🤝",
    },
    {
      title: "Sustainable Food Sourcing",
      desc: "We collaborate with local farmers and markets to reduce food waste and promote sustainable supply chains.",
      icon: "🌾",
    },
    {
      title: "Emergency Relief",
      desc: "During crises or disasters, we deliver immediate food aid and support to affected communities.",
      icon: "🚚",
    },
  ];

  return (
    <motion.div
          className="bg-[#EDEDED] min-h-screen min-w-screen font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
    <div className="bg-[#EDEDED] min-h-screen font-sans">
      <Navigator />

      {/* 🟢 Hero Section */}
      <section className="pt-[150px] text-center px-6">
        <p className="text-[#019461] font-semibold tracking-wide uppercase">
          Our Services
        </p>
        <h1 className="text-[48px] md:text-[54px] font-bold leading-tight text-gray-900 mt-2">
          Serving Communities With Compassion
        </h1>
        <p className="text-black/60 text-[16px] max-w-2xl mx-auto mt-4 leading-relaxed">
          Through our food charity programs, we aim to fight hunger, reduce food
          waste, and build a stronger, more caring community — one meal at a time.
        </p>
      </section>

      {/* 🟢 Services Grid */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300"
          >
            <div className="text-5xl mb-6">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              {service.title}
            </h3>
            <p className="text-black/60 text-[15px] leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
    </motion.div>
  );
}

export default Services;
