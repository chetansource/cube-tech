import React from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import ServiceSection from "@/components/servicesComponent";
import ProjectMap from "@/components/project-map";
import PopularSearch from "@/components/popular-searche";
import ServicesSolutions from "@/components/servcies-solutions";
import Link from "next/link";
import Image from "next/image";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero
        backgroundImage="/cross-road-beautiful-mount-services-banner.webp"
        title={
          <div className="flex flex-col md:flex md:flex-row md:gap-8 ">
            Our{" "}
            <span className="text-white font-semibold italic pt-5 md:pt-0">
              Services
            </span>
          </div>
        }
      />
      {/* services offered section */}
      <section className="w-full relative overflow-hidden">
        <div className="relative w-full md:w-[60%]  h-[25vh] md:h-[30vh]">
          <Image
            src="/Explore-Our-Services.svg"
            alt="Explore Our Services"
            fill
            className=""
          />
        </div>
        <div className="relative -top-[10px]">
          <ServiceSection />
        </div>
      </section>
      {/* Popular Searches */}
      <PopularSearch />
      {/* Project Map */}
      <ProjectMap />
      {/* know more about our services */}
      <ServicesSolutions />
      {/* contact banner with button */}
      <section
        className="relative flex justify-start items-center w-full h-[450px]  bg-cover "
        style={{ backgroundImage: "url('/service-banner-2.webp')" }}
      >
        <div className="absolute pt-34 md:pt-0 md:ml-auto pl-8 md:pl-[73px] text-white ">
          <h2 className="text-[52px] w-[70%] md:w-full md:text-[75px] leading-[54px] md:leading-[79px] font-light mb-4">
            Let’s get in touch
          </h2>
          <Link href="/contact-us">
            <Button className="bg-accent w-[90%] md:w-[30%] text-[12px] leading-[16px] tracking-[2.6px] px-[24px] py-[8px] font-bold uppercase cursor-pointer hover:bg-accent rounded-none">
              Contact us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
