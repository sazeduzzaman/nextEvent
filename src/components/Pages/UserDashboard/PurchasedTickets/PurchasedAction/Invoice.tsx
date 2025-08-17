import React from "react";

interface PurchasedActionProps {
  ticket: {
    id: number;
    seat?: string;
    price?: number;
    purchaseDate?: string;
    status?: "Active" | "Expired" | "Cancelled" | "Pending";
    eventName?: string;
    venue?: string;
    date?: string;
    qr_url?: string;
    row?: string;
    expireDate?: string;
    bookingId?: number;
    ticketId?: number;
    buyerName?: string;
    eventLink?: string;
  };
}

const Invoice = ({ ticket }: PurchasedActionProps) => {
  // Format ticket id as #ev-XXXX
  const formattedId = `#ev-${(ticket.id ?? 0).toString().padStart(4, "0")}`;

  // Helper for fallback
  const safe = (value: any) => value ?? "N/A";
  console.log(ticket, "ticket invoice");
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        margin: "30px auto",
        background: "#ffffff",
        fontFamily: "'Arial', sans-serif",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        color: "#333",
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
          <h3 style={{ margin: "0 0 5px 0" }}>{safe(ticket.eventName)}</h3>
          <p style={{ margin: 0, fontSize: 14 }}>
            Date: <strong>{safe(ticket.date)}</strong> | Status:{" "}
            <strong>{safe(ticket.status)}</strong>
          </p>
          {ticket.eventLink && (
            <p style={{ margin: 0, fontSize: 14 }}>
              Link:{" "}
              <a
                href={ticket.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00bcd4", textDecoration: "none" }}
              >
                View Event
              </a>
            </p>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 14 }}>
            Buyer: <strong>{safe(ticket.buyerName)}</strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Purchased: <strong>{safe(ticket.purchaseDate)}</strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Expires: <strong>{safe(ticket.expireDate)}</strong>
          </p>
        </div>
      </div>

      {/* Ticket Details */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 20,
        }}
      >
        <thead>
          <tr style={{ background: "#e0f7fa", color: "#007c91" }}>
            {["Items", "Seat", "Row", "Ticket", "Expire", "Subtotal"].map(
              (head) => (
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
              )
            )}
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: "#f9f9f9" }}>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              {safe(ticket.eventName)}
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              {safe(ticket.seat)}
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              {safe(ticket.row)}
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
              {safe(ticket.expireDate)}
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              {ticket.price !== undefined && ticket.price !== null
                ? `$${(ticket.price * 0.1).toFixed(2)}`
                : "N/A"}
            </td>
          </tr>
        </tbody>

        {/* Table Footer */}
        <tfoot>
          <tr>
            <td
              colSpan={5}
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
              ${safe(ticket.price) ? (ticket.price * 0.1).toFixed(2) : "N/A"}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
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
              ${safe(ticket.price) ? (ticket.price * 1.1).toFixed(2) : "N/A"}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Billing, Payment & Venue Info */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 30,
        }}
      >
        <tbody>
          <tr>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>BILLING / SHIPPING INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                {safe(ticket.buyerName)}
                <br />
                123 Main Street
                <br />
                City, State ZIP
                <br />
                Country
              </p>
            </td>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>PAYMENT INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                Credit Card
                <br />
                Credit Card Type: Visa
                <br />
                Transaction ID: <span style={{ color: "#00bcd4" }}>N/A</span>
              </p>
            </td>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>VENUE INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                {safe(ticket.eventName)}
                <br />
                456 Event Street
                <br />
                City, State ZIP
                <br />
                Country
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#888",
        }}
      >
        Thank you for your purchase! Please present this invoice at the event
        entrance.
      </p>
    </div>
  );
};

export default Invoice;
