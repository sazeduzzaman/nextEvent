"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// 🔹 Types
export interface Seat {
  name: string;
  code: string;
  price: string;
}

export interface EventInfo {
  id: number;
  name: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  venue: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export interface Booking {
  id: number;
  user_id: number;
  invoiceNumber: string;
  event_id: number;
  booking_id: string;
  user_name: string;
  user_email: string;
  invoice_number: string;
  event_datetime: string;
  status: string;
  total_amount: string;
  payment_status: string;
  payment_type: string;
  card_type: string | null;
  purchase_date: string | null;
  billing_name: string;
  billing_email: string;
  billing_address: string;
  paid_at: string | null;
  ticket_url: string;
  payment_transaction_id: string;
  created_at: string;
  updated_at: string;
  seats: Seat[];
  user: UserInfo;
  event: EventInfo;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      // ✅ Check session_id from URL
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (sessionId) {
        try {
          const res = await fetch(
            `https://admin.eventstailor.com/api/v1/payment/status?session_id=${sessionId}`
          );
          if (!res.ok) throw new Error("Failed to fetch booking status");

          const data = await res.json();
          setSessionStatus(data.status || "Unknown");

          if (data.status === "pending") toast.success("Booking is pending!");
          else if (data.status === "confirmed")
            toast.success("Booking confirmed!");
        } catch (err: any) {
          toast.error(err.message);
          setSessionStatus("Error");
        }
      }

      try {
        // ✅ Get token
        const token =
          localStorage.getItem("authToken") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("authToken="))
            ?.split("=")[1];

        if (!token) throw new Error("No auth token found");

        // ✅ Fetch bookings
        const res = await fetch(
          "https://admin.eventstailor.com/api/v1/tickets",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();

        setBookings(data.bookings || []);
      } catch (err: any) {
        toast.error(err.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, sessionStatus };
};
