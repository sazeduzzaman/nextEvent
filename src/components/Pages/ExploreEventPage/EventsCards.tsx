"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import { LocationEditIcon } from "lucide-react";
// import HtmlRenderer from "@/components/HtmlRenderer/HtmlRenderer";

type EventHeaderProps = {
  event: Event;
};

const EventsCard = ({ event }: EventHeaderProps) => {
  const [imgSrc, setImgSrc] = useState(`${event.image}`);
  const formattedDate = format(new Date(event.start_date), "dd MMMM yyyy");

  return (
    <Link href={`/events/details/${event.slug}`} key={event.id}>
      <div className="bg-[#101113] rounded-lg shadow-md group overflow-hidden animate-fade-in">
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
          <div className="top-minus-badge">
            <div className="flex gap-2 justify-between items-center">
              <span className="text-xs badge text-yellow-400">
                {formattedDate}
              </span>
              <span className="text-xs badge text-yellow-400">
                {event.event_type}
              </span>
            </div>
            <h3 className="text-[20px] site-txt h-20 font-bold text-white mb-2 line-clamp-2 flex items-center">
              {event.name}
            </h3>
            {/* Date & Type */}
            <div className="flex justify-between items-center bg-[#2c2e33] site-txt  p-2 mb-3 rounded-2xl">
              <div className="">
                {/* Venue */}
                <p className="text-xs site-txt flex">
                  <LocationEditIcon className="text-4xl me-3" size={30} />
                  {event.venue}
                </p>
              </div>
            </div>

            {/* <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
              {event.description.split(" ").slice(0, 12).join(" ") + ""}
            </p> */}
            {/* <HtmlRenderer
              html={event.description}
              slice={100}
              className="text-white mb-4"
            /> */}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div>
              <SiteButtonOne text="Explore Event" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventsCard;
