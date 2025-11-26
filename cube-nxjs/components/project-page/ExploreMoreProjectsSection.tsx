import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProjectTag {
  name: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
}

interface ExploreMoreProjectsSectionProps {
  projects?: Project[];
}

export function ExploreMoreProjectsSection({
  projects: propProjects,
}: ExploreMoreProjectsSectionProps) {
  // Fallback static projects
  const fallbackProjects: Project[] = [
    {
      id: "1",
      title:
        "3-days Traffic Count on Suratgarh - Sriganganagar Section of NH15",
      slug: "suratgarh-sriganganagar-nh15",
      shortDescription:
        "CubeTech conducted a 3-day traffic count on the Suratgarh-Sriganganagar section of NH15, analyzing vehicle flow for planning and optimization",
      mainImage: { url: "/long-highway-3.webp", alt: "Traffic Count" },
      tags: [
        "Sriganganagar",
        "Uniquest Infra Ventures Private Limited",
        "Pre-bid - Traffic",
      ],
    },
    {
      id: "2",
      title:
        "7-Day Traffic Survey for Bameetha-Panna-Nagod-Satana Section of NH-75 in the State of Madhya Pradesh",
      slug: "bameetha-panna-nagod-satana-nh75",
      shortDescription:
        "CubeTech conducted a 7-day traffic survey on the Bameetha-Panna-Nagod-Satana section of NH-75, assessing vehicle flow and road usage patterns",
      mainImage: { url: "/long-highway-3.webp", alt: "Traffic Survey" },
      tags: ["Satana", "Topworth Infra", "Traffic Study"],
    },
    {
      id: "3",
      title: "Environmental Impact Assessment for Highway Expansion",
      slug: "environmental-impact-assessment-highway",
      shortDescription:
        "Comprehensive environmental assessment for the proposed expansion of a major highway corridor through protected forest areas",
      mainImage: { url: "/long-highway-3.webp", alt: "Environmental Assessment" },
      tags: ["Environmental", "Highway Authority", "Impact Study"],
    },
    {
      id: "4",
      title: "Urban Mobility Plan for Metropolitan Region",
      slug: "urban-mobility-plan-metropolitan",
      shortDescription:
        "Development of an integrated urban mobility plan focusing on sustainable transportation solutions for growing metropolitan areas",
      mainImage: { url: "/long-highway-3.webp", alt: "Urban Mobility" },
      tags: ["Urban Planning", "Metro Transit Authority", "Sustainability"],
    },
    {
      id: "5",
      title: "Bridge Structural Analysis for Coastal Highway",
      slug: "bridge-structural-analysis-coastal",
      shortDescription:
        "Detailed structural analysis and reinforcement recommendations for bridges along a coastal highway exposed to saline conditions",
      mainImage: { url: "/long-highway-3.webp", alt: "Structural Analysis" },
      tags: ["Structural Engineering", "Coastal Authority", "Infrastructure"],
    },
    {
      id: "6",
      title: "Railway Crossing Safety Improvement Project",
      slug: "railway-crossing-safety-improvement",
      shortDescription:
        "Implementation of advanced safety measures at high-risk railway crossings to reduce accidents and improve traffic flow",
      mainImage: { url: "/long-highway-3.webp", alt: "Railway Safety" },
      tags: ["Railway Safety", "National Railways", "Public Safety"],
    },
  ];

  // Use prop projects or fallback to defaults
  const projects =
    propProjects && propProjects.length > 0 ? propProjects : fallbackProjects;

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
                src={project.mainImage?.url || "/long-highway-3.webp"}
                alt={project.mainImage?.alt || project.title}
                fill
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h4 className="flex flex-col text-2xl  font-normal mb-2 md:h-[76px] items-stretch leading-[35px] tracking-[0.75px] line-clamp-2 ">
              {project.title}
            </h4>
            <div className="flex justify-between ">
              <p className="text-lg w-[90%] font-['Glacier_Indifference'] font-normal leading-[24px] tracking-[0.25px] text-black/60 mb-[32px] flex-grow line-clamp-3">
                {project.shortDescription || "No description available"}
              </p>
              <ArrowRight className="text-green-500" size={20} />
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags && project.tags.length > 0
                  ? project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-lg font-['Glacier_Indifference'] font-normal leading-[24px] tracking-[0.25px] text-black/60 border-b-1 border-accent"
                      >
                        {tag}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <Button className="inline-flex h-[45px] px-6 py-2 flex-col justify-center items-center gap-[6px] flex-shrink-0 bg-accent text-white hover:bg-accent/90 hover:cursor-pointer rounded-none font-bold uppercase tracking-wider">
          See All Projects
        </Button>
      </div>
    </section>
  );
}
