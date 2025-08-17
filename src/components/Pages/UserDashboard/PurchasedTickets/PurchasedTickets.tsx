"use client";

import React, { useMemo, useState } from "react";
import PurchasedAction from "./PurchasedAction/PurchasedAction";
import { useBookings } from "@/hooks/useTickets";

interface Seat {
  name: string;
  code: string;
  price: string;
}

interface EventInfo {
  id: number;
  name: string;
  venue?: string;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
}

interface FlatTicket {
  id: number;
  seat: string;
  ticketId: string;
  price: number;
  purchaseDate: string; // Must be string, not null
  status: "Active" | "Cancelled";
  ticket_url?: string;
  row?: string;
  event: EventInfo;
}

const PurchasedTickets: React.FC = () => {
  const { bookings, loading } = useBookings();
  const [search, setSearch] = useState("");

  // Flatten bookings into individual tickets
  const flatTickets: FlatTicket[] = useMemo(() => {
    if (!bookings) return [];

    return bookings.flatMap((b) => {
      if (b.seats && b.seats.length > 0) {
        return b.seats.map((seat: Seat) => ({
          id: b.id,
          seat: seat.name,
          ticketId: seat.code,
          price: Number(seat.price),
          purchaseDate: b.purchase_date || "", // Fallback if null
          status: b.payment_status === "paid" ? "Active" : "Cancelled",
          ticket_url: b.ticket_url,
          row: seat.name.split(" ")[0], // simple row extraction
          event: b.event,
        }));
      }

      // fallback single ticket if no seats
      return [
        {
          id: b.id,
          seat: "General",
          ticketId: b.booking_id,
          price: Number(b.total_amount),
          purchaseDate: b.purchase_date || "", // Fallback if null
          status: b.payment_status === "paid" ? "Active" : "Cancelled",
          ticket_url: b.ticket_url,
          row: "H",
          event: b.event,
        },
      ];
    });
  }, [bookings]);

  // Optional: search filter
  const filteredTickets = flatTickets.filter(
    (t) =>
      t.seat.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase()) ||
      t.event.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 rounded-xl shadow-lg">
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Event</th>
              <th className="border px-2 py-1">Seat</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Purchase Date</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((t, i) => (
              <tr key={t.ticketId}>
                <td className="border px-2 py-1">{i + 1}</td>
                <td className="border px-2 py-1">{t.event.name}</td>
                <td className="border px-2 py-1">{t.seat}</td>
                <td className="border px-2 py-1">${t.price.toFixed(2)}</td>
                <td className="border px-2 py-1">{t.purchaseDate || "N/A"}</td>
                <td className="border px-2 py-1">{t.status}</td>
                <td className="border px-2 py-1">
                  <PurchasedAction ticket={t} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PurchasedTickets;
