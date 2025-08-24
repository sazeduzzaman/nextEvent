"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
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
    Record<number, Seat[]>
  >({});
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  // Fetch user profile
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

  // Fetch event seats
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
          const categories = data.event_seats.map((cat) => ({
            id: cat.seat_type_id,
            name: cat.seat_type,
            price: parseFloat(cat.seats[0]?.price || "0"),
            available: cat.seats.length,
            seats: cat.seats,
          }));
          setTicketCategories(categories);
          if (categories.length > 0) setActiveTab(categories[0].id);
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

  // Seat selection toggle (full Seat object)
  const handleSeatToggle = (categoryId: number, seat: Seat) => {
    setSelectedTickets((prev) => {
      const currentSeats = prev[categoryId] || [];
      const exists = currentSeats.find((s) => s.id === seat.id);
      const updatedSeats = exists
        ? currentSeats.filter((s) => s.id !== seat.id)
        : [...currentSeats, seat];
      return { ...prev, [categoryId]: updatedSeats };
    });
  };

  const totalTickets = Object.values(selectedTickets).reduce(
    (acc, seats) => acc + seats.length,
    0
  );

  const totalPrice = useMemo(() => {
    return ticketCategories.reduce((sum, category) => {
      const count = selectedTickets[category.id]?.length || 0;
      return sum + count * category.price;
    }, 0);
  }, [ticketCategories, selectedTickets]);

  const proceedToPurchase = () => {
    if (loadingUser) {
      toast.error("User profile loading...");
      return;
    }
    if (!userInfo) {
      toast.error("Please login to proceed");
      router.push(`/auth/login?redirect=${window.location.pathname}`);
      return;
    }
    if (totalTickets === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    // Save full order
    const order = {
      ticketCategories,
      selectedTickets,
      totalTickets,
      totalPrice,
      eventData,
      userInfo,
    };
    localStorage.setItem("stripeOrder", JSON.stringify(order));

    router.push("/checkout/stripe");
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
