"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsClockFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import './Css/LatestEvents.css'

const eventData = [
  {
    id: 1,
    title: "UX Conference 2025: Designing for the Future",
    time: "8:00 AM – 10:00 AM",
    image: "/images/event3.jpeg",
  },
  {
    id: 2,
    title: "React Summit 2025: Build Smarter",
    time: "11:00 AM – 1:00 PM",
    image: "/images/event3.jpeg",
  },
  {
    id: 3,
    title: "Frontend Masters Meetup",
    time: "Sunday, 25 Aug, 2025",
    image: "/images/event3.jpeg",
  },
  {
    id: 4,
    title: "Design Thinking Workshop",
    time: "3:00 PM – 6:00 PM",
    image: "/images/event3.jpeg",
  },
];

const LatestEvents = () => {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-8 items-center mb-12">
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Upcoming Highlight
            </h2>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-[2px] w-10 bg-yellow-600 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="h-[2px] w-10 bg-neutral-800 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Featured Events
            </h1>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="text-white text-lg leading-relaxed">
              Explore the latest in design, development, and innovation. Join industry leaders and like-minded professionals for engaging sessions that spark creativity and foster growth.
            </p>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {eventData.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="relative h-[520px] rounded-2xl overflow-hidden group shadow-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500 transition-all duration-300">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-semibold mb-3">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-200 mb-6">
                    <BsClockFill className="text-yellow-400" />
                    <span className="ml-2">{event.time}</span>
                  </div>
                  <Link href="/" className="block w-full">
                    <button className="w-full py-2 rounded-full border border-yellow-500 bg-neutral-900 text-yellow-400 font-medium transition hover:bg-yellow-400 hover:text-black">
                      Explore Now
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestEvents;
