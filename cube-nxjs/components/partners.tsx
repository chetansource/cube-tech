"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/our-partner-1.webp" },
  { name: "Partner 2", logo: "/our-partner-2.webp" },
  { name: "Partner 3", logo: "/our-partner-3.webp" },
  { name: "Partner 4", logo: "/our-partner-1.webp" },
  { name: "Partner 5", logo: "/our-partner-2.webp" },
  { name: "Partner 6", logo: "/our-partner-3.webp" },
  { name: "Partner 7", logo: "/our-partner-1.webp" },
  { name: "Partner 8", logo: "/our-partner-3.webp" },
];

export default function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollPosition = 0;
    let animationId: number;
    const speed = 0.5;

    const scroll = () => {
      scrollPosition += speed;
      if (scrollPosition >= el.scrollWidth / 2) {
        scrollPosition = 0;
      }
      el.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="bg-white py-10 overflow-hidden pb-17 md:pb-[230px]">
      <div className="flex items-center w-full whitespace-nowrap overflow-hidden">
        {/* Heading */}
        <div className="pl-4 md:pl-[61px] pr-8 flex-shrink-0 text-2xl md:text-4xl font-light tracking-wide">
          OUR <span className="text-accent font-medium pl-2">PARTNERS</span>
        </div>

        {/* Scrolling logos */}
        <div className="overflow-hidden w-full">
          <div
            ref={scrollRef}
            className="flex items-center gap-16 px-8"
            style={{ willChange: "transform", transform: "translateX(0)" }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-20 flex items-center justify-center"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
