import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialIcons from "./SocialIcons/SocialIcons";
import "./Css/Footer.css";
import { IoChevronForward } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="bg-black py-15 pb-0">
      <footer className="footer sm:footer-horizontal p-10 container mx-auto px-0">
        <aside>
          <Link href="/">
            <Image
              src="/images/logo.webp"
              width={200}
              height={200}
              alt="Picture of the author"
            />
          </Link>
          <p className="text-white pt-5">
            Join our event management community for exclusive <br /> updates,
            special offers, and the latest news delivered <br /> straight to
            your inbox
          </p>
          <div>
            <SocialIcons />
          </div>
        </aside>
        <nav>
          <div className="flex items-center gap-2">
            <h6 className="site-txt text-1xl line-text font-bold mb-5">
              EVENT
            </h6>
            {/* <span className="w-8 h-0.5 bg-current"></span> */}
          </div>

          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Contact Us
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> About Us
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Blog
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Career
          </Link>
        </nav>
        <nav>
          <h6 className="site-txt text-1xl line-text font-bold mb-5">
            FEATURES
          </h6>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Event Hosting
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Newsletter
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Email Marketing
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> QR Code Ticketing
          </Link>
        </nav>
        <nav>
          <h6 className="site-txt text-1xl line-text font-bold mb-5">
            SUPPORT
          </h6>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Help Center / FAQs
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> For Event
          </Link>
          <Link href="/terms" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Terms & Conditions
          </Link>
          <Link href={"/"} className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Privacy Policy
          </Link>
        </nav>
      </footer>
      <div className="container mx-auto footer-copy py-5 mt-10 flex justify-between items-center">
        {/* Left side: copyright */}
        <div className="text-white text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>

        {/* Right side: links */}
        <div className="flex space-x-6">
          <a href="/privacy" className="text-white hover:text-gray-300 text-sm">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white hover:text-gray-300 text-sm">
            Terms of Service
          </a>
          <a href="/contact" className="text-white hover:text-gray-300 text-sm">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
