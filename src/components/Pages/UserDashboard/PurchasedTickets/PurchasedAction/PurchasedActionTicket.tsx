"use client";
import React, { useRef } from "react";
import PrintButton from "./PrintButton";
import Ticket from "./Ticket";

interface PurchasedActionProps {
  ticket: {
    id: number;
    seat: string;
    price: number;
    purchaseDate: string;
    start_date: string;
    status: "Active" | "Expired" | "Cancelled" | "Pending";
    eventName?: string;
    date?: string;
    row?: string;
    expireDate?: string;
  };
}

const PurchasedActionTicket: React.FC<PurchasedActionProps> = ({ ticket }) => {
  const ticketPrintRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-2">
      {/* Hidden ticket content for printing */}
      <div ref={ticketPrintRef}>
        <Ticket ticket={ticket} />
      </div>
      {/* Action buttons */}
      <PrintButton printRef={ticketPrintRef} ticketId={ticket.id} />
    </div>
  );
};

export default PurchasedActionTicket;
