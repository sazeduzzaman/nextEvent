import React from "react";
import "./Css/InfoSection.css";
import { FaTicketAlt, FaUserTie } from "react-icons/fa";
import { TbSpeakerphone } from "react-icons/tb";
import { HiSpeakerphone } from "react-icons/hi";
import { RiQrCodeFill } from "react-icons/ri";

const InfoSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto pb-20">
        <div className="text-center flex justify-center items-center">
          <div className="w-fit text-center">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Just a Click Away
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
            Stress-Free <span className="site-txt">Events</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto pt-10 px-4">
        <div className="grid grid-cols-12 gap-10">
          {/* First Card */}
          <div className="col-span-12 md:col-span-4 md:col-start-3">
            <section className="flex justify-center">
              <div className="animated-border-card">
                <div className="card-content">
                  <div className="flex justify-between items-start">
                    <div>
                      <FaTicketAlt className="text-5xl mb-4 text-yellow-400" />
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        E - Ticketing
                      </h2>
                      <p className="text-md text-slate-300 leading-relaxed">
                        A streamlined online ticketing solution to enhance
                        customer experience by ensuring effortless purchases and
                        secure payment processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Second Card */}
          <div className="col-span-12 md:col-span-4 mt-30">
            <section className="flex justify-center">
              <div className="animated-border-card">
                <div className="card-content">
                  <div className="flex justify-between items-start">
                    <div>
                      <HiSpeakerphone className="text-5xl mb-4 text-yellow-400" />
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        Smart Campaigns
                      </h2>
                      <p className="text-md text-slate-300 leading-relaxed">
                        Expand customer reach with targeted SMS and email
                        marketing campaigns, engage with audience before,
                        during, and after events with personalized messages,
                        event updates and exclusive offers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-10 mt-10">
          {/* First Card */}
          <div className="col-span-12 md:col-span-4 md:col-start-3">
            <section className="flex justify-center info-up-section">
              <div className="animated-border-card">
                <div className="card-content">
                  <div className="flex justify-between items-start">
                    <div>
                      <FaUserTie className="text-5xl mb-4 text-yellow-400" />
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        RSVP Management
                      </h2>
                      <p className="text-md text-slate-300 leading-relaxed">
                        Managing guest lists with spreadsheets or forms is
                        outdated. Eventa streamlines RSVPs and event planning,
                        all in one place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Second Card */}
          <div className="col-span-12 md:col-span-4">
            <section className="flex justify-center">
              <div className="animated-border-card">
                <div className="card-content">
                  <div className="flex justify-between items-start">
                    <div>
                      <RiQrCodeFill className="text-5xl mb-4 text-yellow-400" />
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        Digital Scanner
                      </h2>
                      <p className="text-md text-slate-300 leading-relaxed">
                        Deliver a seamless event entry experience your attendees
                        with mobile-based ticket scanner streamline check-ins,
                        reduce wait times, and ensure secure, hassle-free access
                        to your events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
