"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";

const events = [
  {
    id: 1,
    title: "Eventa Iftar Party 2025",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim ipsum nemo tempora id! Placeat nostrum exercitationem animi modi optio!",
    thumbnail: "event1.jpeg",
    date: "Sunday, August 2, 2025",
    time: "11:30 AM - 01:00 PM",
    location: "House 39/a-2, Road 4/A, Dhanmondi, Dhaka",
  },
  {
    id: 2,
    title: "Timeless Elegance",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim ipsum nemo tempora id! Placeat nostrum exercitationem animi modi optio!",
    thumbnail: "event3.jpeg",
    date: "Sunday, August 2, 2025",
    time: "11:30 AM - 01:00 PM",
    location: "House 39/a-2, Road 4/A, Dhanmondi, Dhaka",
  },
  {
    id: 3,
    title: "Love Letter 2 Dhaka",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim ipsum nemo tempora id! Placeat nostrum exercitationem animi modi optio!",
    thumbnail: "event3.jpeg",
    date: "Sunday, August 2, 2025",
    time: "11:30 AM - 01:00 PM",
    location: "House 39/a-2, Road 4/A, Dhanmondi, Dhaka",
  },
];

const FeatureEvents = ({ allEvents }: any) => {
  console.log(allEvents, "allEvents")
  return (
    <div className="feature-image py-12">
      <div className="container mx-auto  text-white">
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
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="flex flex-col md:flex-row items-center text-gray-800 w-full max-w-3xl mx-auto  bg-opacity-90 rounded-lg p-4">
                <figure className="w-full md:w-1/3">
                  <Image
                    width={350}
                    height={350}
                    src={`/images/${event.thumbnail}`}
                    alt={event.title}
                    className="object-cover rounded-lg"
                  />
                </figure>
                <div className="p-6 w-full md:w-2/3">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 site-txt">
                    {event.title}
                  </h2>
                  <div className="text-sm site-txt mt-3 mb-4">
                    <p className="pb-1">📅 {event.date}</p>
                    <p className="pb-1">⏰ {event.time}</p>
                    <p className="pb-1">📍 {event.location}</p>
                  </div>
                  <p className="text-white mb-4">{event.description}</p>
                  <div className="pt-2">
                    <SiteButtonOne text="Explore Now" />
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
