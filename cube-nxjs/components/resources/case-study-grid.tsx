import type React from "react";
import Image from "next/image";
import RightArrowIcon from "../icons/right-arrow";

const CaseStudyGrid: React.FC = () => {
  return (
    <div className="container mx-auto p-4 mb-19">
      <div className="hidden md:grid grid-cols-3 gap-4 ">
        {/* First row - 3 squares */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className=" flex  flex-grow  text-base text-[#808080] font-medium mb-4 uppercase gap-4">
            <span>/Casestudy</span>
            <RightArrowIcon color="#5FBA51" />
          </div>

          <h3 className="text-lg font-semibold md:leading-[22px] md:tracking-[0.75px] mb-2">
            {`CubeHighway's Technology-Driven Approach to Corporate Social Responsibility`}
          </h3>

          <p className="text-lg text-black/60 mb-2">11/02/2025</p>

          <p className="text-lg text-black/60">
            CubeHighways merges technology with CSR to drive sustainability,
            road safety, and conservation.
          </p>
        </div>

        <div className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className=" flex  flex-grow  text-base text-[#808080] font-medium mb-4 uppercase gap-4">
            <span>/Casestudy</span>
            <RightArrowIcon color="#5FBA51" />
          </div>

          <h3 className=" text-lg font-semibold md:leading-[22px] md:tracking-[0.75px] mb-2">
            {`CubeHighway's Technology-Driven Approach to Corporate Social Responsibility`}
          </h3>

          <p className="text-lg text-black/60 mb-2">11/02/2025</p>

          <p className="text-lg text-black/60">
            CubeHighways merges technology with CSR to drive sustainability,
            road safety, and conservation.
          </p>
        </div>

        <div className=" flex flex-col-reverse bg-[#02472F] p-6 text-white relative md:h-[339px]">
          <div className="">
            <div className="flex text-base text-[#808080] font-medium mb-4 uppercase gap-4 ">
              <span>/Podcaste</span>
              <RightArrowIcon color="#FFFFFF" />
            </div>
            <p className="text-lg md:w-[80%] ">
              We integrate AI-driven traffic monitoring, smart highway
              management.
            </p>
          </div>
        </div>

        {/* Second row - Rectangle (2 cols) + Square */}
        <div className="relative md:h-[319px]">
          <Image
            src="/career-explore-img3.webp"
            alt="Aerial view"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute  bottom-12 left-4  bg-black/30  flex flex-col justify-around text-white px-12 gap-3">
            <h3 className="text-[32px] md:leading-[40px] font-bold  ">
              We are building more than just roads
            </h3>
            <div className="flex text-base text-white font-medium uppercase gap-4">
              <span>/Casestudy</span>
              <RightArrowIcon color="#FFFFFF" />
            </div>
            <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:w-[75%]">
              We are creating innovative solutions and collaboration growth, and
              the best of planned technologies.
            </p>
          </div>
        </div>

        <div className=" bg-[#FBFBFB] col-span-2 relative h-[200px] md:h-[319px]">
          <Image
            src="/career-explore-img1.webp"
            alt="Team at CubeHighways"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-600/60 p-6 flex flex-col justify-end text-white">
            <h2 className="text-2xl font-bold">LIFE AT CUBEHIGHWAYS TECH</h2>
            <div className="flex text-base text-white font-medium uppercase gap-4">
              <span>/Casestudy</span>
              <RightArrowIcon color="#FFFFFF" />
            </div>
            <p className="md:text-lg md:w-[40%] mt-2">
              At CubeHighways, we foster teamwork and growth-oriented work
              environments where innovation makes impact.
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
            <div className="flex text-base text-[#808080] font-medium mb-4 uppercase gap-4  px-8">
              <span>/Podcaste</span>
              <RightArrowIcon color="#FFFFFF" />
            </div>
            <p className="text-lg  md:w-[80%] mb-4 px-8">
              We are innovators shaping the future of mobility
            </p>
          </div>
        </div>

        <div className="col-span-2 content-end bg-white p-6 shadow-sm flex flex-col">
          <div className=" flex  flex-grow  text-base text-[#808080] font-medium mb-4 uppercase gap-4">
            <span>/Casestudy</span>
            <RightArrowIcon color="#5FBA51" />
          </div>
          <h2 className=" md:text-[42px] md:leading-[42px] md:tracking-[0.75px] md:uppercase mb-2">
            LIFE AT <br />
            <span>CUBEHIGHWAYS TECH</span>
          </h2>
          <p className="text-lg text-black/60 mb-2">11/02/2025</p>
          <p className="text-lg text-black/60 md:leading-[24px] md:tracking-[0.25px] md:w-[80%]">
            Employees at CubeHighways gain hands-on experience with AI-driven
            traffic monitoring, smart highway management, and next-gen
            transportation solutions.
          </p>
        </div>

        {/* Fourth row - (First col is already covered by row-span-2) + Two squares */}
        <div className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className=" flex  flex-grow  text-base text-[#808080] font-medium mb-4 uppercase gap-4">
            <span>/Casestudy</span>
            <RightArrowIcon color="#5FBA51" />
          </div>

          <h3 className=" text-lg font-semibold md:leading-[22px] md:tracking-[0.75px] mb-2">
            {`CubeHighway's Technology-Driven Approach to Corporate Social Responsibility`}
          </h3>

          <p className="text-lg text-black/60 mb-2">11/02/2025</p>

          <p className="text-lg text-black/60">
            CubeHighways merges technology with CSR to drive sustainability,
            road safety, and conservation.
          </p>
        </div>

        <div className="bg-accent p-6  flex flex-col justify-end">
          <div className="flex text-base text-[#808080] font-medium mb-4 uppercase gap-4 ">
            <span>/Podcaste</span>
            <RightArrowIcon color="#FFFFFF" />
          </div>
          <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px] md:tracking-[0.25px] text-white">
            Our team thrives in a dynamic, collaborative environment where every
            project brings new challenges and opportunities to learn and grow
          </p>
        </div>
      </div>
      {/* MOBILE ONLY: Horizontally scrollable 2-row layout */}
      <div className="md:hidden overflow-x-auto hide-scrollbar">
        <div
          className="flex gap-x-4 px-4 py-6 min-w-max "
          style={{
            height: "700px", // Two rows of 320px + gap
          }}
        >
          {/* Container for cards grouped in columns (2 cards stacked vertically) */}
          {[...Array(5)].map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-y-4">
              {[...Array(2)].map((_, rowIdx) => {
                const index = colIdx * 2 + rowIdx;
                return (
                  <div
                    key={index}
                    className="w-[220px] h-[320px] bg-[#FBFBFB] p-4 flex flex-col justify-between flex-shrink-0"
                  >
                    <div className="flex text-base text-[#808080] font-medium uppercase gap-2">
                      <span>/Casestudy</span>
                      <RightArrowIcon color="#5FBA51" />
                    </div>
                    <h3 className="text-md font-semibold leading-tight">
                      Card {index + 1} Title Goes Here
                    </h3>
                    <p className="text-sm text-black/60">11/02/2025</p>
                    <p className="text-sm text-black/60">
                      Brief content describing the purpose or content of this
                      card.
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className=" md:hidden text-[#808080] text-base uppercase  flex gap-6 justify-end ">
          SEE ALL
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17.9117 17.3866L9.43543 17.7778M17.9117 17.3866L17.5205 8.91034M17.9117 17.3866L10.1527 10.3121M6.08846 6.60647L7.93584 8.29086"
              stroke="#5FBA51"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyGrid;
