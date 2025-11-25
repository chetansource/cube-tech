'use client'
import React,{useEffect} from "react";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  shortDescription?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
}

interface ProjectsProps {
  projects?: Project[];
}

// Fallback projects for development
const defaultProjects = [
  {
    id: "1",
    title: "2 Days Traffic Counts of Commercial Traffic Entering Delhi",
    slug: "delhi-traffic-audit",
    location: "Delhi",
    shortDescription:
      "Conducting a 2-day audit of commercial traffic at Delhi's 7 major entry points to ensure accurate data collection for planning and regulation.",
    mainImage: { url: "/long-highway2.webp" },
    tags: ["Delhi", "CST", "Traffic Audit"],
  },
  {
    id: "2",
    title: "2 Days Traffic Counts of Commercial Traffic Entering Delhi",
    slug: "delhi-traffic-audit-2",
    location: "Delhi",
    shortDescription:
      "Conducting a 2-day audit of commercial traffic at Delhi's 7 major entry points to ensure accurate data collection for planning and regulation.",
    mainImage: { url: "/long-highway2.webp" },
    tags: ["Delhi", "CST", "Traffic Audit"],
  },
];

const Projects = ({ projects = defaultProjects }: ProjectsProps) => {
  useEffect(() => {
    const container = document.getElementById("project-scroll-container");

    if (window.innerWidth < 768 && container) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      container.addEventListener("mousedown", (e) => {
        isDown = true;
        container.classList.add("cursor-grabbing");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseleave", () => {
        isDown = false;
        container.classList.remove("cursor-grabbing");
      });

      container.addEventListener("mouseup", () => {
        isDown = false;
        container.classList.remove("cursor-grabbing");
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll-fast factor
        container.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);


  return (
    <section
      id="project-scroll-container"
      className="group md:flex md:px-[63px] pb-[130px] pl-4 overflow-x-auto md:overflow-visible cursor-grab active:cursor-grabbing select-none hide-scrollbar"
    >
      <div
        id="project-scroll-inner"
        className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 flex-nowrap w-max md:w-full"
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="container w-[85vw] md:w-full hover:opacity-90 transition-opacity"
          >
            <div className="relative w-full h-[392px]">
              <Image
                className=" object-cover"
                src={project.mainImage?.url || "/placeholder.svg"}
                alt={project.mainImage?.alt || project.title}
                fill
              />
            </div>

            <h2 className="text-base md:text-2xl font-normal text-black pt-[36px] leading-[24px] md:leading-[35px] tracking-[0.75px]">
              {project.title}
            </h2>
            <div className="flex flex-row justify-between items-center ">
              <p className="text-sm md:text-lg font-normal leading-[24px] tracking-[0.25px] pt-4 flex-1 text-black/60">
                {project.shortDescription}
              </p>
              <RightArrowIcon color={"#5FBA51"} />
            </div>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-row gap-10 py-4 text-black/60">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className=" border-b-2 border-[#5FBA51] pb-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
