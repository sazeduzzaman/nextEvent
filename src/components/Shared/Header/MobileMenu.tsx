"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";

const MobileMenu = () => {
  return (
    <div className="drawer drawer-end">
      {/* Hidden checkbox toggles drawer */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex justify-end px-4 py-2">
        {/* Hamburger button aligned right with margin */}
        <label
          htmlFor="my-drawer-4"
          className="btn btn-ghost btn-circle lg:hidden border border-yellow-400"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#f7c62d"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>

      {/* Drawer sidebar */}
      <div className="drawer-side">
        {/* Overlay closes drawer */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          aria-label="Close menu"
        ></label>

        {/* Sidebar menu content */}
        <div className="w-full bg-base-200 h-full flex flex-col p-4">
          {/* Top bar: logo left, close button right */}
          <div className="flex items-center justify-between mb-8">
            {/* Logo (replace with your actual logo image or component) */}
            <Link href="/">
              <Image
                src={"/images/logo.webp"}
                width={200}
                height={200}
                alt="Logo"
              />
            </Link>

            {/* Close button */}
            <label
              htmlFor="my-drawer-4"
              className="btn btn-circle site-bg text-black 3xl"
              aria-label="Close menu"
            >
              <CgClose/>
            </label>
          </div>

          {/* Menu items */}
          <ul className="menu flex-grow space-y-3">
            <li>
              <a
                href="/"
                className="btn btn-ghost w-full justify-start text-lg normal-case hover:bg-primary hover:text-white transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="btn btn-ghost w-full justify-start text-lg normal-case hover:bg-primary hover:text-white transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="btn btn-ghost w-full justify-start text-lg normal-case hover:bg-primary hover:text-white transition"
              >
                Contact
              </a>
            </li>
            {/* Add more items here */}
          </ul>

          {/* Footer contact info */}
          <footer className="mt-8 pt-4 text-xl text-white text-center">
            <div className="mb-2 font-semibold text-base-content">
              Contact Info
            </div>
            <address className="not-italic">
              1234 Street Name
              <br />
              City, State 56789
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@example.com
            </address>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
