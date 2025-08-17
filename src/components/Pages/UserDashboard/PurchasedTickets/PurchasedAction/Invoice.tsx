"use client";
import React from "react";
import { Booking as ApiBooking } from "@/hooks/useTickets";

interface InvoiceProps {
  booking: ApiBooking;
}

const Invoice: React.FC<InvoiceProps> = ({ booking }) => {
  const formattedId = booking.invoice_number;
  const seats = booking.seats;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        zIndex: -1,
        color: "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <img
            src="https://eventstailor.vercel.app/_next/image?url=%2Fimages%2Flogo.webp&w=256&q=75"
            alt="Logo"
            style={{ height: 60 }}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <h2 style={{ margin: 0, color: "#00bcd4" }}>INVOICE</h2>
          <p style={{ margin: 0, fontSize: 14 }}>Ticket ID: {formattedId}</p>
        </div>
      </div>

      {/* Event Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#f0faff",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: 25,
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 5px 0" }}>{booking.event.name}</h3>
          <p style={{ margin: 0, fontSize: 14 }}>
            Date: <strong>{booking.event.start_date}</strong> | Status:{" "}
            <strong>
              {booking.status === "confirmed" ? "Active" : "Pending"}
            </strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Link:{" "}
            <a
              href={booking.ticket_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00bcd4", textDecoration: "none" }}
            >
              View Event
            </a>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 14 }}>
            Buyer: <strong>{booking.user.name}</strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Purchased:{" "}
            <strong>
              {booking.purchase_date
                ? new Date(booking.purchase_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Expires:{" "}
            <strong>
              {booking.event.end_date || booking.event.start_date}
            </strong>
          </p>
        </div>
      </div>

      {/* Ticket Details */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}
      >
        <thead>
          <tr style={{ background: "#e0f7fa", color: "#007c91" }}>
            {["Items", "Seat", "Row", "Ticket", "Subtotal"].map((head) => (
              <th
                key={head}
                style={{
                  padding: 12,
                  textAlign: "center",
                  fontWeight: 600,
                  border: "1px solid #ccc",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seats.map((seat, idx) => (
            <tr key={idx} style={{ background: "#f9f9f9" }}>
              <td
                style={{
                  padding: 12,
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                {booking.event.name}
              </td>
              <td
                style={{
                  padding: 12,
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                {seat.name}
              </td>
              <td
                style={{
                  padding: 12,
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                Row {idx + 1}
              </td>
              <td
                style={{
                  padding: 12,
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                {formattedId}
              </td>
              <td
                style={{
                  padding: 12,
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                ${seat.price}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={4}
              style={{
                padding: 12,
                textAlign: "right",
                border: "1px solid #ccc",
                fontWeight: 600,
              }}
            >
              Tax / VAT (10%)
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              ${(parseFloat(booking.total_amount) * 0.1).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                padding: 12,
                textAlign: "right",
                border: "1px solid #ccc",
                fontWeight: 700,
              }}
            >
              Grand Total
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
                fontWeight: 700,
                color: "#00bcd4",
              }}
            >
              ${(parseFloat(booking.total_amount) * 1.1).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Billing, Payment & Venue Info */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}
      >
        <tbody>
          <tr>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>BILLING / SHIPPING INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                {booking.billing_name}
                <br />
                {booking.billing_address.replace(/\\n/g, "\n")}
                <br />
                {booking.user.email}
              </p>
            </td>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>PAYMENT INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                {booking.payment_type} ({booking.card_type || "N/A"})
                <br />
                Transaction ID:{" "}
                <span style={{ color: "#00bcd4" }}>
                  {booking.payment_transaction_id}
                </span>
              </p>
            </td>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>VENUE INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                {booking.event.name}
                <br />
                {booking.event.venue}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Barcode */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        <img
          src="https://barcodegenerator.seagullscientific.com/Content/Images/BarCodes/524d00b4-2f54-4eb3-bf54-0abf99f899a7.png"
          alt="Barcode"
          style={{ maxWidth: "300px", height: "auto" }}
        />
        <p style={{ marginTop: 5, fontSize: 14 }}>{formattedId}</p>
      </div>

      {/* Footer */}
      <p style={{ textAlign: "center", fontSize: 13, color: "#888" }}>
        Thank you for your purchase! Please present this invoice at the event
        entrance.
      </p>
    </div>
  );
};

export default Invoice;
