import { useState, useEffect } from "react";

export type EventType = {
  id: number;
  name: string;
  slug: string;
};

type Filters = {
  city: string;
  eventTypes: string[];
  date: Date | null;
};

const useEventFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    city: "",
    eventTypes: [],
    date: null,
  });

  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  useEffect(() => {
    async function fetchEventTypes() {
      try {
        const res = await fetch(
          "https://admin.eventstailor.com/api/v1/event-types"
        );
        if (!res.ok) throw new Error("Failed to fetch event types");
        const json = await res.json();
        setEventTypes(json.data);
      } catch (error) {
        console.error("Error fetching event types:", error);
      }
    }
    fetchEventTypes();
  }, []);

  const handleCheckboxChange = (typeName: string) => {
    setFilters((prev) => {
      const types = prev.eventTypes.includes(typeName)
        ? prev.eventTypes.filter((t) => t !== typeName)
        : [...prev.eventTypes, typeName];
      return { ...prev, eventTypes: types };
    });
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      eventTypes: [],
      date: null,
    });
  };

  return {
    filters,
    setFilters,
    eventTypes,
    handleCheckboxChange,
    clearFilters,
  };
};

export default useEventFilters;
