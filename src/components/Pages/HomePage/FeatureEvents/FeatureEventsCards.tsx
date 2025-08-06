"use client";
import React, { useState } from "react";
import Image from "next/image";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import Link from "next/link";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
interface EventProps {
  allEvents: Event[];
}
const FeatureEventsCards = ({ allEvents }: EventProps) => {
  const [imgSrc, setImgSrc] = useState(`/images/${allEvents[0].image}`);
  return (
    <div>
      <div className="w-full h-[500px] flex gap-4 overflow-hidden px-4">
        {allEvents.slice(0, 4).map((event, i) => (
          <div
            key={i}
            className="group relative flex-1 overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:flex-[2]"
          >
            <Link href={`/events/details/${event.slug}`}>
              <Image
                src={imgSrc}
                alt={event.name}
                fill
                className="object-cover object-center transition-none"
                onError={() => setImgSrc("/images/featureEvents.jpg")}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 transition duration-300 flex flex-col justify-between p-6 pe-0 text-white">
                {/* Title at top */}
                <div className="flex justify-end items-end">
                  <h2 className="text-1xl font-semibold bg-black/60 w-70 ps-5 py-3 site-txt feature-locate-title">
                    {event.name}
                  </h2>
                </div>
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out">
                  <p className="text-lg mb-4">{event.description}</p>
                  <SiteButtonOne text="Explore Event" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureEventsCards;
