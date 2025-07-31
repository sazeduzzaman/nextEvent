import React from "react";
import DynamicCount from "./DynamicCount";
import {
  CalendarCheck,
  CheckCircle,
  Users,
  Ticket,
  UserCog,
} from "lucide-react";

const stats = [
  { label: "Events Organized", value: 120, icon: CalendarCheck },
  { label: "Events Completed", value: 115, icon: CheckCircle },
  { label: "Total Users", value: 5200, icon: Users },
  { label: "Tickets Sold", value: 32450, icon: Ticket },
  { label: "Active Organizers", value: 85, icon: UserCog },
];

const NumberCounter = () => {
  return (
    <section className="py-16 site-second-bg text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className=" p-6 rounded-xl border border-yellow-600 shadow-md flex flex-col items-center"
              >
                <Icon className="w-8 h-8 text-amber-400 mb-3" />
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  <DynamicCount target={item.value} duration={2000} />
                </div>
                <p className="text-sm uppercase tracking-wide text-gray-300">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NumberCounter;
