// TicketSelectionPage.tsx
"use client";

import React from "react";
import SingleEventsOrderSummary from "./SingleEventsOrderSummary";
import SingleEventsTicketTabs from "./SingleEventsTicketTabs";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import { useTicketSelection } from "@/utils/useTicketSelection";
import Image from "next/image";

interface TicketSelectionPageProps {
  eventData: Event;
}

const TicketSelectionPage = ({ eventData }: TicketSelectionPageProps) => {
  const {
    activeTab,
    setActiveTab,
    selectedTickets,
    handleSeatToggle,
    ticketCategories,
    totalTickets,
    totalPrice,
    proceedToPurchase,
    loading,
    error,
  } = useTicketSelection({ eventData });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/images/preloader.gif"
          alt="Loading..."
          width={100}
          height={100}
          priority
        />
      </div>
    );
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-6 py-10 px-4 md:px-12">
        <div className="col-span-12 md:col-span-9">
          <SingleEventsTicketTabs
            ticketCategories={ticketCategories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedTickets={selectedTickets}
            handleSeatToggle={handleSeatToggle}
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <SingleEventsOrderSummary
            selectedTickets={selectedTickets}
            ticketCategories={ticketCategories}
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

export default TicketSelectionPage;
