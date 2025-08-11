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
    <div className="bg-black py-12 footer-main">
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="
            flex flex-col items-center text-center
            sm:flex-row sm:flex-wrap sm:items-start sm:text-left
            justify-between gap-y-10 gap-x-8
          "
        >
          {/* Logo & Description */}
          <aside className="sm:w-1/3 max-w-sm flex flex-col items-center sm:items-start">
            <Link href="/">
              <Image
                src={
                  siteInfo.site_logo_black ||
                  siteInfo.site_logo_white ||
                  "/images/logo.webp"
                }
                width={160}
                height={80}
                alt="Site Logo"
                className="mx-auto sm:mx-0"
              />
            </Link>
            <p className="text-white mt-4 max-w-xs">{siteInfo.footer_description}</p>
            <div className="mt-6">
              <SocialIcons siteInfo={siteInfo} />
            </div>
          </aside>

          {/* Navigation Sections */}
          <nav className="sm:w-1/5 min-w-[160px]">
            <h6 className="site-txt text-lg font-bold mb-6">EVENT</h6>
            <ul className="space-y-3">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/about", label: "About Us" },
                { href: "/blogs", label: "Blog" },
                { href: "/", label: "Career" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="footer-link flex items-center justify-center sm:justify-start text-white hover:text-yellow-400 transition"
                  >
                    <IoChevronForward className="me-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sm:w-1/5 min-w-[160px]">
            <h6 className="site-txt text-lg font-bold mb-6">FEATURES</h6>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Event Hosting" },
                { href: "/", label: "Newsletter" },
                { href: "/", label: "Email Marketing" },
                { href: "/", label: "QR Code Ticketing" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="footer-link flex items-center justify-center sm:justify-start text-white hover:text-yellow-400 transition"
                  >
                    <IoChevronForward className="me-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sm:w-1/5 min-w-[160px]">
            <h6 className="site-txt text-lg font-bold mb-6">SUPPORT</h6>
            <ul className="space-y-3">
              {[
                { href: "/faqs", label: "Help Center / FAQs" },
                { href: "/", label: "For Event" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="footer-link flex items-center justify-center sm:justify-start text-white hover:text-yellow-400 transition"
                  >
                    <IoChevronForward className="me-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>

      {/* Bottom Copy and Credits */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-gray-700 pt-6 flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left justify-between gap-4 text-white text-sm">
        <div>
          © {new Date().getFullYear()}{" "}
          <Link
            href={siteInfo.copyright_url}
            className="underline hover:text-yellow-400"
          >
            {siteInfo.copyright_title.slice(6)}
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <span>Developed With Love By</span>
          <Link href={siteInfo.copyright_url}>
            <Image
              width={50}
              height={50}
              alt="Created by"
              src={"/images/flixzaglobal.webp"}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
