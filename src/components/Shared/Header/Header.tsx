"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import TopBar from "./TopBar";
import "./Css/Header.css";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import useStickyHeader from "@/utils/useStickyHeader";

const Header = ({ siteInfo }: any) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isSticky, isVisible } = useStickyHeader();
  return (
    <div
      className={`header-main ${!isHome ? "header-dark" : ""} 
        ${isSticky ? "header-sticky" : ""} 
        ${isVisible ? "header-show" : "header-hide"}`}
    >
      <div className="container mx-auto">
        <TopBar siteInfo={siteInfo} />
        <div className="navbar px-3 lg:px-0">
          <div className="navbar-start">
            <Link href="/">
              <Image
                src={
                  siteInfo.site_logo_black ||
                  siteInfo.site_logo_white ||
                  "/images/logo.png"
                }
                width={200}
                height={200}
                alt="Logo"
              />
            </Link>
          </div>
          <MenuItems />
          <div className="navbar-end">
            <div className="mb-none">
              <Link href="/events">
                <SiteButtonOne text="Explore Event" />
              </Link>
            </div>
            <MobileMenu />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
