import React from "react";
import "./Css/FeatureEvents.css";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import FeatureEventsCards from "./FeatureEventsCards";

const FeatureEvents = async () => {
  const allEvents = await fetchAllEvents();

  return (
    <div className="py-20">
      <div className="container mx-auto pb-10 px-4">
        {/* Subheading */}
        <div className="grid grid-cols-12 gap-8 items-center mb-12">
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Most Popular
            </h2>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-[2px] w-10 bg-yellow-600 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="h-[2px] w-10 bg-neutral-800 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Featured Events
            </h1>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="text-white text-lg leading-relaxed">
              Explore the latest trends in design, development, and cutting-edge
              innovation. Join industry pioneers, creative thinkers, and
              like-minded professionals for a series of inspiring sessions,
              hands-on workshops, and dynamic networking opportunities that
              spark creativity, encourage collaboration, and drive personal and
              professional growth.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <FeatureEventsCards allEvents={allEvents} />
      </div>
    </div>
  );
};

export default FeatureEvents;
