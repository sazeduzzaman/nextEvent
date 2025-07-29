import React from "react";
import Image from "next/image";
import EventTimeCount from "./EventTimeCount";

type EventHeaderProps = {
  slug: string;
};
const EventHeader = ({ slug }: EventHeaderProps) => {
  return (
    <div
      className="relative py-20 bg-cover bg-center bg-no-repeat backdrop-blur-sm"
      style={{ backgroundImage: "url('/images/event1.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-white ">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-6">
            <div className="w-full max-w-3xl mx-auto rounded-xl p-6 px-0">
              <div className="flex items-center mb-5">
                <Image
                  width={30}
                  height={30}
                  src="/images/download.svg"
                  alt="Eventa Iftar Party 2025"
                  className="object-cover rounded-xl"
                />
                <p className="ps-2">Israt Karim</p>
              </div>
              <h2 className="text-2xl md:text-6xl font-bold mb-2 site-txt">
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h2>
              <div className="text-2xl site-txt mt-10 mb-4">
                <p className="pb-4">📅Sunday, August 2, 2025</p>
                <p className="pb-4">
                  📍House 39/a-2, Road 4/A, Dhanmondi, Dhaka
                </p>
                <p className="pb-4">⏰11:30 AM - 01:00 PM</p>
              </div>
            </div>
            <div>
              <EventTimeCount time="August 2, 2025 18:00:00" slug={slug} />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex justify-end">
              <Image
                width={350}
                height={350}
                src="/images/event1.jpeg"
                alt="Eventa Iftar Party 2025"
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
