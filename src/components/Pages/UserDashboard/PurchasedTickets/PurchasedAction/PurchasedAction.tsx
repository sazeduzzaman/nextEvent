"use client";
import React, { useRef } from "react";
import { BiExpandAlt } from "react-icons/bi";
import PrintButton from "./PrintButton";
import Ticket from "./Ticket";
import InvoiceButton from "./InvoiceButton";
import Invoice from "./Invoice";

interface PurchasedActionProps {
  ticket: {
    id: number;
    date: string;
    seat: string;
    price: number;
    row: string;
    purchaseDate: string;
    expireDate: string;
    status: "Active" | "Expired" | "Cancelled";
  };
}

const PurchasedAction: React.FC<PurchasedActionProps> = ({ ticket }) => {
  const ticketPrintRef = useRef<HTMLDivElement>(null);
  const invoicePrintRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-2">
      {/* Hidden ticket content for printing */}
      <div ref={ticketPrintRef}>
        <Ticket ticket={ticket} />
      </div>
      {/* Hidden invoice content for printing */}
      <div ref={invoicePrintRef}>
        <Invoice ticket={ticket} />
      </div>

      {/* Action buttons */}
      <PrintButton printRef={ticketPrintRef} ticketId={ticket.id} />
      <InvoiceButton printRef={invoicePrintRef} ticketId={ticket.id} />
    </div>
  );
};

export default PurchasedAction;
