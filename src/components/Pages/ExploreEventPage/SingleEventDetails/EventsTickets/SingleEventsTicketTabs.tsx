"use client";
import React, { useState, useEffect } from "react";
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
  setActiveTab: (id: number) => void;
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

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-8 flex flex-wrap gap-2">
        {ticketCategories.map(({ id, name }) => (
          <button
            key={id}
            className={`tab px-4 py-1 rounded-lg font-semibold ${
              activeTab === id
                ? "bg-yellow-400 text-black shadow-lg"
                : "text-white hover:text-yellow-400 hover:bg-neutral-800"
            }`}
            onClick={() => setActiveTab(id)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Seats */}
      <div className="grid gap-5">
        {ticketCategories
          .filter((c) => c.id === activeTab)
          .map((category) => {
            const seats = category.seats;
            const selectedSeats = selectedTickets[category.id] || [];
            const rows = Array.from(new Set(seats.map((s) => s.row)));

            return (
              <div key={category.id}>
                <p className="text-white font-bold text-2xl">{category.name}</p>
                <p className="text-yellow-400">${category.price} per ticket</p>

                {/* Row Selector */}
                <div className="flex flex-wrap gap-3 my-4">
                  {rows.map((row) => {
                    const rowSeats = seats.filter((s) => s.row === row);
                    const availableSeats = rowSeats.filter(
                      (s) => s.status === "active"
                    ).length;
                    return (
                      <button
                        key={row}
                        className={`px-3 py-2 rounded-lg font-semibold text-white ${
                          selectedRow === row
                            ? "bg-neutral-600 text-black border border-yellow-400"
                            : "bg-neutral-800 hover:bg-yellow-400 hover:text-black"
                        }`}
                        onClick={() =>
                          setSelectedRow(row === selectedRow ? null : row)
                        }
                      >
                        Row {row} ({availableSeats} available)
                      </button>
                    );
                  })}
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-5 gap-4">
                  {seats
                    .filter((s) => (selectedRow ? s.row === selectedRow : true))
                    .map((seat) => {
                      const isSelected = selectedSeats.some(
                        (s) => s.id === seat.id
                      );
                      const isReserved = seat.status !== "active";

                      return (
                        <label
                          key={seat.id}
                          className="cursor-pointer select-none flex flex-col items-center"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={isReserved}
                            onChange={() => handleSeatToggle(category.id, seat)}
                            className="hidden"
                          />
                          <div
                            className={`w-20 h-20 flex items-center justify-center rounded-md border-2 transition-all duration-300 ${
                              isReserved
                                ? "bg-gray-500 border-gray-400 cursor-not-allowed"
                                : isSelected
                                ? "bg-yellow-400 border-yellow-500 shadow-lg"
                                : "bg-neutral-700 border-gray-600 hover:bg-yellow-400 hover:border-yellow-500"
                            }`}
                          >
                            {seat.code}
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
