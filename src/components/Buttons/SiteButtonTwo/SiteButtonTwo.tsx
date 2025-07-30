import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const SiteButtonTwo = ({ text = "Explore Event" }) => {
  return (
    <div>
      <button className="site-btn-two type1 text-center">
        <span className="btn-txt flex items-center justify-center">{text} <FaArrowRightLong className="ms-3" /></span>
      </button>
    </div>
  );
};

export default SiteButtonTwo;
