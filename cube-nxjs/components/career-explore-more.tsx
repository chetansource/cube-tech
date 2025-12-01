"use client";
import type React from "react";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";
import type { ExploreCard } from "@/utils/routes/Careers";

interface CareerExploreMoreProps {
  cards?: ExploreCard[];
}

// Legacy fallback card type for backward compatibility
interface FallbackCard {
  id: number;
  type: string;
  title: string;
  date?: string;
  content: string;
  bgColor?: string;
  textColor?: string;
  image?: string;
}

type CardType = ExploreCard | FallbackCard;

const CareerExploreMore: React.FC<CareerExploreMoreProps> = ({ cards: dynamicCards }) => {
  // Complete set of 9 fallback sections matching the layout
  const fallbackSections = [
    // Row 1 - 3 text cards
    {
      id: 1,
      type: "text",
      title: "Life at Cubehighways",
      content: "At CubeHighways, we are more than just infrastructure developers—we are innovators shaping the future of mobility.",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      id: 2,
      type: "text",
      title: "Life at Cubehighways",
      content: "We believe in fostering a supportive workplace where teams collaborate, innovate, and drive impact.",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      id: 3,
      type: "text",
      title: "Life at Cubehighways",
      content: "We integrate AI-driven traffic monitoring, smart highway management.",
      bgColor: "bg-[#02472F]",
      textColor: "text-white",
    },
    // Row 2 - Featured image card
    {
      id: 4,
      type: "featured",
      title: "LIFE AT CUBEHIGHWAYS TECH",
      content: "At CubeHighways, we foster teamwork and growth-oriented work environments where innovation makes impact.",
      image: "/career-explore-img1.webp",
      bgColor: "bg-green-600",
    },
    // Row 2 - Image card with overlay
    {
      id: 5,
      type: "image",
      title: "We are building more than just roads",
      content: "We are creating innovative solutions and collaboration growth, and the best of planned technologies.",
      image: "/career-explore-img3.webp",
      bgColor: "bg-black",
    },
    // Row 3 - Tall image card
    {
      id: 6,
      type: "image-tall",
      title: "Innovation",
      content: "We are innovators shaping the future of mobility",
      image: "/career-explore-img2.webp",
      bgColor: "bg-gray",
    },
    // Row 3 - Large text section
    {
      id: 7,
      type: "text-large",
      title: "LIFE AT CUBEHIGHWAYS TECH",
      content: "Employees at CubeHighways gain hands-on experience with AI-driven traffic monitoring, smart highway management, and next-gen transportation solutions.",
      bgColor: "bg-white",
    },
    // Row 4 - 2 text cards
    {
      id: 8,
      type: "text",
      title: "Life at Cubehighways",
      content: "Our team thrives in a dynamic, collaborative environment where every project brings new challenges and opportunities to learn and grow",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      id: 9,
      type: "text",
      title: "Life at Cubehighways",
      content: "Our team thrives in a dynamic, collaborative environment where every project brings new challenges and opportunities to learn and grow",
      bgColor: "bg-accent",
      textColor: "text-white",
    },
  ];

  // Helper functions
  const getCardImage = (card: CardType) => {
    if ('image' in card) {
      const img = card.image;
      if (typeof img === 'string') return img;
      if (img && typeof img === 'object' && 'url' in img) return img.url;
    }
    return "/career-explore-img1.webp";
  };

  // Create a map of position (order) to card
  const cardsByPosition = new Map<number, CardType>();

  if (dynamicCards && dynamicCards.length > 0) {
    dynamicCards.forEach(card => {
      const position = card.order || 1;
      cardsByPosition.set(position, card);
    });
  }

  // Get card for each position (1-9), use fallback if not set
  const getCardForPosition = (position: number): CardType => {
    return cardsByPosition.get(position) || fallbackSections[position - 1];
  };

  // Extract sections by position for the layout using order field
  const section1 = getCardForPosition(1); // Top-left square
  const section2 = getCardForPosition(2); // Top-center square
  const section3 = getCardForPosition(3); // Top-right square
  const section4 = getCardForPosition(4); // Featured horizontal rectangle
  const section5 = getCardForPosition(5); // Image overlay square
  const section6 = getCardForPosition(6); // Tall vertical rectangle
  const section7 = getCardForPosition(7); // Large text horizontal rectangle
  const section8 = getCardForPosition(8); // Bottom-left square
  const section9 = getCardForPosition(9); // Bottom-right square

  // For mobile horizontal scrolling, sort cards by order
  const allSections = dynamicCards && dynamicCards.length > 0
    ? [...dynamicCards].sort((a, b) => (a.order || 1) - (b.order || 1))
    : fallbackSections;

  return (
    <div className="container mx-auto p-4 mb-19">
      {/* Mobile: Horizontal Scrolling */}
      <div className="block lg:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-4 hide-scrollbar">
          {allSections.map((card, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-72 h-80 ${card.bgColor || 'bg-[#FBFBFB]'} relative overflow-hidden rounded-lg`}
            >
              <div className={`p-6 h-full flex flex-col ${card.textColor || "text-black"}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${card.textColor || "text-gray-600"}`}>
                    EXPLORE MORE
                  </span>
                  <ChevronRight className={`w-4 h-4 ${card.textColor || "text-gray-600"}`} />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className={`text-lg font-semibold mb-2 ${card.textColor || "text-black"}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${card.textColor ? "text-white/90" : "text-black/60"}`}>
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button className="flex items-center gap-2 text-green-600 font-medium">
            <span>SEE ALL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop: Dynamic 9-Section Grid Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {/* Row 1 - 3 text squares */}
          <div className={`p-6 shadow-sm md:h-[339px] ${section1.bgColor || 'bg-[#FBFBFB]'} ${section1.textColor || 'text-black'}`}>
            <h3 className={`text-lg md:leading-[22px] md:tracking-[0.75px] mb-2 ${section1.textColor || 'text-black'}`}>
              {section1.title}
            </h3>
            <p className={`text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] ${section1.textColor ? 'text-white/90' : 'text-black/60'}`}>
              {section1.content}
            </p>
          </div>

          <div className={`p-6 shadow-sm md:h-[339px] ${section2.bgColor || 'bg-[#FBFBFB]'} ${section2.textColor || 'text-black'}`}>
            <h3 className={`text-lg md:leading-[22px] md:tracking-[0.75px] mb-2 ${section2.textColor || 'text-black'}`}>
              {section2.title}
            </h3>
            <p className={`text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] ${section2.textColor ? 'text-white/90' : 'text-black/60'}`}>
              {section2.content}
            </p>
          </div>

          <div className={`flex flex-col-reverse p-6 relative md:h-[339px] ${section3.bgColor || 'bg-[#02472F]'} ${section3.textColor || 'text-white'}`}>
            <div>
              <p className={`text-lg md:w-[80%] ${section3.textColor || 'text-white'}`}>
                {section3.content}
              </p>
            </div>
          </div>

          {/* Row 2 - Featured image card (2 cols) + Image card (1 col) */}
          <div className={`col-span-2 relative h-[200px] md:h-[319px] ${section4.bgColor || 'bg-green-600'}`}>
            {getCardImage(section4) && (
              <Image
                src={getCardImage(section4)}
                alt={section4.title}
                fill
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-green-600/60 p-6 flex flex-col justify-end text-white">
              <h2 className="text-2xl font-bold uppercase">{section4.title}</h2>
              <p className="text-sm mt-2">{section4.content}</p>
            </div>
          </div>

          <div className="relative md:h-[319px]">
            {getCardImage(section5) && (
              <Image
                src={getCardImage(section5)}
                alt={section5.title}
                fill
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-12 left-4 bg-black/30 flex flex-col justify-center text-white px-12">
              <h3 className="text-[32px] md:leading-[40px] font-bold">
                {section5.title}
              </h3>
              <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:w-[75%]">
                {section5.content}
              </p>
            </div>
          </div>

          {/* Row 3/4 - Tall image (row-span-2) + Large text section (2 cols) */}
          <div className="row-span-2 relative md:h-[666px]">
            {getCardImage(section6) && (
              <Image
                src={getCardImage(section6)}
                alt={section6.title}
                fill
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gray/40 p-6 flex flex-col justify-end text-white">
              <p className="text-sm md:w-[80%] mb-4 px-8">
                {section6.content}
              </p>
            </div>
          </div>

          <div className={`col-span-2 content-end p-6 shadow-sm ${section7.bgColor || 'bg-white'}`}>
            <h2 className="md:text-[42px] md:leading-[42px] md:tracking-[0.75px] md:uppercase mb-2">
              {section7.title.split(' ').slice(0, 2).join(' ')} <br />
              <span>{section7.title.split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="text-lg text-black/60 md:leading-[24px] md:tracking-[0.25px] md:w-[80%]">
              {section7.content}
            </p>
          </div>

          {/* Row 4 - Two text squares (col 2 & 3) */}
          <div className={`p-6 flex flex-col justify-end ${section8.bgColor || 'bg-[#FBFBFB]'} ${section8.textColor || 'text-black'}`}>
            <h3 className={`text-lg md:leading-[22px] md:tracking-[0.75px] ${section8.textColor || 'text-black'}`}>
              {section8.title}
            </h3>
            <p className={`text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] ${section8.textColor ? 'text-white/90' : 'text-black/60'}`}>
              {section8.content}
            </p>
          </div>

          <div className={`p-6 flex flex-col justify-end ${section9.bgColor || 'bg-accent'} ${section9.textColor || 'text-white'}`}>
            <p className={`text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] ${section9.textColor || 'text-white'}`}>
              {section9.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerExploreMore;
