import React from "react";
import Faq from "@/components/faq";
import Awards from "@/components/awards";
import ResourcesSection from "@/components/resource-section";
import Header from "@/components/header";
import Hero from "@/components/hero";
import InsightsImpact from "@/components/resources/insights-impact";
import ResourcesPageClient from "@/components/resources/resources-page-client";
import { getResources, getFeaturedCaseStudies } from "@/utils/routes/Resources";
import { getResourcesPageContent } from "@/utils/routes/ResourcesPage";

const ResourcesPage = async () => {
  // Fetch all resources, featured case studies, news resources, and page content
  const [allResources, featuredCaseStudies, newsResources, pageContent] = await Promise.all([
    getResources(),
    getFeaturedCaseStudies(),
    getResources('NEWS'), // Fetch only NEWS category for News & Events section
    getResourcesPageContent('resources'),
  ]);

  // Extract sections from page content with fallbacks
  const heroSection = pageContent.heroSection;
  const insightsSection = pageContent.insightsSection;
  const gallerySection = pageContent.gallerySection;

  return (
    <div className="min-h-screen">
      <Header />
      <Hero
        backgroundImage={heroSection?.heroBackgroundImage?.url || "/top-view-bridge.webp"}
        title={
          <div className="flex md:flex-col md:gap-8 my-8">
            {heroSection?.heroTitle || "Explore"}{" "}
            <span className="text-white font-semibold italic pl-4 md:py-2">
              {heroSection?.heroTitleItalic || "Latest"}
            </span>
          </div>
        }
      />
      <InsightsImpact
        resources={featuredCaseStudies}
        pageContent={insightsSection}
      />
      <ResourcesSection resources={newsResources.slice(0, 2)} />

      {/* Client component for filtering and dynamic sections */}
      <ResourcesPageClient
        allResources={allResources}
        gallerySection={gallerySection}
      />

      <Awards />
      <Faq />
    </div>
  );
};

export default ResourcesPage;
