import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import React from "react";
import UpcommingEventsCard from "./UpcommingEventsCard";

const UpcomingEvents = async () => {
  const allEvents = await fetchAllEvents();


  return (
    <div className="py-20 site-second-bg">
      <div className="container mx-auto pb-20">
        {/* Section Heading */}
        <div className="text-center flex justify-center items-center">
          <div className="w-fit text-center">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Most Recent Event
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mt-5">
            Don&apos;t <span className="site-txt px-3">Miss</span> It
          </h1>
        </div>
      </div>

      {/* Event Card */}
      <div className="container mx-auto px-4">
        <UpcommingEventsCard allEvents={allEvents}/>
      </div>
    </div>
  );
};

export default UpcomingEvents;
