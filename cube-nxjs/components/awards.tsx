"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface AwardProps {
  logo: string;
  name: string;
  date: string;
  description: string;
}

const awardData: AwardProps[] = new Array(10).fill(null).map((_, index) => ({
  logo: "",
  name: `Award ${index + 1}`,
  date: "11/02/2024",
  description:
    "Description - Lorem ipsum dolor sit amet, consectetur adipiscing",
}));

const AwardItem: React.FC<AwardProps> = ({ logo, name, date, description }) => {
  return (
    <div className="flex flex-col min-w-[300px] mx-20">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="w-full h-full ">
            <Image
              src="/awards-image.webp"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <span className="text-xs font-medium">{logo}</span>
      </div>
      <h3 className="text-gray-600 font-medium text-lg mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-3">{date}</p>
      <p className="text-gray-500 text-sm  mb-4">{description}</p>
      <div className="w-full h-[2px] bg-accent"></div>
    </div>
  );
};

const Awards = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let startTime: number | null = null;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      // const elapsed = timestamp - startTime;

      if (scrollContainer) {
        // Slow continuous scroll from right to left
        scrollContainer.scrollLeft += 0.5;

        // Reset scroll position when reaching the end to create infinite loop
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className=" bg-white relative overflow-hidden pb-[300px]">
      <div className=" md:py-8 md:p-12 relative">
        <div className="absolute w-[90%] md:w-[90%] h-full">
          <p className="pl-4  md:pr-[170px] font-roboto text-[90px] md:text-[181.122px] font-normal leading-[153.5px] tracking-[-2.717px] text-black/5 select-none">
            Accolades & Recognition
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="relative  left-10 -bottom-45 z-10 flex overflow-x-hidden py-8"
        >
          {awardData.map((award, index) => (
            <AwardItem key={index} {...award} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
