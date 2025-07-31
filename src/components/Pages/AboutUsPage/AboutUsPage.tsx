import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";
import AboutSection from "../HomePage/AboutSection/AboutSection";
import NumberCounter from "./NumberCounter";
import FeaturedGallary from "../HomePage/FeaturedGallary/FeaturedGallary";
import FooterAction from "../FooterAction/FooterAction";

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
      <AboutSection />
      <NumberCounter/>
      <FeaturedGallary />
      <FooterAction />
    </div>
  );
};

export default AboutUsPage;
