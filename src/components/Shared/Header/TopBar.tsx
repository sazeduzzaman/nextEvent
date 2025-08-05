import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const TopBar = ({ siteInfo }: any) => {
  return (
    <div className="top-bar mb-none">
      <div className="flex justify-between items-center py-2">
        <div>
          <small className="site-txt">Working Hours: </small>
          <small className="text-gray-300">Monday - Friday 08:00-16:00</small>
        </div>
        <div className="flex items-center">
          <div className="me-5">
            <p>
              <small className="site-txt">Call:</small>{" "}
              <a
                href={`tel:${siteInfo.primary_phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300"
              >
                <small>{siteInfo.primary_phone}</small>
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={siteInfo.facebook_url}>
              <FaFacebookF className="hover:text-[#f7c62d] text-white" />
            </Link>
            <Link href={siteInfo.twitter_url}>
              <FaTwitter className="hover:text-[#f7c62d] text-white" />
            </Link>
            <Link href={siteInfo.instagram_url}>
              <FaInstagram className="hover:text-[#f7c62d] text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
