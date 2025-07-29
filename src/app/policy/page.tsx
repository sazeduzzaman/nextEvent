import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonBanner
        title="Policy"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Policy", href: "/policy" },
          { label: "Details" },
        ]}
      />
    </div>
  );
};

export default page;
