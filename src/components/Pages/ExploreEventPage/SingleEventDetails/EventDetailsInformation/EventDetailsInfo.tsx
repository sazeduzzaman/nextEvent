import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
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
  const fallbackImage = "/images/event-banner.png";
  const imageUrl = eventDataSet?.banner_image;
  const imageUrlimage = eventDataSet?.image;

  return (
    <section className="w-full text-white">
      {/* About the Event */}
      <div className="space-y-3 mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-yellow-500 pl-3">
          About the Event
        </h2>
        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
          {eventDataSet.description}
        </p>
      </div>
      {/* Banner */}
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={imageError || !imageUrl ? fallbackImage : imageUrl}
          alt={eventDataSet?.name || "Event Banner"}
          fill
          priority
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
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

      {/* Main Info */}
      <div className="mt-12 space-y-10">
        {/* Event Metadata Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Individual Info Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-400" />
              <span className="font-medium">Event Dates:</span>
            </p>
            <p className="mt-1 text-white font-semibold">
              {eventDataSet.start_date} — {eventDataSet.end_date}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-400" />
              <span className="font-medium">Venue:</span>
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

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <FaUser className="text-blue-400" />
              <span className="font-medium">Organizer:</span>
            </p>
            <p className="mt-1 text-white font-semibold">
              {eventDataSet.organizer_name}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <FaUsers className="text-pink-400" />
              <span className="font-medium">Capacity:</span>
            </p>
            <span className="mt-1 inline-block text-white font-semibold">
              {eventDataSet.total_capacity}
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              🏷️ <span className="font-medium">Brand:</span>
            </p>
            <p className="mt-1 text-white font-semibold">
              {eventDataSet.organizer_brand}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              ⏰ <span className="font-medium">Purchase Deadline:</span>
            </p>
            <p className="mt-1 text-white font-semibold">
              {eventDataSet.purchase_deadline}
            </p>
          </div>
        </div>

        {/* Teaser Video Button */}
        {eventDataSet.video_teaser_url && (
          <div
            className="relative w-full h-80 rounded-2xl overflow-hidden flex items-center justify-center mt-10"
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
              href={eventDataSet.video_teaser_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 group"
            >
              {/* Sonar Effect */}
              <div className="absolute -inset-2 rounded-full bg-yellow-500 opacity-40 blur-lg animate-ping" />

              {/* Button */}
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold text-base shadow-lg hover:bg-yellow-600 transition">
                <FaPlayCircle className="text-xl animate-pulse" />
                Watch Teaser
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetailsInfo;
