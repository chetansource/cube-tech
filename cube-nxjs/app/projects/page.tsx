import React from "react";
import Header from "@/components/header";
import { Testimonial } from "@/components/testimonial";
import Image from "next/image";
import PolygonIcon from "@/components/icons/polygon";
import ProjectMap from "@/components/project-map";
import { Button } from "@/components/ui/button";
import { ExploreMoreProjectsSection } from "@/components/project-page/ExploreMoreProjectsSection";
import KeyProjectsSection from "@/components/project-page/KeyProjectsSection";
import { Breadcrumb } from "@/components/project-page/bread-crump";
import Link from "next/link";
import { getTestimonials } from "@/utils/routes/Homepage";
import { getProjectsPageContent, getMapProjects, getFeaturedProjects } from "@/utils/routes/Projects";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

const ProjectsPage = async () => {
  // Fetch dynamic data from backend
  const testimonials = await getTestimonials(10);
  const projectsPageData = await getProjectsPageContent("projects");
  const mapProjects = await getMapProjects();
  const featuredProjects = await getFeaturedProjects(3);

  // Get contact banner section data with fallback
  const contactBanner = projectsPageData.contactBannerSection;
  const contactHeading = contactBanner?.heading || "Let's get in touch";
  const contactCtaText = contactBanner?.ctaText || "Contact us";
  const contactCtaLink = contactBanner?.ctaLink || "/contact-us";
  const contactBackgroundImage = contactBanner?.backgroundImage?.url || "/service-banner-2.webp";

  // Get project map section data
  const projectMapSection = projectsPageData.projectMapSection;

  // Get hero section data with fallback
  const heroSection = projectsPageData.heroSection;
  const heroHeading = heroSection?.heading || "Our";
  const heroHighlightedWord = heroSection?.highlightedWord || "Projects";
  const heroBackgroundImage = heroSection?.backgroundImage?.url || "/project-banner.webp";

  return (
    <div className="min-h-screen">
      <Header />
      {/* hero section start */}
      <section className="relative w-full bg-white mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute w-full  h-full md:w-[97%] top-0 bottom-0 left-0 md:right-[57px] z-0">
          <Image
            src={heroBackgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container  md:left-[57px] px-4 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl mt-4">
            <h1 className="text-white text-[52px]  md:text-[75px]   font-light mb-12 leading-[40px] flex ">
              {heroHeading} <span className="italic pl-4">{heroHighlightedWord}</span>
            </h1>
          </div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
            ]}
          />
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>
      {/* hero section stop */}
      <KeyProjectsSection projects={featuredProjects} />

      {/* Dynamic Testimonials Section */}
      <Testimonial testimonials={testimonials} />

      {/* Dynamic Project Map with CTA Button */}
      <ProjectMap
        projects={mapProjects}
        title={projectMapSection?.title}
        highlightedWord={projectMapSection?.highlightedWord}
        description={projectMapSection?.description}
        showCta={!!projectMapSection?.ctaText}
        ctaText={projectMapSection?.ctaText}
        ctaLink={projectMapSection?.ctaLink}
      />
      <ExploreMoreProjectsSection projects={projectsPageData.allProjects} />

      {/* Dynamic Contact Banner Section */}
      <section
        className="relative flex justify-start items-center w-full h-[450px]  bg-cover "
        style={{ backgroundImage: `url('${contactBackgroundImage}')` }}
      >
        <div className="absolute pt-34 md:pt-0 md:ml-auto pl-8 md:pl-[73px] text-white ">
          <h2 className="text-[52px] w-[70%] md:w-full md:text-[75px] leading-[54px] md:leading-[79px] font-light mb-4">
            {contactHeading}
          </h2>
          <Link href={contactCtaLink}>
            <Button className="bg-accent w-[90%] md:w-[30%] text-[12px] leading-[16px] tracking-[2.6px] px-[24px] py-[8px] font-bold uppercase cursor-pointer hover:bg-accent rounded-none">
              {contactCtaText}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
