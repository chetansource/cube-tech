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
// import Link from 'next/link';

// Sample data for the project section
const projectData = {
  title: "KEY",
  highlightedText: "PROJECTS",
  mainImage: "/services-section-banner.webp", // Replace with your actual image
  projectTitle: "3-days Traffic Count on",
  projectLocation: "Sambalpur - Rourkela Orissa",
  projectHighlight: "Transit",
  description:
    "CubeTech conducted a 3-day traffic count on the Sambalpur-Rourkela section of SH10 in Orissa. The study analyzed vehicle flow patterns, providing critical data for infrastructure planning and traffic management. Insights from this survey support improved road safety, capacity enhancement, and future development initiatives",
  policyCards: [
    {
      icon: "circle",
      title: "IFC Safeguard Policies",
      description: "",
    },
    {
      icon: "circle",
      title: "Social Impact Assessment (SIA)",
      description: "Lorem ipsum dolor sit amet consectetur. Nunc ut condimentum pharetra.",
    },
    {
      icon: "circle",
      title: "Livelihood Enhancement Plan (LEP)",
      description: "",
    },
    // Add more cards to demonstrate the carousel effect
    {
      icon: "circle",
      title: "Environmental Assessment",
      description: "Comprehensive analysis of environmental impacts",
    },
    {
      icon: "circle",
      title: "Community Engagement",
      description: "Strategies for effective community participation",
    },
  ],
}

const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* hero section start */}
      <section className="relative w-full bg-white mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute w-full  h-full md:w-[97%] top-0 bottom-0 left-0 md:right-[57px] z-0">
          <Image
            src="/project-banner.webp"
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container  md:left-[57px] px-4 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl mt-4">
            <h1 className="text-white text-[52px]  md:text-[75px]   font-light mb-12 leading-[40px] flex ">
              Our <span className="italic pl-4">Projects</span>
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
      <KeyProjectsSection data={projectData} />

      <Testimonial />
      <ProjectMap />
      <ExploreMoreProjectsSection />
      <section
        className="relative flex justify-start items-center w-full h-[450px]  bg-cover "
        style={{ backgroundImage: "url('/service-banner-2.webp')" }}
      >
        <div className="absolute pt-34 md:pt-0 md:ml-auto pl-8 md:pl-[73px] text-white ">
          <h2 className="text-[52px] w-[70%] md:w-full md:text-[75px] leading-[54px] md:leading-[79px] font-light mb-4">
            Let’s get in touch
          </h2>
          <Link href="/contact-us">
            <Button className="bg-accent w-[90%] md:w-[30%] text-[12px] leading-[16px] tracking-[2.6px] px-[24px] py-[8px] font-bold uppercase cursor-pointer hover:bg-accent rounded-none">
              Contact us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
