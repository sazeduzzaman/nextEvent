import React from "react";

interface Ticket {
  id: number;
  date: string;
  seat: string;
  price: number;
  purchaseDate: string;
  expireDate: string;
  row: string;
  status: "Active" | "Expired" | "Cancelled";
  eventName?: string;
  eventLink?: string;
  buyerName?: string;
}

interface PurchasedActionProps {
  ticket: Ticket;
}

const Invoice = ({ ticket }: PurchasedActionProps) => {
  // Format ticket id as #ev-XXXX
  const formattedId = `#ev-${ticket.id.toString().padStart(4, "0")}`;

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
          <h3 style={{ margin: "0 0 5px 0" }}>
            {ticket.eventName || "Event Name"}
          </h3>
          <p style={{ margin: 0, fontSize: 14 }}>
            Date: <strong>{ticket.date}</strong> | Status:{" "}
            <strong>{ticket.status}</strong>
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
            Buyer: <strong>{ticket.buyerName || "John Doe"}</strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Purchased: <strong>{ticket.purchaseDate}</strong>
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Expires: <strong>{ticket.expireDate}</strong>
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
              {ticket.eventName}
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              {ticket.seat}
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              {ticket.row}
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
              {ticket.expireDate}
            </td>
            <td
              style={{
                padding: 12,
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            >
              ${ticket.price.toFixed(2)}
            </td>
          </tr>
        </tbody>

        {/* ✅ Table Footer */}
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
              ${(ticket.price * 0.1).toFixed(2)}
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
              ${(ticket.price * 1.1).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Total */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 20 }}>
          Total:{" "}
          <span style={{ color: "#00bcd4" }}>${ticket.price.toFixed(2)}</span>
        </h3>
      </div> */}

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
                {ticket.buyerName || "John Doe"}
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
                Worldpay Transaction ID:{" "}
                <span style={{ color: "#00bcd4" }}>4185939336</span>
              </p>
            </td>
            <td style={{ width: "33%", padding: 12, verticalAlign: "top" }}>
              <strong>VENUE INFORMATION</strong>
              <p style={{ margin: "5px 0", fontSize: 12 }}>
                {ticket.eventName || "Event Name"}
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

      {/* Barcode Centered at Bottom */}
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
