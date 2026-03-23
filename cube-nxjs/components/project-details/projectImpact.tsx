"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import RightArrowIcon from "../icons/right-arrow";


interface Metric {
  label: string;
  value: string;
}

interface ProjectImpactProps {
  title?: string;
  highlightedWord?: string;
  description?: string;
  metrics?: Metric[];
}

interface ImpactCardProps {
  title: string;
  description?: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col md:min-w-[250px] h-[207px] md:h-[312px] p-4 md:p-6 border border-border rounded-sm relative transition-all duration-300 cursor-pointer ${
        isHovered ? "bg-[#5FBA51]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="md:mb-4">
        <CheckCircle className={`h-6 w-6 ${isHovered ? "text-white" : "text-accent"}`} />
      </div>
      <h3 className={`text-sm md:text-2xl md:leading-[33px] md:tracking-[0.75px] mb-2 ${isHovered ? "text-white" : "text-black"}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-xs md:text-base ${isHovered ? "text-white/80" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
      <div className="absolute bottom-4 left-4">
        <RightArrowIcon color={isHovered ? "#FFFFFF" : "#5FBA51"} />
      </div>
    </div>
  );
};

const defaultMetrics: Metric[] = [
  { label: "IFC Safeguard Policies", value: "" },
  { label: "Social Impact Assessment (SIA)", value: "Lorem ipsum dolor sit amet, consectetur." },
  { label: "Livelihood Enhancement Plan (LEP)", value: "" },
  { label: "Environmental Assessment", value: "" },
  { label: "Community Development", value: "" },
];

export function ProjectImpact({ title, highlightedWord, description, metrics }: ProjectImpactProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayMetrics = metrics && metrics.length > 0 ? metrics : defaultMetrics;

  const cards = displayMetrics.map((m) => ({
    title: m.label,
    description: m.value || undefined,
  }));

  const totalCards = cards.length;
  const visibleCards = 3;

  useEffect(() => {
    if (totalCards <= visibleCards) return;
    const isWeb = window.innerWidth >= 768;
    if (!isWeb) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % (totalCards - visibleCards + 1);
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.offsetWidth * 0.4;
        carouselRef.current.scrollTo({
          left: currentIndex * scrollAmount,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [totalCards, visibleCards]);

  return (
    <div className="flex flex-col md:flex-row w-full gap-8 md:py-12">
      {/* Left section - Title */}
      <div className="md:w-2/3 flex flex-col">
        <h2 className="text-2xl px-4 md:text-[46px] md:leading-[64px] md:tracking-[3.75px] mb-2 uppercase text-black/60">
          {title || "PROJECT"}{" "}
          <span className="text-accent font-semibold italic">
            {highlightedWord || "IMPACT"}
          </span>
        </h2>
        {description && (
          <p className="px-4 text-sm text-[#404040] mt-1">{description}</p>
        )}
      </div>

      {/* Right section - Cards */}
      <div className="md:w-3/4 overflow-hidden">
        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-4 px-4 md:hidden">
          {cards.map((card, index) => (
            <ImpactCard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* Web: Scrolling carousel or static */}
        <div
          ref={carouselRef}
          className="hidden md:flex gap-8 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0 w-[40%] md:w-1/3">
              <ImpactCard
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
