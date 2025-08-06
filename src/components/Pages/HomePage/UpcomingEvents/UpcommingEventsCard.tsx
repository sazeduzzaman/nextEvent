"use client";
import React, { useState } from "react";
import SiteButtonTwo from "@/components/Buttons/SiteButtonTwo/SiteButtonTwo";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import { formatTime } from "@/utils/dateFormatter";
interface EventProps {
  allEvents: Event[];
}

const UpcommingEventsCard = ({ allEvents }: EventProps) => {
  const [imgSrc, setImgSrc] = useState(`/images/${allEvents[0].image}`);
  return (
    <div>
      {Array.isArray(allEvents) &&
        allEvents.length > 0 &&
        allEvents.slice(0, 1).map((event) => (
          <div
            className="max-w-4xl mx-auto site-second-bg  rounded-xl shadow-lg overflow-hidden lg:flex items-center"
            key={event.id}
          >
            {/* Event Image */}
            <div className="lg:w-2/4 flex justify-end">
              <Image
                width={350}
                height={350}
                src={imgSrc}
                alt={event.name}
                className="object-cover rounded-lg"
                onError={() => setImgSrc("/images/featureEvents.jpg")}
              />
            </div>

            {/* Event Info */}
            <div className="p-6 lg:w-1/2 flex flex-col justify-between space-y-4">
              <div className="flex items-center mb-5">
                <Image
                  width={30}
                  height={30}
                  src="/images/download.svg"
                  alt="Eventa Iftar Party 2025"
                  className="object-cover rounded-lg"
                />
                <p className="ps-2">{event.event_type}</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold site-txt mb-2">
                  {event.name}
                </h2>
                <p className="text-white text-lg pt-4">
                  ⏰ {formatTime(event.start_time)} -{" "}
                  {formatTime(event.end_time)}
                </p>
                <p className="text-white text-lg pt-2">📍 {event.venue}</p>
                <p className="pt-5">
                  {event.description.split(" ").slice(0, 15).join(" ") + ""}
                </p>
              </div>

              <div className="flex space-x-4 mt-6">
                <Link href={`/events/details/${event.slug}`}>
                  <SiteButtonTwo text="Explore Now" />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UpcommingEventsCard;
