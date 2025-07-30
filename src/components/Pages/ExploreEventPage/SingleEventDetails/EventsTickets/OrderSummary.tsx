import React from "react";

type TicketCategory = {
  id: string;
  name: string;
  price: number;
  available: number;
};

type OrderSummaryProps = {
  ticketCategories: TicketCategory[];
  selectedTickets: Record<string, string[]>; // selected seat IDs per category
  totalTickets: number;
  totalPrice: number;
  slug: string;
  proceedToPurchase: () => void;
};

const OrderSummary = ({
  ticketCategories,
  selectedTickets,
  totalTickets,
  totalPrice,
  proceedToPurchase,
  slug,
}: OrderSummaryProps) => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-white">Order Summary</h3>
      <h1 className="text-1xl">User Info</h1>
      <p className="mb-1">
        <span className="font-medium text-gray-400">Name:</span>{" "}
        <span className="text-yellow-400 font-semibold">Sazeduzzaman Saju</span>
      </p>
      <p className="mb-1">
        <span className="font-medium text-gray-400">Email:</span>{" "}
        <span className="text-yellow-400 font-semibold">
          szamansaju@gmail.com
        </span>
      </p>
      <p className="mb-1">
        <span className="font-medium text-gray-400">Phone:</span>{" "}
        <span className="text-yellow-400 font-semibold">01576614451</span>
      </p>
      <p className="mb-1">
        <span className="font-medium text-gray-400">Event:</span>{" "}
        <span className="text-yellow-400 font-semibold">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </p>
      {totalTickets === 0 ? (
        <p className="text-gray-400">No seats selected yet.</p>
      ) : (
        <>
          {ticketCategories.map(({ id, name }) => {
            const seats = selectedTickets[id] || [];
            if (seats.length === 0) return null;
            return (
              <div key={id} className="mb-4">
                <p className="font-semibold text-yellow-400">{name} Seats:</p>
                <ul className="list-disc list-inside text-gray-300">
                  {seats.map((seatId) => (
                    <li key={seatId}>{seatId}</li>
                  ))}
                </ul>
              </div>
            );
          })}

          <p className="mb-1">
            <span className="font-medium text-gray-400">Total Tickets:</span>{" "}
            <span className="text-yellow-400 font-semibold">
              {totalTickets}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-medium text-gray-400">Total Price:</span>{" "}
            <span className="text-yellow-400 font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </p>

          <button
            onClick={proceedToPurchase}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition"
          >
            Proceed to Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
