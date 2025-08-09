import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import { fetchAllEvents } from "@/lib/api/AllEvents/AllEventsDataSet";
import Link from "next/link";
import React from "react";
import { formatFullDateWithWeekday } from "@/utils/dateFormatter";

const DashboardUpcomingEvents = async () => {
  const allEvents = await fetchAllEvents();

  // Filter events where is_featured === 1
  const featuredEvents = allEvents.filter((event) => event.is_featured === 1);

  return (
    <div>
      {/* Just to show total featured count */}
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

      <div className="rounded-2xl">
        <table className="w-full text-sm site-second-bg ">
          <thead>
            <tr className="border-b text-gray-500 bg-neutral-800 rounded-2xl">
              <th className="py-5 ps-3 text-left site-txt">Event</th>
              <th className="py-5 text-left site-txt">Date</th>
              <th className="py-5 text-left site-txt">Location</th>
              <th className="py-5 text-center site-txt">Action</th>
            </tr>
          </thead>
          <tbody>
            {featuredEvents.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  No featured upcoming events.
                </td>
              </tr>
            )}
            {featuredEvents.slice(0, 3).map((event) => {
              const formattedDate = formatFullDateWithWeekday(event.start_date);
              return (
                <tr key={event.id} className="border-b border-gray-500 ">
                  <td className="py-3 ps-3">{event.name}</td>
                  <td className="py-3">📅 {formattedDate}</td>
                  <td className="py-3">{event.venue}</td>
                  <td className="py-3 text-center">
                    <Link href={`/events/details/${event.slug}`}>
                      <SiteButtonOne text="View Event" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUpcomingEvents;
