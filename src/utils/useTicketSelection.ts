// hooks/useTicketSelection.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type {
  Event,
  EventSeatGroup,
  Seat,
} from "@/lib/api/AllEvents/AllEventsDataType";

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

export function useTicketSelection({ eventData }: UseTicketSelectionProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedTickets, setSelectedTickets] = useState<Record<number, string[]>>(
    {}
  );
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    if (totalTickets === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    const userInfo = {
      name: "Sazeduzzaman Saju",
      email: "szamansaju@gmail.com",
      phone: "01576614451",
    };

    const purchaseData = {
      ...userInfo,
      event: eventData.name,
      categories: Object.entries(selectedTickets).reduce(
        (acc, [catId, seats]) => {
          const cat = ticketCategories.find((c) => c.id === Number(catId));
          if (seats.length > 0 && cat) {
            acc[cat.name] = seats;
          }
          return acc;
        },
        {} as Record<string, string[]>
      ),
      totalTickets,
      totalPrice,
    };

    sessionStorage.setItem("purchaseData", JSON.stringify(purchaseData));
    toast.success("Purchase data ready! Redirecting...");
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
  };
}
