import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import Link from "next/link";
import React from "react";

type TicketCategory = {
  id: string;
  name: string;
  price: number;
  available: number;
};

type UserInfo = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

type OrderSummaryProps = {
  ticketCategories: TicketCategory[];
  selectedTickets: Record<string, string[]>; // selected seat IDs per category
  totalTickets: number;
  totalPrice: number;
  eventData: Event;
  userInfo?: UserInfo | null; // dynamically passed user info
  proceedToPurchase: () => void;
};

const OrderSummary = ({
  ticketCategories,
  selectedTickets,
  totalTickets,
  totalPrice,
  proceedToPurchase,
  eventData,
  userInfo,
}: OrderSummaryProps) => {
  const isUserLoggedIn = !!userInfo?.name;
 console.log(ticketCategories, "ticketCategories")
  return (
    <div className="bg-neutral-900 border border-yellow-500 rounded-lg shadow-xl p-8 max-w-md mx-auto transition duration-300">
      <h3 className="text-3xl font-extrabold mb-6 text-white text-start">
        Order Summary
      </h3>

      <div className="space-y-2 mb-6">
        <h4 className="text-xl text-gray-300 font-semibold border-b border-neutral-700 pb-2">
          👤 User Info
        </h4>
        <p>
          <span className="text-gray-400">Name:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {userInfo?.name || "N/A"}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Email:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {userInfo?.email || "N/A"}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Phone:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {userInfo?.phone || "N/A"}
          </span>
        </p>
        <p>
          <span className="text-gray-400">Event:</span>{" "}
          <span className="text-yellow-400 font-semibold">
            {eventData.name}
          </span>
        </p>
      </div>

      {totalTickets === 0 ? (
        <p className="text-start site-txt font-medium mt-10 text-2xl">
          🎟️ No seats selected yet.
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {ticketCategories.map(({ id, name }) => {
              const seats = selectedTickets[id] || [];
             
              if (seats.length === 0) return null;
              return (
                <div key={id}>
                  <p className="text-yellow-300 font-semibold">{name} Seats:</p>
                  <ul className="list-disc list-inside text-gray-300 ml-3">
                    {seats.map((seatId) => (
                      <li key={seatId}>{seatId}</li>
                    ))}
                  </ul>

                  {name === "No Seat" && (
                    <p className="mt-1 text-sm text-red-400 italic">
                      ⚠️ This category does not include a seat. You’ll only get
                      entry access.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-gray-300 font-medium mb-6">
            <p>
              Total Tickets:{" "}
              <span className="text-yellow-400 font-bold">{totalTickets}</span>
            </p>
            <p>
              Total Price:{" "}
              <span className="text-yellow-400 font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>

          {isUserLoggedIn ? (
            <button
              onClick={proceedToPurchase}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              🚀 Proceed to Purchase
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="mb-2 text-yellow-400 font-semibold">
                Please{" "}
                <Link href="/login" className="underline hover:text-yellow-500">
                  login
                </Link>{" "}
                first to proceed.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderSummary;
