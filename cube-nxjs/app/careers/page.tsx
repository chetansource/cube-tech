import CareerExploreMore from '@/components/career-explore-more';
import CareerOpportunities from '@/components/carrer-opportunity';
import Header from '@/components/header';
import ResumeUpload from '@/components/resume-upload';
import CareerHero from '@/components/career-hero';
import { getCareerPageContent } from '@/utils/routes/Careers';
import React from 'react';

// Disable caching for this page to always fetch fresh data
export const revalidate = 0;

export default async function CareerPage() {
  const { heroSection, exploreCards } = await getCareerPageContent("careerpage");

  return (
    <div className="min-h-screen">
      <Header />
      <CareerHero
        heading={heroSection?.heading}
        subheading={heroSection?.subheading}
        backgroundImage={heroSection?.backgroundImage?.url}
      />
      <CareerOpportunities />
      <CareerExploreMore cards={exploreCards} />
      <ResumeUpload />
    </div>
  );
}
