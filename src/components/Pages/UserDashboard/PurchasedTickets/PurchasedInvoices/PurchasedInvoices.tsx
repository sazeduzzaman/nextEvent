"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useBookings } from "@/hooks/useTickets";

interface Seat {
  name: string;
  code: string;
  price: string;
}

interface Booking {
  id: number;
  booking_id: string;
  user_name: string;
  user_email: string;
  invoice_number: string;
  seats: Seat[];
  event_datetime: string;
  total_amount: string;
  payment_status: string;
  payment_type: string;
  purchase_date: string | null; // may be null
  event: {
    name: string;
    venue?: string;
    start_date: string;
    start_time: string;
  };
}

interface FlatInvoice {
  id: number;
  bookingId: string;
  userName: string;
  userEmail: string;
  invoiceNumber: string;
  seats: string; // combined seat names
  eventName: string;
  eventVenue?: string;
  eventDate: string;
  totalAmount: number;
  paymentStatus: string;
  paymentType: string;
  purchaseDate: string; // guaranteed string
}

const PurchasedInvoices: React.FC = () => {
  const { bookings, loading } = useBookings();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Flatten bookings into invoices
  const flatInvoices: FlatInvoice[] = useMemo(() => {
    if (!bookings) return [];
    return bookings.map((b: Booking) => ({
      id: b.id,
      bookingId: b.booking_id,
      userName: b.user_name,
      userEmail: b.user_email,
      invoiceNumber: b.invoice_number,
      seats: b.seats.map((s) => s.name).join(", "),
      eventName: b.event.name,
      eventVenue: b.event.venue,
      eventDate: b.event_datetime,
      totalAmount: Number(b.total_amount),
      paymentStatus: b.payment_status,
      paymentType: b.payment_type,
      purchaseDate: b.purchase_date ?? "", // fallback if null
    }));
  }, [bookings]);

  // Log the data to console
  useEffect(() => {
    console.log("FlatInvoices:", flatInvoices);
  }, [flatInvoices]);

  // Pagination logic
  const totalPages = Math.ceil(flatInvoices.length / pageSize);
  const paginatedInvoices = flatInvoices.slice(
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

  return (
    <div className="p-6 rounded-xl shadow-lg ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold site-txt">Purchased Invoices</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search invoices..."
            className="input input-bordered input-primary w-full md:w-64"
          />
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="select select-bordered select-primary"
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
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "10%" }}>Invoice #</th>
                  <th style={{ width: "15%" }}>User</th>
                  <th style={{ width: "15%" }}>Seats</th>
                  <th style={{ width: "15%" }}>Event</th>
                  <th style={{ width: "15%" }}>Venue</th>
                  <th style={{ width: "10%" }}>Event Date</th>
                  <th style={{ width: "5%" }}>Amount</th>
                  <th style={{ width: "5%" }}>Payment</th>
                  <th style={{ width: "5%" }}>Payment Type</th>
                  <th style={{ width: "5%" }}>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((inv, i) => (
                  <tr key={inv.bookingId}>
                    <td>{(currentPage - 1) * pageSize + i + 1}</td>
                    <td>{inv.invoiceNumber}</td>
                    <td>
                      {inv.userName} <br />
                      <span className="text-gray-500 text-sm">
                        {inv.userEmail}
                      </span>
                    </td>
                    <td>{inv.seats}</td>
                    <td>{inv.eventName}</td>
                    <td>{inv.eventVenue || "N/A"}</td>
                    <td>{inv.eventDate}</td>
                    <td>${inv.totalAmount.toFixed(2)}</td>
                    <td>{inv.paymentStatus}</td>
                    <td>{inv.paymentType}</td>
                    <td>
                      {inv.purchaseDate
                        ? (() => {
                            const [day, month, year] = inv.purchaseDate
                              .split(" ")[0]
                              .split("-");
                            return new Date(
                              Number(year),
                              Number(month) - 1,
                              Number(day)
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            });
                          })()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, flatInvoices.length)} of{" "}
              {flatInvoices.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline btn-sm"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`btn btn-outline btn-sm ${
                    currentPage === idx + 1 ? "btn-active" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-outline btn-sm"
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

export default PurchasedInvoices;
