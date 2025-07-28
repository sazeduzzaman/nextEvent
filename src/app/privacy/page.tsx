import ComingSoon from "@/components/ComingSoon/ComingSoon";
import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonBanner
        title="Privacy"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
          { label: "Details" },
        ]}
      />
    </div>
  );
};

export default page;
