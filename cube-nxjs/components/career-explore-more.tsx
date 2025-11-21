"use client";
import type React from "react";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";

const CareerExploreMore: React.FC = () => {
  const cards = [
    {
      id: 1,
      type: "text",
      title: "Life at Cubehighways",
      date: "11/02/2025",
      content:
        "At CubeHighways, we are more than just infrastructure developers—we are innovators shaping the future of mobility.",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      id: 2,
      type: "text",
      title: "Life at Cubehighways",
      date: "11/02/2025",
      content:
        "We believe in fostering a supportive workplace where teams collaborate, innovate, and drive impact.",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      id: 3,
      type: "featured",
      title: "LIFE AT CUBEHIGHWAYS TECH",
      date: "11/02/2025",
      content:
        "At CubeHighways, we foster a dynamic and growth-oriented work environment where innovation meets impact.",
      image: "/career-explore-img1.webp",
      bgColor: "bg-green-600",
    },
    {
      id: 4,
      type: "text",
      title: "Life at Cubehighways",
      date: "11/02/2025",
      content:
        "Our team thrives in a dynamic, collaborative environment where every project brings new challenges and opportunities to learn and grow.",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      id: 5,
      type: "text",
      title: "Life at Cubehighways",
      date: "11/02/2025",
      content:
        "We integrate AI-driven traffic monitoring, smart highway management and innovative solutions.",
      bgColor: "bg-[#02472F]",
      textColor: "text-white",
    },
  ];

  return (
    <div className="container mx-auto p-4 mb-19">
      {/* Mobile: Two Rows with Horizontal Scrolling */}
      <div className="block lg:hidden">
        {/* First Row - Regular Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-4 hide-scrollbar">
          {cards
            .filter((card) => card.type === "text")
            .map((card) => (
              <div
                key={card.id}
                className={`flex-shrink-0 w-72 h-80 ${card.bgColor} relative overflow-hidden rounded-lg`}
              >
                <div
                  className={`p-6 h-full flex flex-col ${
                    card.textColor || "text-black"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-sm font-medium ${
                        card.textColor || "text-gray-600"
                      }`}
                    >
                      EXPLORE MORE
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${card.textColor || "text-gray-600"}`}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        card.textColor || "text-black"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        card.textColor ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {card.date}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        card.textColor ? "text-white/90" : "text-black/60"
                      }`}
                    >
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Second Row - Featured Rectangle Card */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {cards
            .filter((card) => card.type === "featured")
            .map((card) => (
              <div
                key={card.id}
                className={`flex-shrink-0 w-full max-w-sm h-64 ${card.bgColor} relative overflow-hidden rounded-lg`}
              >
                <Image
                  src={card.image || ""}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-green-600/70 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white text-sm font-medium">
                      EXPLORE MORE
                    </span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {card.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-white text-sm">READ MORE</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* See All Button */}
        <div className="flex justify-end mt-6">
          <button className="flex items-center gap-2 text-green-600 font-medium">
            <span>SEE ALL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop: Original Grid Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {/* First row - 3 squares */}
          <div className="bg-[#FBFBFB] p-6 shadow-sm md:h-[339px]">
            <h3 className="text-lg md:leading-[22px] md:tracking-[0.75px] mb-2">
              Life at CubeHighways
            </h3>
            <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] text-black/60">
              At CubeHighways, we are more than just infrastructure
              developers—we are innovators shaping the future of mobility.
            </p>
          </div>

          <div className="bg-[#FBFBFB] p-6 shadow-sm md:h-[339px]">
            <h3 className="text-lg md:leading-[22px] md:tracking-[0.75px] mb-2">
              Life at CubeHighways
            </h3>
            <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] text-black/60">
              We believe in fostering a supportive workplace where teams
              collaborate, innovate, and drive impact.
            </p>
          </div>

          <div className="flex flex-col-reverse bg-[#02472F] p-6 text-white relative md:h-[339px]">
            <div className="">
              <p className="text-lg md:w-[80%]">
                We integrate AI-driven traffic monitoring, smart highway
                management.
              </p>
            </div>
          </div>

          {/* Second row - Rectangle (2 cols) + Square */}
          <div className="bg-[#FBFBFB] col-span-2 relative h-[200px] md:h-[319px]">
            <Image
              src="/career-explore-img1.webp"
              alt="Team at CubeHighways"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-green-600/60 p-6 flex flex-col justify-end text-white">
              <h2 className="text-2xl font-bold">LIFE AT CUBEHIGHWAYS TECH</h2>
              <p className="text-sm mt-2">
                At CubeHighways, we foster teamwork and growth-oriented work
                environments where innovation makes impact.
              </p>
            </div>
          </div>

          <div className="relative md:h-[319px]">
            <Image
              src="/career-explore-img3.webp"
              alt="Aerial view"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-12 left-4 bg-black/30 flex flex-col justify-center text-white px-12">
              <h3 className="text-[32px] md:leading-[40px] font-bold">
                We are building more than just roads
              </h3>
              <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:w-[75%]">
                We are creating innovative solutions and collaboration growth,
                and the best of planned technologies.
              </p>
            </div>
          </div>

          {/* Third row - Vertical Rectangle (spans to 4th row) + Horizontal Rectangle (2 cols) */}
          <div className="row-span-2 relative md:h-[666px]">
            <Image
              src="/career-explore-img2.webp"
              alt="Highway"
              width={300}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray/40 p-6 flex flex-col justify-end text-white">
              <p className="text-sm md:w-[80%] mb-4 px-8">
                We are innovators shaping the future of mobility
              </p>
            </div>
          </div>

          <div className="col-span-2 content-end bg-white p-6 shadow-sm">
            <h2 className="md:text-[42px] md:leading-[42px] md:tracking-[0.75px] md:uppercase mb-2">
              LIFE AT <br />
              <span>CUBEHIGHWAYS TECH</span>
            </h2>
            <p className="text-lg text-black/60 md:leading-[24px] md:tracking-[0.25px] md:w-[80%]">
              Employees at CubeHighways gain hands-on experience with AI-driven
              traffic monitoring, smart highway management, and next-gen
              transportation solutions.
            </p>
          </div>

          {/* Fourth row - (First col is already covered by row-span-2) + Two squares */}
          <div className="bg-[#FBFBFB] p-6 flex flex-col justify-end">
            <h3 className="text-lg md:leading-[22px] md:tracking-[0.75px]">
              Life at Cubehighways
            </h3>
            <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] text-black/60">
              Our team thrives in a dynamic, collaborative environment where
              every project brings new challenges and opportunities to learn and
              grow
            </p>
          </div>

          <div className="bg-accent p-6 flex flex-col justify-end">
            <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] text-white">
              Our team thrives in a dynamic, collaborative environment where
              every project brings new challenges and opportunities to learn and
              grow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerExploreMore;
