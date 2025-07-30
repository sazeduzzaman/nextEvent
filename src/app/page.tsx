import FooterAction from "@/components/Pages/FooterAction/FooterAction";
import AboutSection from "@/components/Pages/HomePage/AboutSection/AboutSection";
import BannerSection from "@/components/Pages/HomePage/BannerSection/BannerSection";
import FeaturedGallary from "@/components/Pages/HomePage/FeaturedGallary/FeaturedGallary";
import FeatureEvents from "@/components/Pages/HomePage/FeatureEvents/FeatureEvents";
import InfoSection from "@/components/Pages/HomePage/InfoSection/InfoSection";
import LatestEvents from "@/components/Pages/HomePage/LatestEvents/LatestEvents";
import UpcomingEvents from "@/components/Pages/HomePage/UpcomingEvents/UpcomingEvents";
import React from "react";

const page = () => {
  return (
    <div>
      <BannerSection />
      <AboutSection />
      <UpcomingEvents/>
      <InfoSection />
      <LatestEvents />
      <FeatureEvents />
      <FeaturedGallary />
      <FooterAction />
    </div>
  );
};

export default page;
