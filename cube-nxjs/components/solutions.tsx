"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RightArrowIcon from "./icons/right-arrow";

export default function Solutions() {
  const solutions = [
    {
      id: "01",
      title: "Advanced Video-Based Traffic Counting & AI Vision Solutions",
      description:
        "CubeTech revolutionizes traffic data collection with advanced AI-driven, video-based counting solutions. Since 2010, it has set industry standards by replacing manual counts with auditable video/ATCC technology. Its innovations ensure high accuracy and NHAI compliance.",
      image: "/long-highway-1.webp",
    },
    {
      id: "02",
      title: "Innovation in Pavement Evaluation, Material and Technology",
      description:
        "Our advanced pavement evaluation technologies use non-destructive testing methods to analyze road conditions with precision. We develop sustainable, durable materials that withstand heavy traffic and extreme weather conditions while reducing environmental impact.",
      image: "/long-highway-1.webp",
    },
    {
      id: "03",
      title: "Project Management Consultancy",
      description:
        "Our expert consultants provide end-to-end project management services for infrastructure development. From initial planning to execution and monitoring, we ensure timely delivery, cost efficiency, and adherence to quality standards across all project phases.",
      image: "/long-highway-1.webp",
    },
  ];

  const [activeSolution, setActiveSolution] = useState<string | null>(null);

  return (
    <section className="bg-white pb-20 md:pb-[156px] relative overflow-hidden">
      <div className="px-4 md:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-10">
          {/* Left section */}
          <div className="md:col-span-5 md:absolute md:left-12 top-0 relative">
            <h2 className="text-2xl md:text-[46px] font-light tracking-[3.75px] leading-[31px] md:leading-[67px]">
              SOLUTIONS THAT
              <br />
              MAKE
              <span className="text-accent italic font-semibold px-2 md:px-4">
                CHANGES
              </span>
            </h2>

            <Link
              href="/services"
              className="inline-flex items-center text-accent mt-6 group gap-[40px]"
            >
              <span className="mr-2">READ MORE</span>
              <RightArrowIcon color={"#5FBA51"} />
            </Link>
          </div>

          {/* Right section */}
          <div className="md:col-start-6 md:col-span-5 cursor-pointer">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className="relative group"
                onMouseEnter={() => setActiveSolution(solution.id)}
                onMouseLeave={() => setActiveSolution(null)}
              >
                <div
                  className={`${index !== 0 ? "border-t border-gray-100" : ""}`}
                >
                  <div className="flex flex-col items-start mb-4">
                    <div className="text-gray-100 text-[94px] font-medium">
                      {solution.id}.
                    </div>

                    <div className="flex flex-row w-full justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-['Glacier_Indifference'] font-normal leading-[24px] tracking-[0.25px]">
                          {solution.title}
                        </h3>
                      </div>

                      {solution.id !== activeSolution && (
                        <Link
                          href={`/solutions/${solution.id}`}
                          className="text-accent md:mr-25"
                        >
                          <RightArrowIcon color={"#5FBA51"} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Expand content smoothly */}
                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      solution.id === activeSolution
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="w-[90%] space-y-6">
                      <p className="text-base text-black/50 leading-[24px] tracking-[0.25px]">
                        {solution.description}
                      </p>
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={solution.image || "/placeholder.svg"}
                          alt={solution.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative w-screen md:-mx-[57vw] h-[1px] bg-[#5FBA51]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
