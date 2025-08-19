"use client";

import React, { useEffect, useRef } from "react";
import "jarallax/dist/jarallax.css";
import "./Css/Banner.css";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import Link from "next/link";

const BannerSection = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadJarallax = async () => {
      if (typeof window !== "undefined" && bannerRef.current) {
        const { jarallax } = await import("jarallax");
        jarallax(bannerRef.current, {
          speed: 0.5,
          imgSrc: "/images/home/banner.jpg", // use background image mode for responsiveness
        });
      }
    };

    loadJarallax();
  }, []);

  return (
    <section className="section-banner relative overflow-hidden">
      <div ref={bannerRef} className="image-wrapper jarallax">
        {/* <img
          src="/images/home/banner.jpg"
          className="banner-image"
          alt="Banner"
        /> */}
        <div className="image-overlay" />
      </div>

      <div className="de-gradient-edge-bottom" />

      <div className="container content-wrapper mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white font-extrabold banner-title leading-tight">
          Where Celebration <br />
          Meets <span className="site-txt">Expertise</span>
        </h1>

        <p className="lead mt-6 max-w-full sm:max-w-xl md:max-w-2xl">
          Your Perfect Partner for Events that Entertain, Inspire, and Connect -
          At Eventa, we make events more accessible, inclusive, and meaningful.
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
