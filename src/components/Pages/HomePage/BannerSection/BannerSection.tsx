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
          imgElement: "img",
        });
      }
    };

    loadJarallax();
  }, []);

  return (
    <section className="relative overflow-hidden section-banner">
      <div ref={bannerRef} className="image-wrapper jarallax">
        <img
          src="/images/home/banner.jpg"
          className="banner-image"
          alt="Banner"
        />
        <div className="image-overlay" />
      </div>

      <div className="de-gradient-edge-bottom" />
      <div className="container content-wrapper mx-auto">
        <h1 className="text-white banner-title">
          Where Celebration <br />
          Meets <span className="site-color">Expertise</span>
        </h1>
        <p className="lead w-1/2 text-white mt-10 text-2xl">
          Your Perfect Partner for Events that Entertain, Inspire, and Connect -
          At Eventa, we make events more accessible, inclusive, and meaningful.
          Host your first event or get tickets to events happening near you!
        </p>
        <div className="mt-10">
          <Link href={"/"}>
            <SiteButtonOne text="Explore Events" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
