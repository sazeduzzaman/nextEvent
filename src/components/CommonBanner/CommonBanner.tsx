import React from "react";
import Link from "next/link";
import "./Css/CommonBanner.css";

type BreadcrumbItem = {
  label: string;
  href?: string; // Optional for current page
};

type CommonBannerProps = {
  title: string;
  breadcrumb: BreadcrumbItem[];
};

const CommonBanner = ({ title, breadcrumb }: CommonBannerProps) => {
  return (
    <div className="common-banner">
      <div className="overlay" />
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
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
