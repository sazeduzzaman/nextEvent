"use client";

import React, { useState } from "react";
import { FiSearch, FiCalendar, FiDollarSign } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventSidebar = () => {
  const [filters, setFilters] = useState<{
    city: string;
    eventTypes: string[];
    date: Date | null;
    price: number;
  }>({
    city: "",
    eventTypes: [],
    date: null,
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
      date: null,
      price: 50,
    });
  };

  const eventTypes = ["Music", "Art", "Tech", "Workshop", "Food"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Filter Events</h2>
      <div className="w-full p-6 border border-yellow-400 rounded-2xl shadow-lg space-y-6 site-second-bg">
        {/* Search City */}
        <div>
          <label className="block mb-2 font-semibold text-white text-base">
            Search City
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <input
              type="text"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              placeholder="Enter city"
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>

        {/* Event Types */}
        <div>
          <label className="block mb-2 font-semibold text-white text-base">
            Event Type
          </label>
          <div className="flex flex-wrap gap-3">
            {eventTypes.map((type) => {
              const isChecked = filters.eventTypes.includes(type);
              return (
                <label
                  key={type}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border transition
            ${
              isChecked
                ? "bg-yellow-400 text-black border-yellow-400"
                : "site-second-bg text-white border-gray-700 hover:bg-gray-700"
            }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(type)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 inline-block rounded-full border-2 flex-shrink-0 transition
              ${isChecked ? "border-black bg-black" : "border-white"}`}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block mb-2 font-semibold text-white text-base">
            Event Date
          </label>
          <div className="relative w-full">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 text-lg pointer-events-none z-10" />
            <DatePicker
              selected={filters.date}
              onChange={(date) => setFilters({ ...filters, date })}
              placeholderText="Pick a date"
              wrapperClassName="w-full" // <-- make wrapper full width
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block mb-2 font-semibold text-white text-base">
            Price Range
            <span className="ml-2 inline-flex items-center gap-1 text-yellow-300">
              <FiDollarSign />${filters.price}
            </span>
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
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Clear Button */}
        <div>
          <button
            onClick={clearFilters}
            className="w-full py-2 rounded-full font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;
