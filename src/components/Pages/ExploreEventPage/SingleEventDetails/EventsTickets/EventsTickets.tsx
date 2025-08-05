"use client";

import React, { useState } from "react";
import TicketsCategory from "./TicketsCategory";
import EventHeader from "../EventDetailsInformation/EventHeader";
import toast from "react-hot-toast";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

const ticketCategories = [
  { id: "vip", name: "VIP", price: 100, available: 18 },
  { id: "regular", name: "Regular", price: 50, available: 28 },
  { id: "economy", name: "Economy", price: 25, available: 5 },
  { id: "noseat", name: "No Seat", price: 10, available: 10 },
];

type TicketSelectionProps = {
  eventData: Event;
};

const ParentComponent = ({ eventData }: TicketSelectionProps) => {
  // 👇 Store selected seat IDs per category
  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, string[]>
  >(() =>
    ticketCategories.reduce((acc, cat) => {
      acc[cat.id] = [];
      return acc;
    }, {} as Record<string, string[]>)
  );

  const handleSeatToggle = (categoryId: string, seatId: string) => {
    setSelectedTickets((prev) => {
      const currentSeats = prev[categoryId] || [];
      const updatedSeats = currentSeats.includes(seatId)
        ? currentSeats.filter((s) => s !== seatId)
        : [...currentSeats, seatId];

      return { ...prev, [categoryId]: updatedSeats };
    });
  };

  const totalTickets = Object.values(selectedTickets).reduce(
    (sum, seats) => sum + seats.length,
    0
  );

  const totalPrice = Object.entries(selectedTickets).reduce(
    (total, [id, seats]) => {
      const cat = ticketCategories.find((c) => c.id === id);
      return total + (cat?.price || 0) * seats.length;
    },
    0
  );

  const proceedToPurchase = () => {
    if (Number(totalTickets) === 0) {
      toast.error("Please select at least one ticket");
      return;
    }
    toast.success("Proceeding to purchase...");
    // all extra logic
  };

  return (
    <div>
      <EventHeader eventData={eventData} />
      <div className="pb-20 pt-10">
        <TicketsCategory
          slug={eventData.slug}
          ticketCategories={ticketCategories}
          selectedTickets={selectedTickets}
          handleSeatToggle={handleSeatToggle}
          totalTickets={totalTickets}
          totalPrice={totalPrice}
          proceedToPurchase={proceedToPurchase}
        />
      </div>
    </div>
  );
};

export default ParentComponent;
