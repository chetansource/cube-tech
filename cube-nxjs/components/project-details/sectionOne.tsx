"use client";

import React, { useState } from "react";
import UpArrowIcon from "../icons/up-arrow";
import PolygonIcon from "../icons/polygon";
import Image from "next/image";

interface ParkingStudyProps {
  title: string;
  location: string;
  projectName: string;
  studyType: string;
  date: string;
  description: string;
  mainImage: string;
  thumbnails?: string[];
}

export const SectionOne: React.FC<ParkingStudyProps> = ({
  title,
  location,
  projectName,
  studyType,
  date,
  description,
  mainImage,
}) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-8xl mx-auto p-4 mb-43 ">
      <div className="grid grid-cols-1 md:grid-cols-2 md:px-16">
        {/* Left side - Title with Background */}
        <div className="relative pt-8 md:w-[90%] py-8 md:py-0 min-h-[400px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/homepage-solutions-banner.png"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black/10 z-10" /> */}
          {/* Content */}
          <div className="relative z-20 pt-8 md:pt-12 pl-4 md:pl-8">
            <h1 className="text-2xl md:text-4xl md:text-[46px] text-white uppercase md:leading-[64px] md:tracking-[3.75px]">
              {title}{" "}
              <span className="block md:inline">
                <span className="">G.K-I</span>{" "}
                <span className="text-accent italic font-semibold">
                  {location}
                </span>
              </span>
            </h1>
          </div>
          {/* Polygon Corner */}
          <div className="absolute -bottom-px right-[-1] z-30 pointer-events-none">
            <PolygonIcon />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="space-y-12 md:space-y-6 ">
          {/* Project details */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-4">
            <div>
              <div className="md:leading-[55px] md:tracking-[0.75px] text-base md:text-lg">
                Project Name
              </div>
              <div className="md:leading-[54px] md:tracking-[0.25px] text-sm md:text-base text-black/60">
                {projectName}
              </div>
            </div>
            <div>
              <div className="md:leading-[54px] md:tracking-[0.25px] text-base md:text-lg ">
                {studyType}
              </div>
              <div className="md:leading-[54px] md:tracking-[0.25px] text-sm md:text-base text-black/60">
                {date}
              </div>
            </div>
          </div>

          {/* Main image with thumbnails */}
          <div className="relative w-full h-80">
            <Image
              src={mainImage}
              alt="Aerial view of highway"
              fill
              className=" object-cover rounded-sm"
            />
            {/* <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-sm flex gap-2">
              {thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-16 object-cover"
                />
              ))}
            </div> */}
          </div>

          {/* Description */}
          <div>
            <p className="font-semibold italic md:leading-[20px]">
              Car Parking at G.K-I New Delhi-
            </p>
            {expanded && (
              <p className="md:leading-[20px] text-sm leading-relaxed mt-1">
                {description}
              </p>
            )}
            <button
              onClick={toggleExpanded}
              className="text-accent font-bold md:leading-[20px] md:tracking-[0.25px] mt-2 flex items-center cursor-pointer"
            >
              {expanded ? "View less" : "View more"}
              <UpArrowIcon
                color="#5FBA51"
                className={`ml-2 transition-transform duration-400
                ${expanded ? "rotate-0 " : "rotate-180 "}
              `}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
