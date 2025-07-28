import React from "react";
import { LuPartyPopper } from "react-icons/lu";
import "../Css/SiteButtonOne.css";

const SiteButtonOne = ({ text = "Explore Event" }) => {
  return (
    <div>
      <button className="site-btn-one me-3">
        <span className="button-content flex items-center">
          {text} <LuPartyPopper className="ms-3" />
        </span>
      </button>
    </div>
  );
};

export default SiteButtonOne;
