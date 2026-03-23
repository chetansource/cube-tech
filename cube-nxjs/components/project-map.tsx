"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
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

// City coordinates as % position on the 868x868 map image
// Determined empirically by visual analysis of highly-detailed-map.svg
// The map uses a non-linear projection so these are hardcoded, not computed
const CITY_COORDINATES: Record<string, { x: number; y: number }> = {
  // Metro cities
  'Delhi': { x: 32, y: 25 },
  'Mumbai': { x: 19, y: 51 },
  'Bangalore': { x: 37, y: 75 },
  'Bengaluru': { x: 37, y: 75 },
  'Chennai': { x: 42, y: 75 },
  'Hyderabad': { x: 38, y: 65 },
  'Kolkata': { x: 67, y: 43 },
  'Pune': { x: 22, y: 56 },
  'Ahmedabad': { x: 13, y: 44 },
  // State capitals
  'Lucknow': { x: 40, y: 31 },
  'Jaipur': { x: 25, y: 30 },
  'Chandigarh': { x: 28, y: 18 },
  'Bhopal': { x: 30, y: 43 },
  'Patna': { x: 52, y: 33 },
  'Bhubaneswar': { x: 52, y: 50 },
  'Thiruvananthapuram': { x: 30, y: 88 },
  'Kochi': { x: 28, y: 83 },
  'Guwahati': { x: 72, y: 25 },
  'Dehradun': { x: 32, y: 17 },
  'Shimla': { x: 29, y: 16 },
  'Srinagar': { x: 25, y: 6 },
  'Jammu': { x: 24, y: 10 },
  'Ranchi': { x: 52, y: 40 },
  'Raipur': { x: 42, y: 48 },
  'Gandhinagar': { x: 13, y: 44 },
  'Panaji': { x: 20, y: 60 },
  'Imphal': { x: 78, y: 30 },
  'Shillong': { x: 73, y: 26 },
  'Aizawl': { x: 76, y: 30 },
  'Kohima': { x: 78, y: 27 },
  'Agartala': { x: 74, y: 30 },
  'Itanagar': { x: 76, y: 22 },
  'Gangtok': { x: 68, y: 24 },
  'Dispur': { x: 73, y: 26 },
  'Amaravati': { x: 44, y: 63 },
  // Major tier-2 cities
  'Noida': { x: 33, y: 26 },
  'Gurugram': { x: 31, y: 26 },
  'Surat': { x: 15, y: 50 },
  'Vadodara': { x: 14, y: 47 },
  'Nagpur': { x: 38, y: 48 },
  'Indore': { x: 25, y: 44 },
  'Coimbatore': { x: 33, y: 80 },
  'Visakhapatnam': { x: 50, y: 58 },
  'Madurai': { x: 36, y: 83 },
  'Varanasi': { x: 46, y: 33 },
  'Kanpur': { x: 39, y: 32 },
  'Mysuru': { x: 34, y: 78 },
  'Mangaluru': { x: 27, y: 76 },
  'Jodhpur': { x: 17, y: 31 },
  'Udaipur': { x: 18, y: 37 },
  'Agra': { x: 34, y: 29 },
};

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
  const projects = useMemo(() => propProjects || [], [propProjects]);

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

  // Resolve position: prefer city lookup (always accurate), fallback to stored coords
  const getResolvedPosition = useCallback((project: Project) => {
    if (project.mapCity && CITY_COORDINATES[project.mapCity]) {
      return CITY_COORDINATES[project.mapCity];
    }
    return project.mapPosition || null;
  }, []);

  // Compute offsets for projects sharing the same coordinates (same city)
  const getClusteredPosition = useCallback((project: Project) => {
    const resolved = getResolvedPosition(project);
    if (!resolved) return null;
    const { x, y } = resolved;

    // Find all projects at the same position
    const samePos = projects.filter(
      (p) => {
        const pos = getResolvedPosition(p);
        return pos && pos.x === x && pos.y === y;
      }
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
  }, [projects, getResolvedPosition]);

  return (
    <div className="relative w-full h-screen overflow-hidden mb-15 md:mb-[141px]">
      {/* Background Map */}

      <div className="absolute inset-0 bg-[#212121] bg-cover bg-no-repeat  ">
        {/* Square wrapper: both image and dots share the exact same box.
            h-full = viewport height, aspect-square = width equals height.
            Positioned to the right with ml-auto + shifted with md:pr-0 md:pl-80 */}
        <div className="relative h-full aspect-square md:ml-auto md:mr-0" style={{ marginLeft: 'auto', marginRight: '-10%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/highly-detailed-map.svg"
            alt="India Map Background"
            className="absolute inset-0 w-full h-full"
          />
          {/* Dots overlay - exact same size as the image */}
          <div
            className="absolute inset-0 z-10"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
              const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
              console.log(`Map clicked: x=${x}%, y=${y}%`);
            }}
          >
            {projects.map((project) => {
              const pos = getClusteredPosition(project);
              const isActive = activeProject?.id === project.id;
              if (!pos) return null;
              return (
                <div
                  key={project.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => showProject(project)}
                  onMouseLeave={scheduleHide}
                >
                  {isActive && (
                    <div
                      className="absolute rounded-full animate-pulse"
                      style={{
                        width: '60px',
                        height: '60px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.15) 40%, rgba(34,197,94,0) 70%)',
                      }}
                    />
                  )}
                  <div
                    className="rounded-full relative z-10"
                    style={{
                      width: isActive ? '14px' : '10px',
                      height: isActive ? '14px' : '10px',
                      backgroundColor: isActive ? '#4ade80' : '#22c55e',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              );
            })}
          </div>
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
