import Image from "next/image";
import Link from "next/link";
import React from "react";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import TopBar from "./TopBar";
import "./Css/Header.css";
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";

const Header = () => {
  return (
    <div className="shadow-sm header-main">
      <div className="container mx-auto">
        <TopBar />
        <div className="navbar px-3 lg:px-0">
          <div className="navbar-start">
            <Link href="/">
              <Image
                src="/images/logo.webp"
                width={200}
                height={200}
                alt="Picture of the author"
              />
            </Link>
          </div>
          <MenuItems />
          <div className="navbar-end">
            {/* <a className="btn btn-warning me-5 rounded-4xl">Create Event</a> */}
            <div className="mb-none">
              <SiteButtonOne text="Create Event" />
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
