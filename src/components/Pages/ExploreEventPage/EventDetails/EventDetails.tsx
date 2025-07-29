import React from "react";
import EventHeader from "./EventHeader";
import EventsDetailsInfo from "./EventsDetailsInfo";

type Props = {
  slug: string;
};

const EventDetails = ({ slug }: Props) => {
  console.log(slug);
  return (
    <div>
      <EventHeader />
      <EventsDetailsInfo/>
    </div>
  );
};

export default EventDetails;
