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
  };
};

const AllEvents = ({ filters }: AllEventsProps) => {
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-white text-lg font-medium">Loading events...</p>
      </div>
    );

  if (events.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-white text-lg font-medium">
          No events match the selected filters.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto mb-20">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-5">
        <h2 className="text-3xl font-bold site-txt">All Events</h2>

        <div className="text-white flex flex-wrap items-center gap-2">
          {filters.city && (
            <p className="badge border border-yellow-400 capitalize py-4">
              {filters.city}
            </p>
          )}

          {filters.eventTypes.length > 0 &&
            filters.eventTypes.map((type) => (
              <p
                key={type}
                className="badge border border-yellow-400 capitalize py-4"
              >
                {type}
              </p>
            ))}

          {filters.date && (
            <p className="badge border border-yellow-400 capitalize py-4">
              {filters.date.toLocaleDateString()}
            </p>
          )}

          {!filters.city &&
            filters.eventTypes.length === 0 &&
            !filters.date && (
              <p className="text-white text-sm opacity-70">
                No filters applied.
              </p>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="animate-fade-in">
            <EventsCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
