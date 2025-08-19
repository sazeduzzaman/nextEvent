"use client";
import React, { useState } from "react";
import Image from "next/image";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import Link from "next/link";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import HtmlRenderer from "@/components/HtmlRenderer/HtmlRenderer";

interface EventProps {
  allEvents: Event[];
}

const FeatureEventsCards = ({ allEvents }: EventProps) => {
  // Track fallback images per event index, so each can fallback separately
  const [imgErrorIndices, setImgErrorIndices] = useState<Set<number>>(
    new Set()
  );

  const handleImgError = (index: number) => {
    setImgErrorIndices((prev) => new Set(prev).add(index));
  };
const eventsToShow = [];

for (let i = 0; i < 4; i++) {
  eventsToShow.push(allEvents[i % allEvents.length]);
}
  return (
    <div>
      {/* Show only desktop */}
      <div className="w-full h-[400px] sm:h-[500px] flex gap-4 overflow-hidden px-4 sm:px-0 event-show-desktop">
        {eventsToShow.map((event, i) => {
          const imgSrc = imgErrorIndices.has(i)
            ? "/images/featureEvents.jpg"
            : `${event.image}`;

          return (
            <div
              key={`${event.id}-${i}`}
              className="group relative flex-1 overflow-hidden rounded-2xl transition-all duration-500 ease-in-out 
                hover:flex-[2] sm:hover:flex-[2] flex-shrink-0"
              style={{ minWidth: 0 }} // important for flex children text truncation
            >
              <Link
                href={`/events/details/${event.slug}`}
                aria-label={`Explore details for ${event.name}`}
              >
                <Image
                  src={imgSrc}
                  alt={event.name}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  onError={() => handleImgError(i)}
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 25vw, 20vw"
                  priority={i === 0} // prioritize first image
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 transition duration-300 flex flex-col justify-between p-6 pr-0 text-white">
                  {/* Title at top */}
                  <div className="flex justify-end items-end">
                    <h2 className="text-lg sm:text-xl font-semibold bg-black/60 w-full max-w-[18rem] sm:max-w-[22rem] ps-5 py-3 site-txt feature-locate-title truncate">
                      {event.name}
                    </h2>
                  </div>
                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out max-w-[18rem] sm:max-w-[22rem]">
                    <HtmlRenderer
                      html={event.description}
                      slice={200}
                      className="mb-5 text-base sm:text-lg text-justify line-clamp-3"
                    />
                    <div className="mt-5">
                      <SiteButtonOne text="Explore Event" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* Show only desktop end*/}
      {/* Show only mobile  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-0 event-show-mobile">
        {allEvents.slice(0, 4).map((event, i) => {
          const imgSrc = imgErrorIndices.has(i)
            ? "/images/featureEvents.jpg"
            : `${event.image}`;

          return (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 ease-in-out"
            >
              <Link
                href={`/events/details/${event.slug}`}
                aria-label={`Explore details for ${event.name}`}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={imgSrc}
                    alt={event.name}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImgError(i)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={i === 0}
                  />
                </div>

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 transition duration-300 flex flex-col justify-between p-6 text-white">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-semibold bg-black/60 p-3 site-txt truncate">
                    {event.name}
                  </h2>

                  {/* Hover content */}
                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out">
                    <HtmlRenderer
                      html={event.description}
                      slice={200}
                      className="text-sm sm:text-base mb-4 line-clamp-3"
                    />
                    <SiteButtonOne text="Explore Event" />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* Show only mobile End */}
    </div>
  );
};

export default FeatureEventsCards;
