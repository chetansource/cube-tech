import React from "react";
// import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";
import Link from "next/link";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  image?: {
    url: string;
    alt?: string;
  };
}

interface RDSectionConfig {
  backgroundImage?: string;
  heading?: string;
  highlightedWord?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface ResourceDevelopmentProps {
  resources?: Resource[];
  sectionConfig?: RDSectionConfig;
}

// Fallback resources for development
const defaultResources = [
  {
    id: "1",
    title: "CubeHighways Sets a New Record in Highway Construction",
    slug: "cube-highways-record",
    image: { url: "/long-highway-2.webp" },
  },
  {
    id: "2",
    title: "CubeHighways Sets a New Record in Highway Construction",
    slug: "cube-highways-record-2",
    image: { url: "/long-highway-2.webp" },
  },
];

const ResourceDevelopment = ({ resources = defaultResources, sectionConfig }: ResourceDevelopmentProps) => {
  // Default section configuration
  const config = {
    backgroundImage: sectionConfig?.backgroundImage || "/service-banner-1.webp",
    heading: sectionConfig?.heading || "Explore our",
    highlightedWord: sectionConfig?.highlightedWord || "R&D",
    buttonText: sectionConfig?.buttonText || "Explore More",
    buttonLink: sectionConfig?.buttonLink || "/resources",
  };

  return (
    <div
      className="relative h-[988px] w-full bg-cover  mb-[150px]"
      style={{ backgroundImage: `url(${config.backgroundImage})` }}
    >
      {/* Top Right Section */}
      <div className="absolute top-0 right-0 p-2 py-18 md:p-8 grid md:grid-cols-2 gap-4 md:gap-8">
        {resources.slice(0, 2).map((resource) => (
          <Link
            key={resource.id}
            href={`/resources/details/${resource.slug}`}
            className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="relative w-[200px] h-[100px] md:w-full md:h-[181px]">
              <Image
                src={resource.image?.url || "/placeholder.svg"}
                alt={resource.image?.alt || resource.title}
                fill
                priority
              />
            </div>
            <div className="flex flex-row items-start justify-between w-full mt-2">
              <div className="text-lg font-normal text-white leading-[22px] md:leading-[28px] tracking-[1px] md:tracking-[0.75px] w-[170px] md:w-[323px] max-w-full ">
                {resource.title}
              </div>
              <RightArrowIcon color={"#5FBA51"} />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Left Section */}
      <div className="absolute bottom-0 left-0 p-8">
        <h1 className="text-4xl md:text-[75px] font-light  mb-4 text-white">
          {config.heading} <br />
          <span className="font-bold">{config.highlightedWord}</span>
        </h1>
        <Link href={config.buttonLink} passHref>
          <Button className="bg-accent text-[12px] leading-[16px] tracking-[2.6px] px-[24px] py-[8px] font-bold uppercase cursor-pointer rounded-none">
            {config.buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResourceDevelopment;
