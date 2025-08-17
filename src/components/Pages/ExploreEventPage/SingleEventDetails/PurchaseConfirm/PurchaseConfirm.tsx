"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PurchaseData {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  event?: {
    id: number | string;
    name: string;
  } | null;
  categories?: Record<string, string[]>;
  totalTickets?: number;
  totalPrice?: number;
}

const PurchaseConfirm = () => {
  const [data, setData] = useState<PurchaseData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("purchaseData");

    if (stored) {
      const parsed: PurchaseData = JSON.parse(stored);
      setData(parsed);
      // ❌ Don't remove here
    } else {
      console.warn("No purchase data found");
      router.push("/");
    }
  }, [router]);

  if (!data) return <p>Loading confirmation...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Purchase Confirmation</h1>
      <p>
        <strong>Name:</strong> {data.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {data.email || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone || "N/A"}
      </p>
      <p>
        <strong>Event:</strong> {data.event?.name || "N/A"}
      </p>
      <p>
        <strong>Event ID:</strong> {data.event?.id || "N/A"}
      </p>

      <div className="mt-4">
        {data.categories &&
          Object.entries(data.categories).map(([category, seats]) => (
            <div key={category} className="mb-4">
              <p className="font-semibold">{category} Seats:</p>
              {seats.length > 0 ? (
                <ul className="list-disc list-inside">
                  {seats.map((seat, i) => (
                    <li key={i}>{seat}</li>
                  ))}
                </ul>
              ) : (
                <p>No seats selected</p>
              )}
            </div>
          ))}
      </div>

      <p className="mt-4">
        <strong>Total Tickets:</strong> {data.totalTickets ?? "N/A"}
      </p>
      <p>
        <strong>Total Price:</strong> ${data.totalPrice?.toFixed(2) ?? "N/A"}
      </p>
    </div>
  );
};

export default PurchaseConfirm;
