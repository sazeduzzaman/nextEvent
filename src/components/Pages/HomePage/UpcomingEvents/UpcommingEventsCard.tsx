"use client";
import React, { useState } from "react";
import SiteButtonTwo from "@/components/Buttons/SiteButtonTwo/SiteButtonTwo";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import { formatTime } from "@/utils/dateFormatter";
import HtmlRenderer from "@/components/HtmlRenderer/HtmlRenderer";

interface EventProps {
  allEvents: Event[];
}

const UpcommingEventsCard = ({ allEvents }: EventProps) => {
  const [imgSrc, setImgSrc] = useState(
    allEvents && allEvents.length > 0
      ? `${allEvents[0].image}`
      : "/images/featureEvents.jpg"
  );

  if (!Array.isArray(allEvents) || allEvents.length === 0) {
    return (
      <p className="text-center text-white py-10">No upcoming events found.</p>
    );
  }

  return (
    <div>
      {allEvents.slice(0, 1).map((event) => (
        <div
          key={event.id}
          className="max-w-4xl mx-auto bg-site-second-bg rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row items-center"
        >
          {/* Event Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end p-4">
            <Image
              width={400}
              height={400}
              src={imgSrc}
              alt={event.name}
              className="object-cover rounded-lg max-w-full h-auto"
              onError={() => setImgSrc("/images/featureEvents.jpg")}
              priority
            />
          </div>

          {/* Event Info */}
          <div className="p-6 w-full lg:w-1/2 flex flex-col justify-between space-y-4 text-white">
            <div className="flex items-center mb-5">
              <Image
                width={30}
                height={30}
                src="/images/download.svg"
                alt="Event Type Icon"
                className="object-cover rounded-lg"
              />
              <p className="pl-2 text-sm font-medium">{event.event_type}</p>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold site-txt mb-2">
                {event.name}
              </h2>
              <p className="text-lg sm:text-xl pt-2">
                ⏰ {formatTime(event.start_time)} - {formatTime(event.end_time)}
              </p>
              <p className="text-lg sm:text-xl pt-1">📍 {event.venue}</p>
              <HtmlRenderer
                html={event.description}
                slice={200}
                className="pt-5 text-base sm:text-lg text-justify line-clamp-3"
              />
            </div>

            <div className="flex mt-6">
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
