import React from "react";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: 1,
    slug: "eventa-iftar-party",
    title: "Eventa Iftar Party",
    image: "event3.jpeg",
    date: "April 1, 2025",
    description: "Join us for a festive iftar evening in Banani.",
  },
  {
    id: 2,
    slug: "timeless-elegance",
    title: "Timeless Elegance",
    image: "event1.jpeg",
    date: "May 10, 2025",
    description: "A night of fashion, food, and music.",
  },
  {
    id: 3,
    slug: "love-letter-to-dhaka",
    title: "Love Letter to Dhaka",
    image: "event3.jpeg",
    date: "June 15, 2025",
    description: "A cultural celebration in the heart of the city.",
  },
  {
    id: 4,
    slug: "techtalks-2025",
    title: "TechTalks 2025",
    image: "event1.jpeg",
    date: "July 1, 2025",
    description: "Explore the future of technology and innovation.",
  },
  {
    id: 5,
    slug: "dhaka-food-festival",
    title: "Dhaka Food Festival",
    image: "event3.jpeg",
    date: "August 10, 2025",
    description: "Taste the best dishes from around the country.",
  },
  {
    id: 6,
    slug: "startup-expo",
    title: "Startup Expo",
    image: "event1.jpeg",
    date: "September 5, 2025",
    description: "Meet founders and explore new startups.",
  },
  {
    id: 7,
    slug: "green-earth-summit",
    title: "Green Earth Summit",
    image: "event3.jpeg",
    date: "October 20, 2025",
    description: "Discussions on sustainability and climate action.",
  },
  {
    id: 8,
    slug: "artisans-market",
    title: "Artisans Market",
    image: "event1.jpeg",
    date: "November 15, 2025",
    description: "Discover handmade crafts and unique art pieces.",
  },
  {
    id: 9,
    slug: "music-fusion-festival",
    title: "Music Fusion Festival",
    image: "event3.jpeg",
    date: "December 5, 2025",
    description: "A fusion of traditional and modern music performances.",
  },
  {
    id: 10,
    slug: "literature-week",
    title: "Literature Week",
    image: "event1.jpeg",
    date: "January 10, 2026",
    description: "Book readings, author meetups, and workshops.",
  },
  {
    id: 11,
    slug: "film-festival-2026",
    title: "Film Festival 2026",
    image: "event1.jpeg",
    date: "February 18, 2026",
    description: "Showcasing independent and international films.",
  },
  {
    id: 12,
    slug: "health-and-wellness-fair",
    title: "Health and Wellness Fair",
    image: "event3.jpeg",
    date: "March 22, 2026",
    description: "Wellness workshops, health screenings, and fitness demos.",
  },
  {
    id: 13,
    slug: "coding-marathon",
    title: "Coding Marathon",
    image: "event1.jpeg",
    date: "April 30, 2026",
    description: "Hackathon for developers to build innovative apps.",
  },
  {
    id: 14,
    slug: "street-food-carnival",
    title: "Street Food Carnival",
    image: "event3.jpeg",
    date: "May 25, 2026",
    description: "Sample the best street food from local vendors.",
  },
  {
    id: 15,
    slug: "charity-gala-night",
    title: "Charity Gala Night",
    image: "event1.jpeg",
    date: "June 10, 2026",
    description: "An elegant evening supporting local charities.",
  },
];

const AllEvents = () => {
  return (
    <div className="container mx-auto mb-20">
      <h2 className="text-3xl font-bold mb-6 site-txt">All Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link href={`/events/details/${event.slug}`} key={event.id}>
            <div className="bg-[#101113] rounded-lg shadow-md group relative overflow-hidden">
              {" "}
              {/* Moved overflow-hidden here */}
              <div className="relative">
                <Image
                  src={`/images/${event.image}`}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-80 object-cover p-3 rounded-3xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="py-3 flex items-center">
                  <div className="flex flex-col w-80">
                    <h3 className="text-2xl font-semibold site-txt mb-3">
                      {event.title}
                    </h3>
                    <p className="text-white text-lg">{event.description}</p>
                  </div>
                  <div className="w-20 text-center shadow-sm rounded-1xl bg-black p-3">
                    <div className="site-txt font-bold">
                      26 <br /> Feb
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
