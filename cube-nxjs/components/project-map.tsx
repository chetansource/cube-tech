"use client";
import React, { useState, useRef, useCallback } from "react";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";
import Link from "next/link";

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
  mapCity?: string;
  mapPosition?: {
    x: number;
    y: number;
  };
}

interface ProjectMapProps {
  projects?: Project[];
  title?: string;
  highlightedWord?: string;
  description?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
}


export default function ProjectMap({
  projects: propProjects,
  title = "Our",
  highlightedWord = "Projects",
  description = "Cubehighways Tech had a comprehensive role in overseeing the project management consultant from planning to execution.",
  showCta = false,
  ctaText = "See all services",
  ctaLink = "/services"
}: ProjectMapProps) {
  const projects = propProjects || [];

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const showProject = useCallback((project: Project) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setActiveProject(project);
  }, []);

  const scheduleHide = useCallback(() => {
    hideTimeout.current = setTimeout(() => {
      setActiveProject(null);
    }, 300);
  }, []);

  // Compute offsets for projects sharing the same coordinates (same city)
  const getClusteredPosition = useCallback((project: Project, index: number) => {
    if (!project.mapPosition) return null;
    const { x, y } = project.mapPosition;

    // Find all projects at the same position
    const samePos = projects.filter(
      (p) => p.mapPosition && p.mapPosition.x === x && p.mapPosition.y === y
    );
    if (samePos.length <= 1) return { x, y };

    const idx = samePos.findIndex((p) => p.id === project.id);
    const offsets = [
      { dx: 0, dy: 0 },
      { dx: 2.5, dy: 0 },
      { dx: -2.5, dy: 0 },
      { dx: 0, dy: 2.5 },
      { dx: 2.5, dy: 2.5 },
      { dx: -2.5, dy: 2.5 },
    ];
    const offset = offsets[idx] || { dx: idx * 2, dy: 0 };
    return { x: x + offset.dx, y: y + offset.dy };
  }, [projects]);

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
            {projects.map((project, index) => {
              const pos = getClusteredPosition(project, index);
              return pos && (
                <circle
                  key={project.id}
                  cx={pos.x}
                  cy={pos.y}
                  r={activeProject?.id === project.id ? "1.5" : "1"}
                  fill={activeProject?.id === project.id ? "#4ade80" : "#22c55e"}
                  className="cursor-pointer transition-all duration-400"
                  onMouseEnter={() => showProject(project)}
                  onMouseLeave={scheduleHide}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-5 md:top-20 left-5 md:left-20 max-w-md z-10">
        <h1 className="text-2xl md:text-[65px] font-light mb-2 text-white leading-[97.5px]">
          {title} <span className="italic font-semibold">{highlightedWord}</span>
        </h1>
        <p className="text-white/60 mt-4 text-lg leading-[24px]">
          {description}
        </p>
        {showCta && ctaText && ctaLink && (
          <a href={ctaLink}>
            <button className="mt-6 bg-accent hover:bg-accent/90 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors">
              {ctaText}
            </button>
          </a>
        )}
      </div>

      {/* Project List */}
      <div className="absolute bottom-5  md:left-20 z-10">
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center space-x-4 md:pl-4 group"
              onMouseEnter={() => showProject(project)}
              onMouseLeave={scheduleHide}
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
        <Link
          href={`/projects/details/${activeProject.slug}`}
          className="absolute right-5 md:right-20 top-24 md:top-28 z-50 bg-black/30 backdrop-blur-sm p-4 md:p-6 border border-primary/20 transition-all duration-300 w-[60vw] md:w-[347px] block cursor-pointer hover:bg-black/40"
          onMouseEnter={() => showProject(activeProject)}
          onMouseLeave={scheduleHide}
        >
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
        </Link>
      )}
    </div>
  );
}
