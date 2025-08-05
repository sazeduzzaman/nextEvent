import React from "react";
import FeatureEvents from "./FeatureEvents";
import "./Css/Events.css";
import EventsWithSidebar from "./EventsWithSidebar";

const ExploreEventPage = () => {
  return (
    <div className="bg-black">
      <FeatureEvents />
      <div className="container mx-auto pt-15">
        <EventsWithSidebar />
      </div>
    </div>
  );
};

export default ExploreEventPage;
