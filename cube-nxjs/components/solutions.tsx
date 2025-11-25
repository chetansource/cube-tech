"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RightArrowIcon from "./icons/right-arrow";
import PolygonIcon from "./icons/polygon";

interface Solution {
  id: string;
  idString: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt?: string;
  };
}

interface SolutionsSectionConfig {
  backgroundImage?: string;
  heading?: string;
  highlightedWord?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface SolutionsProps {
  solutions?: Solution[];
  sectionConfig?: SolutionsSectionConfig;
}

// Fallback solutions for development
const defaultSolutions = [
  {
    id: "1",
    idString: "01",
    title: "Advanced Video-Based Traffic Counting & AI Vision Solutions",
    description:
      "CubeTech revolutionizes traffic data collection with advanced AI-driven, video-based counting solutions. Since 2010, it has set industry standards by replacing manual counts with auditable video/ATCC technology. Its innovations ensure high accuracy and NHAI compliance.",
    image: { url: "/long-highway-1.webp" },
  },
  {
    id: "2",
    idString: "02",
    title: "Innovation in Pavement Evaluation, Material and Technology",
    description:
      "Our advanced pavement evaluation technologies use non-destructive testing methods to analyze road conditions with precision. We develop sustainable, durable materials that withstand heavy traffic and extreme weather conditions while reducing environmental impact.",
    image: { url: "/long-highway-1.webp" },
  },
  {
    id: "3",
    idString: "03",
    title: "Project Management Consultancy",
    description:
      "Our expert consultants provide end-to-end project management services for infrastructure development. From initial planning to execution and monitoring, we ensure timely delivery, cost efficiency, and adherence to quality standards across all project phases.",
    image: { url: "/long-highway-1.webp" },
  },
];

export default function Solutions({ solutions: propSolutions, sectionConfig }: SolutionsProps) {
  // Use prop solutions or fallback to defaults if empty
  const solutions = propSolutions && propSolutions.length > 0 ? propSolutions : defaultSolutions;

  // Default section configuration
  const config = {
    backgroundImage: sectionConfig?.backgroundImage || "/homepage-solutions-banner.png",
    heading: sectionConfig?.heading || "SOLUTIONS THAT",
    highlightedWord: sectionConfig?.highlightedWord || "CHANGES",
    ctaText: sectionConfig?.ctaText || "READ MORE",
    ctaLink: sectionConfig?.ctaLink || "/services",
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (solutions.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % solutions.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [solutions.length]);

  const currentSolution = solutions[currentIndex] || solutions[0];

  return (
    <section className="bg-white relative overflow-hidden min-h-screen pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left section - Dark teal background */}
        <div className=" relative flex flex-col justify-start pt-24 lg:pt-32 px-8 md:px-12 lg:px-16 xl:px-24 pb-16">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={config.backgroundImage}
              alt="Solutions background"
              fill
              className="object-cover "
            />
          </div>

          {/* Polygon decoration - bottom right */}
          <div className="absolute bottom-0 right-0 hidden lg:block">
            <PolygonIcon />
          </div>

          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-[46px] font-light tracking-[3.75px] leading-tight lg:leading-[67px] mb-8">
              {config.heading}
              <br />
              <span className="font-light">MAKE </span>
              <span className="text-[#5FBA51] italic font-semibold">
                {config.highlightedWord}
              </span>
            </h2>

            <Link
              href={config.ctaLink}
              className="inline-flex items-center bg-[#5FBA51] text-white group gap-3 hover:gap-6 transition-all duration-300 px-6 py-3 rounded"
            >
              <span className="text-sm tracking-wider">{config.ctaText}</span>
              <RightArrowIcon color={"#FFFFFF"} />
            </Link>
          </div>
        </div>

        {/* Right section - White background with content */}
        <div className="bg-white relative flex flex-col justify-between px-8 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-20">
          {/* Content area */}
          <div className="flex-1 flex flex-col justify-center relative z-10">
            {/* Solution title */}
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-normal leading-tight tracking-wide mb-6 text-black">
              {currentSolution.title}
            </h3>

            {/* Solution description */}
            <p className="text-base md:text-lg text-black/60 leading-relaxed tracking-wide mb-8 max-w-2xl">
              {currentSolution.description}
            </p>

            {/* Solution image */}
            <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-sm mb-8">
              <Image
                src={currentSolution.image?.url || "/placeholder.svg"}
                alt={currentSolution.image?.alt || currentSolution.title}
                fill
                className="object-cover transition-transform duration-700"
              />
            </div>
          </div>

          {/* Navigation dots - positioned on right side */}
          <div className="flex flex-col items-end gap-3 absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20">
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "h-20 w-1 bg-[#5FBA51]"
                    : "h-12 w-1 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to solution ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
