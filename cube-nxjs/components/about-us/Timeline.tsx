"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import OurStoryIcon_1 from "../icons/OurStoryIcon-1";
import OurStoryIcon_2 from "../icons/OurStoryIcon-2";
import OurStoryIcon_3 from "../icons/OurStoryIcon-3";

type TimelineItem = {
  year?: string;
  side?: "left" | "right";
  title?: string;
  content?: string;
  isPodcast?: boolean;
  readMoreLink?: string;
  isIconOnly?: boolean;
};

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dummyPodcast = {
    image: "/timeline-image.webp",
    content:
      "This is a podcast about traffic innovations, planning strategies, and future infrastructure designs. Dive deep into the world of modern transportation.",
    link: "#",
  };

  const timelineItems: TimelineItem[] = [
    {
      year: "2007",
      side: "left",
      title: "MILESTONE",
      content: "Vision for Traffic and Travel Demand Estimation",
      isPodcast: true,
    },
    {
      year: "2012",
      side: "right",
      title: "MILESTONE",
      content: "Innovations in Traffic Engineering and Forecasting",
      isPodcast: true,
    },
    { isIconOnly: true },
    {
      year: "2015",
      side: "left",
      title: "MILESTONE",
      content: "Lenders Independent Engineer, Traffic Audit",
      isPodcast: true,
    },
    { isIconOnly: true }, 
    { isIconOnly: true },
    {
      year: "2021",
      side: "right",
      title: "MILESTONE",
      content: "AI Vision Tools, Advanced Traffic Management",
      isPodcast: true,
    },
  ];

  return (
    <section className="px-4 py-12 md:px-32 md:pb-12 max-w-8xl mx-auto bg-[#FAFAFA] md:bg-white">
      <h1 className="text-2xl md:text-[46px] font-light tracking-widest text-center pb-[53px]">
        Our <span className="font-semibold text-accent italic"> Story</span>
      </h1>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-[84%] w-0.5 bg-black mt-26" />

        <div className="relative z-10">
          {timelineItems.map((item, index) => {
            const isHovered = hoveredIndex === index;
            if (item.isIconOnly) {
              let IconComponent;
              const iconIndex = timelineItems
                .slice(0, index + 1)
                .filter((i) => i.isIconOnly).length;

              // Map the icon index to the component
              if (iconIndex === 1) IconComponent = OurStoryIcon_1;
              if (iconIndex === 2) IconComponent = OurStoryIcon_2;
              if (iconIndex === 3) IconComponent = OurStoryIcon_3;

              return (
                <div key={index} className="relative flex justify-center mb-16">
                  <div className="z-20">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-md">
                      {IconComponent && <IconComponent />}
                    </div>
                  </div>
                </div>
              );
            }

            const contentBlock = (
              <div className="relative min-h-[260px] transition-all duration-500 ease-in-out">
                {/* Milestone view */}
                <div
                  className={`absolute inset-0 top-20 transition-opacity duration-500 ${
                    isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <h3 className="text-[#AFB1B6] text-sm md:text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-lg">
                    {item.content}
                  </p>
                </div>

                {/* Podcast view */}
                {item.isPodcast && (
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isHovered
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="w-[80%] h-[80%] md:w-[90%] md:h-[90%] relative mt-22 md:mt-10 ">
                      <Image
                        src={dummyPodcast.image}
                        alt="Podcast image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="text-gray-500 flex items-center text-sm py-2">
                      /PODCAST <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                    <p className="text-gray-700 text-sm md:text-base mt-2 w-[90%]">
                      {dummyPodcast.content}
                    </p>
                    <a
                      href={dummyPodcast.link}
                      className="inline-flex items-center text-green-500 text-sm font-medium mt-1"
                    >
                      READ MORE <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            );

            return (
              <div
                key={index}
                className={`flex items-center mt-[-70] md:mt-0 ${
                  index === timelineItems.length - 1 ? "mb-0" : ""
                }`}
              >
                {/* Left content */}
                <div
                  className={`w-1/2 pr-[10%] ${
                    item.side === "left" ? "text-left" : "invisible"
                  }`}
                >
                  {item.side === "left" && contentBlock}
                </div>

                {/* Center node */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 z-20"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center font-medium cursor-pointer shadow-md hover:scale-105 transition-transform">
                    {item.year}
                  </div>
                </div>

                {/* Right content */}
                <div
                  className={`w-1/2 pl-[10%] ${
                    item.side === "right" ? "" : "invisible"
                  }`}
                >
                  {item.side === "right" && contentBlock}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
