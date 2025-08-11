import SiteButtonTwo from "@/components/Buttons/SiteButtonTwo/SiteButtonTwo";
import Link from "next/link";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import AboutImages from "./AboutImages";

const AboutSection = () => {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-7">
          <AboutImages />
        </div>

        <div className="lg:col-span-5">
          <div>
            <div className="w-fit mx-auto lg:mx-0 text-center lg:text-left">
              <h2 className="text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
                We Create Things
              </h2>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold pt-8 lg:pt-10 text-center lg:text-left">
              About The <span className="site-txt">Event</span>
            </h1>

            <p className="pt-6 sm:pt-10 text-base sm:text-lg lg:text-xl text-justify max-w-full lg:max-w-lg mx-auto lg:mx-0">
              The world's best creatives in the tech sector are cordially
              invited to come learn, grow, fall flat, try new things, be
              vulnerable, and embark on incredible journeys. Meet and network
              with professionals from various fields. <br />
              <br />
              Join us for an extraordinary experience at our upcoming Product
              Design Improvement Workshop! This event brings together creative
              minds, industry experts, and passionate professionals to explore
              the latest trends, share innovative ideas, and collaboratively
              enhance product designs. Gain knowledge from top industry
              professionals and thought leaders
            </p>

            <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
              <Link href="/">
                <SiteButtonTwo text="Contact Us" />
              </Link>
            </div>

            <div className="mt-10">
              <hr className="mx-auto lg:mx-0 border-t-[0.5px] border-gray-700" />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-between gap-8 sm:gap-10 text-center">
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <IoCalendarOutline className="text-6xl site-txt ring rounded-full p-3 bg-neutral-800" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold">When start</h3>
                  <p className="site-txt">21th - 24th February</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4">
                <RiUserLocationLine className="text-6xl site-txt ring rounded-full p-3 bg-neutral-800" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Where</h3>
                  <p className="site-txt">Venue Location Here</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4">
                <IoCalendarOutline className="text-6xl site-txt ring rounded-full p-3 bg-neutral-800" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Duration</h3>
                  <p className="site-txt">4 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
