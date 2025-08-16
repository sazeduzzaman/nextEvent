"use client";

import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import PurchasedAction from "./PurchasedAction/PurchasedAction";

type Ticket = {
  id: number;
  seat: string;
  price: number;
  purchaseDate: string;
  status: "Active" | "Expired" | "Cancelled" | "Pending";
  eventName: string;
};

const PurchasedTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTicketsFromSessions = async () => {
      const storedSessions: string[] =
        JSON.parse(localStorage.getItem("stripeSessions") || "[]") || [];

      if (!storedSessions.length) {
        setTickets([]);
        setLoading(false);
        return;
      }

      const allTickets: Ticket[] = [];

      for (const sessionId of storedSessions) {
        try {
          setLoading(true);
          const res = await fetch(
            `https://admin.eventstailor.com/api/v1/payment/status?session_id=${sessionId}`
          );
          if (!res.ok) throw new Error("Failed to fetch booking");

          const data = await res.json();

          if (data.status === "pending") {
            toast.success("Booking is pending, please wait!");
            // Push a placeholder ticket for display
            allTickets.push({
              id: Number(sessionId.slice(-6)), // unique numeric ID for row
              seat: "N/A",
              price: 0,
              purchaseDate: "N/A",
              status: "Pending",
              eventName: "N/A",
            });
          } else if (data.status === "confirmed") {
            const mapped: Ticket[] =
              data.booking?.seats?.map((seat: any) => ({
                id: Number(seat.seat_id),
                seat: seat.seat_name,
                price: data.booking.total_amount / data.booking.seats.length,
                purchaseDate: new Date(data.booking.event_datetime)
                  .toISOString()
                  .split("T")[0],
                status:
                  data.booking.payment_status === "paid"
                    ? "Active"
                    : "Cancelled",
                eventName: data.booking.event || "Unnamed Event",
              })) || [];
            allTickets.push(...mapped);
            toast.success("Booking confirmed!");
          }
        } catch (err: any) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      }

      setTickets(allTickets);
    };

    fetchTicketsFromSessions();
  }, []);

  // Filtering
  const filteredData = useMemo(() => {
    const s = search.toLowerCase();
    return tickets.filter(
      (t) =>
        t.seat.toLowerCase().includes(s) ||
        t.status.toLowerCase().includes(s) ||
        t.purchaseDate.includes(search) ||
        t.eventName.toLowerCase().includes(s)
    );
  }, [search, tickets]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="max-w-7xl mx-auto p-8 site-second-bg rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold site-txt mb-8">Purchased Tickets</h1>

      {loading && <p>Loading...</p>}

      <table className="w-full text-left border-collapse">
        <thead className="bg-yellow-400 text-black uppercase text-sm font-semibold">
          <tr>
            <th className="px-6 py-4">SL</th>
            <th className="px-6 py-4">Event</th>
            <th className="px-6 py-4">Seat</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Purchase</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                No tickets found
              </td>
            </tr>
          ) : (
            currentData.map((ticketsItems, i) => (
              <tr key={ticketsItems.id}>
                {ticketsItems.status === "Pending" ? (
                  <td
                    colSpan={7}
                    className="text-center py-4 text-yellow-700 font-semibold"
                  >
                    The booking is pending
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-6 py-4">{ticketsItems.eventName}</td>
                    <td className="px-6 py-4">{ticketsItems.seat}</td>
                    <td className="px-6 py-4">
                      ${ticketsItems.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{ticketsItems.purchaseDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ticketsItems.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ticketsItems.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <PurchasedAction ticket={ticketsItems} />
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredData.length > pageSize && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
          <p className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-5 py-2 rounded bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 transition font-semibold text-black shadow"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-5 py-2 rounded bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 transition font-semibold text-black shadow"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasedTickets;
