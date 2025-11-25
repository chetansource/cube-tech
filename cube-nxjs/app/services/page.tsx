import React from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import ServiceSection from "@/components/servicesComponent";
import ProjectMap from "@/components/project-map";
import PopularSearch from "@/components/popular-searche";
import ServicesSolutions from "@/components/servcies-solutions";
import SvgImage from "@/components/SvgImage";
import Link from "next/link";
import Image from "next/image";
import { getServicesPageContent, getServices, getPopularSearches, getMapProjects } from "@/utils/routes/Services";

const Services = async () => {
  // Fetch services page data
  const {
    heroSection,
    servicesOfferedSection,
    solutionsSection,
    contactBannerSection,
  } = await getServicesPageContent("services");

  // Fetch services directly from Services collection
  const services = await getServices();

  // Fetch popular searches
  const popularSearches = await getPopularSearches();

  // Fetch projects for map
  const mapProjects = await getMapProjects();

  // Debug: Log solutions data
  console.log("Solutions Section Data:", JSON.stringify(solutionsSection, null, 2));

  return (
    <div className="min-h-screen">
      <Header />
      <Hero
        backgroundImage={
          heroSection?.backgroundImage?.url ||
          "/cross-road-beautiful-mount-services-banner.webp"
        }
        title={
          <div className="flex flex-col md:flex md:flex-row md:gap-8 ">
            {heroSection?.heading || "Our"}{" "}
            <span className="text-white font-semibold italic pt-5 md:pt-0">
              {heroSection?.highlightedWord || "Services"}
            </span>
          </div>
        }
        featuredResources={heroSection?.featuredResources || []}
      />
      {/* services offered section */}
      <section className="w-full relative overflow-hidden">
        <div className="relative w-full md:w-[60%] h-[25vh] md:h-[30vh]">
          <Image
            src="/Explore Our Services.svg"
            alt="Explore Our Services"
            fill
            className=""
          />
        </div>
        <div className="relative -top-[10px]">
          <ServiceSection
            reverse={true}
            services={services}
            sectionConfig={{
              heading: servicesOfferedSection?.heading,
              highlightedWord: servicesOfferedSection?.highlightedWord,
              description: servicesOfferedSection?.description,
              bannerImage: servicesOfferedSection?.bannerImage?.url,
            }}
          />
        </div>
      </section>
      {/* Popular Searches */}
      <PopularSearch searches={popularSearches} />
      {/* Project Map */}
      <ProjectMap projects={mapProjects} />
      {/* know more about our services */}
      <ServicesSolutions
        heading={solutionsSection?.heading}
        highlightedWord={solutionsSection?.highlightedWord}
        description={solutionsSection?.description}
        ctaText={solutionsSection?.ctaText}
        ctaLink={solutionsSection?.ctaLink}
        backgroundImage={solutionsSection?.backgroundImage?.url}
        solutions={solutionsSection?.solutions}
      />
      {/* contact banner with button */}
      <section
        className="relative flex justify-start items-center w-full h-[450px]  bg-cover "
        style={{
          backgroundImage: `url('${
            contactBannerSection?.backgroundImage?.url ||
            "/service-banner-2.webp"
          }')`,
        }}
      >
        <div className="absolute pt-34 md:pt-0 md:ml-auto pl-8 md:pl-[73px] text-white ">
          <h2 className="text-[52px] w-[70%] md:w-full md:text-[75px] leading-[54px] md:leading-[79px] font-light mb-4">
            {contactBannerSection?.heading || "Let's get in touch"}
          </h2>
          <Link href={contactBannerSection?.ctaLink || "/contact-us"}>
            <Button className="bg-accent w-[90%] md:w-[30%] text-[12px] leading-[16px] tracking-[2.6px] px-[24px] py-[8px] font-bold uppercase cursor-pointer hover:bg-accent rounded-none">
              {contactBannerSection?.ctaText || "Contact us"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
