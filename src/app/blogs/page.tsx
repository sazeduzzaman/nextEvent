import ComingSoon from "@/components/ComingSoon/ComingSoon";
import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonBanner
        title="Blogs"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: "Details" },
        ]}
      />
    </div>
  );
};

export default page;
