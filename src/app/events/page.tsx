import CommonBanner from "@/components/CommonBanner/CommonBanner";
import ExploreEventPage from "@/components/ExploreEventPage/ExploreEventPage";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonBanner
        title="Events"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: "Details" },
        ]}
      />
      <ExploreEventPage />
    </div>
  );
};

export default page;
