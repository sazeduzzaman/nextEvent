"use client";
import React, { useRef } from "react";
import { BiExpandAlt } from "react-icons/bi";
import PrintButton from "./PrintButton";
// import DownloadPDFButton from "./DownloadPDFButton";
import Ticket from "./Ticket";

interface PurchasedActionProps {
  ticket: {
    id: number;
    date: string;
    seat: string;
    price: number;
    purchaseDate: string;
    expireDate: string;
    status: "Active" | "Expired" | "Cancelled";
  };
}

const PurchasedAction: React.FC<PurchasedActionProps> = ({ ticket }) => {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-2">
      {/* Hidden ticket content for print/download */}
      <div
        ref={printRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "800px",
          backgroundColor: "#fff",
          padding: "20px",
          color: "#fff",
          zIndex: -1, // keep it hidden behind
        }}
      >
        <Ticket ticket={ticket} />
      </div>

      {/* Action buttons */}
      <PrintButton printRef={printRef} ticketId={ticket.id} />

      <button
        onClick={() => alert(`View ticket #${ticket.id}`)}
        className="bg-gray-200 hover:bg-gray-300 transition rounded px-4 py-1 font-semibold shadow-sm text-black"
      >
        <BiExpandAlt />
      </button>

      {/* <DownloadPDFButton ticketId={ticket} /> */}
    </div>
  );
};

export default PurchasedAction;
