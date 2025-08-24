"use client";
import React, { useState } from "react";
import SingleEventsTicketTabs from "./SingleEventsTicketTabs";
import SingleEventsOrderSummary from "./SingleEventsOrderSummary";
import { Event, Seat } from "@/lib/api/AllEvents/AllEventsDataType";

type TicketCategory = {
  id: number;
  name: string;
  price: number;
  seats: Seat[];
};

type Props = {
  ticketCategories: TicketCategory[];
  selectedTickets: Record<number, Seat[]>;
  handleSeatToggle: (categoryId: number, seat: Seat) => void;
  totalTickets: number;
  totalPrice: number;
  eventData: Event;
  proceedToPurchase: () => void;
};

const TicketsCategory: React.FC<Props> = ({
  ticketCategories,
  selectedTickets,
  handleSeatToggle,
  totalTickets,
  totalPrice,
  proceedToPurchase,
  eventData,
}) => {
  const [activeTab, setActiveTab] = useState(ticketCategories[0]?.id || 0);

  return (
    <div className="container mx-auto p-6 text-white rounded-lg shadow-lg mt-10">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-9">
          <SingleEventsTicketTabs
            ticketCategories={ticketCategories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedTickets={selectedTickets}
            handleSeatToggle={handleSeatToggle}
          />
        </div>
        <div className="col-span-3">
          <SingleEventsOrderSummary
            ticketCategories={ticketCategories}
            selectedTickets={selectedTickets}
            totalTickets={totalTickets}
            totalPrice={totalPrice}
            eventData={eventData}
            proceedToPurchase={proceedToPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketsCategory;
