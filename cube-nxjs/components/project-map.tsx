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

  const toggleProject = useCallback((project: Project) => {
    setActiveProject((prev) => (prev?.id === project.id ? null : project));
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
    <div className="w-full bg-[#212121] mb-15 md:mb-[141px]">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col">
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <h1 className="text-3xl font-light mb-2 text-white leading-tight">
            {title} <span className="italic font-semibold">{highlightedWord}</span>
          </h1>
          <p className="text-white/60 mt-3 text-sm leading-[22px]">
            {description}
          </p>
          {showCta && ctaText && ctaLink && (
            <a href={ctaLink}>
              <button className="mt-4 bg-accent hover:bg-accent/90 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors">
                {ctaText}
              </button>
            </a>
          )}
        </div>

        {/* Map */}
        <div className="relative w-full h-[280px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/highly-detailed-map.svg"
            alt="India Map Background"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 z-10" onClick={() => setActiveProject(null)}>
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
                  onClick={(e) => { e.stopPropagation(); toggleProject(project); }}
                >
                  {isActive && (
                    <div
                      className="absolute rounded-full animate-pulse"
                      style={{
                        width: '40px',
                        height: '40px',
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
                      width: isActive ? '12px' : '8px',
                      height: isActive ? '12px' : '8px',
                      backgroundColor: isActive ? '#4ade80' : '#22c55e',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile Popup - between map and list */}
        {activeProject && (
          <Link
            href={`/projects/details/${activeProject.slug}`}
            className="mx-3 my-2 bg-black/50 backdrop-blur-sm p-2 border border-white/10 transition-all duration-300 block"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-[60px] h-[45px] flex-shrink-0 bg-black/30">
                <Image
                  src={activeProject.mainImage?.url ?? "/placeholder.jpg"}
                  alt={activeProject.mainImage?.alt ?? activeProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="flex-1 min-w-0 text-xs font-normal text-white leading-snug truncate">
                {activeProject.title}
              </h3>
              <RightArrowIcon color={"#5FBA51"} />
            </div>
          </Link>
        )}

        {/* Project List */}
        <div className="px-5 py-4 max-h-[150px] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center cursor-pointer"
                onClick={() => toggleProject(project)}
              >
                <div
                  className={`w-3 h-[2px] mr-3 transition-all duration-300 ${
                    activeProject?.id === project.id ? "bg-accent" : "bg-transparent"
                  }`}
                />
                <div
                  className={`text-sm transition-colors duration-300 ${
                    activeProject?.id === project.id ? "text-white" : "text-white/60"
                  }`}
                >
                  {project.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative w-full h-screen overflow-hidden">
        {/* Background Map */}
        <div className="absolute inset-0">
          <div className="relative h-full aspect-square" style={{ marginLeft: 'auto', marginRight: '0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/highly-detailed-map.svg"
              alt="India Map Background"
              className="absolute inset-0 w-full h-full"
            />
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
        <div className="absolute top-20 left-20 z-10">
          <h1 className="text-[65px] font-light mb-2 text-white leading-[97.5px] whitespace-nowrap">
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
        <div className="absolute bottom-5 left-20 z-10 max-h-[40vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative flex items-center group cursor-pointer"
                onMouseEnter={() => showProject(project)}
                onMouseLeave={scheduleHide}
              >
                <div
                  className={`absolute -left-12 h-1 w-8 transition-all duration-300 ${
                    activeProject?.id === project.id
                      ? "bg-white opacity-100"
                      : "opacity-0"
                  }`}
                />
                <div
                  className={`text-2xl transition-colors duration-300 ${
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
            className="absolute right-20 top-28 z-50 bg-black/30 backdrop-blur-sm p-6 border border-primary/20 transition-all duration-300 w-[347px] block cursor-pointer hover:bg-black/40"
            onMouseEnter={() => showProject(activeProject)}
            onMouseLeave={scheduleHide}
          >
            <div className="relative w-full h-[181px] mb-4 bg-black/30">
              <Image
                src={activeProject.mainImage?.url ?? "/placeholder.jpg"}
                alt={activeProject.mainImage?.alt ?? activeProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-row items-start justify-between w-full mt-2">
              <h3 className="text-[18px] font-normal text-white leading-[27px] tracking-[0.75px] w-[323px] max-w-full">
                {activeProject.title}
              </h3>
              <RightArrowIcon color={"#5FBA51"} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
