import React from "react";

const MobileMenu = () => {
  return (
    <div className="dropdown">
      <div className="btn btn-ghost btn-circle lg:hidden me-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />{" "}
        </svg>
      </div>
    </div>
  );
};

export default MobileMenu;
