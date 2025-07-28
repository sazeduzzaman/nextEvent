import React from "react";
import CommonBanner from "../../CommonBanner/CommonBanner";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <CommonBanner
        title="Login"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Login", href: "/auth/login" },
          // { label: "Details" },
        ]}
      />
      {/* Login Form */}
        <LoginForm/>
    </div>
  );
};

export default Login;
