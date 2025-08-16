"use client";
import React from "react";
interface PurchasedActionProps {
  ticket: {
    id: number;
    date: string;
    seat: string;
    price: number;
    row: string;
    purchaseDate: string;
    expireDate: string;
    status: "Active" | "Expired" | "Cancelled";
  };
}
const Ticket = ({ ticket }: PurchasedActionProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#f3fafa",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        zIndex: -1,
        color: "#000",
      }}
    >
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        border={0}
        align="center"
      >
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
                  background: "#eafcfe",
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
                      <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{ paddingBottom: 10, textAlign: "left" }}
                            >
                              <img
                                src="https://eventstailor.vercel.app/_next/image?url=%2Fimages%2Flogo.webp&w=256&q=75"
                                alt="Company Logo"
                                style={{
                                  height: 40,
                                  maxWidth: "100%",
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
                                Summer Beats Festival
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Event Details Table */}
                      <table
                        width="100%"
                        cellPadding={8}
                        cellSpacing={0}
                        border={0}
                        style={{
                          background: "#dff9fc",
                          borderRadius: 8,
                          borderCollapse: "collapse",
                          marginTop: 15,
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 12,
                                wordBreak: "break-word",
                              }}
                            >
                              Date
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                30 Aug 2025
                              </b>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 12,
                                wordBreak: "break-word",
                              }}
                            >
                              Time
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                5:00 PM
                              </b>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 12,
                                wordBreak: "break-word",
                              }}
                            >
                              Seat
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                A12
                              </b>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 12,
                                wordBreak: "break-word",
                              }}
                            >
                              Ticket No.
                              <br />
                              <b style={{ color: "#00bcd4", fontSize: 14 }}>
                                EVT346Y
                              </b>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Notes */}
                      <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        style={{ marginTop: 15 }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ fontSize: 12, lineHeight: 1.4 }}>
                              Venue: <strong>Greenfield Arena, Dhaka</strong>.
                              Please arrive 30 minutes early. Ticket admits one
                              person only. Non-transferable.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>

                    {/* Right Section */}
                    <td
                      width="30%"
                      valign="middle"
                      style={{
                        padding: 20,
                        background: "#e0f7fa",
                        textAlign: "center",
                      }}
                    >
                      <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "#00bcd4",
                                paddingBottom: 10,
                              }}
                            >
                              🎫 ENTRY PASS
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 14, padding: "4px 0" }}>
                              Seat <b style={{ color: "#00bcd4" }}>A12</b>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 14, padding: "4px 0" }}>
                              Ticket <b style={{ color: "#00bcd4" }}>EVT346Y</b>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px 0" }}>
                              <img
                                src="https://barcodegenerator.seagullscientific.com/Content/Images/BarCodes/524d00b4-2f54-4eb3-bf54-0abf99f899a7.png"
                                alt="Barcode"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                  margin: "0 auto",
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 12, paddingTop: 4 }}>
                              9845 2217 6630 4471
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        {ticket.length}
      </div>
    </div>
  );
};

export default Ticket;
