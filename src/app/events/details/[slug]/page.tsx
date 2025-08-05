import EventDetails from "@/components/Pages/ExploreEventPage/SingleEventDetails/EventDetails";
import React from "react";

export default async function page({ params }: any) {
  const { slug } = await params; // <-- no await here

  const res = await fetch(
    `https://admin.eventstailor.com/api/v1/event-details/${slug}`,
    {
      next: { revalidate: 1 }, // force no caching
    }
  );
  const json = await res.json();
  const eventData = json.event_details;
  console.log(eventData, "json");

  return (
    <div>
      <EventDetails eventData={eventData} />
    </div>
  );
}
