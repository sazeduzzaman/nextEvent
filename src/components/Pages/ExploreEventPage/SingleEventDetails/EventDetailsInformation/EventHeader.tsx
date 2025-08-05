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
      className="relative py-20 bg-cover bg-center bg-no-repeat backdrop-blur-sm"
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
      <div className="relative z-10 container mx-auto text-white ">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-6">
            <div className="w-full max-w-3xl mx-auto rounded-lg p-6 px-0">
              <div className="flex items-center mb-5">
                <Image
                  width={30}
                  height={30}
                  src="/images/download.svg"
                  alt={eventData.name}
                  className="object-cover rounded-lg"
                />
                <p className="ps-2">{eventData.event_type}</p>
              </div>
              <h2 className="text-2xl md:text-6xl font-bold mb-2 site-txt">
                {eventData.name}
              </h2>
              <div className="text-2xl site-txt mt-10 mb-4">
                <p className="pb-4">📅{formattedDate}</p>
                <p className="pb-4">
                  📍
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      eventData.venue
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eventData.venue}
                  </a>
                </p>
                <p className="pb-4">
                  ⏰ {formatTime(eventData.start_time)} -{" "}
                  {formatTime(eventData.end_time)}
                </p>
              </div>
            </div>
            <div>
              <EventTimeCount
                time={`${formatDate(eventData.start_date)} ${
                  eventData.start_time
                }`}
                slug={eventData.slug}
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex justify-end">
              <Image
                width={350}
                height={350}
                src={imgSrc}
                alt={eventData.name}
                className="object-cover rounded-lg"
                onError={() => setImgSrc("/images/featureEvents.jpg")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
