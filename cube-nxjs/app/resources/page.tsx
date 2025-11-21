import React from "react";
import Faq from "@/components/faq";
import Awards from "@/components/awards";
import ResourcesSection from "@/components/resource-section";
import Header from "@/components/header";
import Hero from "@/components/hero";
import CaseStudiesGrid from "@/components/resources/case-study-grid";
import InsightsImpact from "@/components/resources/insights-impact";

const ResourcesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero
        backgroundImage="/top-view-bridge.webp"
        title={
          <div className="flex md:flex-col md:gap-8 my-8">
            Explore{" "}
            <span className="text-white font-semibold italic pl-4 md:py-2">Latest</span>
          </div>
        }
      />
      <InsightsImpact />
      <ResourcesSection />
      {/* Resource Gallery start */}
      <div
        className="relative h-[300px] md:h-[500px] w-full bg-no-repeat md:pb-[53px] bg-[20px_center] md:bg-[53px_center] bg-[length:70%] md:bg-[length:60%]"
        style={{
          backgroundImage: `url('/Resource Gallery.webp')`,
        }}
      >
        <div className="absolute bottom-0 right-0 p-4 text-[#C3C3C3] text-xs md:text-xl leading-[10px] mr-8">
          <ul className="flex space-x-4 md:space-x-12">
            <li>
              <a href="#" className=" ">
                News
              </a>
            </li>
            <li>
              <a href="#" className="">
                Casestudies
              </a>
            </li>
            <li>
              <a href="#" className="">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="">
                Podcasts
              </a>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 md:left-[-50] w-full border border-accent"></div>
      </div>
      {/* Resource Gallery stop */}
      <CaseStudiesGrid />
      <Awards />
      <Faq />
    </div>
  );
};

export default ResourcesPage;
