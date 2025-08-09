import { Event, EventSeatGroup } from "@/lib/api/AllEvents/AllEventsDataType";
import Link from "next/link";
import React from "react";

interface EventSeatsProps {
  eventSeats: EventSeatGroup[];
  eventDetails: Event | null;
}
const EventsDetailsSeat = ({ eventSeats, eventDetails }: EventSeatsProps) => {
  return (
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
                <span className="font-mono">{seatGroup.seats[0]?.code}</span>
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
                Select or View Seats
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsDetailsSeat;
