import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    value: "123 Main Street, Dhaka, Bangladesh",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 123 456 789",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@example.com",
  },
];

const ContactInfo = () => {
  return (
    <div className="site-second-bg text-white rounded-xl p-8 shadow-lg mb-8">
      <h2 className="text-3xl font-bold mb-6 text-amber-400">Contact Information</h2>

      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-amber-400/20 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">{item.title}</p>
                <p className="text-base font-medium">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
