import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import React from "react";

const FooterAction = () => {
  return (
    <div className="section-gradient">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Register Now Before It’s Too Late! Don’t Miss Out
          </h1>
          <SiteButtonOne text="Contact Us"/>
        </div>
      </div>
    </div>
  );
};

export default FooterAction;
