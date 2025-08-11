"use client";
import React, { useState } from "react";
import Image from "next/image";
import EventTimeCount from "./EventTimeCount";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import {
  formatDate,
  formatTime,
  formatFullDateWithWeekday,
} from "@/utils/dateFormatter";

type EventHeaderProps = {
  eventData: Event;
};

const EventHeader = ({ eventData }: EventHeaderProps) => {
  const formattedDate = formatFullDateWithWeekday(eventData.start_date);
  const [imgSrc, setImgSrc] = useState(`/images/${eventData.image}`);
  const backgroundImageUrl = imgSrc || "/images/featureEvents.jpg";

  return (
    <div
      className="relative py-12 md:py-20 bg-cover bg-center bg-no-repeat backdrop-blur-sm"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <img
        src={imgSrc}
        alt={eventData.name}
        onError={() => setImgSrc("/images/featureEvents.jpg")}
        className="hidden"
      />
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12">
          {/* Left Text Content */}
          <div className="md:col-span-6">
            <div className="max-w-3xl mx-auto md:mx-0 rounded-lg">
              <div className="flex items-center mb-4 md:mb-5 space-x-3">
                <Image
                  width={30}
                  height={30}
                  src="/images/download.svg"
                  alt={eventData.name}
                  className="object-cover rounded-lg"
                />
                <p className="text-sm md:text-base">{eventData.event_type}</p>
              </div>
              <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                {eventData.name}
              </h2>
              <div className="text-lg md:text-2xl space-y-4">
                <p>📅 {formattedDate}</p>
                <p>
                  📍{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      eventData.venue
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400"
                  >
                    {eventData.venue}
                  </a>
                </p>
                <p>
                  ⏰ {formatTime(eventData.start_time)} -{" "}
                  {formatTime(eventData.end_time)}
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-12 max-w-3xl mx-auto md:mx-0">
              <EventTimeCount
                time={`${formatDate(eventData.start_date)} ${
                  eventData.start_time
                }`}
                slug={eventData.slug}
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="md:col-span-6 flex justify-center md:justify-end">
            <Image
              width={350}
              height={350}
              src={imgSrc}
              alt={eventData.name}
              className="object-cover rounded-lg max-w-full h-auto"
              onError={() => setImgSrc("/images/featureEvents.jpg")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
