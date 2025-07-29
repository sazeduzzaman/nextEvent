import CommonBanner from "@/components/CommonBanner/CommonBanner";
import PrivacyPage from "@/components/Pages/PrivacyPage/PrivacyPage";
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
      <PrivacyPage/>
    </div>
  );
};

export default page;
