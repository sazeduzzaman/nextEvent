import SiteButtonTwo from "@/components/Buttons/SiteButtonTwo/SiteButtonTwo";
import Link from "next/link";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { RiUserLocationLine } from "react-icons/ri";
import AboutImages from "./AboutImages";

const AboutSection = () => {
  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-12 gap-20 items-center">
        <div className="col-span-7">
          <AboutImages />
        </div>
        <div className="col-span-5">
          <div>
            <div className="w-fit text-center">
              <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
                We Create Things
              </h2>
              <div className="flex items-center justify-start space-x-2">
                <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
              </div>
            </div>

            <h1 className="text-6xl font-bold pt-10">
              About The <span className="site-txt">Event</span>
            </h1>
            <p className="pt-10 text-lg text-justify">
              The world's best creatives in the tech sector are cordially
              invited to come learn, grow, fall flat, try new things, be
              vulnerable, and embark on incredible journeys. Meet and network
              with professionals from various fields. <br /> <br /> Join us for
              an extraordinary experience at our upcoming Product Design
              Improvement Workshop! This event brings together creative minds,
              industry experts, and passionate professionals to explore the
              latest trends, share innovative ideas, and collaboratively enhance
              product designs. Gain knowledge from top industry professionals
              and thought leaders
            </p>
            <div className="mt-10">
              <Link href="/">
                <SiteButtonTwo text="Contact Us" />
              </Link>
            </div>
            <div className="mt-10">
              <hr className="mx-auto border-t-[0.5px] border-gray-700" />
            </div>
            <div className="mt-10 flex justify-between text-center items-center gap-10">
              <div className="flex items-center">
                <IoCalendarOutline className="text-6xl site-txt ring rounded-full p-3 bg-neutral-800" />
                <div className="text-start ms-3">
                  <h1 className="text-1xl">When start</h1>
                  <p className="site-txt">21th - 24th February</p>
                </div>
              </div>
              <div className="flex items-center">
                <RiUserLocationLine className="text-6xl site-txt ring rounded-full p-3 bg-neutral-800" />
                <div className="text-start ms-3">
                  <h1 className="text-1xl">Where</h1>
                  <p className="site-txt">21th - 24th February</p>
                </div>
              </div>
              <div className="flex items-center">
                <IoCalendarOutline className="text-6xl site-txt ring rounded-full p-3 bg-neutral-800" />
                <div className="text-start ms-3">
                  <h1 className="text-1xl">When start</h1>
                  <p className="site-txt">21th - 24th February</p>
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
