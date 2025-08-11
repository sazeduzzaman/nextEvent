import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import React from "react";

const FooterAction = () => {
  return (
    <div className="section-gradient">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-center text-2xl font-bold">
            Register Now Before It’s Too Late! Don’t Miss Out
          </h1>
          <SiteButtonOne />
        </div>
      </div>
    </div>
  );
};

export default FooterAction;
