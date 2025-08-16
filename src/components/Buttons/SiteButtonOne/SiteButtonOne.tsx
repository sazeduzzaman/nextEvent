"use client";
import React from "react";
import { LuPartyPopper } from "react-icons/lu";
import "../Css/SiteButtonOne.css";

interface SiteButtonOneProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const SiteButtonOne: React.FC<SiteButtonOneProps> = ({
  text = "Explore Event",
  type,
  disabled,
}) => {
  return (
    <button
      className="site-btn-one me-3"
      {...(type ? { type } : {})}
      {...(disabled !== undefined ? { disabled } : {})}
    >
      <span className="button-content flex items-center">
        {text} <LuPartyPopper className="ms-3" />
      </span>
    </button>
  );
};

export default SiteButtonOne;
