import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProjectTag {
  name: string;
}

interface Project {
  id: number;
  title: string;
  image: string;
  heading: string;
  description: string;
  tags: ProjectTag[];
}

export function ExploreMoreProjectsSection() {
  const projects: Project[] = [
    {
      id: 1,
      title: "",
      image: "/long-highway-3.webp",
      heading:
        "3-days Traffic Count on Suratgarh - Sriganganagar Section of NH15",
      description:
        "CubeTech conducted a 3-day traffic count on the Suratgarh-Sriganganagar section of NH15, analyzing vehicle flow for planning and optimization",
      tags: [
        { name: "Sriganganagar" },
        { name: "Uniquest Infra Ventures Private Limited" },
        { name: "Pre-bid - Traffic" },
      ],
    },
    {
      id: 2,
      title: "",
      image: "/long-highway-3.webp",
      heading:
        "7-Day Traffic Survey for Bameetha-Panna-Nagod-Satana Section of NH-75 in the State of Madhya Pradesh",
      description:
        "CubeTech conducted a 7-day traffic survey on the Bameetha-Panna-Nagod-Satana section of NH-75, assessing vehicle flow and road usage patterns",
      tags: [
        { name: "Satana" },
        { name: "Topworth Infra" },
        { name: "Traffic Study" },
      ],
    },
    {
      id: 3,
      title: "",
      image: "/long-highway-3.webp",
      heading: "Environmental Impact Assessment for Highway Expansion",
      description:
        "Comprehensive environmental assessment for the proposed expansion of a major highway corridor through protected forest areas",
      tags: [
        { name: "Environmental" },
        { name: "Highway Authority" },
        { name: "Impact Study" },
      ],
    },
    {
      id: 4,
      title: "",
      image: "/long-highway-3.webp",
      heading: "Urban Mobility Plan for Metropolitan Region",
      description:
        "Development of an integrated urban mobility plan focusing on sustainable transportation solutions for growing metropolitan areas",
      tags: [
        { name: "Urban Planning" },
        { name: "Metro Transit Authority" },
        { name: "Sustainability" },
      ],
    },
    {
      id: 5,
      title: "",
      image: "/long-highway-3.webp",
      heading: "Bridge Structural Analysis for Coastal Highway",
      description:
        "Detailed structural analysis and reinforcement recommendations for bridges along a coastal highway exposed to saline conditions",
      tags: [
        { name: "Structural Engineering" },
        { name: "Coastal Authority" },
        { name: "Infrastructure" },
      ],
    },
    {
      id: 6,
      title: "",
      image: "/long-highway-3.webp",
      heading: "Railway Crossing Safety Improvement Project",
      description:
        "Implementation of advanced safety measures at high-risk railway crossings to reduce accidents and improve traffic flow",
      tags: [
        { name: "Railway Safety" },
        { name: "National Railways" },
        { name: "Public Safety" },
      ],
    },
  ];

  return (
    <section className="py-16 px-4 md:px-[61px]">
      <div className="mb-12 tracking-[3.75px] uppercase text-2xl md:text-[46px]">
        <h2 className=" font-light ">EXPLORE MORE</h2>
        <h3 className=" font-semibold text-accent italic">PROJECTS</h3>
      </div>

      <div className="flex md:grid overflow-x-auto md:overflow-visible gap-[42px] md:grid-cols-2 snap-x snap-mandatory scroll-smooth hide-scrollbar ">
        {projects.slice(0, 6).map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[85%] sm:w-[75%] md:w-auto snap-start flex flex-col h-full"
          >
            <div className="relative overflow-hidden mb-4 h-[392px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {project.title}
                </h3>
              </div>
            </div>

            <h4 className="flex flex-col text-2xl  font-normal mb-2 md:h-[76px] items-stretch leading-[35px] tracking-[0.75px] line-clamp-2 ">
              {project.heading}
            </h4>
            <div className="flex justify-between ">
              <p className="text-lg w-[90%] font-['Glacier_Indifference'] font-normal leading-[24px] tracking-[0.25px] text-black/60 mb-[32px] flex-grow">
                {project.description}
              </p>
              <ArrowRight className="text-green-500" size={20} />
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-lg font-['Glacier_Indifference'] font-normal leading-[24px] tracking-[0.25px] text-black/60 border-b-1 border-accent"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <Button
          variant="outline"
          className="inline-flex h-[45px] px-6 py-2 flex-col justify-center items-center gap-[6px] flex-shrink-0 bg-accent text-white hover:cursor-pointer hover:text-white rounded-none font-medium"
        >
          See All Projects
        </Button>
      </div>
    </section>
  );
}
