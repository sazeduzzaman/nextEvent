"use client";
import React from "react";
import { Seat } from "@/lib/api/AllEvents/AllEventsDataType";

interface TicketCategory {
  id: number;
  name: string;
  price: number;
  seats: Seat[];
}

interface Props {
  ticketCategories: TicketCategory[];
  activeTab: number;
  setActiveTab: (id: number) => void; // For switching categories
  selectedTickets: Record<number, Seat[]>;
  handleSeatToggle: (categoryId: number, seat: Seat) => void;
}

const SingleEventsTicketTabs: React.FC<Props> = ({
  ticketCategories,
  activeTab,
  setActiveTab,
  selectedTickets,
  handleSeatToggle,
}) => {
  const category = ticketCategories.find((c) => c.id === activeTab);
  if (!category) return null;

  // Group seats by row
  const groupedSeats = category.seats.reduce<Record<string, Seat[]>>(
    (acc, seat) => {
      (acc[seat.row] = acc[seat.row] || []).push(seat);
      return acc;
    },
    {}
  );

  const rows = Object.keys(groupedSeats);

  return (
    <div>
      <p className="mb-5 text-3xl font-bold text-white">Select Ticket</p>

      {/* Category Tabs */}
      <div className="mb-5 flex gap-4 flex-wrap">
        {ticketCategories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded-2xl font-bold transition-colors duration-300 ${
              activeTab === cat.id
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-black"
            }`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Active Category Info */}
      <p className="text-white font-bold text-2xl">{category.name}</p>
      <p className="text-yellow-400 mb-4">
        ${category.price} Per Ticket (
        <small className="text-white">{category.seats.length} Total</small>)
      </p>

      {/* Seat Selection Grid */}
      <div className="grid grid-cols-2 gap-4">
        {rows.map((row) => {
          const rowSeats = groupedSeats[row];
          const selectedSeats = selectedTickets[category.id] || [];

          return (
            <div key={row} className="site-second-bg p-4 rounded-3xl">
              <span className="text-yellow-400 font-bold mb-2 block">
                <span className="text-white">Row</span>{" "}
                <span className="text-yellow-400 text-4xl">{row}</span>{" "}
                <span className="text-white"> & Seats is</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats.some(
                    (s) => s.id === seat.id
                  );
                  const isReserved = seat.status !== "active";

                  return (
                    <label
                      key={seat.id}
                      className="relative cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isReserved}
                        onChange={() => handleSeatToggle(category.id, seat)}
                        className="hidden"
                      />

                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                          isReserved
                            ? "bg-gray-700 border-gray-600 cursor-not-allowed opacity-50"
                            : isSelected
                            ? "bg-yellow-400 border-yellow-500 shadow-2xl scale-110 z-10"
                            : "bg-neutral-800 border-gray-600 hover:bg-yellow-400 hover:border-yellow-500"
                        }`}
                      >
                        <span className="text-sm md:text-base text-white font-semibold">
                          {seat.code.split("-").pop()}
                        </span>

                        {isReserved && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleEventsTicketTabs;
