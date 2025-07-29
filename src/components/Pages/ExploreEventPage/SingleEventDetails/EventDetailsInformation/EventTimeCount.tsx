"use client";

import React, { useEffect, useState } from "react";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  time?: string;
  slug?: string;
};

const EventTimeCount = ({ time = "April 2, 2025 18:00:00", slug }: Props) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true); // mark mounted after hydration
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(time).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isExpired: true,
        };
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return {
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        isExpired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [time, mounted]);

  const hideButton = pathname.includes("/ticket");

  // If not mounted, render a placeholder or nothing to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-gray-900 px-4 py-3 rounded-xl shadow-lg border border-yellow-400"
          >
            <span className="text-4xl font-bold text-yellow-400 tracking-wider">
              --
            </span>
            <span className="text-sm mt-1 uppercase tracking-wide text-gray-300">
              {/* Labels */}
              {["Days", "Hours", "Minutes", "Seconds"][i]}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 text-white text-center">
      {/* Countdown Timer */}
      <div className="flex gap-4">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-900 px-4 py-3 rounded-xl shadow-lg border border-yellow-400"
          >
            <span className="text-4xl font-bold text-yellow-400 tracking-wider">
              {item.value}
            </span>
            <span className="text-sm mt-1 uppercase tracking-wide text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Button Section */}
      {!hideButton && (
        <>
          {timeLeft.isExpired ? (
            <button className="bg-red-600 rounded-3xl text-white px-6 py-2 mt-4 font-semibold shadow-md hover:bg-red-700 transition">
              Event Expired
            </button>
          ) : (
            <Link href={`/events/details/${slug}/ticket`} className="mt-10">
              <SiteButtonOne text="Purchase Ticket" />
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default EventTimeCount;
