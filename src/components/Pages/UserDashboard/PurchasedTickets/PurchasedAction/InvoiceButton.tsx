"use client";
import React, { RefObject } from "react";
import { TbFileInvoice } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";

interface PrintInvoiceButtonProps {
  printRef: React.RefObject<HTMLElement | null>; // allow null
  ticketId: number | string;
}

const InvoiceButton: React.FC<PrintInvoiceButtonProps> = ({
  printRef,
  ticketId,
}) => {
  const handlePrint = useReactToPrint({
    contentRef: printRef, // must be RefObject<HTMLElement | null>
    documentTitle: `Ticket-${ticketId}`,
    onAfterPrint: () =>
      console.log(`Ticket #${ticketId} printed successfully.`),
  });

  return (
    <button
      onClick={handlePrint}
      title="Print Invoice"
      className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 transition rounded px-4 py-1 me-2 font-semibold shadow-sm text-black"
    >
      <TbFileInvoice size={25} />
    </button>
  );
};

export default InvoiceButton;
