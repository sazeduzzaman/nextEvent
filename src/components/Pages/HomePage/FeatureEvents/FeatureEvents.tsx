import React from "react";
import "./Css/FeatureEvents.css";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import FeatureEventsCards from "./FeatureEventsCards";

const FeatureEvents = async () => {
  const allEvents = await fetchAllEvents();

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Subheading and Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
          <div className="md:col-span-4 text-center md:text-left">
            <h2 className="text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
              Most Popular
            </h2>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="h-[2px] w-10 bg-yellow-600 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="h-[2px] w-10 bg-neutral-800 rounded-full" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Featured Events
            </h1>
          </div>

          <div className="md:col-span-8 text-center md:text-left">
            <p className="text-white text-base sm:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureEventsCards allEvents={allEvents} />
      </div>
    </section>
  );
};

export default FeatureEvents;
