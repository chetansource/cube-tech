"use client";
import React, { useState } from "react";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";

// Project data structure
interface Project {
  id: number;
  name: string;
  description: string;
  position: { x: number; y: number };
  image?: string;
}

// Sample project data
const projects: Project[] = [
  {
    id: 1,
    name: "Parking Study",
    description: "Traffic analysis and count study for highway development",
    position: { x: 68, y: 53 },
    image: "/long-highway-2.webp",
  },
  {
    id: 2,
    name: "Parking Demand Analysis",
    description:
      "Comprehensive analysis of parking requirements and usage patterns",
    position: { x: 43, y: 44 },
    image: "/long-highway-2.webp",
  },
  {
    id: 3,
    name: "Choice of Parking System",
    description: "Evaluation and selection of optimal parking systems",
    position: { x: 40, y: 28 },
    image: "/long-highway-2.webp",
  },
  {
    id: 4,
    name: "Development of Concept Plan",
    description: "Creating conceptual frameworks for parking solutions",
    position: { x: 42, y: 61 },
    image: "/long-highway-2.webp",
  },
  {
    id: 5,
    name: "Parking Project Structuring",
    description: "Organizing and planning parking project implementation",
    position: { x: 40, y: 64 },
    image: "/long-highway-2.webp",
  },
  {
    id: 6,
    name: "Simulation of Parking System",
    description: "Computer modeling to optimize parking efficiency",
    position: { x: 78, y: 73 },
    image: "/long-highway-2.webp",
  },
  {
    id: 7,
    name: "Traffic Impact Assessment",
    description: "Evaluating traffic flow changes from infrastructure projects",
    position: { x: 65, y: 27 },
    image: "/long-highway-2.webp",
  },
];

export default function ProjectMap() {
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
              <circle
                key={project.id}
                cx={project.position.x}
                cy={project.position.y}
                r={activeProject?.id === project.id ? "1.5" : "1"}
                fill={activeProject?.id === project.id ? "#4ade80" : "#22c55e"}
                className="cursor-pointer transition-all duration-400"
                onMouseEnter={() => setActiveProject(project)}
                onMouseLeave={() => setActiveProject(null)}
              />
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
                {project.name}
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
              src={activeProject.image ?? "/placeholder.jpg"}
              alt={activeProject.name ?? "Project image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-row items-start justify-between w-full mt-2">
            <h3 className="text-[18px] font-normal text-white  leading-[27x] tracking-[0.75px] w-[323px] max-w-full">
              {activeProject.name}
            </h3>
            <RightArrowIcon color={"#5FBA51"} />
          </div>
        </div>
      )}
    </div>
  );
}
