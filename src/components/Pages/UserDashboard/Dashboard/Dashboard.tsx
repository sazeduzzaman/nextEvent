"use client";

import React from "react";
import {
  FaTicketAlt,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaCheckCircle,
  FaRegCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Tickets Purchased",
      value: 12,
      icon: <FaTicketAlt className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Last Purchase",
      value: "2025-07-28",
      icon: <FaCalendarCheck className="text-green-500 text-3xl" />,
    },
    {
      title: "Total Spent",
      value: "$520.00",
      icon: <FaMoneyBillWave className="text-blue-500 text-3xl" />,
    },
    {
      title: "Active Tickets",
      value: 5,
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
    },
    {
      title: "Events Attended",
      value: 8,
      icon: <FaRegCalendarAlt className="text-purple-500 text-3xl" />,
    },
    {
      title: "Cancelled Tickets",
      value: 2,
      icon: <FaTimesCircle className="text-red-500 text-3xl" />,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 site-txt">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="site-second-bg rounded-2xl shadow-lg p-10 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-3 bg-neutral-700 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-lg font-bold site-txt mb-5">{stat.title} </p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
