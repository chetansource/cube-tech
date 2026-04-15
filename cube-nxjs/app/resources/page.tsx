import React from "react";
import Faq from "@/components/faq";
import Awards from "@/components/awards";
import ResourcesSection from "@/components/resource-section";
import Header from "@/components/header";
import Hero from "@/components/hero";
import InsightsImpact from "@/components/resources/insights-impact";
import ResourcesPageClient from "@/components/resources/resources-page-client";
import { getResources, getFeaturedCaseStudies, getNewsEventsResources, getResourceBannerResources } from "@/utils/routes/Resources";
import { getResourcesPageContent } from "@/utils/routes/ResourcesPage";

const ResourcesPage = async () => {
  // Fetch all resources, featured case studies, news resources, and page content
  const [allResources, featuredCaseStudies, newsResources, pageContent, resourceBannerResources] = await Promise.all([
    getResources(),
    getFeaturedCaseStudies(),
    getNewsEventsResources(),
    getResourcesPageContent('resources'),
    getResourceBannerResources(),
  ]);

  // Extract sections from page content with fallbacks
  const heroSection = pageContent.heroSection;
  const insightsSection = pageContent.insightsSection;
  const resourcesFaqSection = pageContent.faqSection;

  return (
    <div className="min-h-screen">
      <Header />
      <Hero
        backgroundImage={heroSection?.heroBackgroundImage?.url || "/top-view-bridge.webp"}
        title={
          <div className="flex md:flex-col  md:gap-8 my-8">
            <span dangerouslySetInnerHTML={{ __html: heroSection?.heroTitle || "Explore" }} />{" "}
            <span className="text-white font-semibold italic pl-4 md:py-2" dangerouslySetInnerHTML={{ __html: heroSection?.heroTitleItalic || "Latest" }} />
          </div>
        }
        featuredResources={resourceBannerResources}
      />
      <div className="flex flex-col gap-[60px]">
        <InsightsImpact
          resources={featuredCaseStudies}
          pageContent={insightsSection}
        />
        <ResourcesSection resources={newsResources} />

        {/* Client component for filtering and dynamic sections */}
        <ResourcesPageClient allResources={allResources} />

        <Awards />
        <Faq items={resourcesFaqSection?.faqs} />
      </div>
    </div>
  );
};

export default ResourcesPage;
