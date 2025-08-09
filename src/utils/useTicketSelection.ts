"use client";

import { useState, useEffect } from "react";
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

  const totalPrice = ticketCategories.reduce((sum, category) => {
    const seatCount = selectedTickets[category.id]?.length || 0;
    return sum + seatCount * category.price;
  }, 0);

  const proceedToPurchase = () => {
    if (loadingUser) {
      toast.error("User profile is still loading, please wait.");
      return;
    }
    if (!userInfo) {
      // Save current selections in localStorage before redirect
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

    // Save purchase data for confirmation page
    const purchaseData = {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      event: eventData?.name,
      categories: ticketCategories.reduce((acc, category) => {
        acc[category.name] = selectedTickets[category.id] || [];
        return acc;
      }, {} as Record<string, string[]>),
      totalTickets,
      totalPrice,
    };
    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

    toast.success("Proceeding to purchase...");
    router.push("/purchase-confirm");
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
