import Image from "next/image";
import React from "react";
import "./Css/FeatureGallary.css";

const columns = [
  ["/images/event1.jpeg", "/images/event3.jpeg", "/images/event1.jpeg"],
  ["/images/event1.jpeg", "/images/event3.jpeg", "/images/event1.jpeg"],
  ["/images/event1.jpeg", "/images/event3.jpeg", "/images/event1.jpeg"],
  ["/images/event1.jpeg", "/images/event3.jpeg", "/images/event1.jpeg"],
  ["/images/event1.jpeg", "/images/event3.jpeg", "/images/event1.jpeg"],
];

const FeaturedGallary = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto pb-10 px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Memory
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-[3px] w-10 bg-yellow-600 rounded-full" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="h-[3px] w-10 bg-neutral-800 rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
            Feature <span className="site-txt">Gallary</span>
          </h1>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto overflow-hidden rounded-3xl px-4">
        {/* Flex container: horizontal scroll on mobile, grid on md+ */}
        <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto no-scrollbar">
          {columns.slice(0, 5).map((imgs, colIdx) => (
            <div
              key={colIdx}
              // Responsive widths: full width on mobile (80vw for horizontal scroll), fixed width on md+
              className="flex-shrink-0 w-[80vw] md:w-full h-[500px] md:h-[700px] overflow-hidden rounded-xl"
            >
              <div
                className={`flex flex-col gap-4 w-full h-full ${
                  colIdx % 2 === 0
                    ? "animate-marquee-up"
                    : "animate-marquee-down"
                }`}
              >
                {[...imgs, ...imgs].map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full flex-shrink-0 h-[150px] sm:h-[200px] md:h-[300px] rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`gallery-${colIdx}-${i}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 30vw, (max-width: 1024px) 18vw, 15vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedGallary;
