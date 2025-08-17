"use client";
import React, { useRef } from "react";
import PrintButton from "./PrintButton";
import Invoice from "./Invoice";
import { Booking as ApiBooking } from "@/hooks/useTickets";

interface PurchasedActionInvoiceProps {
  booking: ApiBooking;
}

const PurchasedActionInvoice: React.FC<PurchasedActionInvoiceProps> = ({
  booking,
}) => {
  const invoicePrintRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-2">
      {/* Hidden invoice content for printing */}
      <div
        ref={invoicePrintRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "100%",
        }}
      >
        <Invoice booking={booking} />
      </div>

      {/* Print button */}
      <PrintButton printRef={invoicePrintRef} ticketId={booking.id} />
    </div>
  );
};

export default PurchasedActionInvoice;
