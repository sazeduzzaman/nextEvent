import React from "react";
import CommonBanner from "../CommonBanner/CommonBanner";

const Login = () => {
  return (
    <div>
      <CommonBanner
        title="Event Details"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: "Details" },
        ]}
      />
    </div>
  );
};

export default Login;
