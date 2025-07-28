import React from "react";
import CommonBanner from "../../CommonBanner/CommonBanner";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div>
      <CommonBanner
        title="Register"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Register", href: "/auth/register" },
          // { label: "Details" },
        ]}
      />
      <RegisterForm />
    </div>
  );
};

export default Register;
