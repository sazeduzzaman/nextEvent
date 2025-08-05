"use client";

import React, { useEffect, useState } from "react";
import EventsCard from "./EventsCards";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

type AllEventsProps = {
  filters: {
    city: string;
    eventTypes: string[];
    date: Date | null;
    price: number;
  };
};

const AllEvents = ({ filters }: AllEventsProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const allEvents = await fetchAllEvents();

      // Filter locally here
      const filteredEvents = allEvents.filter((event) => {
        // city filter (case-insensitive substring match)
        const cityMatch = filters.city
          ? event.venue.toLowerCase().includes(filters.city.toLowerCase())
          : true;

        // eventTypes filter (match event_type or event_type_data.name)
        const typeMatch =
          filters.eventTypes.length === 0 ||
          filters.eventTypes.includes(event.event_type) ||
          (event.event_type_data &&
            filters.eventTypes.includes(event.event_type_data.name));
        // date filter: compare year, month, day only (ignoring time/timezone)
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

        return cityMatch && typeMatch && dateMatch; // removed priceMatch
      });

      setEvents(filteredEvents);
      setLoading(false);
    }

    loadEvents();
  }, [filters]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-white text-lg">Loading events...</p>
      </div>
    );
  if (events.length === 0)
    return <p className="text-white">No events found.</p>;

  return (
    <div className="container mx-auto mb-20">
      <div className="flex items-center gap-4 mb-5">
        <h2 className="text-3xl font-bold site-txt">All Events</h2>
        {/* Show active filters here */}
        <div className=" text-white flex items-center gap-4">
          {filters.city && (
            <p className="badge border border-yellow-400">{filters.city}</p>
          )}

          {filters.eventTypes.length > 0 && (
            <p className="badge border border-yellow-400">
              {filters.eventTypes.join(", ")}
            </p>
          )}

          {filters.date && (
            <p className="badge border border-yellow-400">
              {filters.date.toLocaleDateString()}
            </p>
          )}

          {/* If no filters active */}
          {!filters.city &&
            filters.eventTypes.length === 0 &&
            !filters.date && <p>No filters applied.</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
