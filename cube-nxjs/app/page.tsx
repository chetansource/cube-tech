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
import { getHomepageData } from "@/utils/routes/Homepage";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch all homepage data from backend
  const homepageData = await getHomepageData();

  // Format hero title - split by keywords and format properly
  const formatHeroTitle = (heading: string) => {
    // Check if heading contains the expected keywords
    if (heading.includes("BUSINESS") && heading.includes("PLANET")) {
      const parts = heading.split(/\s+/);
      const businessIndex = parts.findIndex(p => p.toUpperCase().includes("BUSINESS"));
      const planetIndex = parts.findIndex(p => p.toUpperCase().includes("PLANET"));

      return (
        <>
          <div className="md:flex gap-4 md:pt-105">
            {parts.slice(0, businessIndex).join(" ")}{" "}
            <div className="text-white font-semibold italic my-5 md:my-0">
              {parts[businessIndex]}
            </div>
          </div>
          <div className="md:flex gap-4">
            {parts.slice(businessIndex + 1, planetIndex).join(" ")}{" "}
            <div className="text-white font-semibold italic my-5 md:my-0">
              {parts[planetIndex]}
            </div>
          </div>
        </>
      );
    }
    // If format doesn't match, just return the text
    return <div>{heading}</div>;
  };

  return (
    <div className=" min-h-screen ">
      <Header />
      <Hero
        backgroundImage={homepageData.hero?.backgroundImage?.url || "/top-view-bridge.webp"}
        title={
          homepageData.hero?.heading ? formatHeroTitle(homepageData.hero.heading) : (
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
          )
        }
        subtitle={homepageData.hero?.description || "We provide consulting, planning and engineering design services."}
        ctaText={homepageData.hero?.ctaText || "Explore Services"}
        ctaLink={homepageData.hero?.ctaLink || "services"}
      />
      <Partners partners={homepageData.partners} />
      <Solutions
        solutions={homepageData.solutions}
        sectionConfig={homepageData.solutionsSection ? {
          backgroundImage: homepageData.solutionsSection.backgroundImage?.url,
          heading: homepageData.solutionsSection.heading,
          highlightedWord: homepageData.solutionsSection.highlightedWord,
          ctaText: homepageData.solutionsSection.ctaText,
          ctaLink: homepageData.solutionsSection.ctaLink,
        } : undefined}
      />
      <ServiceSection
        services={homepageData.services}
        sectionConfig={homepageData.servicesSection ? {
          bannerImage: homepageData.servicesSection.image?.url,
          heading: homepageData.servicesSection.title?.split(' ').slice(0, -1).join(' '),
          highlightedWord: homepageData.servicesSection.title?.split(' ').pop(),
          description: homepageData.servicesSection.description,
        } : undefined}
      />
      <Projects projects={homepageData.projects} />
      <Stats stats={homepageData.stats} />
      <section id="rnd">
        <ResourceDevelopment
          resources={homepageData.featuredResources}
          sectionConfig={homepageData.rdSection ? {
            backgroundImage: homepageData.rdSection.exploreMoreBackgroundImage?.url,
            heading: homepageData.rdSection.exploreMoreTitle?.split(' ').slice(0, -1).join(' '),
            highlightedWord: homepageData.rdSection.exploreMoreTitle?.split(' ').pop(),
            buttonText: homepageData.rdSection.exploreMoreDescription,
            buttonLink: "/resources",
          } : undefined}
        />
      </section>
      <Testimonial testimonials={homepageData.testimonials} />
      <Awards />
      <ResourcesSection />
      <section id="faq">
        <Faq />
      </section>
    </div>
  );
}
