'use client'
import React,{useEffect} from "react";
import RightArrowIcon from "./icons/right-arrow";
import Image from "next/image";

const Projects = () => {
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
        <div className="container w-[85vw] md:w-full">
          <div className="relative w-full h-[392px]">
            <Image
              className=" object-cover"
              src="/long-highway2.webp"
              alt="Card Image"
              fill
            />
          </div>

          <h2 className="text-base md:text-2xl font-normal text-black pt-[36px] leading-[24px] md:leading-[35px] tracking-[0.75px]">
            2 Days Traffic Counts of Commercial Traffic Entering Delhi{" "}
          </h2>
          <div className="flex flex-row justify-between items-center ">
            <p className="text-sm md:text-lg font-normal leading-[24px] tracking-[0.25px] pt-4 flex-1 text-black/60">
              Conducting a 2-day audit of commercial traffic at Delhi’s 7 major
              entry points to ensure accurate data collection for planning and
              regulation.
            </p>
            <RightArrowIcon color={"#5FBA51"} />
          </div>
          <div className="flex flex-row gap-10 py-4 text-black/60">
            <span className=" border-b-2 border-[#5FBA51] pb-1">Delhi</span>
            <span className=" border-b-2 border-[#5FBA51] pb-1">CST</span>
            <span className=" border-b-2 border-[#5FBA51] pb-1">
              Traffic Audit
            </span>
          </div>
        </div>
        <div className="container w-[85vw] md:w-full ">
          <div className="relative w-full h-[392px]">
            <Image
              className=" object-cover"
              src="/long-highway2.webp"
              alt="Card Image"
              fill
            />
          </div>

          <h2 className="text-base md:text-2xl  font-normal text-black pt-[36px] leading-[24px] md:leading-[35px] tracking-[0.75px]">
            2 Days Traffic Counts of Commercial Traffic Entering Delhi{" "}
          </h2>
          <div className="flex flex-row justify-between items-center ">
            <p className="text-sm md:text-lg font-normal leading-[24px] tracking-[0.25px] pt-4 flex-1 text-black/60">
              Conducting a 2-day audit of commercial traffic at Delhi’s 7 major
              entry points to ensure accurate data collection for planning and
              regulation.
            </p>
            <RightArrowIcon color={"#5FBA51"} />
          </div>
          <div className="flex flex-row gap-10 py-4 text-black/60">
            <span className=" border-b-2 border-[#5FBA51] pb-1">Delhi</span>
            <span className=" border-b-2 border-[#5FBA51] pb-1">CST</span>
            <span className=" border-b-2 border-[#5FBA51] pb-1">
              Traffic Audit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
