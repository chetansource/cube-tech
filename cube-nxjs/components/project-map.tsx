"use client";
import React, { useState } from "react";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";

// Project data structure
interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  mapPosition?: {
    x: number;
    y: number;
  };
}

interface ProjectMapProps {
  projects?: Project[];
}

// Fallback project data
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Parking Study",
    slug: "parking-study",
    shortDescription: "Traffic analysis and count study for highway development",
    mapPosition: { x: 68, y: 53 },
    mainImage: { url: "/long-highway-2.webp", alt: "Parking Study" },
  },
  {
    id: "2",
    title: "Parking Demand Analysis",
    slug: "parking-demand-analysis",
    shortDescription:
      "Comprehensive analysis of parking requirements and usage patterns",
    mapPosition: { x: 43, y: 44 },
    mainImage: { url: "/long-highway-2.webp", alt: "Parking Demand Analysis" },
  },
  {
    id: "3",
    title: "Choice of Parking System",
    slug: "choice-of-parking-system",
    shortDescription: "Evaluation and selection of optimal parking systems",
    mapPosition: { x: 40, y: 28 },
    mainImage: { url: "/long-highway-2.webp", alt: "Choice of Parking System" },
  },
  {
    id: "4",
    title: "Development of Concept Plan",
    slug: "development-of-concept-plan",
    shortDescription: "Creating conceptual frameworks for parking solutions",
    mapPosition: { x: 42, y: 61 },
    mainImage: { url: "/long-highway-2.webp", alt: "Development of Concept Plan" },
  },
  {
    id: "5",
    title: "Parking Project Structuring",
    slug: "parking-project-structuring",
    shortDescription: "Organizing and planning parking project implementation",
    mapPosition: { x: 40, y: 64 },
    mainImage: { url: "/long-highway-2.webp", alt: "Parking Project Structuring" },
  },
  {
    id: "6",
    title: "Simulation of Parking System",
    slug: "simulation-of-parking-system",
    shortDescription: "Computer modeling to optimize parking efficiency",
    mapPosition: { x: 78, y: 73 },
    mainImage: { url: "/long-highway-2.webp", alt: "Simulation of Parking System" },
  },
  {
    id: "7",
    title: "Traffic Impact Assessment",
    slug: "traffic-impact-assessment",
    shortDescription: "Evaluating traffic flow changes from infrastructure projects",
    mapPosition: { x: 65, y: 27 },
    mainImage: { url: "/long-highway-2.webp", alt: "Traffic Impact Assessment" },
  },
];

export default function ProjectMap({ projects: propProjects }: ProjectMapProps) {
  // Use prop projects or fallback to defaults if empty
  const projects = propProjects && propProjects.length > 0 ? propProjects : defaultProjects;

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden mb-15 md:mb-[141px]">
      {/* Background Map */}

      <div className="absolute inset-0 bg-[#212121] bg-cover bg-no-repeat  ">
        <div className="relative h-full w-full md:top-0 md:left-80 ">
          <Image
            src="/highly-detailed-map.svg"
            alt="India Map Background"
            fill
          />
        </div>

        {/* Map outline overlay - in a real implementation, you'd use an SVG of India */}
        <div className="absolute inset-0 flex items-center md:justify-center md:left-60">
          <svg
            viewBox="0 0 100 100"
            className="w-[65%] md:w-[80%] h-[60%] md:h-[70%]"
          >
            {/* This would be replaced with actual SVG path data for India */}
            <path
              d="M20,20 L80,20 L80,80 L20,80 Z"
              fill="none"
              //   stroke="#21212"
              strokeWidth="0.5"
            />

            {/* Project dots */}
            {projects.map((project) => (
              project.mapPosition && (
                <circle
                  key={project.id}
                  cx={project.mapPosition.x}
                  cy={project.mapPosition.y}
                  r={activeProject?.id === project.id ? "1.5" : "1"}
                  fill={activeProject?.id === project.id ? "#4ade80" : "#22c55e"}
                  className="cursor-pointer transition-all duration-400"
                  onMouseEnter={() => setActiveProject(project)}
                  onMouseLeave={() => setActiveProject(null)}
                />
              )
            ))}
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-5 md:top-20 left-5 md:left-20 max-w-md z-10">
        <h1 className="text-2xl md:text-[65px] font-light mb-2 text-white leading-[97.5px]">
          Our <span className="italic font-semibold">Projects</span>
        </h1>
        <p className="text-white/60 mt-4 text-lg leading-[24px]">
          Cubehighways Tech had a comprehensive role in overseeing the project
          management consultant from planning to execution.
        </p>
      </div>

      {/* Project List */}
      <div className="absolute bottom-5  md:left-20 z-10">
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center space-x-4 md:pl-4 group"
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Vertical white bar on hover */}
              <div
                className={`h-1 w-8 transition-all duration-300 ${
                  activeProject?.id === project.id
                    ? "bg-white opacity-100"
                    : "opacity-0"
                }`}
              />

              {/* Project name */}
              <div
                className={`text-base md:text-2xl transition-colors duration-300 ${
                  activeProject?.id === project.id
                    ? "text-white cursor-pointer"
                    : "text-white/60"
                }`}
              >
                {project.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Popup */}
      {activeProject && (
        <div className="absolute right-5 md:right-20 top-24 md:top-28 z-50 bg-black/30 backdrop-blur-sm p-4 md:p-6 border border-primary/20 transition-all duration-300 w-[60vw] md:w-[347px] ">
          <div className="relative w-full h-[120px] md:h-[181px] mb-4 bg-black/30">
            <Image
              src={activeProject.mainImage?.url ?? "/placeholder.jpg"}
              alt={activeProject.mainImage?.alt ?? activeProject.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-row items-start justify-between w-full mt-2">
            <h3 className="text-[18px] font-normal text-white  leading-[27x] tracking-[0.75px] w-[323px] max-w-full">
              {activeProject.title}
            </h3>
            <RightArrowIcon color={"#5FBA51"} />
          </div>
        </div>
      )}
    </div>
  );
}
