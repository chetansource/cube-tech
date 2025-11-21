import Header from "@/components/header";
import PolygonIcon from "@/components/icons/polygon";
import { Breadcrumb } from "@/components/project-page/bread-crump";
import ResourcesSection from "@/components/resource-section";
import SpecificResource from "@/components/resources-details/specific-resource";
import Image from "next/image";
import React from "react";

const ResourceDetailPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* hero section start */}
      <section className="relative w-full bg-white mb-15 md:mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute top-0 bottom-0 left-0 right-0 md:right-[57px] z-0">
          <Image
            src="/resources-details-banner.webp"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container md:left-[57px]  px-4 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <h1 className="text-white text-[52px] md:text-[75px]  font-light mb-12 leading-[40px] md:leading-[90px] uppercase ">
              RESOURCES
            </h1>
          </div>
          <Breadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Details", href: "/resources/details" },
            ]}
          />
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>
      {/* hero section stop */}
      <SpecificResource />
      <ResourcesSection />
    </div>
  );
};

export default ResourceDetailPage;
