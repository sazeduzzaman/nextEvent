"use client";
import React, { useRef } from "react";
import PrintButton from "./PrintButton";
import Invoice from "./Invoice";
import { Booking as ApiBooking } from "@/hooks/useTickets"; // your API type

// types.ts
export interface Seat {
  name: string;
  code: string;
  price: string; // string from API
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Event {
  id: number;
  name: string;
  start_date: string;
  start_time: string;
  venue: string;
  end_date?: string;
  end_time?: string;
}

export interface Booking {
  id: number;
  booking_id: string;
  invoice_number: string;
  event_seats: string; // JSON string
  event_datetime: string;
  status: string;
  total_amount: string;
  payment_status: string;
  payment_type: string;
  card_type: string;
  purchase_date: string;
  billing_name: string;
  billing_email: string;
  billing_address: string;
  paid_at: string;
  ticket_url: string;
  payment_transaction_id: string;
  seats: Seat[];
  user: User;
  event: Event;
}
interface PurchasedActionInvoiceProps {
  booking: Booking;
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
        <Invoice booking={booking} />
      </div>

      {/* Action buttons */}
      <PrintButton printRef={invoicePrintRef} ticketId={booking.id} />
    </div>
  );
};

export default PurchasedActionInvoice;
