"use client";
import React from "react";
// import { useParams } from "next/navigation";
import Header from "@/components/header";
import PolygonIcon from "@/components/icons/polygon";
import { Breadcrumb } from "@/components/project-page/bread-crump";
import { SectionOne } from "@/components/project-details/sectionOne";
import { ProjectImpact } from "@/components/project-details/projectImpact";
import ProjectsCarousel from "@/components/project-details/project-carousel";
import Image from "next/image";

const parkingStudyData = {
  title: "CAR PARKING AT",
  location: "NEW DELHI",
  projectName: "Car Parking at G.K-I New Delhi",
  studyType: "Traffic Study",
  date: "December 2018",
  description:
    "A comprehensive parking study was conducted at GK-I, New Delhi, to analyze space utilization, traffic flow, and peak-hour parking demand. The survey aimed to optimize parking efficiency, reduce congestion, and improve accessibility. Key factors such as vehicle turnover rate, illegal parking, and pedestrian movement were assessed to develop strategic parking solutions. Recommendations included better parking management, smart parking systems, and designated zones for commercial and residential use, ensuring a seamless urban mobility experience. Recommendations included designated parking zones, digital payment systems, and better traffic management to enhance accessibility and reduce congestion. The study aimed to create a more efficient, organized, and user-friendly parking environment for both residents and visitors.",
  mainImage: "/project-details-section1.webp",
  // thumbnails: [
  //   "https://tryeasel.dev/placeholder.svg?width=200&height=150",
  //   "https://tryeasel.dev/placeholder.svg?width=200&height=150",
  //   "https://tryeasel.dev/placeholder.svg?width=200&height=150",
  // ],
};

const ProjectDetailsPage = () => {
  // const params = useParams();
  // const { id } = params;
  return (
    <div className="min-h-screen">
      <Header />
      {/* hero section start */}
      <section className="relative w-full bg-white mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute w-full  h-full md:w-[97%] top-0 bottom-0 left-0 md:right-[57px] z-0">
          <Image
            src="/project-banner.webp"
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container md:left-[57px] px-4 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl mt-4">
            <h1 className="text-white text-[52px] md:text-[75px]   font-light mb-12 leading-[40px] flex ">
              Our <span className="italic pl-4">Projects</span>
            </h1>
          </div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
            ]}
          />
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>
      {/* hero section stop */}
      <SectionOne {...parkingStudyData} />
      <div className=" pt-8 pb-16 md:pb-0 md:pt-0 md:px-16">
        <ProjectImpact />
      </div>
      <ProjectsCarousel />
    </div>
  );
};

export default ProjectDetailsPage;
