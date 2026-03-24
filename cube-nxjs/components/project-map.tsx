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
  'Agartala': { x: 92.17, y: 55.30 },
  'Agra': { x: 48.39, y: 41.47 },
  'Ahmedabad': { x: 34.56, y: 52.99 },
  'Aizawl': { x: 94.47, y: 61.05 },
  'Amaravati': { x: 59.91, y: 74.88 },
  'Bangalore': { x: 57.60, y: 85.25 },
  'Bengaluru': { x: 57.60, y: 85.25 },
  'Bhopal': { x: 50.69, y: 55.30 },
  'Bhubaneswar': { x: 69.12, y: 66.82 },
  'Chandigarh': { x: 46.08, y: 28.80 },
  'Chennai': { x: 64.52, y: 92.17 },
  'Coimbatore': { x: 59.91, y: 95.62 },
  'Dehradun': { x: 48.39, y: 34.56 },
  'Delhi': { x: 47.23, y: 38.02 },
  'Dispur': { x: 87.56, y: 49.54 },
  'Gandhinagar': { x: 33.41, y: 50.69 },
  'Gangtok': { x: 80.64, y: 40.32 },
  'Gurugram': { x: 47.23, y: 39.17 },
  'Guwahati': { x: 86.40, y: 49.54 },
  'Hyderabad': { x: 59.91, y: 69.12 },
  'Imphal': { x: 94.47, y: 51.84 },
  'Indore': { x: 48.39, y: 57.60 },
  'Itanagar': { x: 89.86, y: 43.78 },
  'Jaipur': { x: 43.78, y: 43.78 },
  'Jammu': { x: 43.78, y: 20.74 },
  'Jodhpur': { x: 40.32, y: 48.39 },
  'Kanpur': { x: 54.14, y: 43.78 },
  'Kochi': { x: 55.30, y: 94.47 },
  'Kohima': { x: 95.62, y: 49.54 },
  'Kolkata': { x: 71.43, y: 55.30 },
  'Lucknow': { x: 55.30, y: 41.47 },
  'Madurai': { x: 62.21, y: 96.77 },
  'Mangaluru': { x: 52.99, y: 87.56 },
  'Mumbai': { x: 41.47, y: 69.12 },
  'Mysuru': { x: 56.45, y: 87.56 },
  'Nagpur': { x: 57.60, y: 59.91 },
  'Noida': { x: 48.39, y: 38.59 },
  'Panaji': { x: 48.39, y: 78.34 },
  'Patna': { x: 63.36, y: 46.08 },
  'Pune': { x: 43.78, y: 73.73 },
  'Raipur': { x: 62.21, y: 62.21 },
  'Ranchi': { x: 66.82, y: 57.60 },
  'Shimla': { x: 44.93, y: 29.95 },
  'Shillong': { x: 87.56, y: 52.99 },
  'Srinagar': { x: 41.47, y: 13.82 },
  'Surat': { x: 36.87, y: 57.60 },
  'Thiruvananthapuram': { x: 57.60, y: 99.08 },
  'Udaipur': { x: 41.47, y: 51.84 },
  'Vadodara': { x: 35.71, y: 55.30 },
  'Varanasi': { x: 59.91, y: 48.39 },
  'Visakhapatnam': { x: 69.12, y: 71.43 },
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

  // Resolve position: use stored mapPosition coordinates directly
  const getResolvedPosition = useCallback((project: Project) => {
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
        <div className="relative h-full aspect-square md:ml-auto md:mr-0" style={{ marginLeft: 'auto', marginRight: '0' }}>
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
      <div className="absolute top-5 md:top-20 left-5 md:left-20 z-10">
        <h1 className="text-2xl md:text-[65px] font-light mb-2 text-white leading-[97.5px] whitespace-nowrap">
          {title} <span className="italic font-semibold">{highlightedWord}</span>
        </h1>
        <p className="text-white/60 mt-4 text-lg leading-[24px] max-w-md">
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
      <div className="absolute bottom-5 left-5 md:left-20 z-10 max-h-[40vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex items-center group cursor-pointer"
              onMouseEnter={() => showProject(project)}
              onMouseLeave={scheduleHide}
            >
              {/* Vertical white bar on hover - positioned to the left */}
              <div
                className={`absolute -left-12 h-1 w-8 transition-all duration-300 ${
                  activeProject?.id === project.id
                    ? "bg-white opacity-100"
                    : "opacity-0"
                }`}
              />

              {/* Project name */}
              <div
                className={`text-base md:text-2xl transition-colors duration-300 ${
                  activeProject?.id === project.id
                    ? "text-white"
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
