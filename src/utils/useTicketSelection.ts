"use client";
import Cookies from "js-cookie";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type {
  Event,
  EventSeatGroup,
  Seat,
} from "@/lib/api/AllEvents/AllEventsDataType";
import { getProfile } from "@/lib/api/UserData/userApi";

export interface TicketCategory {
  id: number;
  name: string;
  price: number;
  available: number;
  seats: Seat[];
}

interface UseTicketSelectionProps {
  eventData: Event;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export function useTicketSelection({ eventData }: UseTicketSelectionProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedTickets, setSelectedTickets] = useState<
    Record<number, string[]>
  >({});
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // User info states
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  // Restore selections from localStorage on mount
  useEffect(() => {
    const savedSelected = localStorage.getItem("pendingSelectedTickets");
    const savedCategories = localStorage.getItem("pendingTicketCategories");
    const savedEvent = localStorage.getItem("pendingEventData");

    if (savedSelected && savedCategories && savedEvent) {
      try {
        const parsedSelected = JSON.parse(savedSelected);
        const parsedCategories = JSON.parse(savedCategories);
        const parsedEvent = JSON.parse(savedEvent);

        // Check if saved event slug matches current event
        if (parsedEvent.slug === eventData.slug) {
          setSelectedTickets(parsedSelected);
          setTicketCategories(parsedCategories);
          if (parsedCategories.length > 0) setActiveTab(parsedCategories[0].id);

          // Clear storage after restoring
          localStorage.removeItem("pendingSelectedTickets");
          localStorage.removeItem("pendingTicketCategories");
          localStorage.removeItem("pendingEventData");
        }
      } catch {
        // Invalid data, clear storage anyway
        localStorage.removeItem("pendingSelectedTickets");
        localStorage.removeItem("pendingTicketCategories");
        localStorage.removeItem("pendingEventData");
      }
    }
  }, [eventData.slug]);

  useEffect(() => {
    if (!eventData?.slug) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://admin.eventstailor.com/api/v1/event-details/${eventData.slug}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: { success: boolean; event_seats: EventSeatGroup[] } =
          await res.json();

        if (data.success) {
          // Only set categories if not restored from localStorage
          if (ticketCategories.length === 0) {
            const categories = data.event_seats.map((cat) => ({
              id: cat.seat_type_id,
              name: cat.seat_type,
              price: parseFloat(cat.seats[0]?.price || "0"),
              available: cat.seats.length,
              seats: cat.seats,
            }));
            setTicketCategories(categories);
            if (categories.length > 0) setActiveTab(categories[0].id);
          }
        } else {
          setError("Failed to load event seats");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventData?.slug]);

  useEffect(() => {
    async function fetchUser() {
      setLoadingUser(true);
      setUserError(null);
      try {
        const profile = await getProfile();
        setUserInfo(profile);
      } catch (err: any) {
        setUserError(err.message || "Failed to fetch user profile");
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  const handleSeatToggle = (categoryId: number, seatId: string) => {
    setSelectedTickets((prev) => {
      const currentSeats = prev[categoryId] || [];
      const updatedSeats = currentSeats.includes(seatId)
        ? currentSeats.filter((s) => s !== seatId)
        : [...currentSeats, seatId];
      return { ...prev, [categoryId]: updatedSeats };
    });
  };

  const totalTickets = Object.values(selectedTickets).reduce(
    (acc, seats) => acc + seats.length,
    0
  );

  // Optimized totalPrice calculation with useMemo and rounding
  const totalPrice = useMemo(() => {
    const total = ticketCategories.reduce((sum, category) => {
      const seatCount = selectedTickets[category.id]?.length || 0;
      const price =
        typeof category.price === "string"
          ? parseFloat(category.price)
          : category.price;
      return sum + seatCount * price;
    }, 0);
    return Math.round(total * 100) / 100;
  }, [ticketCategories, selectedTickets]);

  const proceedToPurchase = async () => {
    if (loadingUser) {
      toast.error("User profile is still loading, please wait.");
      return;
    }
    if (!userInfo) {
      localStorage.setItem(
        "pendingSelectedTickets",
        JSON.stringify(selectedTickets)
      );
      localStorage.setItem(
        "pendingTicketCategories",
        JSON.stringify(ticketCategories)
      );
      localStorage.setItem("pendingEventData", JSON.stringify(eventData));

      toast.error("Please login to proceed.");
      router.push(
        `/auth/login?redirect=${encodeURIComponent(
          window.location.pathname + window.location.search
        )}`
      );
      return;
    }
    if (totalTickets === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    const seat_ids = Object.values(selectedTickets)
      .flat()
      .map((id) => Number(id))
      .filter((id) => !isNaN(id));

    const purchaseData = {
      user: {
        name: userInfo.name,
        email: userInfo.email,
      },
      event_id: Number(eventData?.id),
      seat_ids,
      total_amount: totalPrice,
    };
    // First Set Purchase data
    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
    const token = Cookies.get("authToken");

    console.log("Purchase Data to send:", purchaseData);
    console.log("Auth Token:", token);
    // If the auth token not found then remove the Purchase data
    if (!token) {
      toast.error("Authentication token not found. Please login again.");

      // Clear purchaseData and cookie
      localStorage.removeItem("purchaseData");
      localStorage.removeItem("pendingSelectedTickets");
      localStorage.removeItem("pendingTicketCategories");
      localStorage.removeItem("pendingEventData");

      // Delete auth token cookie — requires cookie lib or manual method
      Cookies.remove("authToken");

      return;
    }

    try {
      const response = await fetch(
        "https://admin.eventstailor.com/api/v1/booking/initiate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("API Response:", data);
      toast.success("Booking initiated successfully!");

      // if (data.status === "success" && data.redirect_url) {
      //   window.open(data.redirect_url, "_blank");
      // }

      console.log("API Response:", data);
      if (data.status === "success") {
        toast.success("Booking initiated successfully!");
      } else {
        toast.error("Booking failed");
      }
    } catch (error: any) {
      console.error("API Error:", error.message);
      toast.error(error.message || "Something went wrong");
    }
  };

  return {
    activeTab,
    setActiveTab,
    selectedTickets,
    handleSeatToggle,
    ticketCategories,
    totalTickets,
    totalPrice,
    proceedToPurchase,
    loading,
    error,
    userInfo,
    loadingUser,
    userError,
  };
}
