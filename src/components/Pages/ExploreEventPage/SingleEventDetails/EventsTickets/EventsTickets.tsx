"use client";

import React, { useState } from "react";
import TicketsCategory from "./TicketsCategory";
import EventHeader from "../EventDetailsInformation/EventHeader";

const ticketCategories = [
  { id: "vip", name: "VIP", price: 100, available: 18 },
  { id: "regular", name: "Regular", price: 50, available: 28 },
  { id: "economy", name: "Economy", price: 25, available: 5 },
];

type TicketSelectionProps = {
  slug: string;
};

const ParentComponent = ({ slug }: TicketSelectionProps) => {
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
    if (totalTickets === 0) {
      alert("Please select at least one ticket");
      return;
    }

    alert("Proceeding to purchase...");
    // TODO: Implement navigation or payment logic
  };

  return (
    <>
      <EventHeader slug={slug} />
      <TicketsCategory
        slug={slug}
        ticketCategories={ticketCategories}
        selectedTickets={selectedTickets}
        handleSeatToggle={handleSeatToggle}
        totalTickets={totalTickets}
        totalPrice={totalPrice}
        proceedToPurchase={proceedToPurchase}
      />
    </>
  );
};

export default ParentComponent;
