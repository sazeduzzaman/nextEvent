import React from "react";
import EventsDetailsInfo from "./EventDetailsInformation/EventsDetailsInfo";
import EventHeader from "./EventDetailsInformation/EventHeader";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

type Props = {
  eventData: Event;
};

const EventDetails = ({ eventData }: Props) => {
  return (
    <div>
      <EventHeader eventData={eventData} />
      <EventsDetailsInfo eventData={eventData} />
    </div>
  );
};

export default EventDetails;
