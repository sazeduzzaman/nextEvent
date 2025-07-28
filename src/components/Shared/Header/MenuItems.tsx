"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const MenuItems = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 space-x-2">
        <li>
          <Link
            href="/"
            className={`link-underline bg-transparent ${
              isActive("/") ? "menu-active" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className={`link-underline bg-transparent ${
              isActive("/events") ? "menu-active" : ""
            }`}
          >
            Explore Event
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`link-underline bg-transparent ${
              isActive("/about") ? "menu-active" : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`link-underline bg-transparent ${
              isActive("/contact") ? "menu-active" : ""
            }`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuItems;
