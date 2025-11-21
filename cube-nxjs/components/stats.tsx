"use client";
import React, { useState, useRef, useEffect } from "react";
// import UpArrowIcon from "./icons/up-arrow";
import PlusIcon from "./icons/Plus";
import { usePathname } from "next/navigation";

interface Metric {
  value: number;
  label: string;
  hasIcon?: boolean;
  isSquare?: boolean;
}

const metrics: Metric[] = [
  { value: 14, label: "Years of experience", hasIcon: true },
  { value: 60, label: "TMS Audit for Toll Plaza", hasIcon: true },
  {
    value: 100,
    label: "Lane-km of bituminous concrete laid in a record 100 hours on NH34.",
    hasIcon: true,
  },
  {
    value: 25,
    label: "New Technologies & Material Implemented",
    hasIcon: true,
  },
];

function useIntersection(
  element: React.RefObject<HTMLElement | null>,
  rootMargin: string
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, [element, rootMargin]);

  return isIntersecting;
}

function AnimatedNumber({ number, start }: { number: number; start: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!start) return;

    const animationDuration = 2000;
    const frameDuration = 20;
    const totalFrames = animationDuration / frameDuration;
    const increment = number / totalFrames;

    let animationFrameId: number;

    const animate = () => {
      countRef.current += increment;
      if (countRef.current >= number) {
        setCount(number);
      } else {
        setCount(parseFloat(countRef.current.toFixed(2)));
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [number, start]);

  return <span>{count}</span>;
}


export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(sectionRef, "-50px");
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  // const isVisible = useIntersection(sectionRef, "0px");

  return (
    <div className="relative ">
      {isHomePage && (
        <div className="relative mx-2 md:mx-0 h-[100px] md:h-[400px] w-full md:w-[90%] md:absolute md:top-0 md:left-10 -z-10 mb-10 md:mb-0">
          <div className="pl-4 md:pl-[37px] md:pr-[171px] absolute bottom-0 md:translate-y-[20px] flex items-end">
            <h1 className="text-[64px] md:text-[181.122px] leading-[56px] md:leading-[153.5px] font-normal tracking-[-2.717px] text-black/5">
              Our Success Metrics
            </h1>
          </div>
        </div>
      )}

      <div
        ref={sectionRef}
        className={`relative z-10 md:py-12  bg-transparent text-foreground`}
      >
        <div className=" mx-auto px-4">
          <div className="mt-0">
            <div
              className={`flex overflow-x-auto gap-8 md:grid md:grid-cols-4 md:gap-[100px] scroll-smooth px-2 mx-12 hide-scrollbar ${
                isHomePage ? "md:mt-[16%]" : ""
              }`}
            >
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={` group flex p-2 md:py-4 md:px-4 flex-col items-start  md:gap-[80px] flex-shrink-0 md:flex-shrink md:flex-[1_0_0] self-stretch duration-200 hover:bg-[#5FBA51] hover:text-white hover:cursor-pointer`}
                >
                  <div className="text-4xl md:text-[122px] font-light flex items-start ">
                    <AnimatedNumber number={metric.value} start={isVisible} />
                    {metric.hasIcon && (
                      <PlusIcon className="w-5 md:w-8 h-8 md:h-16 ml-4 md:ml-8  text-[#5FBA51] group-hover:text-[#ffffff] transition-colors duration-300" />
                    )}
                    {/* {metric.hasIcon && (
                    <span>
                      <UpArrowIcon />
                    </span>
                  )} */}
                  </div>
                  <p className=" mb-20 md:mb-0 md:text-[24px] font-normal mt-2 flex-grow">
                    {metric.label}
                  </p>
                  <div className="w-full h-[0.5px] bg-accent mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
