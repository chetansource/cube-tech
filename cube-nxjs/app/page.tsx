import Awards from "@/components/awards";
import Faq from "@/components/faq";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Partners from "@/components/partners";
import ResourcesSection from "@/components/resource-section";
import ServiceSection from "@/components/servicesComponent";
import Solutions from "@/components/solutions";
import { Testimonial } from "@/components/testimonial";
import ResourceDevelopment from "@/components/resource-development";
import Projects from "@/components/projects";
import Stats from "@/components/stats";

export default function Home() {
  return (
    <div className=" min-h-screen ">
      <Header />
      <Hero
        backgroundImage="/top-view-bridge.webp"
        title={
          <>
            <div className="md:flex gap-4 md:pt-105">
              WE&#39;RE IN{" "}
              <div className=" text-white font-semibold italic my-5 md:my-0">
                BUSINESS
              </div>
            </div>
            <div className="md:flex gap-4">
              TO HELP OUR{" "}
              <div className="text-white font-semibold italic my-5 md:my-0">
                PLANET
              </div>
            </div>
          </>
        }
        subtitle="We provide consulting, planning and engineering design services."
        ctaText="Explore Services"
        ctaLink="services"
      />

      <Solutions />
      <ServiceSection />
      <Partners />
      <Projects />
      <Stats />
      <ResourceDevelopment />
      <Testimonial />
      <Awards />
      <ResourcesSection />
      <section id="faq">
        <Faq />
      </section>
    </div>
  );
}
