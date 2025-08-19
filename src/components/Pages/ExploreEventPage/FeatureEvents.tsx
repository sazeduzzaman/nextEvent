"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import { format } from "date-fns";

import { formatTime } from "@/utils/dateFormatter";
import Link from "next/link";
import HtmlRenderer from "@/components/HtmlRenderer/HtmlRenderer";
type Props = {
  allEvents: Event[];
};

const FeatureEvents = ({ allEvents }: Props) => {
  const [imgSrc, setImgSrc] = useState(`${allEvents[0].image}`);
  const formattedDate = format(
    new Date(allEvents[0].start_date),
    "dd MMMM yyyy"
  );
  return (
    <div className="feature-image py-12">
      <div className="container mx-auto text-white">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {allEvents
            .slice(0, 4)
            .filter((event) => event.is_featured === 1)
            .map((event) => (
              <SwiperSlide key={event.id}>
                <div className="flex flex-col md:flex-row items-center text-gray-800 w-full max-w-3xl mx-auto bg-opacity-90 rounded-lg p-4">
                  <figure className="">
                    <Image
                      width={400}
                      height={400}
                      src={imgSrc}
                      alt={event.name}
                      className="object-cover rounded-lg"
                      onError={() => setImgSrc("/images/featureEvents.jpg")}
                    />
                  </figure>
                  <div className="p-6 w-full md:w-2/3">
                    <h2 className="text-2xl md:text-[30px] font-bold mb-2 site-txt">
                      {event.name}
                    </h2>
                    <div className="text-sm site-txt mt-3 mb-4">
                      <p className="pb-1">
                        📅 <span className="font-medium">{formattedDate}</span>
                      </p>
                      <p className="pb-1">
                        ⏰ {formatTime(event.start_time)} -{" "}
                        {formatTime(event.end_time)}
                      </p>
                      <p className="pb-1 w-75">📍 {event.venue}</p>
                    </div>
                    <HtmlRenderer
                      html={event.description}
                      slice={200}
                      className="text-white mb-4"
                    />
                    <div className="pt-2">
                      <Link
                        href={`/events/details/${event.slug}`}
                        key={event.id}
                      >
                        <SiteButtonOne text="Explore Now" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureEvents;
