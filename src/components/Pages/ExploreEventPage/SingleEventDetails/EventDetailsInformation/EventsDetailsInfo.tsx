"use client";
import { Event, EventSeatGroup } from "@/lib/api/AllEvents/AllEventsDataType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventDetailsInfo from "./EventDetailsInfo";
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
  console.log(eventSeats, "eventDetails");

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto">
        <EventDetailsInfo eventDataSet={eventDataSet} />
        <div>
          <h1 className="text-4xl font-bold pt-20">
            Available <span className="site-txt">Seats</span>
          </h1>
        </div>
        <div className="grid grid-cols-12 mt-10 gap-6">
          {eventSeats.map((seatGroup, id) => (
            <div
              key={id}
              className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <div className="bg-gradient-to-br from-neutral-800 to-gray-900 border border-yellow-400 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
                <div className="mb-4">
                  <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wide">
                    {seatGroup.seat_type}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {seatGroup.seats.length} seat(s) available
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Price:</span>
                    <span className="font-semibold text-green-400">
                      ${seatGroup.seats[0]?.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-white">
                    <span>Example Seat:</span>
                    <span className="font-mono">
                      {seatGroup.seats[0]?.code}
                    </span>
                  </div>
                </div>
                <Link
                  href={
                    eventDetails?.slug
                      ? `/events/details/${eventDetails.slug}/ticket`
                      : "#"
                  }
                >
                  <button
                    disabled={!eventDetails?.slug}
                    className={`mt-6 w-full py-2 rounded-xl font-bold transition duration-200 ${
                      !eventDetails?.slug
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-yellow-500 text-black hover:bg-yellow-400"
                    }`}
                  >
                    Select or View Ticket
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsDetailsInfo;
