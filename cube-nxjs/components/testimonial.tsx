"use client";

import React, { useState, useRef, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import RightArrowIcon from './icons/right-arrow';
import LeftArrowIcon from './icons/left-arrow';
import Image from 'next/image';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

export function Testimonial() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "CubeHighways has transformed our infrastructure experience with their seamless project execution and cutting-edge technology.",
      author: "Robert Fox",
      company: "Goldman Sachs",
      avatar: "https://tryeasel.dev/placeholder.svg?width=60&height=60"
    },
    {
      id: 2,
      quote: "Their commitment to road safety and operational efficiency has significantly improved traffic flow and highway management.",
      author: "Adam Zen",
      company: "L'Oréal",
      avatar: "https://tryeasel.dev/placeholder.svg?width=60&height=60"
    },
    {
      id: 3,
      quote: "Partnering with CubeHighways has been a game-changer for our transportation experience, especially in maintaining our logistics projects.",
      author: "Thomas Smith",
      company: "Tesla Inc.",
      avatar: "https://tryeasel.dev/placeholder.svg?width=60&height=60"
    },
    {
      id: 4,
      quote: "The innovative solutions provided by their team have revolutionized how we approach infrastructure challenges.",
      author: "Sarah Johnson",
      company: "Microsoft",
      avatar: "https://tryeasel.dev/placeholder.svg?width=60&height=60"
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400; // Adjust as needed
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };

  // Update scroll position when scrolling manually
  useEffect(() => {
    const handleScrollEvent = () => {
      if (carouselRef.current) {
        setScrollPosition(carouselRef.current.scrollLeft);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScrollEvent);
      return () => carousel.removeEventListener('scroll', handleScrollEvent);
    }
  }, []);

  return (
    <div className=" w-full  px-4 md:px-8 lg:px-12 pb-20 md:pb-[184px]">
      <div className="max-w-8xl md:mr-[20%]">
        {/* Header with navigation arrows */}
        <div className="flex justify-between items-center mb-12 md:w-[70%] md:mx-auto">
          <h2 className="text-2xl flex  md:text-4xl font-light leading-[67px] tracking-[3.75px] uppercase">
            CLIENT{" "}
            <span className="font-semibold text-accent italic">
              TESTIMONIAL
            </span>
          </h2>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded-full  text-[#4CD964] hover:bg-gray-50 transition-colors hover:cursor-pointer"
              aria-label="Previous testimonial"
            >
              <LeftArrowIcon />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded-full  text-[#4CD964] hover:bg-gray-50 transition-colors hover:cursor-pointer"
              aria-label="Next testimonial"
            >
              <RightArrowIcon color={"#5FBA51"} />
            </button>
          </div>
        </div>

        {/* Carousel container with fade effect */}
        <div className="relative overflow-hidden">
          {/* Left fade effect */}
          <div className="absolute left-0 top-0 md:w-[200px] h-full bg-gradient-to-r from-white to-transparent z-10"></div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 pb-8 md:px-[200px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className=" flex-shrink-0 w-[190px]  md:w-full md:max-w-md bg-gray-50 rounded-lg p-2 md:p-8"
              >
                <div className="text-[#4CD964] text-4xl font-serif  md:mb-4">
                  &ldquo;
                </div>
                <div className="flex flex-col gap-8">
                  <div className="text-sm md:text-base text-gray-700 ">
                    {testimonial.quote}
                  </div>

                  <div className="flex  items-end">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.author} avatar`}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full mr-4"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-md">
                        {testimonial.author}
                      </h4>
                      <p className="text-gray-500 text-sm md:text-md">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right fade effect */}
          <div className="absolute right-0 top-0 md:w-[200px] h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
}