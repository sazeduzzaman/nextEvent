"use client";
import React from "react";
import { Booking as ApiBooking } from "@/hooks/useTickets";
import TicketQRCode from "./TicketQrCode";

interface InvoiceProps {
  booking: ApiBooking;
}

// Utility to parse billing address JSON
const renderBillingAddress = (billing_address: string | null) => {
  if (!billing_address) return "N/A";

  try {
    const addr = JSON.parse(
      billing_address.replace(/Stripe\\StripeObject JSON: /, "")
    );

    return (
      <>
        {addr.line1 && (
          <>
            {addr.line1} <br />
          </>
        )}
        {addr.line2 && (
          <>
            {addr.line2} <br />
          </>
        )}
        {addr.city && (
          <>
            {addr.city} <br />
          </>
        )}
        {addr.state && (
          <>
            {addr.state} <br />
          </>
        )}
        {addr.postal_code && (
          <>
            {addr.postal_code} <br />
          </>
        )}
        {addr.country && <>{addr.country}</>}
      </>
    );
  } catch {
    return billing_address; // fallback if parsing fails
  }
};

const Invoice: React.FC<InvoiceProps> = ({ booking }) => {
  const seats = booking.seats;
  const formattedId = booking.invoice_number;

  // Format purchase date
  const formatDateTime = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

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
          <p style={{ margin: 0, fontSize: 14 }}>Invoice ID: {formattedId}</p>
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
            Purchased: <strong>{formatDateTime(booking.purchase_date)}</strong>
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
            {["Items", "Seat", "Row", "Booking ID", "Subtotal"].map((head) => (
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
                {booking.booking_id}
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
                {booking.billing_name} <br />
                {booking.billing_email} <br />
                {renderBillingAddress(booking.billing_address)}
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
                {booking.event.name} <br />
                {booking.event.venue}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* QR Code */}
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
        <p style={{ marginTop: 5, fontSize: 14 }}>{formattedId}</p>
        <TicketQRCode url={booking.ticket_url || "EV568"} />
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#888",
          marginTop: 50,
        }}
      >
        Thank you for your purchase! Please present this invoice at the event
        entrance.
      </p>
    </div>
  );
};

export default Invoice;
