import Header from "@/components/header";
import { Testimonial } from "@/components/testimonial";
import React from "react";
import Image from "next/image";
import PolygonIcon from "@/components/icons/polygon";
import Stats from "@/components/stats";
import RightArrowIcon from "@/components/icons/right-arrow";
import LeftArrowIcon from "@/components/icons/left-arrow";
import Timeline from "@/components/about-us/Timeline";
import { getAboutPageContent } from "@/utils/routes/AboutUs";

const AboutUsPage = async () => {
  const {
    heroSection,
    timelineSection,
    leadershipSection,
    corporateResponsibilitySection,
    statsSection,
    testimonialsSection,
  } = await getAboutPageContent("about-us");

  const fullText = leadershipSection?.description || `We provide strong and dependable leadership to drive success and innovation within your organization. Whether it's strategic planning, team management, or decision-making, our experienced leaders offer guidance and solutions that foster growth, enhance efficiency, and ensure long-term stability.`;

  const mobileText = fullText.split(" ").slice(0, 20).join(" ") + "...";

  const leaders = leadershipSection?.leaders || [];

  return (
    <div className="min-h-screen ">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-white mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute top-0 bottom-0 left-0 right-0  md:right-[57px] z-0">
          <Image
            src={
              heroSection?.backgroundImage?.url ||
              "/long-shot-professional-cyclist-women-road.webp"
            }
            alt={heroSection?.backgroundImage?.alt || "Hero background"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container md:left-[57px] px-4 pt-20 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <h1 className="text-white text-[52px] md:text-[75px] font-light mb-12 leading-[40px]">
              {heroSection?.heading || "ABOUT"}{" "}
              <span className="italic">{heroSection?.subheading || "US"}</span>
            </h1>
          </div>
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>

      <Timeline
        heading={timelineSection?.heading || "Our Story"}
        timelineItems={timelineSection?.timelineItems}
      />

      {/* Leadership Section */}
      <div className="p-8 py-12 md:py-22 bg-white">
        {/* Parent container: column layout on mobile, grid on md+ */}
        <div className="flex  md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Leadership Text */}
          <div className="md:col-span-1 w-full ">
            <h2 className="text-2xl md:text-[46px] font-light mb-12 leading-[40px]">
              {leadershipSection?.title || "LEADERSHIP"}
            </h2>
            <p className="text-sm mb-8 leading-[20px] text-[#404040] block md:hidden">
              {mobileText}
            </p>
            <p className="text-sm mb-8 leading-[20px] text-[#404040] hidden md:block">
              {fullText}
            </p>
          </div>

          {/* Leader Cards container */}
          <div className="md:col-span-1 lg:col-span-3 overflow-x-auto md:overflow-visible hide-scrollbar">
            <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
              {leaders.length > 0
                ? leaders.map((leader, i) => (
                    <div
                      key={i}
                      className="min-w-[160px] md:min-w-0 flex-shrink-0 overflow-hidden shadow-md relative h-[200px] md:h-[392px]"
                    >
                      <Image
                        src={leader.image?.url || "/leadership-banner-1.webp"}
                        alt={leader.image?.alt || leader.name}
                        fill
                        className="object-cover"
                      />
                      <div className="text-white p-4 absolute bottom-0 left-0 right-0 bg-black/40">
                        <p className="text-sm mb-4">{leader.name}</p>
                        <a
                          href={leader.linkedIn || "#"}
                          className="text-white text-lg font-semibold block"
                        >
                          {leader.designation}
                        </a>
                      </div>
                    </div>
                  ))
                : // Fallback to default design
                  [1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[160px] md:min-w-0 flex-shrink-0 overflow-hidden shadow-md relative h-[200px] md:h-[392px]"
                    >
                      <Image
                        src="/leadership-banner-1.webp"
                        alt="Leadership Image"
                        fill
                        className="object-cover"
                      />
                      <div className="text-white p-4 absolute bottom-0 left-0 right-0 bg-black/40">
                        <p className="text-sm mb-4">NAME</p>
                        <a
                          href="#"
                          className="text-white text-lg font-semibold block"
                        >
                          Designation
                        </a>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex justify-end mt-6">
          <button className="mx-2 p-2 rounded-full hover:bg-secondary">
            <LeftArrowIcon />
          </button>
          <button className="mx-2 p-2 rounded-full hover:bg-secondary">
            <RightArrowIcon color="#5FBA51" />
          </button>
        </div>
      </div>
      <Stats stats={statsSection?.stats} />
      {/* Banner Section - Corporate Responsibility */}
      <section
        className="relative w-full h-[788px]  bg-cover  mb-20"
        style={{
          backgroundImage: corporateResponsibilitySection?.backgroundImage?.url
            ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${corporateResponsibilitySection.backgroundImage.url}')`
            : "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/about-us-banner.webp')",
        }}
      >
        <div className="absolute top-[70%] left-1/2 md:left-1/5 transform -translate-x-1/2 -translate-y-1/2 bg-black/10 p-8 text-white   max-w-xl backdrop-blur-[8px]">
          <h1 className="text-2xl md:text-[46px] font-light tracking-widest">
            {corporateResponsibilitySection?.mainHeading || "CORPORATE"}
          </h1>
          <h2 className="text-2xl md:text-[46px] font-semibold text-accent italic mb-4">
            {corporateResponsibilitySection?.subheading || "RESPONSIBILITY"}
          </h2>
          <h3 className="text-base md:text-2xl">
            {corporateResponsibilitySection?.title || "Corporate Responsibilty"}
          </h3>
          <p className="mb-4 text-sm md:text-lg">
            {corporateResponsibilitySection?.description ||
              "At Cubehighways Technology, we are committed to sustainable growth by integrating Corporate Social Responsibility (CSR) into our core values."}
          </p>
          <div className="flex gap-6 text-sm flex-wrap">
            {corporateResponsibilitySection?.tags &&
            corporateResponsibilitySection.tags.length > 0
              ? corporateResponsibilitySection.tags.map((tag, index) => (
                  <span key={index} className="border-b-2 border-accent">
                    {tag}
                  </span>
                ))
              : [
                  "Sustainable Development",
                  "Road Safety Awareness",
                  "Empowerment",
                ].map((tag, index) => (
                  <span key={index} className="border-b-2 border-accent">
                    {tag}
                  </span>
                ))}
          </div>
        </div>
      </section>
      <Testimonial testimonials={testimonialsSection?.testimonials} />
    </div>
  );
};

export default AboutUsPage;
