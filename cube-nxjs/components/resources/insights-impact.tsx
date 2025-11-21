"use client";
import { useState } from "react";
import DiagonalArrow from "../icons/DiagonalArrow";
import DownTailedArrow from "../icons/DownTailedArrow";
import RightArrowIcon from "../icons/right-arrow";

export default function InsightsImpact() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (window.innerWidth < 768) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const caseStudies = [
    {
      id: "01.",
      title:
        "An average performance enhancement of 7% was achieved in the quality of the GSB layer.",
      description:
        "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    },
    {
      id: "02.",
      title:
        "An average performance enhancement of 15% was achieved in the quality of the GSB layer.",
      description:
        "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    },
    {
      id: "03.",
      title:
        "CubeHighways continues to set benchmarks in sustainable, high-performance highway infrastructure by integrating technology, safety, and data-driven decision-making.",
      description:
        "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    },
    {
      id: "04.",
      title:
        "CubeHighways is at the forefront of modern infrastructure development, utilizing cutting-edge technology",
      description:
        "Checklists has been developed to identify the various parameters related to construction quality of each layer through the entire project duration.",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-19">
      {/* Hero Section */}
      <section className="px-4 md:px-15 py-16 max-w-8xl mx-auto">
        <h1 className="text-4xl md:text-[75px] mb-12 font-light md:leading-[40px]">
          WE&apos;RE IN <span className="font-semibold italic">BUSINESS</span>
        </h1>
        <h1 className="text-4xl md:text-[75px] font-light md:leading-[40px] mb-9">
          TO HELP OUR <span className="font-semibold italic">PLANET</span>
        </h1>
        <p className="md:w-[20%] text-sm mb-8 md:leading-[20px] md:trackig-[0.25px]">
          We provide consulting, planning and engineering design services.
        </p>
        <button className="bg-accent text-white px-6 py-3 text-sm uppercase font-medium">
          Explore Services
        </button>
      </section>

      {/* Insights Section */}
      <section className="md:px-15 py-16 max-w-8xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="px-4 md:px-0">
            <h2 className="text-2xl md:text-[46px] font-light mb-2 md:leading-[67px] md:tracking-[3.75px]">
              INSIGHTS
            </h2>
            <h2 className="text-2xl md:text-[46px] font-semibold italic mb-6 md:leading-[67px] md:tracking-[3.75px]">
              & <span className="text-accent">IMPACT</span>
            </h2>
            <p className="text-base text-[#808080] md:leading-[20px] md:tracking-[0.25px] mb-8">
              Explore in-depth analyses, industry reports, and research-driven
              insights to stay informed and ahead.
            </p>
          </div>

          {/* Right Column - Case Studies */}
          <div>
            {caseStudies.map((item, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`group relative mb-12 pb-8 px-4 md:px-0 transition-all duration-300 ease-in-out cursor-pointer`}
                  onClick={() => handleClick(index)}
                >
                  <h3 className="text-8xl font-thin text-gray-100 mb-4">
                    {item.id}
                  </h3>
                  <p className="md:w-[60%] text-lg md:leading-[27px] md:tracking-[0.25px] mb-4">
                    {item.title}
                  </p>

                  {/* Description for mobile and hover on desktop */}
                  <div
                    className={`${
                      isOpen ? "block" : "hidden"
                    } md:block md:w-[60%] text-base font-['Glacier_Indifference'] mb-6 text-[#4d4d4d]`}
                  >
                    {item.description}
                  </div>

                  {/* CTA Section */}
                  <div
                    className={`flex items-center justify-between ${
                      isOpen ? "opacity-100 max-h-32" : "opacity-0 max-h-0"
                    } overflow-hidden md:opacity-0 md:max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-300 ease-in-out`}
                  >
                    <span className="text-[#808080] text-base uppercase md:leading-[20px] md:tracking-[0.25px] flex items-center gap-3">
                      DOWNLOAD <DownTailedArrow />
                    </span>
                    <span className="text-[#808080] text-base uppercase md:leading-[20px] md:tracking-[0.25px] flex gap-6">
                      /CASESTUDY
                      <RightArrowIcon color="#5FBA51" />
                    </span>
                  </div>

                  {/* Border line - visible only on hover (desktop) or open (mobile) */}
                  <div
                    className={`absolute bottom-0 left-0 h-[1px]  transition-opacity duration-300
                    ${
                      isOpen
                        ? "opacity-100 bg-accent"
                        : "opacity-0 md:bg-accent md:group-hover:opacity-100"
                    }
                    w-full md:w-screen ml-0 md:ml-[-120%]`}
                  ></div>
                </div>
              );
            })}

            <div className="text-[#808080] text-base uppercase md:leading-[20px] md:tracking-[0.25px] flex gap-6 justify-center md:justify-start cursor-pointer">
              SEE ALL CASESTUDIES <DiagonalArrow />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
