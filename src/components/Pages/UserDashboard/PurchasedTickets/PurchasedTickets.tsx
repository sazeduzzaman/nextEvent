"use client";

import React, { useMemo, useState } from "react";
import PurchasedActionTicket from "./PurchasedAction/PurchasedActionTicket";
import { useBookings } from "@/hooks/useTickets";

interface Seat {
  name: string;
  code: string;
  price: string;
  row?: string;
  column?: string;
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
  start_date: string;
  price: number;
  purchaseDate: string;
  status: "Active" | "Cancelled";
  ticket_url?: string;
  row?: string;
  event: EventInfo;
}

const PurchasedTickets: React.FC = () => {
  const { bookings, loading } = useBookings();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Flatten bookings into individual tickets
  const flatTickets: FlatTicket[] = useMemo(() => {
    if (!bookings) return [];
    return bookings.flatMap((b) => {
      if (b.seats && b.seats.length > 0) {
        return b.seats.map((seat: Seat) => ({
          id: b.id,
          seat: seat.name, // P2
          ticketId: seat.code,
          price: Number(seat.price),
          purchaseDate: b.purchase_date || "",
          status: b.payment_status === "paid" ? "Active" : "Cancelled",
          ticket_url: b.ticket_url,
          row: seat.row || "", // P
          start_date: b.event?.start_date || b.purchase_date || "",
          event: b.event,
        }));
      }
      return [
        {
          id: b.id,
          seat: "General",
          ticketId: b.booking_id,
          price: Number(b.total_amount),
          purchaseDate: b.purchase_date || "",
          status: b.payment_status === "paid" ? "Active" : "Cancelled",
          ticket_url: b.ticket_url,
          row: "H",
          start_date: b.event?.start_date || b.purchase_date || "",
          event: b.event,
        },
      ];
    });
  }, [bookings]);

  // Filter tickets
  const filteredTickets = flatTickets.filter(
    (t) =>
      t.seat.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase()) ||
      t.event.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / pageSize);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Format date (e.g., Aug 12, 2025)
// Format date from DD-MM-YYYY HH:MM:SS to "Aug 12, 2025"
const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";

  // Split date and time
  const [datePart] = dateStr.split(" "); // "19-08-2025"
  const [day, month, year] = datePart.split("-").map(Number);

  if (!day || !month || !year) return dateStr;

  const date = new Date(year, month - 1, day); // JS months are 0-indexed

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

  return (
    <div className="p-6 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold site-txt">Purchased Tickets</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered input-warning w-full md:w-64"
          />
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="select select-bordered select-warning"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead className="site-second-bg">
                <tr>
                  {[
                    "Sl",
                    "Event",
                    "Row",
                    "Seat",
                    "Price",
                    "Purchased",
                    "Start Date",
                    "Status",
                    "Ticket",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-4 text-lg font-medium site-txt border-b"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.map((t, i) => (
                  <tr
                    key={t.ticketId}
                    className="hover:bg-yellow-400 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      {t.event.name}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      {t.row}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      {t.seat}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      ${t.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                     {formatDate(t.purchaseDate)}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      {/* {t.start_date} */}
                      {formatDate(t.start_date)}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      {t.status}
                    </td>
                    <td className="px-4 py-2 text-sm border-b-1 border-yellow-400">
                      <PurchasedActionTicket ticket={t} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, filteredTickets.length)} of{" "}
              {filteredTickets.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md hover:bg-yellow-100 disabled:opacity-50 transition"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === idx + 1
                      ? "bg-yellow-400 site-txt"
                      : "hover:bg-yellow-100"
                  } transition`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md hover:bg-yellow-100 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasedTickets;
