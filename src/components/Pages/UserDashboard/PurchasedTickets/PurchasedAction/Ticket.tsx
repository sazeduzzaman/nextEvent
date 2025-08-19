"use client";
import React from "react";
import TicketQRCode from "./TicketQrCode";

export interface EventInfo {
  id: number;
  name: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  venue: string;
}

export interface TicketProps {
  ticket: {
    id: number;
    seat: string;
    ticketId?: string | number;
    price: number;
    start_date: string; // required
    status: "Active" | "Expired" | "Cancelled" | "Pending";
    ticket_url?: string;
    row?: string;
    event?: EventInfo;
  };
}

// Helper to extract seat number
const formatTime12 = (timeStr: string) => {
  if (!timeStr) return "N/A";
  const [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12; // Convert 0 -> 12
  return `${h12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
 
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
      <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
        <tbody>
          <tr>
            <td align="center">
              <table
                width={600}
                cellPadding={0}
                cellSpacing={0}
                border={0}
                style={{
                  maxWidth: 600,
                  borderRadius: 12,
                  borderCollapse: "collapse",
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                }}
              >
                <tbody>
                  <tr>
                    {/* Left Section */}
                    <td
                      width="70%"
                      valign="top"
                      style={{ padding: 20, borderRight: "2px dashed #00bcd4" }}
                    >
                      {/* Logo & Event Name */}
                      <div style={{ marginBottom: 15 }}>
                        <img
                          src="https://eventstailor.vercel.app/_next/image?url=%2Fimages%2Flogo.webp&w=256&q=75"
                          alt="Logo"
                          style={{
                            height: 40,
                            display: "block",
                            marginBottom: 8,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: "#00bcd4",
                          }}
                        >
                          {ticket.event?.name || "Event Name"}
                        </span>
                      </div>

                      {/* Event Details */}
                      <table
                        width="100%"
                        cellPadding={8}
                        style={{
                          background: "#dff9fc",
                          borderRadius: 8,
                          marginTop: 15,
                        }}
                      >
                        <tbody>
                          <tr style={{ textAlign: "center", fontSize: 12 }}>
                            <td>
                              Date
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                {ticket.event?.start_date
                                  ? new Date(
                                      ticket.event.start_date
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })
                                  : "N/A"}
                              </b>
                            </td>
                            <td>
                              Time
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                 {formatTime12(ticket.event?.start_time || "17:00:00")}
                              </b>
                            </td>
                            <td>
                              Seat
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                {/* {getSeatNumber(ticket.seat)} */}
                                {ticket.seat || "A1"}
                              </b>
                            </td>
                            <td>
                              Row
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                {ticket.row || "H"}
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style={{ fontSize: 12, marginTop: 15 }}>
                        Venue:{" "}
                        <strong>
                          {ticket.event?.venue || "Greenfield Arena, Dhaka"}
                        </strong>
                        . Please arrive 30 minutes early. Ticket admits one
                        person only. Non-transferable.
                      </p>
                    </td>

                    {/* Right Section */}
                    <td
                      width="30%"
                      style={{
                        padding: 20,
                        background: "#e0f7fa",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#00bcd4",
                          paddingBottom: 5,
                        }}
                      >
                        🎫 <br /> ENTRY PASS
                      </div>
                      <div style={{ padding: "5px 0" }}>
                        <TicketQRCode url={ticket.ticket_url || "EV568"} />
                      </div>
                      <div style={{ fontSize: 14, padding: "4px 0" }}>
                        Status:{" "}
                        <b style={{ color: "#008000" }}>{ticket.status}</b>
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1.4 }}>
                        <b>Ticket ID:</b> {ticket.ticketId || "EV568"}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ticket;
