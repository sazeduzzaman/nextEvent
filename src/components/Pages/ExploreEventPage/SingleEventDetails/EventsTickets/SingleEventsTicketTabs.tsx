"use client";

import React, { useState, useEffect } from "react";

interface Seat {
  id: number;
  name: string;
  row: string;
  column: string;
  status: string; // "active" or "booked"
  price: string;
  code: string;
}

interface TicketCategory {
  id: number;
  name: string;
  price: number;
  seats: Seat[];
}

interface TicketTabsProps {
  ticketCategories: TicketCategory[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  selectedTickets: Record<number, string[]>; // seat ids as strings
  handleSeatToggle: (categoryId: number, seatId: string) => void;
}

const SingleEventsTicketTabs: React.FC<TicketTabsProps> = ({
  ticketCategories,
  activeTab,
  setActiveTab,
  selectedTickets,
  handleSeatToggle,
}) => {
  // Find the first row of the active category
  const firstCategory = ticketCategories.find((c) => c.id === activeTab);
  const firstRow = firstCategory
    ? Array.from(new Set(firstCategory.seats.map((s) => s.row)))[0] || null
    : null;

  const [selectedRow, setSelectedRow] = useState<string | null>(firstRow);

  useEffect(() => {
    setSelectedRow(firstRow);
  }, [firstRow]);

  return (
    <div>
      <p className="mb-5 text-3xl font-bold">Select Ticket</p>

      {/* Ticket Tabs */}
      <div className="tabs tabs-boxed mb-8 site-second-bg rounded-lg shadow-inner flex flex-wrap gap-2">
        {ticketCategories.map(({ id, name }) => (
          <button
            key={id}
            role="tab"
            className={`tab inline-flex text-lg font-semibold transition-all duration-300 ticket-tabs px-4 py-1 rounded-lg
        ${
          activeTab === id
            ? "bg-yellow-400 text-black shadow-lg"
            : "text-white hover:text-yellow-400 hover:bg-neutral-800"
        }`}
            onClick={() => setActiveTab(id)}
            aria-selected={activeTab === id}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Ticket Content */}
      <div className="site-second-bg p-8 rounded-lg shadow-lg space-y-6">
        {ticketCategories
          .filter((category) => category.id === activeTab)
          .map(({ id, name, price, seats }) => {
            const selectedSeats = selectedTickets[id] || [];
            const rows = Array.from(new Set(seats.map((s) => s.row)));

            const totalAvailableSeats = seats.filter(
              (s) => s.status === "active"
            ).length;

            return (
              <div key={id}>
                {/* Category Info */}
                <div className="mb-6">
                  <p className="font-bold text-2xl text-white tracking-wide">
                    {name}
                  </p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    ${price} per ticket
                  </p>
                  <p className="text-gray-400 italic">
                    Available Seats: {totalAvailableSeats}
                  </p>
                  {name === "No Seat" && (
                    <p className="text-red-500">
                      No seat is included. You'll only get a ticket for entry.
                    </p>
                  )}
                </div>

                {/* Row Buttons */}
                {name !== "No Seat" && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {rows.map((row) => {
                      const rowSeats = seats.filter((s) => s.row === row);
                      const bookedCount = rowSeats.filter(
                        (s) => s.status !== "active"
                      ).length;
                      const selectedCount = rowSeats.filter((s) =>
                        selectedSeats.includes(String(s.id))
                      ).length;
                      const availableSeats = rowSeats.filter(
                        (s) => s.status === "active"
                      ).length;

                      return (
                        <button
                          key={row}
                          onClick={() =>
                            setSelectedRow(row === selectedRow ? null : row)
                          }
                          className={`px-3 py-2 rounded-lg font-semibold text-white transition ${
                            selectedRow === row
                              ? "bg-neutral-600 text-black border border-yellow-400"
                              : "bg-neutral-800 hover:bg-yellow-400 hover:text-black"
                          }`}
                        >
                          Row {row} ({bookedCount + selectedCount}/
                          {rowSeats.length}) <span className="text-gray-400 text-sm">({availableSeats} available)</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Seat Grid */}
                {name !== "No Seat" && (
                  <div className="grid grid-cols-2 sm:grid-cols-11 gap-5 justify-items-center">
                    {seats
                      .filter((seat) =>
                        selectedRow ? seat.row === selectedRow : true
                      )
                      .map((seat) => {
                        const seatId = seat.id;
                        const isSelected = selectedSeats.includes(
                          String(seatId)
                        );
                        const isReserved = seat.status !== "active";

                        return (
                          <label
                            key={seatId}
                            htmlFor={`${id}-${seatId}`}
                            className="cursor-pointer select-none flex flex-col items-center relative"
                          >
                            <input
                              type="checkbox"
                              id={`${id}-${seatId}`}
                              checked={isSelected}
                              disabled={isReserved}
                              onChange={() =>
                                handleSeatToggle(id, String(seatId))
                              }
                              className="peer hidden"
                            />

                            {/* Chair */}
                            <div
                              className={`w-20 h-20 relative flex items-center justify-center transition-all duration-300
                                rounded-md border-2
                                ${
                                  isReserved
                                    ? "bg-gray-500 border-gray-400 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-yellow-400 border-yellow-500 shadow-lg"
                                    : "bg-neutral-700 border-gray-600 hover:bg-yellow-400 hover:border-yellow-500"
                                }`}
                            >
                              {/* Backrest */}
                              <div className="absolute top-0 w-10 h-2 bg-gray-500 rounded-t-sm"></div>

                              {/* Seat code */}
                              {!isReserved && (
                                <span className="relative z-10 text-sm text-white font-bold">
                                  {seat.code.split("-").pop()} <br />
                                  <span className="text-sm">{seat.code}</span>
                                </span>
                              )}

                              {/* Reserved Icon + Text */}
                              {isReserved && (
                                <div className="absolute flex flex-col items-center">
                                  <svg
                                    className="w-4 h-4 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                                  </svg>
                                  <span className="text-xs text-red-500 font-bold mt-0.5">
                                    Booked
                                  </span>
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })}
                  </div>
                )}

                {/* No Seat */}
                {name === "No Seat" && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center">
                    {seats.map((seat) => {
                      const seatId = seat.id;
                      const isSelected = selectedSeats.includes(String(seatId));
                      const isReserved = seat.status !== "active";

                      return (
                        <label
                          key={seatId}
                          htmlFor={`${id}-${seatId}`}
                          className="cursor-pointer select-none flex flex-col items-center relative"
                        >
                          <input
                            type="checkbox"
                            id={`${id}-${seatId}`}
                            checked={isSelected}
                            disabled={isReserved}
                            onChange={() =>
                              handleSeatToggle(id, String(seatId))
                            }
                            className="peer hidden"
                          />

                          {/* Chair */}
                          <div
                            className={`w-12 h-12 relative flex items-center justify-center transition-all duration-300
                              rounded-md border-2
                              ${
                                isReserved
                                  ? "bg-gray-500 border-gray-400 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-yellow-400 border-yellow-500 shadow-lg"
                                  : "bg-neutral-700 border-gray-600 hover:bg-yellow-400 hover:border-yellow-500"
                              }`}
                          >
                            {/* Backrest */}
                            <div className="absolute top-0 w-10 h-2 bg-gray-500 rounded-t-sm"></div>

                            {/* Seat number */}
                            {!isReserved && (
                              <span className="relative z-10 text-sm text-white font-bold">
                                {seat.id}
                              </span>
                            )}

                            {/* Reserved Icon */}
                            {isReserved && (
                              <div className="absolute flex flex-col items-center">
                                <svg
                                  className="w-4 h-4 text-red-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                                </svg>
                                <span className="text-xs text-red-500 font-bold mt-0.5">
                                  Booked
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Seat Info */}
                          <div className="text-xs text-gray-300 mt-1 text-center">
                            ID: {seat.id} <br />
                            Row: {seat.row} Col: {seat.column} <br />
                            Code: {seat.code}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SingleEventsTicketTabs;
