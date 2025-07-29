"use client";

import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import React, { useState } from "react";

const EventSidebar = () => {
  const [filters, setFilters] = useState<{
    city: string;
    eventTypes: string[];
    date: string;
    price: number;
  }>({
    city: "",
    eventTypes: [],
    date: "",
    price: 50,
  });

  const handleCheckboxChange = (type: string) => {
    setFilters((prev) => {
      const types = prev.eventTypes.includes(type)
        ? prev.eventTypes.filter((t) => t !== type)
        : [...prev.eventTypes, type];
      return { ...prev, eventTypes: types };
    });
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      eventTypes: [],
      date: "",
      price: 50,
    });
  };

  const eventTypes = ["Music", "Art", "Tech", "Workshop", "Food"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 site-txt">Filter Events</h2>
      <div className="w-full p-6 border border-yellow-400 rounded-xl shadow-md space-y-6 text-sm">
        {/* Search City */}
        <div>
          <label className="block mb-1 font-medium text-white text-lg">
            Search City
          </label>
          <input
            type="text"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            placeholder="Enter city"
            className="w-full px-3 py-2 border border-yellow-400 rounded-md text-gray-400 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Event Types */}
        <div>
          <label className="block mb-2 font-medium text-white text-lg">
            Event Type
          </label>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.eventTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-white">{type}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Date Picker */}
        <div>
          <label className="block mb-1 font-medium text-white text-lg">
            Event Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="w-full px-3 py-2 border border-yellow-400 rounded-md text-gray-400 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        {/* Price Range */}
        <div>
          <label className="block mb-1 font-medium text-white text-lg">
            Price Range:{" "}
            <span className="font-semibold site-txt">${filters.price}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: parseInt(e.target.value) })
            }
            className="w-full text-white"
          />
        </div>
        {/* Clear Button */}
        <div className="pt-4">
          <button className="btn h-10 bg-yellow-400 hover:bg-black border-0 text-white w-full rounded-3xl">
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;
