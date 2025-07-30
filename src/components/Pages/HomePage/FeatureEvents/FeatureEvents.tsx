"use client";

import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import './Css/FeatureEvents.css'

const images = [
  {
    src: "/images/featureEvents.jpg",
    title: "Design Conf 2025",
    desc: "Join top designers to explore the future of UX.",
  },
  {
    src: "/images/featureEvents.jpg",
    title: "React World Tour",
    desc: "Dive into the latest in React development.",
  },
  {
    src: "/images/featureEvents.jpg",
    title: "Dev Connect",
    desc: "Meet global developers, share ideas & grow.",
  },
  {
    src: "/images/featureEvents.jpg",
    title: "CodeCraft Meetup",
    desc: "Unite with engineers shaping the web future.",
  },
];

const FeatureEvents = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto pb-20 px-4">
        {/* Subheading */}
        <div className="text-center">
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Locate Our Events Place
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
            Just a Click <span className="site-txt">Away</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="w-full h-[500px] flex gap-4 overflow-hidden px-4">
          {images.map((event, i) => (
            <div
              key={i}
              className="group relative flex-1 overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:flex-[2]"
            >
              <Image
                src={event.src}
                alt={`event-${i}`}
                fill
                className="object-cover object-center transition-none"
              />
              {/* Overlay content */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 transition duration-300 flex flex-col justify-between p-6 pe-0 text-white">
                {/* Title at top */}
                <div className="flex justify-end items-end">
                  <h2 className="text-2xl font-semibold bg-black/60 w-70 ps-5 py-3 feature-locate-title">
                    {event.title}
                  </h2>
                </div>
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out">
                  <p className="text-lg mb-4">{event.desc}</p>
                  <Link href="/contact">
                    <SiteButtonOne text="Contact Us" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureEvents;
