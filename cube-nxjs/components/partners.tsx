"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logo: {
    url: string;
    alt?: string;
  };
  website?: string;
}

interface PartnersProps {
  partners?: Partner[];
}

// Fallback partners for development
const defaultPartners: Partner[] = [
  { id: "1", name: "Partner 1", logo: { url: "/our-partner-1.webp" } },
  { id: "2", name: "Partner 2", logo: { url: "/our-partner-2.webp" } },
  { id: "3", name: "Partner 3", logo: { url: "/our-partner-3.webp" } },
  { id: "4", name: "Partner 4", logo: { url: "/our-partner-1.webp" } },
  { id: "5", name: "Partner 5", logo: { url: "/our-partner-2.webp" } },
  { id: "6", name: "Partner 6", logo: { url: "/our-partner-3.webp" } },
  { id: "7", name: "Partner 7", logo: { url: "/our-partner-1.webp" } },
  { id: "8", name: "Partner 8", logo: { url: "/our-partner-3.webp" } },
];

export default function Partners({ partners: propPartners }: PartnersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use prop partners or fallback to defaults
  const partners = propPartners && propPartners.length > 0 ? propPartners : defaultPartners;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollPosition = 0;
    let animationId: number;
    const speed = 1; // Increased speed for smoother visible movement

    const scroll = () => {
      scrollPosition += speed;

      // Reset when first set of logos goes off screen (since we duplicate 3x)
      if (scrollPosition >= el.scrollWidth / 3) {
        scrollPosition = 0;
      }

      el.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="bg-white py-4 overflow-hidden pb-17 md:pb-[60px]">
      <div className="flex items-center w-full whitespace-nowrap overflow-hidden pr-16">
        {/* Heading */}
        <div className="pl-4 md:pl-[61px] pr-8 flex-shrink-0 text-2xl md:text-4xl font-light tracking-wide">
          OUR <span className="text-accent font-medium pl-2">PARTNERS</span>
        </div>

        {/* Scrolling logos */}
        <div className="overflow-hidden w-full">
          <div
            ref={scrollRef}
            className="flex items-center gap-16 px-8 justify-end"
            style={{ willChange: "transform" }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 h-20 flex items-center justify-center"
              >
                <Image
                  src={partner.logo?.url || "/placeholder.svg"}
                  alt={partner.logo?.alt || partner.name}
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
