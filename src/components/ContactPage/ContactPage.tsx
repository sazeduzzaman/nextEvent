import React from "react";
import CommonBanner from "../CommonBanner/CommonBanner";

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
