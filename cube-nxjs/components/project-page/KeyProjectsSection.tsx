"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PrivacyIcon from "../icons/PrivacyIcon";

// Define the types for our project data
interface PolicyCard {
  icon: string;
  title: string;
  description?: string;
}

interface ProjectData {
  title: string;
  highlightedText: string;
  mainImage: string;
  projectTitle: string;
  projectLocation: string;
  projectHighlight: string;
  description: string;
  policyCards: PolicyCard[];
}

// This component can be reused with different project data
export default function KeyProjectsSection({
  data,
  className = "",
}: {
  data: ProjectData;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Set up intersection observer to detect when section is in viewport
  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, []);
  
  // Control the animation based on viewport visibility
  useEffect(() => {
    if (!carouselRef.current) return;

    if (isInView) {
      carouselRef.current.style.animationPlayState = "running";
    } else {
      carouselRef.current.style.animationPlayState = "paused";
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className={`w-full bg-white md:py-16 ${className}`}>
      <div className="">
        {/* Section Header */}
        <div className="hidden md:block mb-12 pl-[61px]">
          <h2 className=" text-[46px] leading-[67px] uppercase">
            <span className="text-black font-light ">{data.title}</span>{" "}
            <span className="text-accent font-semibold">
              {data.highlightedText}
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
          {/* Left Column - Image */}
          <div className="relative h-[400px] md:h-[702px] overflow-hidden">
            <Image
              src={data.mainImage || "/placeholder.svg"}
              alt="Project overview"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column - Project Details */}
          <div className="flex flex-col p-4 md:p-0">
            {/* Project Title and Description */}
            <div className="flex-shrink-0 w-full md:w-[450px] max-w-full pb-25 md:pb-0">
              <h3 className=" text-xl md:text-2xl md:text-[40px] font-light leading-[26px] md:leading-[40px] tracking-[3.75px] pb-11">
                {data.projectTitle} {data.projectLocation}{" "}
                <span className="text-accent italic font-medium ">
                  {data.projectHighlight}
                </span>
              </h3>
              <p className="text-[#404040] text-sm leading-[22px] md:leading-[31px] mb-11">
                {data.description}
              </p>
              <button className="hidden md:flex items-center text-accent font-bold text-base group">
                READ MORE
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Policy Cards Carousel */}
            <div className="mt-8 overflow-hidden">
              <div
                ref={carouselRef}
                className="flex gap-6 animate-carousel"
                style={{
                  animation: isInView ? "carousel 20s linear infinite" : "none",
                }}
              >
                {data.policyCards.map((card, index) => (
                  <div
                    key={index}
                    className="w-[200px] h-[280px] md:w-[239px] md:h-[312px] flex-shrink-0 border-t border-gray-200 pt-4"
                  >
                    <div className="text-green-500 mb-2">
                      {/* You can replace this with your actual icon component */}
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <PrivacyIcon/>
                      </div>
                    </div>
                    <h4 className="text-lg font-medium mb-2">{card.title}</h4>
                    {card.description ? (
                      <p className="text-sm text-gray-500 line-clamp-4">
                        {card.description}
                      </p>
                    ) : (
                      <div className="h-[65px]"></div> // fallback space if no description
                    )}
                    <button className="mt-4 text-accent">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
