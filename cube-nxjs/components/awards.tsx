"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { getAwards, Award } from "@/utils/routes/Awards";

interface AwardItemProps {
  logo?: string;
  name: string;
  date: string;
  description: string;
}

// Fallback data if dynamic data doesn't load
const fallbackAwardData: AwardItemProps[] = new Array(10).fill(null).map((_, index) => ({
  logo: "",
  name: `Award ${index + 1}`,
  date: "11/02/2024",
  description:
    "Description - Lorem ipsum dolor sit amet, consectetur adipiscing",
}));

const AwardItem: React.FC<AwardItemProps> = ({ logo, name, date, description }) => {
  return (
    <div className="flex flex-col min-w-[300px] max-w-[300px] h-[280px] mx-20">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0">
          <div className="w-full h-full">
            {logo ? (
              <Image
                src={logo}
                alt={name}
                fill
                sizes="64px"
                className="object-contain"
              />
            ) : (
              <Image
                src="/awards-image.webp"
                alt="Award"
                fill
                sizes="64px"
                className="object-contain"
              />
            )}
          </div>
        </div>
      </div>
      <h3 className="text-gray-600 font-medium text-lg mb-2 line-clamp-2 h-[56px]">{name}</h3>
      <p className="text-gray-500 text-sm mb-3 h-[20px] flex-shrink-0">{date}</p>
      <p className="text-gray-500 text-sm mb-4 line-clamp-4 h-[80px]">{description}</p>
      <div className="w-full h-[2px] bg-accent mt-auto"></div>
    </div>
  );
};

const Awards = () => {
  const [awards, setAwards] = useState<AwardItemProps[]>(fallbackAwardData);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      const data = await getAwards(20);
      if (data && data.length > 0) {
        const formattedAwards = data.map((award: Award) => ({
          logo: award.logo?.url || "",
          name: award.name,
          date: new Date(award.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }),
          description: award.description,
        }));
        setAwards(formattedAwards);
      }
    };

    fetchAwards();
  }, []);

  // Duplicate awards for seamless infinite scroll
  const duplicatedAwards = [...awards, ...awards];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let isPaused = false;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    const pauseAutoScroll = () => {
      isPaused = true;
    };
    const resumeAutoScroll = () => {
      isPaused = false;
    };

    // Allow horizontal scrolling with mouse wheel
    const handleWheel = (e: WheelEvent) => {
      // If horizontal scroll (trackpad) or shift+wheel, scroll the carousel
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaX;
        pauseAutoScroll();
      }
      // Vertical scroll passes through to page naturally
    };

    // Mouse drag to scroll
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = 'grabbing';
      pauseAutoScroll();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const walk = (e.pageX - startX) * 1.5;
      scrollContainer.scrollLeft = startScrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDragging = false;
      scrollContainer.style.cursor = 'grab';
      resumeAutoScroll();
    };

    const handleMouseLeave = () => {
      isDragging = false;
      scrollContainer.style.cursor = 'grab';
      resumeAutoScroll();
    };

    scrollContainer.style.cursor = 'grab';
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mousemove', handleMouseMove);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [awards]);

  return (
    <section className="bg-white relative overflow-hidden pb-[200px]">
      <div className="md:py-8 md:p-12 relative">
        <div className="absolute w-[90%] md:w-[90%] h-full">
          <p className="pl-4 md:pr-[170px] font-roboto text-[90px] md:text-[181.122px] font-normal leading-[153.5px] tracking-[-2.717px] text-black/5 select-none">
            Accolades & Recognition
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="relative left-10 -bottom-45 z-10 flex items-start overflow-x-auto py-8 hide-scrollbar"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedAwards.map((award, index) => (
            <AwardItem key={`award-${index}`} {...award} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
