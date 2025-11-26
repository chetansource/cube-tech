"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import RightArrowIcon from "./icons/right-arrow";
import PolygonIcon from "./icons/polygon";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  slug: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
}

interface Solution {
  id: string;
  idString?: string;
  title: string;
  description: string;
  order: number;
  projects?: Project[];
}

interface ServicesSolutionsProps {
  heading?: string;
  highlightedWord?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  solutions?: Solution[];
}

export default function ServicesSolutions({
  heading = "KNOW MORE ABOUT OUR",
  highlightedWord = "SERVICES",
  description = "Explore in-depth analyses, industry reports, and research-driven insights to stay informed and ahead.",
  ctaText = "SEE ALL PROJECTS",
  ctaLink = "/projects",
  backgroundImage = "/homepage-solutions-banner.png",
  solutions = [],
}: ServicesSolutionsProps) {
  // Fallback static data for solutions
  const defaultSolutions: Solution[] = [
    {
      id: "01",
      title: "Travel Demand Estimation and Modelling",
      description:
        "Travel demand estimation and forecasting is essential for assessing viability of any transportation facility; and the design and operation of the same.",
      order: 1,
      projects: [
        {
          id: "1",
          title: "2 Days Traffic Counts of Commercial Traffic Entering Delhi",
          slug: "traffic-counts-delhi",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 1" },
        },
        {
          id: "2",
          title: "3-days Traffic Count on Jabalpur Section of NH7 in the State of Madhya Pradesh",
          slug: "traffic-count-jabalpur",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 2" },
        },
        {
          id: "3",
          title: "Highway Infrastructure Development Project",
          slug: "highway-infrastructure",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 3" },
        },
        {
          id: "4",
          title: "Urban Road Network Analysis and Planning",
          slug: "urban-road-network",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 4" },
        },
      ],
    },
    {
      id: "02",
      title: "Innovation in Pavement Evaluation, Material and Technology",
      description:
        "Our advanced pavement evaluation technologies use non-destructive testing methods to analyze road conditions with precision. We develop sustainable, durable materials that withstand heavy traffic and extreme weather conditions while reducing environmental impact.",
      order: 2,
      projects: [
        {
          id: "5",
          title: "Pavement Quality Assessment for National Highway Network",
          slug: "pavement-quality",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 5" },
        },
        {
          id: "6",
          title: "Material Testing and Analysis for NH12 Expansion",
          slug: "material-testing-nh12",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 6" },
        },
        {
          id: "7",
          title: "Advanced Pavement Design for Express Highway",
          slug: "pavement-design",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 7" },
        },
      ],
    },
    {
      id: "03",
      title: "Project Management Consultancy",
      description:
        "Our expert consultants provide end-to-end project management services for infrastructure development. From initial planning to execution and monitoring, we ensure timely delivery, cost efficiency, and adherence to quality standards across all project phases.",
      order: 3,
      projects: [
        {
          id: "8",
          title: "PMC for Express Highway Construction Project",
          slug: "pmc-express-highway",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 8" },
        },
        {
          id: "9",
          title: "Urban Infrastructure Management and Development",
          slug: "urban-infrastructure",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 9" },
        },
        {
          id: "10",
          title: "Bridge Construction and Maintenance Consultancy",
          slug: "bridge-construction",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 10" },
        },
        {
          id: "11",
          title: "Smart City Infrastructure Development PMC",
          slug: "smart-city-pmc",
          mainImage: { url: "/long-highway-2.webp", alt: "Project 11" },
        },
      ],
    },
  ];

  const displaySolutions = solutions.length > 0 ? solutions : defaultSolutions;

  return (
    <section className="relative w-full flex flex-col md:flex-row h-screen overflow-hidden mb-10">
      {/* Left Panel - Fixed with background image */}
      <div className="md:w-[45%] h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Services background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          {/* <div className="absolute inset-0 bg-black/40" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-start px-8 md:px-16 py-16 pt-24 md:pt-32">
          <h2 className="text-white text-3xl md:text-[46px] font-light tracking-[3.75px] leading-tight mb-6">
            {heading}
            <br />
            <span className="text-accent italic font-semibold">{highlightedWord}</span>
          </h2>

          <p className="text-white text-sm md:text-base mb-8 max-w-md">
            {description}
          </p>

          <Link
            href={ctaLink}
            className="inline-flex items-center text-accent mt-6 group gap-4 hover:gap-6 transition-all"
          >
            <span className="text-sm tracking-wider font-medium">{ctaText}</span>
            <RightArrowIcon color={"#5FBA51"} />
          </Link>
        </div>

        {/* Polygon at bottom right */}
        <div className="absolute bottom-0 md:-bottom-px right-[-1] z-20 pointer-events-none">
          <PolygonIcon />
        </div>
      </div>

      {/* Right Panel - Snap Scroll */}
      <div
        className="md:w-[55%] h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {displaySolutions.map((solution, index) => (
          <div key={solution.id} className="h-auto md:h-screen snap-start snap-always">
            <ServiceSolutionItem
              solution={solution}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// Separate component for each solution item
function ServiceSolutionItem({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !solution.projects || solution.projects.length === 0) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // Pixels per frame
    let animationFrameId: number;

    const autoScroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Get the total scrollable width
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      // Reset to start when reaching end
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [solution.projects]);

  // Use idString if available, otherwise format from index
  const displayNumber = solution.idString || String(index + 1).padStart(2, "0");

  return (
    <div className="h-full bg-white flex flex-col justify-start px-8 md:px-16 py-10 md:py-16 md:justify-center">
      {/* Solution number and title */}
      <div className="mb-8">
        <div className="text-[#E8E8E8] text-[80px] md:text-[120px] font-light leading-none mb-2">
          {displayNumber}.
        </div>
        <h3 className="text-xl md:text-2xl font-normal leading-tight tracking-wide text-black">
          {solution.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-base text-black/60 leading-relaxed mb-8 max-w-2xl">
        {solution.description}
      </p>

      {/* Projects carousel */}
      {solution.projects && solution.projects.length > 0 && (
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {solution.projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/details?slug=${project.slug}`}
                className="flex-shrink-0 w-[280px] md:w-[347px] group cursor-pointer"
              >
                <div className="relative h-[180px] md:h-[200px] mb-3 overflow-hidden rounded-sm">
                  <Image
                    src={project.mainImage?.url || "/long-highway-2.webp"}
                    alt={project.mainImage?.alt || project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
                  <div className="absolute top-6 left-6 text-white text-xl md:text-2xl font-semibold tracking-[0.3em]">
                    PROJECT
                  </div>
                </div>
                <h4 className="text-base font-normal text-black leading-relaxed group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
              </Link>
            ))}
          </div>

          {/* Navigation arrows */}
          {/* {solution.projects.length > 2 && (
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => scroll("left")}
                className="p-3 hover:bg-gray-100 transition-colors rounded-sm"
                aria-label="Scroll left"
              >
                <LeftArrowIcon />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 hover:bg-gray-100 transition-colors rounded-sm"
                aria-label="Scroll right"
              >
                <RightArrowIcon color={"#5FBA51"} />
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
