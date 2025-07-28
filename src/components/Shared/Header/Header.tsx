"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import TopBar from "./TopBar";
import "./Css/Header.css";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={`shadow-sm header-main ${!isHome ? "header-dark" : ""}`}>
      <div className="container mx-auto">
        <TopBar />
        <div className="navbar px-3 lg:px-0">
          <div className="navbar-start">
            <Link href="/">
              <Image
                src="/images/logo.webp"
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
                <SiteButtonOne text="Create Event" />
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
