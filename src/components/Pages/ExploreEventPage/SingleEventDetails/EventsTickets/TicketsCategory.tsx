import React, { useState } from "react";
import TicketCategoryTab from "./TicketCategoryTab";
import OrderSummary from "./OrderSummary";

type TicketCategory = {
  id: string;
  name: string;
  price: number;
  available: number;
};

type TicketsCategoryProps = {
  ticketCategories: TicketCategory[];
  selectedTickets: Record<string, string[]>; // selected seat IDs per category
  handleSeatToggle: (categoryId: string, seatId: string) => void;
  totalTickets: number;
  totalPrice: number;
  slug: string;
  proceedToPurchase: () => void;
};

const TicketsCategory = ({
  ticketCategories,
  selectedTickets,
  handleSeatToggle,
  totalTickets,
  totalPrice,
  proceedToPurchase,
  slug,
}: TicketsCategoryProps) => {
  const [activeTab, setActiveTab] = useState(ticketCategories[0]?.id || "");

  return (
    <div className="container mx-auto p-6 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6">Select Your Tickets</h2>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-9">
          <TicketCategoryTab
            ticketCategories={ticketCategories}
            selectedTickets={selectedTickets}
            handleSeatToggle={handleSeatToggle}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="col-span-3">
          <OrderSummary
            slug={slug}
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
