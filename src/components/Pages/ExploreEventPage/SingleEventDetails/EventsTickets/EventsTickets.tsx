import React from "react";
import EventHeader from "../EventDetailsInformation/EventHeader";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

import SingleEventsSeats from "./SingleEventsSeats";

type TicketSelectionProps = {
  eventData: Event;
};

const ParentComponent = ({ eventData }: TicketSelectionProps) => {
  return (
    <div>
      <EventHeader eventData={eventData} />
      <div className="pb-20 pt-10">
        <SingleEventsSeats eventData={eventData} />
      </div>
    </div>
  );
};

export default ParentComponent;
