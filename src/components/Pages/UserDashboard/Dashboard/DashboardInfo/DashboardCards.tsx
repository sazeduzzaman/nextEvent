import React from "react";
import { Ticket, Calendar, Clock, Layers } from "lucide-react";
import { Event } from "@/lib/api/AllEvents/AllEventsDataType";
import DashboardUpcomingEvents from "./DashboardUpcomingEvents";

interface UserProps {
  events: Event[];
}
const Dashboard = async ({ events }: UserProps) => {
  return (
    <div className="space-y-8">
      {/* ==== Top Stat Cards ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Purchased Tickets */}
        <div className="p-5 py-10 site-second-bg rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
          <div>
            <Ticket className="bg-blue-100 p-3 rounded-full text-blue-600 w-10 h-10" />
            <p className="text-sm text-gray-500 mt-2">Purchased Tickets</p>
          </div>
          <h3 className="text-5xl font-bold site-txt">8</h3>
        </div>

        {/* Upcoming Events */}
        <div className="p-5 py-10 site-second-bg rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
          <div>
            <Calendar className="bg-green-100 p-3 rounded-full text-green-600 w-10 h-10" />
            <p className="text-sm text-gray-500 mt-2">Upcoming Events</p>
          </div>
          <h3 className="text-5xl font-bold site-txt">3</h3>
        </div>

        {/* Expired Tickets */}
        <div className="p-5 py-10 site-second-bg rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
          <div>
            <Clock className="bg-red-100 p-3 rounded-full text-red-600 w-10 h-10" />
            <p className="text-sm text-gray-500 mt-2">Expired Tickets</p>
          </div>
          <h3 className="text-5xl font-bold site-txt">2</h3>
        </div>

        {/* Total Purchased */}
        <div className="p-5 py-10 site-second-bg rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
          <div>
            <Layers className="bg-purple-100 p-3 rounded-full text-purple-600 w-10 h-10" />
            <p className="text-sm text-gray-500 mt-2">Total Purchased</p>
          </div>
          <h3 className="text-5xl font-bold site-txt">15</h3>
        </div>
      </div>

      {/* ==== Upcoming Events ==== */}
      <DashboardUpcomingEvents />
    </div>
  );
};

export default Dashboard;
