import SiteButtonTwo from "@/components/Buttons/SiteButtonTwo/SiteButtonTwo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UpcomingEvents = () => {
  const event = {
    title: "Summer Beats Festival 2025",
    date: "August 15, 2025",
    time: "6:00 PM",
    location: "Dhaka Arena, Bangladesh",
    image: "/images/event1.jpeg", // Replace with your actual image path
  };

  return (
    <div className="py-20 site-second-bg">
      <div className="container mx-auto pb-20">
        {/* Section Heading */}
        <div className="text-center flex justify-center items-center">
          <div className="w-fit text-center">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Upcoming Event
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mt-5">
            Don&apos;t <span className="site-txt px-3">Miss</span> It
          </h1>
        </div>
      </div>

      {/* Event Card */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto site-second-bg  rounded-xl shadow-lg overflow-hidden lg:flex items-center">
          {/* Event Image */}
          <div className="lg:w-1/2">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>

          {/* Event Info */}
          <div className="p-6 lg:w-1/2 flex flex-col justify-between space-y-4">
            <div className="flex items-center mb-5">
              <Image
                width={30}
                height={30}
                src="/images/download.svg"
                alt="Eventa Iftar Party 2025"
                className="object-cover rounded-lg"
              />
              <p className="ps-2">Israt Karim</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold site-txt mb-2">
                {event.title}
              </h2>
              <p className="text-white text-lg pt-4">
                📅 {event.date} at {event.time}
              </p>
              <p className="text-white text-lg pt-2">📍 {event.location}</p>
              <p className="pt-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsam sit atque ullam quae. Est quae esse aut architecto. Est.</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <Link href="">
                <SiteButtonTwo text="Explore Now" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
