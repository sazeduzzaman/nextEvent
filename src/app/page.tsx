
import AboutSection from '@/components/Pages/HomePage/AboutSection/AboutSection';
import BannerSection from '@/components/Pages/HomePage/BannerSection/BannerSection';
import FeaturedGallary from '@/components/Pages/HomePage/FeaturedGallary/FeaturedGallary';
import FeatureEvents from '@/components/Pages/HomePage/FeatureEvents/FeatureEvents';
import InfoSection from '@/components/Pages/HomePage/InfoSection/InfoSection';
import LatestEvents from '@/components/Pages/HomePage/LatestEvents/LatestEvents';
import React from 'react';

const page = () => {
  return (
    <div>
      <BannerSection/>
      <AboutSection/>
      <InfoSection/>
      <LatestEvents/>
      <FeatureEvents/>
      <FeaturedGallary/>
    </div>
  );
};

export default page;