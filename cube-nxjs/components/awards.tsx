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
                className="object-contain"
              />
            ) : (
              <Image
                src="/awards-image.webp"
                alt="Award"
                fill
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
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position seamlessly when reaching halfway point
        // (since we duplicated the array, halfway = one full loop)
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [awards]);

  return (
    <section className="bg-white relative overflow-hidden pb-[300px]">
      <div className="md:py-8 md:p-12 relative">
        <div className="absolute w-[90%] md:w-[90%] h-full">
          <p className="pl-4 md:pr-[170px] font-roboto text-[90px] md:text-[181.122px] font-normal leading-[153.5px] tracking-[-2.717px] text-black/5 select-none">
            Accolades & Recognition
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="relative left-10 -bottom-45 z-10 flex items-start overflow-x-hidden py-8"
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
