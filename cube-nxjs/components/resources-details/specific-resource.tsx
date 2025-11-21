import Image from "next/image";
import { Download } from "lucide-react";

export default function SpecificResource() {
  return (
    <div className="max-w-8xl mx-auto px-4 md:px-16 bg-white mb-22">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="pr-4">
          <h1 className="text-2xl md:text-[46px] font-light leading-[67px] tracking-[3.75px] text-black">
            3 - Days Traffic Counts
            <br />
            at 7 Entry Points of
            <br />
            <span className="text-accent italic font-semibold">DELHI</span>
          </h1>

          <p className="text-[#404040]/50 text-lg mt-6">
            Posted Date: 01 Apr, 2021
          </p>

          <button className="mt-6 bg-accent text-white px-6 py-3 flex items-center text-xs uppercase font-bold  gap-8">
            <span>DOWNLOAD</span>
            <Download className=" h-4 w-4" />
          </button>
        </div>

        {/* Right Column */}
        <div>
          <div className="flex flex-col">
            <h2 className="text-8xl font-light text-gray-100">01</h2>

            <div className="grid md:grid-cols-2 gap-4 mt-4 ">
              <div>
                <h3 className="text-lg text-black md:leading-[55px] md:tracking-[0.75px] py-4 md:py-0 ">
                  Company Name
                </h3>
                <p className="text-base text-black/60 md:leading-[28px] md:tracking-[0.25px]">
                  3 - Days Traffic Counts at 7{" "}
                  <br className="block md:hidden" />
                  Entry Point of Delhi
                </p>
              </div>

              <div>
                <h3 className="text-lg text-black md:leading-[55px] md:tracking-[0.75px] py-4 md:py-0">
                  Duration
                </h3>
                <p className="text-base text-black/60 md:leading-[28px] md:tracking-[0.25px]">
                  2011 - 2012
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-black/50 mt-6 leading-[31px]">
              CubeHighways conducted a 3-day traffic count survey at seven major
              entry points of Delhi to analyze vehicular movement, congestion
              levels, and traffic flow patterns. Using AI-powered video
              analytics and Automatic Traffic Counter & Classifier (ATCC)
              technology, the study captured real-time data on vehicle types,
              peak hour traffic trends, and lane occupancy.
            </p>

            <div className="mt-6 relative">
              <Image
                src="/resources-details-01-project.webp"
                alt="National Highway"
                width={619}
                height={464}
                className="w-full rounded-md"
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                National Highways
              </p>
            </div>

            <p className="text-sm md:text-base text-black/50 mt-6 leading-[28px]">
              The survey aimed to support urban mobility planning by providing
              insights into toll booth efficiency, seasonal traffic variations,
              and congestion hotspots. The collected data will play a crucial
              role in enhancing traffic management, road infrastructure
              planning, and decongestion strategies, ultimately improving travel
              efficiency and road safety in the capital.
            </p>

            <h3 className="text-base  text-black mt-8 md:leading-[28px]">
              Traffic Study
            </h3>

            <p className="text-sm md:text-base text-black/50 mt-6 leading-[31px] mb-12">
              This data is essential for optimizing toll booth operations,
              improving traffic decongestion strategies, and planning future
              infrastructure upgrades. Additionally, the study analyzed traffic
              volume fluctuations based on time of day and seasonal variations,
              helping authorities enhance road network efficiency. The findings
              will support data-driven policymaking, smart city initiatives, and
              sustainable urban transport planning, ensuring a smoother, safer,
              and more efficient commuting experience for Delhi&#39;s residents
              and visitors.
            </p>
          </div>
        </div>
      </div>
      <div className="border-1 border-[#90BD3D] -ml-20"></div>
    </div>
  );
}
