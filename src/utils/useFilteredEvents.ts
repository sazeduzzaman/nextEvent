import { useState, useEffect } from "react";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

type Filters = {
  city: string;
  eventTypes: string[];
  date: Date | null;
};

const useFilteredEvents = (filters: Filters) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const allEvents = await fetchAllEvents();

      const filteredEvents = allEvents.filter((event) => {
        const cityMatch = filters.city
          ? event.venue.toLowerCase().includes(filters.city.toLowerCase())
          : true;

        const typeMatch =
          filters.eventTypes.length === 0 ||
          filters.eventTypes.includes(event.event_type) ||
          (event.event_type_data &&
            filters.eventTypes.includes(event.event_type_data.name));

        const dateMatch = filters.date
          ? (() => {
              const eventDate = new Date(event.start_date);
              const filterDate = filters.date!;
              return (
                eventDate.getFullYear() === filterDate.getFullYear() &&
                eventDate.getMonth() === filterDate.getMonth() &&
                eventDate.getDate() === filterDate.getDate()
              );
            })()
          : true;

        return cityMatch && typeMatch && dateMatch;
      });

      setEvents(filteredEvents);
      setLoading(false);
    }

    loadEvents();
  }, [filters]);

  return { events, loading };
};

export default useFilteredEvents;
