import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import React from "react";
import UpcommingEventsCard from "./UpcommingEventsCard";

const UpcomingEvents = async () => {
  const allEvents = await fetchAllEvents();

  return (
    <section className="py-16 sm:py-20 site-second-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        {/* Section Heading */}
        <div className="flex justify-center items-center">
          <div className="w-fit text-center">
            <h2 className="text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
              Most Recent Event
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-5 text-center">
          Don&apos;t <span className="site-txt px-2 sm:px-3">Miss</span> It
        </h1>
      </div>

      {/* Event Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UpcommingEventsCard allEvents={allEvents} />
      </div>
    </section>
  );
};

export default UpcomingEvents;
