import Image from "next/image";
import OurStoryIcon_1 from "../icons/OurStoryIcon-1";
import OurStoryIcon_2 from "../icons/OurStoryIcon-2";
import OurStoryIcon_3 from "../icons/OurStoryIcon-3";
import type { TimelineItemType } from "@/utils/types";

type TimelineItem = TimelineItemType;

interface TimelineProps {
  heading?: string;
  timelineItems?: TimelineItem[];
}

export default function Timeline({
  heading = "Our Story",
  timelineItems = []
}: TimelineProps) {
  const defaultTimelineItems: TimelineItem[] = [
    {
      year: "2007",
      side: "left",
      title: "MILESTONE",
      content: "Vision for Traffic and Travel Demand Estimation",
    },
    {
      year: "2012",
      side: "right",
      title: "MILESTONE",
      content: "Innovations in Traffic Engineering and Forecasting",
    },
    { isIconOnly: true, iconType: 1 },
    {
      year: "2015",
      side: "left",
      title: "MILESTONE",
      content: "Lenders Independent Engineer, Traffic Audit",
    },
    { isIconOnly: true, iconType: 2 },
    { isIconOnly: true, iconType: 3 },
    {
      year: "2021",
      side: "right",
      title: "MILESTONE",
      content: "AI Vision Tools, Advanced Traffic Management",
    },
  ];

  const items = timelineItems.length > 0 ? timelineItems : defaultTimelineItems;

  return (
    <section className="px-4 py-12 md:px-32 md:pb-12 max-w-8xl mx-auto bg-[#FAFAFA] md:bg-white">
      <h1 className="text-2xl md:text-[46px] font-light tracking-widest text-center pb-[53px]">
        {heading.includes("Story") ? (
          <>
            {heading.split(" ")[0]}{" "}
            <span className="font-semibold text-accent italic">
              {heading.split(" ").slice(1).join(" ")}
            </span>
          </>
        ) : (
          heading
        )}
      </h1>
      <div className="relative">
        {/* Full continuous line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-black top-0 bottom-0" />

        <div className="relative z-10">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            if (item.isIconOnly) {
              let IconComponent;

              const iconType = Number(item.iconType) || items
                .slice(0, index + 1)
                .filter((i) => i.isIconOnly).length;

              if (iconType === 1) IconComponent = OurStoryIcon_1;
              if (iconType === 2) IconComponent = OurStoryIcon_2;
              if (iconType === 3) IconComponent = OurStoryIcon_3;

              return (
                <div key={index} className="relative flex justify-center mb-16">
                  <div className="z-20">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-md">
                      {IconComponent && <IconComponent />}
                    </div>
                  </div>
                </div>
              );
            }

            const contentBlock = (
              <div className="relative min-h-[260px]">
                {item.image?.url && (
                  <div className="w-[80%] h-[160px] md:w-[90%] md:h-[180px] relative mb-3">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title || "Timeline image"}
                      fill
                      sizes="(max-width: 768px) 80vw, 50vw"
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className={item.image?.url ? "" : "pt-20"}>
                  <h3 className="text-[#AFB1B6] text-sm md:text-base mb-2" dangerouslySetInnerHTML={{ __html: item.title || '' }} />
                  <p className="text-gray-700 text-sm md:text-lg" dangerouslySetInnerHTML={{ __html: item.content || '' }} />
                </div>
              </div>
            );

            return (
              <div
                key={index}
                className={`relative flex items-center ${
                  isLast ? "mb-0" : ""
                }`}
              >
                {/* Cover line above first item's circle */}
                {isFirst && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-2 bg-[#FAFAFA] md:bg-white top-0 bottom-1/2 z-[1]" />
                )}
                {/* Cover line below last item's circle */}
                {isLast && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-2 bg-[#FAFAFA] md:bg-white top-1/2 bottom-0 z-[1]" />
                )}

                {/* Left content */}
                <div
                  className={`w-1/2 pr-[10%] ${
                    item.side === "left" ? "text-left" : "invisible"
                  }`}
                >
                  {item.side === "left" && contentBlock}
                </div>

                {/* Center node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center font-medium shadow-md">
                    {item.year}
                  </div>
                </div>

                {/* Right content */}
                <div
                  className={`w-1/2 pl-[10%] ${
                    item.side === "right" ? "" : "invisible"
                  }`}
                >
                  {item.side === "right" && contentBlock}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
