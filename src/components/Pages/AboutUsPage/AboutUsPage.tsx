import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      <CommonBanner
        title="About"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Details" },
        ]}
      />
    </div>
  );
};

export default AboutUsPage;
