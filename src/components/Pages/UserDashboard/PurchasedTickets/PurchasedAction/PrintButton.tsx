"use client";
import { PrinterIcon } from "lucide-react";
import React, { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

interface PrintButtonProps {
  printRef: React.RefObject<HTMLElement | null>; // allow null
  ticketId: number | string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ printRef, ticketId }) => {
  const handlePrint = useReactToPrint({
    contentRef: printRef, // must be RefObject<HTMLElement | null>
    documentTitle: `Ticket-${ticketId}`,
    onAfterPrint: () =>
      console.log(`Ticket #${ticketId} printed successfully.`),
  });

  return (
    <button
      onClick={handlePrint}
      title="Print Ticket"
      className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 transition rounded px-4 py-1 me-2 font-semibold shadow-sm text-black"
    >
      <PrinterIcon />
    </button>
  );
};

export default PrintButton;
