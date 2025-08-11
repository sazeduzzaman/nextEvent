"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { FiSearch, FiCalendar } from "react-icons/fi";
import AllEvents from "./AllEvents";
import useEventFilters from "@/utils/useEventFilters";

const EventsWithSidebar = () => {
  const {
    filters,
    setFilters,
    eventTypes,
    handleCheckboxChange,
    clearFilters,
  } = useEventFilters();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {/* Sidebar */}
        <aside
          className="
            col-span-12 md:col-span-3
            md:sticky md:top-20 md:h-[calc(100vh-80px)] md:overflow-auto
            bg-neutral-900 rounded-lg p-6 shadow-lg
          "
        >
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            Filter Events
          </h2>
          <div className="space-y-6">
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
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                  placeholder="Enter city"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-neutral-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>
            </div>

            {/* Event Types */}
            <div>
              <label className="block mb-2 font-semibold text-white text-base">
                Event Type
              </label>
              <div className="flex flex-wrap gap-3">
                {eventTypes.length === 0 ? (
                  <p className="text-white">Loading event types...</p>
                ) : (
                  eventTypes.map(({ id, name }) => {
                    const isChecked = filters.eventTypes.includes(name);
                    return (
                      <label
                        key={id}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border transition
                        ${
                          isChecked
                            ? "bg-yellow-400 text-black border-yellow-400"
                            : "bg-neutral-800 text-white border-gray-700 hover:bg-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(name)}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 inline-block rounded-full border-2 flex-shrink-0 transition
                          ${
                            isChecked ? "border-black bg-black" : "border-white"
                          }`}
                        />
                        <span className="text-sm">{name}</span>
                      </label>
                    );
                  })
                )}
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
                  wrapperClassName="w-full"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-neutral-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>
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
        </aside>

        {/* Events List */}
        <main className="col-span-12 md:col-span-9">
          <AllEvents filters={filters} />
        </main>
      </div>
    </div>
  );
};

export default EventsWithSidebar;
