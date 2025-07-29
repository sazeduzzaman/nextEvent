import EventsTickets from "@/components/Pages/ExploreEventPage/SingleEventDetails/EventsTickets/EventsTickets";
import React from "react";

export default async function page({ params }: any) {
  const { slug } = await params; // <-- no await here
  return (
    <div>
      <EventsTickets slug={slug} />
    </div>
  );
}
