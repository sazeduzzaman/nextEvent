"use client";

import React from "react";

interface Seat {
  id: number;
  name: string;
  row: string;
  column: string;
  status: string;
  price: string;
  code: string;
}

interface TicketCategory {
  id: number;
  name: string;
  price: number;
  available: number;
  seats: Seat[];
}

interface TicketTabsProps {
  ticketCategories: TicketCategory[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  selectedTickets: Record<number, string[]>; // Stores seat IDs as strings
  handleSeatToggle: (categoryId: number, seatId: string) => void;
}

const SingleEventsTicketTabs: React.FC<TicketTabsProps> = ({
  ticketCategories,
  activeTab,
  setActiveTab,
  selectedTickets,
  handleSeatToggle,
}) => {
  return (
    <div>
      <p className="mb-5 text-3xl">Select Ticket</p>

      {/* Ticket Tabs */}
      <div
        role="tablist"
        className="tabs tabs-boxed mb-8 site-second-bg rounded-lg shadow-inner w-3xl"
      >
        {ticketCategories.map(({ id, name }) => (
          <button
            key={id}
            role="tab"
            className={`tab flex-1 text-lg font-semibold transition-all duration-300 ticket-tabs
              ${
                activeTab === id
                  ? "tab-active bg-yellow-400 text-white shadow-lg"
                  : "!text-white hover:!text-yellow-400 hover:bg-neutral-800"
              }
              py-1 rounded-lg`}
            onClick={() => setActiveTab(id)}
            aria-selected={activeTab === id}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Ticket Content */}
      <div
        role="tabpanel"
        className="site-second-bg p-8 rounded-lg shadow-lg space-y-6"
      >
        {ticketCategories
          .filter((category) => category.id === activeTab)
          .map(({ id, name, price, available, seats }) => {
            const selectedSeats = selectedTickets[id] || [];

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
                    Available Seats: {available}
                  </p>
                  {name === "No Seat" && (
                    <p className="text-red-500">
                      No seat is included. You'll only get a ticket for entry.
                    </p>
                  )}
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-5 gap-4">
                  {seats.map((seat) => {
                    const seatId = seat.id; // real backend ID
                    const seatLabel =
                      name === "No Seat"
                        ? `${seat.id}`
                        : seat.code || `${seat.row}${seat.column}`;
                    const isSelected = selectedSeats.includes(String(seatId));

                    return (
                      <label
                        key={seatId}
                        htmlFor={`${id}-${seatId}`}
                        className="cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          id={`${id}-${seatId}`}
                          checked={isSelected}
                          onChange={() => handleSeatToggle(id, String(seatId))}
                          className="peer hidden"
                        />
                        <div
                          className={`w-full py-3 rounded-lg border-2 text-center font-semibold transition duration-300 cursor-pointer
                            ${
                              isSelected
                                ? "bg-yellow-400 border-yellow-500 text-black shadow-md"
                                : "bg-neutral-800 border-neutral-800 text-gray-300 hover:bg-yellow-400 hover:text-black hover:border-yellow-500"
                            }`}
                        >
                          {seatLabel}{" "}
                          <span className="text-xs text-gray-400">
                            ({seatId})
                          </span>
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
