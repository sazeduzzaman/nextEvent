import React from "react";
import EventSidebar from "./EventSidebar";
import AllEvents from "./AllEvents";
import FeatureEvents from "./FeatureEvents";
import "./Css/Events.css";

const ExploreEventPage = () => {
  return (
    <div className="bg-black">
      <FeatureEvents />
      <div className="container mx-auto pt-15">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-3">
            <EventSidebar />
          </div>
          <div className="col-span-9">
            <AllEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreEventPage;
