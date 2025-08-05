import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import React from "react";
type EventHeaderProps = {
  eventData: Event;
};
const EventsDetailsInfo = ({ eventData }: EventHeaderProps) => {
  console.log(eventData.slug, "eventData");
  return (
    <div className="bg-black">
      <div className="container mx-auto py-20 text-white">
        <h1>{eventData.name}</h1>
        <p>{eventData.tagline}</p>
        {eventData.description}
      </div>
    </div>
  );
};

export default EventsDetailsInfo;
