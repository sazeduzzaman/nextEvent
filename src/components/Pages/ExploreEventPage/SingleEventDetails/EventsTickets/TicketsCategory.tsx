"use client";

import React, { useState } from "react";
import TicketCategoryTab from "./TicketCategoryTab";
import OrderSummary from "./OrderSummary";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

type TicketCategory = {
  id: string;
  name: string;
  price: number;
  available: number;
};

type TicketsCategoryProps = {
  ticketCategories: TicketCategory[];
  selectedTickets: Record<string, string[]>;
  handleSeatToggle: (categoryId: string, seatId: string) => void;
  totalTickets: number;
  totalPrice: number;
  eventData: Event; // 👈 Correct type for eventData
  proceedToPurchase: () => void;
};

const TicketsCategory = ({
  ticketCategories,
  selectedTickets,
  handleSeatToggle,
  totalTickets,
  totalPrice,
  proceedToPurchase,
  eventData, // ✅ FIXED: no more slug here
}: TicketsCategoryProps) => {
  const [activeTab, setActiveTab] = useState(ticketCategories[0]?.id || "");

  console.log(eventData.slug, "eventData event_seats");

  return (
    <div className="container mx-auto p-6 text-white rounded-lg shadow-lg mt-10">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-9">
          <TicketCategoryTab
          eventData={eventData}
            ticketCategories={ticketCategories}
            selectedTickets={selectedTickets}
            handleSeatToggle={handleSeatToggle}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="col-span-3">
          <OrderSummary
            eventData={eventData} // 👈 Passing full event object
            ticketCategories={ticketCategories}
            selectedTickets={selectedTickets}
            totalTickets={totalTickets}
            totalPrice={totalPrice}
            proceedToPurchase={proceedToPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketsCategory;
