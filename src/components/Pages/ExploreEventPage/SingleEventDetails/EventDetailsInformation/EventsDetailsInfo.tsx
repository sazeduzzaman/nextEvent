"use client";
import { Event, EventSeatGroup } from "@/lib/api/AllEvents/AllEventsDataType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventDetailsInfo from "./EventDetailsInfo";
import EventsDetailsSeat from "./EventsDetailsSeat";
import EventsDetailsGallery from "./EventsDetailsGallery";
type EventHeaderProps = {
  eventData: Event;
};
const EventsDetailsInfo = ({ eventData }: EventHeaderProps) => {
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [eventSeats, setEventSeats] = useState<EventSeatGroup[]>([]);
  const [eventDataSet, setEventDataSet] = useState<EventSeatGroup[]>([]);

  useEffect(() => {
    if (!eventData?.slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://admin.eventstailor.com/api/v1/event-details/${eventData.slug}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log("Fetched Event Data:", data);
        setEventDetails(data.event_details); // Save to state
        setEventSeats(data.event_seats); // Save to state
        setEventDataSet(data.event_details);
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };

    fetchData();
  }, [eventData?.slug]);

  // Now you can log eventSeats here or use it in JSX
  console.log(eventDetails, "eventDetails asdasdasdasd");

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto">
        <EventDetailsInfo eventDataSet={eventDataSet} />
        <div>
          <h1 className="text-4xl font-bold pt-20">
            Available <span className="site-txt">Seats</span>
          </h1>
        </div>
        <EventsDetailsSeat
          eventSeats={eventSeats}
          eventDetails={eventDetails}
        />
        <div className="pb-10">
          <h1 className="text-4xl font-bold pt-20">
            Event <span className="site-txt">Gallery</span> Highlights
          </h1>
        </div>
        <EventsDetailsGallery />
      </div>
    </div>
  );
};

export default EventsDetailsInfo;
