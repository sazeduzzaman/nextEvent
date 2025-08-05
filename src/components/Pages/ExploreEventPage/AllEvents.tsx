"use client";

import React from "react";
import EventsCard from "./EventsCards";
import useFilteredEvents from "@/utils/useFilteredEvents";
import Image from "next/image";

type AllEventsProps = {
  filters: {
    city: string;
    eventTypes: string[];
    date: Date | null;
  };
};

const AllEvents = ({ filters }: AllEventsProps) => {
  const { events, loading } = useFilteredEvents(filters);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/images/preloader.gif"
          alt="Loading..."
          width={100}
          height={100}
          priority
        />
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
