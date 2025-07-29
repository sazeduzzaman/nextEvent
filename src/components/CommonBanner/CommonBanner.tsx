"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { jarallax } from "jarallax";
import "jarallax/dist/jarallax.css";
import "./Css/CommonBanner.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type CommonBannerProps = {
  title: string;
  breadcrumb: BreadcrumbItem[];
};

const CommonBanner = ({ title, breadcrumb }: CommonBannerProps) => {
  useEffect(() => {
    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.5,
      imgSrc: "", // don't load image via JS
    });
  }, []);

  return (
    <div className="common-banner jarallax" data-jarallax data-speed="0.5">
      <div className="overlay" />
      <div className="de-gradient-edge-bottom" />
      <div className="banner-content">
        <h1 className="common-banner-title">{title}</h1>
        <div className="breadcrumb">
          {breadcrumb.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && " / "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
