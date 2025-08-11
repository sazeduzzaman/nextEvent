import React from "react";
import "./Css/InfoSection.css";
import { FaTicketAlt, FaUserTie } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { RiQrCodeFill } from "react-icons/ri";

const cardData = [
  {
    icon: <FaTicketAlt className="text-5xl mb-4 text-yellow-400" />,
    title: "E - Ticketing",
    description:
      "A streamlined online ticketing solution to enhance customer experience by ensuring effortless purchases and secure payment processing.",
  },
  {
    icon: <HiSpeakerphone className="text-5xl mb-4 text-yellow-400" />,
    title: "Smart Campaigns",
    description:
      "Expand customer reach with targeted SMS and email marketing campaigns, engage with audience before, during, and after events with personalized messages, event updates and exclusive offers.",
  },
  {
    icon: <FaUserTie className="text-5xl mb-4 text-yellow-400" />,
    title: "RSVP Management",
    description:
      "Managing guest lists with spreadsheets or forms is outdated. Eventa streamlines RSVPs and event planning, all in one place.",
  },
  {
    icon: <RiQrCodeFill className="text-5xl mb-4 text-yellow-400" />,
    title: "Digital Scanner",
    description:
      "Deliver a seamless event entry experience your attendees with mobile-based ticket scanner streamline check-ins, reduce wait times, and ensure secure, hassle-free access to your events.",
  },
];

const InfoSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
        <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
          Just a Click Away
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-10">
          Stress-Free <span className="site-txt">Events</span>
        </h1>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {cardData.map(({ icon, title, description }, idx) => (
            <section key={idx} className="flex justify-center">
              <div className="animated-border-card max-w-sm w-full">
                <div className="card-content">
                  <div>
                    {icon}
                    <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
                    <p className="text-md text-slate-300 leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
