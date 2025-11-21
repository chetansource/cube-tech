"use client";

import { useState, useRef } from "react";
import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import RightArrowIcon from "./icons/right-arrow";
import LeftArrowIcon from "./icons/left-arrow";
import UpArrowIcon from "./icons/up-arrow";
import Image from "next/image";

export default function ServicesSolutions() {
  // Static data for solutions
  const solutions = [
    {
      id: "01",
      title: "Advanced Video-Based Traffic Counting & AI Vision Solutions",
      description:
        "CubeTech revolutionizes traffic data collection with advanced AI-driven, video-based counting solutions. Since 2010, it has set industry standards by replacing manual counts with auditable video/ATCC technology. Its innovations ensure high accuracy and NHAI compliance.",
    },
    {
      id: "02",
      title: "Innovation in Pavement Evaluation, Material and Technology",
      description:
        "Our advanced pavement evaluation technologies use non-destructive testing methods to analyze road conditions with precision. We develop sustainable, durable materials that withstand heavy traffic and extreme weather conditions while reducing environmental impact.",
    },
    {
      id: "03",
      title: "Project Management Consultancy",
      description:
        "Our expert consultants provide end-to-end project management services for infrastructure development. From initial planning to execution and monitoring, we ensure timely delivery, cost efficiency, and adherence to quality standards across all project phases.",
    },
    {
      id: "04",
      title: "Infrastructure Development Solutions",
      description:
        "We provide comprehensive infrastructure development solutions that address the unique challenges of modern urban and rural environments. Our team of experts works closely with stakeholders to deliver sustainable, efficient, and cost-effective infrastructure projects.",
    },
  ];

  // State to track the active solution
  const [activeSolution, setActiveSolution] = useState("01");

  // Reference for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll the container
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white pb-[156px] relative overflow-x-hidden">
      <div className=" mx-auto px-4 md:px-18 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-22">
          {/* Left side with heading - takes 5 columns on desktop */}
          <div className=" md:absolute left-32 top-0">
            <h2 className="text-2xl md:text-[46px] font-light tracking-[3.75px] leading-[67px]">
              KNOW MORE ABOUT
              <br />
              OUR
              <span className="text-accent italic font-semibold">
                {" "}
                SERVICES{" "}
              </span>
            </h2>

            <Link
              href="/projects"
              className="inline-flex items-center text-green-500 mt-6 group gap-[40px]"
            >
              <span className="mr-2">SEE ALL PROJECTS</span>
              <RightArrowIcon color={"#5FBA51"} />
            </Link>
          </div>

          {/* Right side with solutions - takes 7 columns on desktop */}
          <div className="md:col-start-8 md:col-span-7">
            {solutions.map((solution, index) => (
              <div key={solution.id} className="relative">
                {/* Solution item */}
                <div
                  className={`${index !== 0 ? "border-t border-gray-100" : ""}`}
                >
                  {/* Solution number and title row */}
                  <div className="flex flex-col items-start mb-4">
                    <div className="text-gray-100 text-[94px] font-medium">
                      {solution.id}.
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex-1">
                        <button
                          onClick={() => setActiveSolution(solution.id)}
                          className="text-left w-full"
                        >
                          <h3 className="text-lg font-['Glacier_Indifference'] font-normal leading-[24px] tracking-[0.25px]">
                            {solution.title}
                          </h3>
                        </button>
                      </div>
                      {solution.id !== activeSolution && (
                        <Link
                          href={`/solutions/${solution.id}`}
                          className="text-accent "
                        >
                          <UpArrowIcon color={"#5FBA51"} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Solution content - only visible when active */}
                  {solution.id === activeSolution && (
                    <div className="space-y-6 animate-fadeIn">
                      <p className="md:w-[70%] text-base text-black/50 leading-[24px] tracking-[0.25px]">
                        {solution.description}
                      </p>

                      {/* Container with scrollable cards instead of image */}
                      <div className="relative">
                        <div
                          ref={scrollContainerRef}
                          className="flex space-x-4 overflow-x-auto overflow-hide pb-4 hide-scrollbar"
                        >
                          {/* First container */}
                          <div className=" bg-white/5 backdrop-blur-sm rounded-lg p-4 min-w-[347px] h-[247px]">
                            <div className="relative h-full w-full">
                              <Image
                                src="/long-highway-2.webp"
                                alt="Placeholder"
                                fill
                              />
                            </div>
                            <div className="flex flex-row items-start justify-between w-full mt-2">
                              <h3 className="text-[16px] font-normal text-black  leading-[27x] tracking-[0.75px] w-[323px] max-w-full sm:w-full">
                                CubeHighways Sets a New Record in Highway
                                Construction
                              </h3>
                            </div>
                          </div>

                          {/* Second container */}
                          <div className=" bg-white/5 backdrop-blur-sm rounded-lg p-4 min-w-[347px] h-[247px]">
                            <div className="relative h-full w-full">
                              <Image
                                src="/long-highway-2.webp"
                                alt="Placeholder"
                                fill
                              />
                            </div>
                            <div className="flex flex-row items-start justify-between w-full mt-2">
                              <h3 className="text-[16px] font-normal text-black  leading-[27x] tracking-[0.75px] w-[323px] max-w-full sm:w-full">
                                CubeHighways Sets a New Record in Highway
                                Construction
                              </h3>
                            </div>
                          </div>

                          {/* Additional containers for scrolling demonstration */}
                          <div className=" bg-white/5 backdrop-blur-sm rounded-lg p-4 min-w-[347px] h-[247px]">
                            <div className="relative h-full w-full">
                              <Image
                                src="/long-highway-2.webp"
                                alt="Placeholder"
                                fill
                              />
                            </div>
                            <div className="flex flex-row items-start justify-between w-full mt-2">
                              <h3 className="text-[16px] font-normal text-black  leading-[27x] tracking-[0.75px] w-[323px] max-w-full sm:w-full">
                                CubeHighways Sets a New Record in Highway
                                Construction
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Navigation arrows */}
                        <div className="flex justify-start mt-4 space-x-2 mb-2">
                          <button
                            onClick={() => scroll("left")}
                            className="p-2  hover:bg-muted/80 transition-colors hover:cursor-pointer"
                            aria-label="Scroll left"
                          >
                            <LeftArrowIcon />
                          </button>
                          <button
                            onClick={() => scroll("right")}
                            className="p-2   hover:bg-muted/80 transition-colors hover:cursor-pointer"
                            aria-label="Scroll right"
                          >
                            <RightArrowIcon color={"#5FBA51"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full-width green line after each solution */}
                <div className="relative w-screen md:-mx-[60vw] h-[1px] bg-[#5FBA51]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
