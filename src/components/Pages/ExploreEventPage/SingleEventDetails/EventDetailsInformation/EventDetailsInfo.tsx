"use client";

import HtmlRenderer from "@/components/HtmlRenderer/HtmlRenderer";
import { CalendarDays, Clock, Clock1, Clock10 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
  FaPlayCircle,
} from "react-icons/fa";

interface EventHeaderProps {
  eventDataSet: any;
}

const EventDetailsInfo = ({ eventDataSet }: EventHeaderProps) => {
  const [imageError, setImageError] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fallbackImage = "/images/event-banner.png";
  const imageUrl = eventDataSet?.banner_image;
  const imageUrlimage = eventDataSet?.image;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "";
    const parts = timeString.split(":");
    if (parts.length < 2) return timeString;
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section className="w-full text-white">
      {/* About the Event */}
      <div className="space-y-3 mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-yellow-500 pl-3">
          About the Event
        </h2>

        <HtmlRenderer
          html={
            eventDataSet.description
              ? showFullDescription
                ? eventDataSet.description
                : `${eventDataSet.description.slice(0, 250)}${
                    eventDataSet.description.length > 250 ? "..." : ""
                  }`
              : ""
          }
          className="text-gray-300 text-base leading-relaxed whitespace-pre-line"
        />

        {eventDataSet.description && eventDataSet.description.length > 250 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-yellow-500 font-semibold hover:underline cursor-pointer"
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Banner */}
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg mb-12">
        <Image
          src={imageError || !imageUrl ? fallbackImage : imageUrl}
          alt={eventDataSet?.name || "Event Banner"}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end px-6 pb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            {eventDataSet.name}
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-300 italic">
            {eventDataSet.tagline}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
              {eventDataSet.event_type}
            </span>
            {eventDataSet.age_restriction && (
              <span className="bg-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                Age: {eventDataSet.age_restriction}+
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Event Metadata Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
        {/* Dates & Times */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-3">
            <FaCalendarAlt className="text-yellow-400" />
            <span className="font-medium">Event Dates & Time</span>
          </p>
          <div className="grid grid-cols-2 gap-6 text-white">
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Start:</p>
              <p className="font-medium">
                {formatDate(eventDataSet.start_date)}
                <span className="flex items-center gap-1">
                  <Clock1 className="site-txt" />
                  {formatTime(eventDataSet.start_time)}
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">End:</p>
              <p className="font-medium">
                {formatDate(eventDataSet.end_date)}{" "}
                <span className="flex items-center gap-1">
                  <Clock1 className="site-txt" />
                  {formatTime(eventDataSet.end_time)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-1">
            <FaMapMarkerAlt className="text-green-400" />
            <span className="font-medium">Venue</span>
          </p>
          <a
            href={eventDataSet.location_map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-white font-semibold hover:underline"
          >
            {eventDataSet.venue}
          </a>
        </div>

        {/* Organizer */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-1">
            <FaUser className="text-blue-400" />
            <span className="font-medium">Organizer</span>
          </p>
          <p className="mt-1 text-white font-semibold">
            {eventDataSet.organizer_name}
          </p>
        </div>

        {/* Capacity */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-1">
            <FaUsers className="text-pink-400" />
            <span className="font-medium">Capacity</span>
          </p>
          <span className="mt-1 inline-block text-white font-semibold">
            {eventDataSet.total_capacity}
          </span>
        </div>

        {/* Brand */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-1">
            🏷️ <span className="font-medium">Brand</span>
          </p>
          <p className="mt-1 text-white font-semibold">
            {eventDataSet.organizer_brand}
          </p>
        </div>

        {/* Purchase Deadline */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-1">
            ⏰ <span className="font-medium">Purchase Deadline</span>
          </p>
          <p className="mt-1 text-white font-semibold">
            {formatDate(eventDataSet.purchase_deadline)}
          </p>
        </div>
      </div>

      {/* Teaser Video */}
      <div
        className="relative w-full h-80 rounded-2xl overflow-hidden flex items-center justify-center mb-12"
        style={{
          backgroundImage: `url(${
            imageError || !imageUrlimage ? fallbackImage : imageUrlimage
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <a
          href={eventDataSet.video_teaser_url || "https://www.youtube.com/"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 group"
        >
          {/* Sonar Effect */}
          <div className="absolute -inset-2 rounded-full bg-yellow-500 opacity-40 blur-lg animate-ping" />
          {/* Play Button */}
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold text-base shadow-lg hover:bg-yellow-600 transition transform group-hover:scale-105">
            <FaPlayCircle className="text-xl animate-pulse" />
            Watch Teaser
          </div>
        </a>
      </div>
    </section>
  );
};

export default EventDetailsInfo;
