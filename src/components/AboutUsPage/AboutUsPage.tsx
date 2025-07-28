import React from "react";
import CommonBanner from "../CommonBanner/CommonBanner";

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
