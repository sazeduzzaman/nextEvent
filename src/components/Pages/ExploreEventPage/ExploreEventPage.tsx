import React from "react";
import FeatureEvents from "./FeatureEvents";
import "./Css/Events.css";
import EventsWithSidebar from "./EventsWithSidebar";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";

const ExploreEventPage = async () => {
  const allEvents = await fetchAllEvents();
  return (
    <div className="bg-black">
      <FeatureEvents allEvents={allEvents} />
      <div className="container mx-auto pt-15">
        <EventsWithSidebar />
      </div>
    </div>
  );
};

export default ExploreEventPage;
