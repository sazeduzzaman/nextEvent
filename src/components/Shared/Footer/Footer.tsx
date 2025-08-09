import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialIcons from "./SocialIcons/SocialIcons";
import "./Css/Footer.css";
import { IoChevronForward } from "react-icons/io5";
import { fetchSiteInformation } from "@/lib/api/SiteInfromationData/SiteInformationDataSet";

const Footer = async () => {
  const siteInfo = await fetchSiteInformation();
  return (
    <div className="bg-black py-15 pb-0 footer-main">
      <footer className="footer sm:footer-horizontal p-10 container mx-auto px-0">
        <aside>
          <Link href="/">
            <Image
              src={siteInfo.site_logo_black || siteInfo.site_logo_white || "/images/logo.webp"}
              width={200}
              height={200}
              alt="Picture of the author"
            /> 
          </Link>
          <p className="text-white pt-5 w-80">{siteInfo.footer_description}</p>
          <div>
            <SocialIcons siteInfo={siteInfo} />
          </div>
        </aside>
        <nav>
          <div className="flex items-center gap-2">
            <h6 className="site-txt text-1xl line-text font-bold mb-5">
              EVENT
            </h6>
            {/* <span className="w-8 h-0.5 bg-current"></span> */}
          </div>

          <Link href="/contact" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Contact Us
          </Link>
          <Link href="/about" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> About Us
          </Link>
          <Link href="/blogs" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Blog
          </Link>
          <Link href="/" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Career
          </Link>
        </nav>
        <nav>
          <h6 className="site-txt text-1xl line-text font-bold mb-5">
            FEATURES
          </h6>
          <Link href="/" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Event Hosting
          </Link>
          <Link href="/" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Newsletter
          </Link>
          <Link href="/" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Email Marketing
          </Link>
          <Link href="/" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> QR Code Ticketing
          </Link>
        </nav>
        <nav>
          <h6 className="site-txt text-1xl line-text font-bold mb-5">
            SUPPORT
          </h6>
          <Link href="/faqs" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Help Center / FAQs
          </Link>
          <Link href="/" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> For Event
          </Link>
          <Link href="/terms" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Terms & Conditions
          </Link>
          <Link href="/privacy" className="footer-link mb-2 flex items-center">
            <IoChevronForward className="me-3" /> Privacy Policy
          </Link>
        </nav>
      </footer>
      <div className="container mx-auto footer-copy py-5 mt-10 flex justify-between items-center">
        {/* Left side: copyright */}
        <div className="text-white text-sm">
          © {new Date().getFullYear()}
          <Link href={siteInfo.copyright_url}>
            {siteInfo.copyright_title.slice(6)}
          </Link>
        </div>

        {/* Right side: links */}
        <div className="flex space-x-6">
          <p className="text-white text-sm flex items-center">
            Developed With Love By
            <Link href={siteInfo.copyright_url}>
              <Image
                width={50}
                height={50}
                alt="Created by"
                src={"/images/flixzaglobal.webp"}
                className="ms-2"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
