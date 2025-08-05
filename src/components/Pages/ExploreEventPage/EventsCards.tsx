"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";

type EventHeaderProps = {
  event: Event;
};

const EventsCard = ({ event }: EventHeaderProps) => {
  const [imgSrc, setImgSrc] = useState(`/images/${event.image}`);
  const formattedDate = format(new Date(event.start_date), "dd MMMM yyyy");

  return (
    <Link href={`/events/details/${event.slug}`} key={event.id}>
      <div className="bg-[#101113] rounded-lg shadow-md group overflow-hidden">
        {/* Image Container */}
        <div className="relative h-[490px] w-full overflow-hidden">
          <Image
            src={imgSrc}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/images/featureEvents.jpg")}
          />
        </div>

        {/* Content */}
        <div className="p-5 bg-[#1a1b1e] rounded-b-lg">
          {/* Title & Description */}
          <div>
            <h3 className="text-xl site-txt h-16 font-bold text-white mb-2 line-clamp-2">
              {event.name}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
              {event.description.split(" ").slice(0, 20).join(" ") + ""}
            </p>
          </div>

          {/* Date & Type */}
          <div className="flex flex-wrap justify-between items-center gap-y-2">
            <div className="text-sm text-gray-400 flex items-center gap-1">
              📅 <span className="font-medium">{formattedDate}</span>
            </div>

            <span className="px-3 py-1 text-xs rounded-full bg-[#2c2e33] text-gray-200 border border-gray-600">
              {event.event_type}
            </span>
          </div>

          {/* Venue */}
          <p className="text-xs text-gray-400 mt-3 italic truncate">
            📍 {event.venue}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventsCard;
