import React from "react";
import EventsDetailsInfo from "./EventDetailsInformation/EventsDetailsInfo";
import EventHeader from "./EventDetailsInformation/EventHeader";

type Props = {
  slug: string;
};

const EventDetails = ({ slug }: Props) => {
  console.log(slug);
  return (
    <div>
      <EventHeader slug={slug}/>
      <EventsDetailsInfo/>
    </div>
  );
};

export default EventDetails;
