"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DownTailedArrow from "../icons/DownTailedArrow";
import RightArrowIcon from "../icons/right-arrow";
import PolygonIcon from "../icons/polygon";
import { Resource } from "@/utils/routes/Resources";
import { InsightsImpactSection } from "@/utils/routes/ResourcesPage";

// Fallback data if dynamic data doesn't load
const fallbackCaseStudies = [
  {
    id: "01.",
    title:
      "An average performance enhancement of 7% was achieved in the quality of the GSB layer.",
    description:
      "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    slug: "",
  },
  {
    id: "02.",
    title:
      "An average performance enhancement of 15% was achieved in the quality of the GSB layer.",
    description:
      "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    slug: "",
  },
  {
    id: "03.",
    title:
      "CubeHighways continues to set benchmarks in sustainable, high-performance highway infrastructure by integrating technology, safety, and data-driven decision-making.",
    description:
      "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    slug: "",
  },
  {
    id: "04.",
    title:
      "CubeHighways is at the forefront of modern infrastructure development, utilizing cutting-edge technology",
    description:
      "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    slug: "",
  },
];

interface InsightsImpactProps {
  resources?: Resource[];
  pageContent?: InsightsImpactSection;
}

export default function InsightsImpact({ resources, pageContent }: InsightsImpactProps) {
  const ITEMS_PER_SLIDE = 2;

  // Use dynamic resources or fallback to static data
  const caseStudies: { id: string; title: string; description: string; slug: string; downloadFile?: { url: string } }[] = resources && resources.length > 0
    ? resources.map((resource, index) => ({
        id: `${String(index + 1).padStart(2, '0')}.`,
        title: resource.title,
        description: resource.description,
        slug: resource.slug,
        downloadFile: resource.downloadFile,
      }))
    : fallbackCaseStudies;

  const slides = [];
  for (let i = 0; i < caseStudies.length; i += ITEMS_PER_SLIDE) {
    slides.push(caseStudies.slice(i, i + ITEMS_PER_SLIDE));
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Auto-loop: advances every 4 seconds, checks every 500ms so resume is near-instant
  const tickRef = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) { tickRef.current = 0; return; }
      tickRef.current += 500;
      if (tickRef.current >= 4000) {
        tickRef.current = 0;
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  // Allow wheel scroll through slides on the right column
  useEffect(() => {
    const el = rightColRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [slides.length]);

  return (
    <main className="min-h-screen bg-white pb-19">
      {/* Hero Section */}
      <section className="px-4 md:px-15 py-16 max-w-8xl mx-auto">
        <h1 className="text-4xl md:text-[75px] mb-12 font-light md:leading-[40px]">
          {pageContent?.businessHeading || "WE'RE IN"}{" "}
          <span className="font-semibold italic">{pageContent?.businessHeadingItalic || "BUSINESS"}</span>
        </h1>

        <h1 className="text-4xl md:text-[75px] font-light md:leading-[40px] mb-9">
          {pageContent?.planetHeading || "TO HELP OUR"}{" "}
          <span className="font-semibold italic">{pageContent?.planetHeadingItalic || "PLANET"}</span>
        </h1>

        <p className="md:w-[20%] text-sm mb-8 md:leading-[20px]">
          {pageContent?.businessDescription || "We provide consulting, planning and engineering design services."}
        </p>

        <a href="/services" className="bg-accent text-white px-6 py-3 text-sm uppercase font-medium inline-block hover:bg-green-600 transition-colors cursor-pointer">
          {pageContent?.exploreServicesButtonText || "Explore Services"}
        </a>
      </section>

      {/* Insights + Carousel */}
      <section className="md:px-15 max-w-8xl mx-auto md:h-[773px] overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left column image */}
          <div
            className="relative h-[773px] px-4 md:px-0 bg-cover bg-no-repeat bg-top"
            style={{
              backgroundImage: `url('${pageContent?.insightsBackgroundImage?.url || "/resource-page-hero-section.png"}')`,
            }}
          >
            <div className="absolute bottom-15 right-[-1] z-20 pointer-events-none">
              <PolygonIcon />
            </div>

            <div className="md:ml-24 md:mt-26 pt-8 md:pt-0">
              <h2 className="text-2xl md:text-[46px] font-light mb-2 text-white md:tracking-[3.75px]">
                {pageContent?.insightsHeading || "INSIGHTS"}
              </h2>

              <h2 className="text-2xl md:text-[46px] font-semibold text-white italic mb-6 md:tracking-[3.75px]">
                {pageContent?.insightsSubheading || "& "}<span className="text-accent">{pageContent?.impactHighlightWord || "IMPACT"}</span>
              </h2>

              <p className="text-base text-white md:leading-[20px] md:tracking-[0.25px] mb-8">
                {pageContent?.insightsDescription || "Explore in-depth analyses, industry reports, and research-driven insights to stay informed and ahead."}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN — Vertical Carousel */}
          <div
            ref={rightColRef}
            className="relative h-[773px] overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Sliding Wrapper */}
            <div
              className="transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateY(-${slides.length > 0 ? activeIndex * (100 / slides.length) : 0}%)`,
              }}
            >
              {caseStudies.map((item, index) => (
                <div
                  key={index}
                  className="h-[386.5px] flex flex-col justify-center px-4 md:px-0 overflow-hidden"
                >
                  <h3 className="text-7xl font-thin text-gray-200 mb-3">
                    {item.id}
                  </h3>

                  <p className="md:w-[60%] text-lg md:leading-[24px] mb-3 line-clamp-2">
                    {item.title}
                  </p>

                  <p className="md:w-[60%] text-base text-[#4d4d4d] mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between mt-3">
                    {item.downloadFile?.url ? (
                      <a
                        href={item.downloadFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="text-[#808080] text-base flex items-center gap-3 hover:text-accent transition-colors cursor-pointer"
                      >
                        DOWNLOAD <DownTailedArrow />
                      </a>
                    ) : (
                      <span className="text-[#808080] text-base flex items-center gap-3 cursor-pointer">
                        DOWNLOAD <DownTailedArrow />
                      </span>
                    )}

                    {item.slug ? (
                      <Link
                        href={`/resources/details/${item.slug}`}
                        className="text-[#808080] text-base flex items-center gap-3 hover:text-accent transition-colors cursor-pointer"
                      >
                        /CASESTUDY <RightArrowIcon color="#5FBA51" />
                      </Link>
                    ) : (
                      <span className="text-[#808080] text-base flex items-center gap-3">
                        /CASESTUDY <RightArrowIcon color="#5FBA51" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Vertical Sticks (Option A) */}
            <div className="absolute top-0 right-[-15] h-full flex flex-col justify-center gap-6 pr-4">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-[2px] h-20 rounded-full ${
                    idx === activeIndex ? "bg-accent" : "bg-[#E3E3E3]"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
