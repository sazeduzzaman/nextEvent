"use client";
import React, { useRef } from "react";
import PrintButton from "./PrintButton";
import Invoice from "./Invoice";
import { Booking as ApiBooking } from "@/hooks/useTickets"; // your API type

interface PurchasedActionInvoiceProps {
  booking: ApiBooking; // full booking object
}

const PurchasedActionInvoice: React.FC<PurchasedActionInvoiceProps> = ({
  booking,
}) => {
  const invoicePrintRef = useRef<HTMLDivElement>(null);

  console.log(booking, "booking invoice");

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
        {/* <Invoice booking={booking} /> */}
        <Invoice booking={booking}/>
      </div>

      {/* Action buttons */}
      <PrintButton printRef={invoicePrintRef} ticketId={booking.id} />
    </div>
  );
};

export default PurchasedActionInvoice;
