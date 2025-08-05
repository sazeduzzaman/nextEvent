"use client";

import { useEffect, useState } from "react";

const PurchaseConfirm = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("purchaseData");
    if (stored) {
      const parsedData = JSON.parse(stored);
      setData(parsedData);
      console.log("Purchase Data JSON:", JSON.stringify(parsedData, null, 2));
    }
  }, []);

  if (!data) return <p>Loading confirmation...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Purchase Confirmation</h1>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
      <p>
        <strong>Event:</strong> {data.event}
      </p>

      {/* Render seats grouped by category */}
      <div className="mt-4">
        {data.categories &&
          Object.entries(data.categories).map(([category, seats]) => {
            const seatList = seats as string[];
            return (
              <div key={category} className="mb-4">
                <p className="font-semibold">{category} Seats:</p>
                {seatList.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {seatList.map((seat, i) => (
                      <li key={i}>{seat}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No seats selected</p>
                )}
              </div>
            );
          })}
      </div>

      <p className="mt-4">
        <strong>Total Tickets:</strong> {data.totalTickets}
      </p>
      <p>
        <strong>Total Price:</strong> ${data.totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default PurchaseConfirm;
