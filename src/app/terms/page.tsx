import CommonBanner from "@/components/CommonBanner/CommonBanner";
import TermsPage from "@/components/Pages/TermsPage/TermsPage";
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
      <TermsPage/>
    </div>
  );
};

export default page;
