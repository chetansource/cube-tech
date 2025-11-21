import React from "react";
// import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";
import Link from "next/link";

const ResourceDevelopment = () => {
  return (
    <div
      className="relative h-[988px] w-full bg-cover  mb-[150px]"
      style={{ backgroundImage: "url(/service-banner-1.webp)" }}
    >
      {/* Top Right Section */}
      <div className="absolute top-0 right-0 p-2 py-18 md:p-8 grid md:grid-cols-2 gap-4 md:gap-8">
        {/* First Blurred Container */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4 ">
          <div className="relative w-[200px] h-[100px] md:w-full md:h-[181px]">
            <Image src="/long-highway-2.webp" alt="Placeholder" fill priority />
          </div>
          <div className="flex flex-row items-start justify-between w-full mt-2">
            <div className="text-lg font-normal text-white leading-[22px] md:leading-[28px] tracking-[1px] md:tracking-[0.75px] w-[170px] md:w-[323px] max-w-full ">
              CubeHighways Sets a New Record in Highway Construction
            </div>
            <RightArrowIcon color={"#5FBA51"} />
          </div>
        </div>

        {/* Second Blurred Container */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4 ">
          <div className="relative w-[200px] h-[100px] md:w-full md:h-[181px]">
            <Image src="/long-highway-2.webp" alt="Placeholder" fill priority />
          </div>
          <div className="flex flex-row items-start justify-between w-full mt-2">
            <div className="text-lg font-normal text-white leading-[22px] md:leading-[28px] tracking-[1px] md:tracking-[0.75px] w-[170px] md:w-[323px] max-w-full ">
              CubeHighways Sets a New Record in Highway Construction
            </div>
            <RightArrowIcon color={"#5FBA51"} />
          </div>
        </div>
      </div>

      {/* Bottom Left Section */}
      <div className="absolute bottom-0 left-0 p-8">
        <h1 className="text-4xl md:text-[75px] font-light  mb-4 text-white">
          Explore our <br />
          <span className="font-bold">R&D</span>
        </h1>
        <Link href="/resources" passHref>
          <Button className="bg-accent text-[12px] leading-[16px] tracking-[2.6px] px-[24px] py-[8px] font-bold uppercase cursor-pointer rounded-none">
            Explore More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResourceDevelopment;
