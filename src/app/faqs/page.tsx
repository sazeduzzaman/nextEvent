import ComingSoon from "@/components/ComingSoon/ComingSoon";
import CommonBanner from "@/components/CommonBanner/CommonBanner";
import FaqsPage from "@/components/Pages/FaqsPage/FaqsPage";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonBanner
        title="Faqs"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Faqs", href: "/faqs" },
          { label: "Details" },
        ]}
      />
      <FaqsPage />
    </div>
  );
};

export default page;
