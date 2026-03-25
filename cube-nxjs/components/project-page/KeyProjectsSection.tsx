"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CheckCircle } from "lucide-react";

// Define the types for our project data
interface PolicyCard {
  title: string;
  description?: string;
  iconImage?: {
    url: string;
    alt?: string;
  };
}

interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  studyType?: string;
  category?: string;
  description?: string;
  shortDescription?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  policyCards?: PolicyCard[];
}

interface KeyProjectsSectionProps {
  projects: Project[];
  className?: string;
}

// This component can be reused with different project data
export default function KeyProjectsSection({
  projects,
  className = "",
}: KeyProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback project data if no projects provided
  const fallbackProjects: Project[] = [
    {
      id: "1",
      title: "3-days Traffic Count on Sambalpur - Rourkela Orissa",
      slug: "sambalpur-rourkela-traffic-count",
      location: "Orissa",
      studyType: "Traffic Study",
      category: "Transit",
      description:
        "CubeTech conducted a 3-day traffic count on the Sambalpur-Rourkela section of SH10 in Orissa. The study analyzed vehicle flow patterns, providing critical data for infrastructure planning and traffic management.",
      mainImage: {
        url: "/services-section-banner.webp",
        alt: "Traffic Count Study",
      },
      policyCards: [
        { title: "IFC Safeguard Policies", description: "" },
        {
          title: "Social Impact Assessment (SIA)",
          description:
            "Lorem ipsum dolor sit amet consectetur. Nunc ut condimentum pharetra.",
        },
        {
          title: "Livelihood Enhancement Plan (LEP)",
          description: "",
        },
      ],
    },
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  // Track active project based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight;
      const index = Math.round(scrollTop / itemHeight);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProject = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: "smooth",
    });
  };


  return (
    <section ref={sectionRef} className={`w-full bg-white ${className}`}>
      {/* Section Header */}
      <div className="hidden md:block mb-12 pl-[61px]">
        <h2 className="text-[46px] leading-[67px] uppercase">
          <span className="text-black font-light">KEY</span>{" "}
          <span className="text-accent font-semibold italic">PROJECTS</span>
        </h2>
      </div>

      {/* Fixed Height Scroll Container with indicator */}
      <div className="relative">
        {/* Right side indicator bars - one per project */}
        <div className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-10">
          {displayProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToProject(i)}
              className={`rounded-sm cursor-pointer transition-all duration-500 ease-in-out ${
                activeIndex === i
                  ? "w-[6px] h-[100px] bg-accent"
                  : "w-[4px] h-[80px] bg-gray-300 hover:bg-accent/50 hover:h-[90px]"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <div ref={scrollContainerRef} className="h-[800px] md:h-[900px] overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {displayProjects.map((project) => {
            const projectTitle = project.title?.split(" - ")[0] || project.title;
            const projectLocation = project.location || "";
            const projectHighlight = project.category || project.studyType || "";
            const projectDescription = project.shortDescription || project.description || "";
            const projectImage = project.mainImage?.url || "/services-section-banner.webp";
            const policyCards = project.policyCards || [];

            return (
              <div
                key={project.id}
                className="h-[800px] md:h-[900px] w-full snap-start snap-always flex-shrink-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 h-full">
                {/* Left Column - Image */}
                <div className="relative h-[400px] md:h-[702px] overflow-hidden">
                  <Image
                    src={projectImage}
                    alt={project.mainImage?.alt || project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Right Column - Project Details */}
                <div className="flex flex-col p-4 md:p-0 md:pr-12">
                  {/* Project Title and Description */}
                  <div className="flex-shrink-0 w-full md:w-[650px] max-w-full pb-25 md:pb-0">
                    <h3 className="text-xl md:text-2xl md:text-[40px] font-light leading-[26px] md:leading-[40px] tracking-[3.75px] pb-11">
                      {projectTitle} {projectLocation && `- ${projectLocation}`}{" "}
                      {projectHighlight && (
                        <span className="text-accent italic font-medium">
                          {projectHighlight}
                        </span>
                      )}
                    </h3>
                    <p className="text-[#404040] text-sm leading-[22px] md:leading-[31px] mb-11">
                      {projectDescription}
                    </p>
                    <Link
                      href={`/projects/details/${project.slug}`}
                      className="hidden md:flex items-center text-accent font-bold text-base group hover:text-accent/80 transition-colors"
                    >
                      READ MORE
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Policy Cards - CSS infinite carousel */}
                  {policyCards.length > 0 && (
                    <div className="mt-8 overflow-hidden group">
                      <div
                        className="flex gap-6 w-max animate-[scrollCards_20s_linear_infinite] group-hover:[animation-play-state:paused]"
                      >
                        {[...policyCards, ...policyCards].map((card, cardIndex) => (
                          <div
                            key={cardIndex}
                            className="w-[200px] md:w-[280px] flex-shrink-0 bg-white pb-6 border-b border-gray-200"
                          >
                            {/* Icon */}
                            <div className="text-accent mb-4">
                              <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-accent" />
                              </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-base md:text-lg font-normal text-black mb-3 leading-snug">
                              {card.title}
                            </h4>

                            {/* Description */}
                            {card.description ? (
                              <p className="text-sm md:text-base text-black/60 mb-4 leading-relaxed font-['Glacier_Indifference']">
                                {card.description}
                              </p>
                            ) : (
                              <div className="h-16 md:h-20"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
