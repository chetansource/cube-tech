"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import RightArrowIcon from "./icons/right-arrow";

interface Service {
  id: string;
  title: string;
  description: string;
  link?: string;
}

interface ServicesSectionConfig {
  bannerImage?: string;
  heading?: string;
  highlightedWord?: string;
  description?: string;
}

interface ServiceSectionProps {
  services?: Service[];
  sectionConfig?: ServicesSectionConfig;
  reverse?: boolean;
}

// Fallback services for development
const defaultServices = [
  {
    id: "1",
    title: "Travel Demand Estimation & Modelling",
    description:
      "Travel demand estimation and forecasting is essential for assessing viability of any transportation facility and the design and operation of the same. It also supports in process of development of transportation policies.",
    link: "/services",
  },
  {
    id: "2",
    title: "Traffic Engineering & Management",
    description:
      "Our traffic engineering services help optimize traffic flow, improve safety, and enhance mobility through comprehensive analysis and innovative solutions.",
    link: "/services",
  },
  {
    id: "3",
    title: "Smart Mobility Solutions",
    description:
      "We develop and implement cutting-edge smart mobility solutions that leverage technology to create more efficient, sustainable, and user-friendly transportation systems.",
    link: "/services",
  },
];

export default function ServiceSection({ services: propServices, sectionConfig, reverse = false }: ServiceSectionProps) {
  // Use prop services or fallback to defaults if empty
  const services = propServices && propServices.length > 0 ? propServices : defaultServices;

  // Default section configuration for right panel
  const config = {
    bannerImage: sectionConfig?.bannerImage || "/services-section-banner.webp",
    heading: sectionConfig?.heading || "SERVICES",
    highlightedWord: sectionConfig?.highlightedWord || "OFFERED",
    description: sectionConfig?.description || "Smart AI-driven traffic monitoring with video-based analytics.",
  };

  // Parse title to extract main title and subtitle
  const parseServiceTitle = (title: string) => {
    const parts = title.split("&");
    if (parts.length > 1) {
      return {
        mainTitle: parts[0].trim(),
        subtitle: `& ${parts[1].trim()}`,
      };
    }
    return {
      mainTitle: title,
      subtitle: "",
    };
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Pixels per frame for smooth scrolling
    let animationFrameId: number;

    const smoothScroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Get the total scrollable height
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      // Reset to top when reaching bottom
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollTop = scrollPosition;
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    // Start the smooth scroll animation
    animationFrameId = requestAnimationFrame(smoothScroll);

    // Cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className={`flex flex-col md:flex-row w-full min-h-[911px] max-h-[911px] overflow-hidden mb-[60px] ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {/* Left side - Service descriptions with smooth scrolling */}
      <div className="relative w-full md:w-1/2 bg-[#FAFAFA] overflow-hidden h-[911px]">
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto"
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
          {services.map((service) => {
            const { mainTitle, subtitle } = parseServiceTitle(service.title);
            return (
              <div
                key={service.id}
                className="min-h-[364px] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 py-12 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="text-2xl md:text-[32px] font-light leading-tight tracking-[3.75px] mb-2">
                  {mainTitle}
                </h3>
                {subtitle && (
                  <h3 className="text-2xl md:text-[32px] font-light leading-tight tracking-[3.75px] mb-6">
                    <span className="text-[#5FBA51] italic font-normal">
                      {subtitle}
                    </span>
                  </h3>
                )}

                <p className="text-[#404040] text-sm md:text-base leading-relaxed max-w-lg mb-8">
                  {service.description}
                </p>

                <div className="inline-flex">
                  <a
                    href={service.link || "/services"}
                    className="inline-flex items-center bg-[#5FBA51] text-white px-6 py-3 hover:bg-[#4da043] transition-colors gap-3"
                  >
                    <span className="text-sm tracking-wider">READ MORE</span>
                    <RightArrowIcon color={"#FFFFFF"} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - Banner image with overlay */}
      <div className="relative w-full md:w-1/2 h-[911px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="relative h-full w-full">
          <Image
            src={config.bannerImage}
            alt="Services banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute top-0 left-0 px-8 md:px-12 lg:px-16 pt-24 lg:pt-32 z-20">
          <h2 className="text-white text-3xl md:text-[46px] font-light tracking-[3.75px] leading-tight mb-4">
            {config.heading}{" "}
            <span className="text-[#5FBA51] italic font-semibold">{config.highlightedWord}</span>
          </h2>
          <p className="text-white font-normal text-sm md:text-base mt-4 max-w-md leading-relaxed tracking-wide">
            {config.description}
          </p>
        </div>
      </div>
    </section>
  );
}
