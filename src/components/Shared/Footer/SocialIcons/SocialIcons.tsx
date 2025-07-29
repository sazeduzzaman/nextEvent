import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex gap-4 pt-5">
      <Link
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-colors duration-300"
      >
        <FaFacebookF size={20} />
      </Link>
      <Link
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white hover:bg-blue-400 p-2 rounded-full transition-colors duration-300"
      >
        <FaTwitter size={20} />
      </Link>
      <Link
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white hover:bg-gradient-to-tr from-pink-500 to-yellow-500 p-2 rounded-full transition-colors duration-300"
      >
        <FaInstagram size={20} />
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white hover:bg-blue-700 p-2 rounded-full transition-colors duration-300"
      >
        <FaLinkedinIn size={20} />
      </Link>
    </div>
  );
};

export default SocialIcons;
