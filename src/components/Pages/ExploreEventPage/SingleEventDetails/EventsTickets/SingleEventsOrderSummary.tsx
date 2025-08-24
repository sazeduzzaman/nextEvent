"use client";
import React from "react";
import { Event, Seat } from "@/lib/api/AllEvents/AllEventsDataType";

interface Props {
  selectedTickets: Record<number, Seat[]>;
  ticketCategories: any[];
  totalTickets: number;
  totalPrice: number;
  eventData: Event;
  proceedToPurchase: () => void;
}

const SingleEventsOrderSummary: React.FC<Props> = ({
  selectedTickets,
  ticketCategories,
  totalTickets,
  totalPrice,
  eventData,
  proceedToPurchase,
}) => {
  return (
    <div className="bg-neutral-900 border border-yellow-500 rounded-lg shadow-xl p-8">
      <h3 className="text-3xl font-extrabold mb-6 text-white">Order Summary</h3>
      <p className="text-yellow-400 font-semibold">{eventData.name}</p>

      {ticketCategories.map(({ id, name }) => {
        const seats: Seat[] = selectedTickets[id] || [];
        if (!seats.length) return null;
        return (
          <div key={id} className="mt-4">
            <p className="text-yellow-300 font-semibold">{name} Seats:</p>
            <ul className="list-disc list-inside text-gray-300 ml-3">
              {seats.map((seat) => (
                <li key={seat.id}>
                  {seat.name} - {seat.code} - ${seat.price} - Row: {seat.row} -
                  Column: {seat.column}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <p className="mt-4 text-gray-300 font-medium">
        Total Tickets: {totalTickets}
      </p>
      <p className="text-gray-300 font-medium mb-6">
        Total Price: ${totalPrice.toFixed(2)}
      </p>

      <button
        onClick={proceedToPurchase}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-bold"
      >
        🚀 Proceed to Purchase
      </button>
    </div>
  );
};

export default SingleEventsOrderSummary;
