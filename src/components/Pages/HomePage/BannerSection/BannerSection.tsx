"use client";

import React, { useEffect, useRef } from "react";
import "jarallax/dist/jarallax.css";
import "./Css/Banner.css";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import Link from "next/link";

const BannerSection: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadJarallax = async () => {
      if (typeof window !== "undefined" && bannerRef.current) {
        const { jarallax } = await import("jarallax");
        jarallax(bannerRef.current, {
          speed: 0.5,
          imgSrc: "/images/home/banner.jpg",
        });
      }
    };
    loadJarallax();
  }, []);

  return (
    <section className="section-banner relative overflow-hidden h-[80vh] md:h-[90vh]">
      {/* Parallax Background */}
      <div ref={bannerRef} className="image-wrapper jarallax">
        <div className="image-overlay absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Gradient Edge Bottom */}
      <div className="de-gradient-edge-bottom absolute bottom-0 w-full h-16" />

      {/* Content */}
      <div className="container content-wrapper mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col justify-center h-full">
        <h1 className="text-white font-extrabold banner-title leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Where Celebration <br />
          Meets <span className="site-txt">Expertise</span>
        </h1>

        <p className="lead mt-6 max-w-full sm:max-w-xl md:max-w-2xl text-white/90 text-base sm:text-lg md:text-xl">
          Your Perfect Partner for Events that Entertain, Inspire, and Connect. 
          At Eventa, we make events accessible, inclusive, and meaningful.
          Host your first event or get tickets to events happening near you!
        </p>

        <div className="mt-8">
          <Link href="/">
            <SiteButtonOne text="Explore Events" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
