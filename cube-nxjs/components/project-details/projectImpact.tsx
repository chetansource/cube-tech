import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, LifeBuoy } from "lucide-react";
import RightArrowIcon from "../icons/right-arrow";

interface ImpactCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  color?: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
  icon,
  title,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col md:min-w-[250px] h-[207px] md:h-[312px] p-4 md:p-6 border border-border rounded-sm relative transition-all duration-300 cursor-pointer ${
        isHovered ? "bg-[#5FBA51] text-white" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="md:mb-4">{icon}</div>
      <h3 className="text-sm md:text-2xl md:leading-[33px] md:tracking-[0.75px] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-xs md:text-base text-muted-foreground">
          {description}
        </p>
      )}
      <div className="absolute bottom-4 left-4">
        <RightArrowIcon color={isHovered ? "#FFFFFF" : "#5FBA51"} />
      </div>
    </div>
  );
};

export function ProjectImpact() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards: ImpactCardProps[] = [
    {
      icon: <div className="h-6 w-6 text-primary"></div>,
      title: "IFC Safeguard Policies",
      color: "bg-white",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Social Impact Assessment (SIA)",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Nunc ut condimentum ultricies.",
      color: "bg-white",
    },
    {
      icon: <LifeBuoy className="h-6 w-6 text-primary" />,
      title: "Livelihood Enhancement Plan (LEP)",
      color: "bg-white",
    },
    {
      icon: <div className="h-6 w-6 text-primary"></div>,
      title: "Environmental Assessment",
      color: "bg-white",
    },
    {
      icon: <div className="h-6 w-6 text-primary"></div>,
      title: "Community Development",
      color: "bg-white",
    },
  ];

  const totalCards = cards.length;
  const visibleCards = 3;
  console.log(currentIndex)

  // Auto-scroll for web view only
  useEffect(() => {
    const isWeb = window.innerWidth >= 768;
    if (!isWeb) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % (totalCards - visibleCards + 1);

        if (carouselRef.current) {
          const scrollAmount = carouselRef.current.offsetWidth * 0.4; // ~40% width per card
          carouselRef.current.scrollTo({
            left: nextIndex * scrollAmount,
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [totalCards]);

  return (
    <div className="flex flex-col md:flex-row w-full gap-8 md:py-12">
      {/* Left section - Title */}
      <div className="md:w-2/3 flex">
        <h2 className="text-2xl px-4 md:text-[46px] md:leading-[64px] md:tracking-[3.75px] mb-2 uppercase text-black/60">
          PROJECT{" "}
          <span className="text-accent font-semibold italic">IMPACT</span>
        </h2>
      </div>

      {/* Right section - Cards */}
      <div className="md:w-3/4 overflow-hidden">
        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-4 px-4 md:hidden">
          {cards.map((card, index) => (
            <ImpactCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              color={card.color}
            />
          ))}
        </div>

        {/* Web: Auto-scrolling carousel */}
        <div
          ref={carouselRef}
          className="hidden md:flex gap-8 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0 w-[40%] md:w-1/3">
              <ImpactCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                color={card.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
