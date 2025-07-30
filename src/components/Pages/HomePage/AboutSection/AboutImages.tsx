import Image from "next/image";
import React from "react";
import "./Css/About.css";

const AboutImages = () => {
  return (
    <div>
      <div className="grid grid-cols-12 items-center gap-10">
        <div className="col-span-6 space-y-10">
          {/* Image 1 */}
          <div className="about-first">
            <Image
              height={400}
              width={400}
              alt="about image 1"
              src="/images/about_1.jpg"
              className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Image 2 */}
          <div className="about-second">
            <Image
              height={400}
              width={400}
              alt="about image 2"
              src="/images/about_2.jpg"
              className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Image 3 */}
        <div className="col-span-6">
          <div>
            <Image
              height={150}
              width={150}
              alt="about image 3"
              src="/images/about-shape-1.svg"
              className="ab-round-shape-one"
            />
          </div>
          <div className="about-third shape-box">
            <Image
              height={400}
              width={400}
              alt="about image 3"
              src="/images/about_3.png"
              className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="">
            <Image
              height={150}
              width={150}
              alt="about image 3"
              src="/images/about-shape-2.svg"
              className="ab-round-shape"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutImages;
