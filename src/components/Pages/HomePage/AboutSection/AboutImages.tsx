import Image from "next/image";
import React from "react";
import "./Css/About.css";

const AboutImages = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-center">
        {/* Left column with 2 stacked images */}
        <div className="space-y-6 sm:space-y-10">
          {/* Image 1 */}
          <div className="about-first overflow-hidden rounded-lg">
            <Image
              alt="about image 1"
              src="/images/about_1.jpg"
              width={600}
              height={600}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover w-full h-auto transform transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Image 2 */}
          <div className="about-second overflow-hidden rounded-lg">
            <Image
              alt="about image 2"
              src="/images/about_2.jpg"
              width={600}
              height={600}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover w-full h-auto transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Right column with SVG shapes and main image */}
        <div className="relative flex flex-col items-center sm:items-start space-y-6 sm:space-y-10">
          <div className="mb-4">
            <Image
              alt="decorative shape 1"
              src="/images/about-shape-1.svg"
              width={150}
              height={150}
              className="ab-round-shape-one"
              priority
            />
          </div>

          <div className="about-third overflow-hidden rounded-lg w-full max-w-md">
            <Image
              alt="about image 3"
              src="/images/about_3.png"
              width={600}
              height={600}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover w-full h-auto transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="mt-4">
            <Image
              alt="decorative shape 2"
              src="/images/about-shape-2.svg"
              width={150}
              height={150}
              className="ab-round-shape"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutImages;
