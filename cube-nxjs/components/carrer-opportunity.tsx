'use client';
import React, { useState, useEffect, useRef } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import RightArrowIcon from "./icons/right-arrow";
import { getCareerPageContent, Job } from "@/utils/routes/Careers";
import { useRouter } from "next/navigation";

interface CareerHeading {
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export default function CareerOpportunities() {
  const [careerHeading, setCareerHeading] = useState<CareerHeading | null>(
    null
  );
  const [jobList, setJobList] = useState<Job[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { careerHeading, jobList } = await getCareerPageContent("careerpage");
      setCareerHeading(careerHeading ?? null);
      setJobList(jobList);
    };

    fetchData();
  }, []);

  // Check if scrolling is possible
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, [jobList]);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className=" bg-white pb-18 px-4 md:px-16 ">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column - 35% */}
        <div className="md:w-[43%] space-y-6">
          <h1 className="text-2xl md:text-[32px] font-bold md:leading-[40px] md:tracking-[3.75px]">
            <span className="font-light text-black">
              {careerHeading?.headingLine1 || "CAREER "}{" "}
            </span>
            <span className=" font-medium text-accent italic">
              {careerHeading?.headingLine2 || "OPPORTUNITIES"}
            </span>
          </h1>

          <p className="md:w-[70%] text-sm text-[#404040] leading-[20px]">
            {careerHeading?.description ||
              "Grow your career with opportunities in research, data analytics, and infrastructure development."}
          </p>

          <div className="pt-4">
            <button className="flex text-base font-bold items-center text-accent gap-8">
              READ MORE
              <RightArrowIcon color="#5FBA51" />
            </button>
          </div>
        </div>

        {/* Right Column - 65% with Horizontal Scroll */}
        <div
          className="md:w-[65%] relative"
          onMouseEnter={() => setShowScrollIndicator(true)}
          onMouseLeave={() => setShowScrollIndicator(false)}
        >
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-8 md:gap-6 md:overflow-x-auto overflow-y-visible
            scrollbar-hide md:scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: "24px",
            }}
          >
            {jobList.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 p-6 bg-[#F6F6F6] shadow-sm
                flex flex-col justify-between w-full md:w-[260px] md:min-w-[260px] md:flex-shrink-0"
              >
                <div className="py-3">
                  <h2
                    className="text-2xl font-light text-black leading-[32px] mb-3
                  h-[64px] line-clamp-2 overflow-hidden"
                  >
                    {job.title}
                  </h2>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-md font-light text-[#2E2C2C]  leading-[30px]">
                      {job.location}
                    </span>
                  </div>
                </div>

                <p className=" text-base font-['Glacier_Indifference']  text-[#484848] mb-6 leading-[24px]  line-clamp-4">
                  {job.description}
                </p>

                <div className="flex justify-end ">
                  <button
                    onClick={() => router.push(`/careers/details/${job.id}`)}
                    className="text-accent hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <RightArrowIcon color="#5FBA51" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator - Shows on Hover */}
          {canScrollRight && showScrollIndicator && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
              bg-accent/90 hover:bg-accent text-white p-3 rounded-full shadow-lg
              transition-all duration-300 z-10 items-center justify-center
              animate-pulse hover:animate-none cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
