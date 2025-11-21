"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import RightArrowIcon from "../icons/right-arrow";

type Project = {
  id: number;
  title: string;
  image: string;
  heading: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "",
    image: "/long-highway-3.webp",
    heading:
      "3-days Traffic Count on Suratgarh - Sriganganagar Section of NH15",
    description:
      "CubeTech conducted a 3-day traffic count on the Suratgarh-Sriganganagar section of NH15, analyzing vehicle flow for planning and optimization",
    tags: [
      "Sriganganagar",
      "Uniquest Infra ",
      "Pre-bid - Traffic",
    ],
  },
  {
    id: 2,
    title: "PROJECT 02",
    image: "/long-highway-2.webp",
    heading:
      "7-Day Traffic Survey for Bameetha-Panna-Nagod-Satana Section of NH-75 in the State of Madhya Pradesh",
    description:
      "CubeTech conducted a 7-day traffic survey on the Bameetha-Panna-Nagod-Satana section of NH-75, assessing vehicle flow and road usage patterns",
    tags: ["Satana", "Topworth Infra", "Traffic Study"],
  },
  {
    id: 3,
    title: "",
    image: "/long-highway-3.webp",
    heading: "Urban Mobility Study for Bangalore Metro Phase 2",
    description:
      "CubeTech performed a comprehensive urban mobility study for the Bangalore Metro Phase 2 expansion, analyzing commuter patterns and infrastructure needs",
    tags: ["Bangalore", "Metro Corporation", "Urban Planning"],
  },
  {
    id: 4,
    title: "PROJECT 04",
    image: "/long-highway-2.webp",
    heading: "Highway Safety Audit for Mumbai-Pune Expressway",
    description:
      "CubeTech conducted a detailed safety audit of the Mumbai-Pune Expressway, identifying critical improvement areas and recommending safety enhancements",
    tags: ["Mumbai", "MSRDC", "Safety Audit"],
  },
];

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, projects.length - 2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < maxIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full px-4 md:px-16 ">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-[46px] text-black/60 md:eading-[64px] md:tracking-[3.75px] uppercase">
          EXPLORE MORE <br className="block md:hidden" />
          <span className="text-accent italic font-semibold">PROJECTS</span>
        </h2>
        <div className="hidden md:flex gap-4">
          <button
            onClick={goToPrevious}
            className={cn(
              "p-2 transition-opacity",
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:text-green-500"
            )}
            disabled={currentIndex === 0 || isAnimating}
            aria-label="Previous projects"
          >
            <ArrowLeft className="h-6 w-6 text-green-500" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "p-2 transition-opacity",
              currentIndex === maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:text-green-500"
            )}
            disabled={currentIndex === maxIndex || isAnimating}
            aria-label="Next projects"
          >
            <ArrowRight className="h-6 w-6 text-green-500" />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="relative overflow-hidden hidden md:block">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-1/2 flex-shrink-0 px-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-6">
        {[0, 1].map((rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-1 hide-scrollbar "
          >
            {projects
              .filter((_, idx) => idx % 2 === rowIndex)
              .map((project) => (
                <div
                  key={project.id}
                  className="snap-start flex-shrink-0 w-[90%] "
                >
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col h-full bg-white shadow-sm ">
      <div className="relative h-64 md:h-[392px] w-full mb-4 overflow-hidden ">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.heading}
          fill
          className="object-cover"
        />
        <h3 className="absolute top-4 left-4 text-xl font-light text-white z-20">
          {project.title}
        </h3>
      </div>

      <div className="px-4 pb-4 flex flex-col flex-1">
        <h4 className="leading-snug text-base md:text-xl text-black mb-3">
          {project.heading}
        </h4>

        <div className="flex justify-between mb-4">
          <p className="text-black/60 text-sm md:text-base pr-4">
            {project.description}
          </p>
          <RightArrowIcon color="#5FBA51" />
        </div>

        <div className="mt-auto flex  gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 border-b border-accent text-sm text-black/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
