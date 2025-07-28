import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";

const ContactPage = () => {
  return (
    <div>
      <CommonBanner
        title="Contact"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Details" },
        ]}
      />
    </div>
  );
};

export default ContactPage;
