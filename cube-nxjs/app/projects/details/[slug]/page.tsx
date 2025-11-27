import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import PolygonIcon from "@/components/icons/polygon";
import { Breadcrumb } from "@/components/project-page/bread-crump";
import { SectionOne } from "@/components/project-details/sectionOne";
import { ProjectImpact } from "@/components/project-details/projectImpact";
import ProjectsCarousel from "@/components/project-details/project-carousel";
import Image from "next/image";
import { getProjectBySlug, getProjectsPageContent } from "@/utils/routes/Projects";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;

  // Fetch project data from backend
  const project = await getProjectBySlug(slug);

  // If project not found, show 404
  if (!project) {
    notFound();
  }

  // Fetch related projects (same category, limit to 4)
  // TODO: Use relatedProjects for "Related Projects" section
  // const relatedProjects = await getRelatedProjects(
  //   project.id,
  //   project.category,
  //   4
  // );

  // Fetch projects page content to reuse the same hero section
  const projectsPageData = await getProjectsPageContent("projects");
  const heroSection = projectsPageData.heroSection;
  const heroHeading = heroSection?.heading || "Our";
  const heroHighlightedWord = heroSection?.highlightedWord || "Projects";
  const heroBackgroundImage = heroSection?.backgroundImage?.url || "/project-banner.webp";

  return (
    <div className="min-h-screen">
      <Header />
      {/* hero section start */}
      <section className="relative w-full bg-white mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute w-full h-full md:w-[97%] top-0 bottom-0 left-0 md:right-[57px] z-0">
          <Image
            src={heroBackgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container md:left-[57px] px-4 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl mt-4">
            <h1 className="text-white text-[52px] md:text-[75px] font-light mb-12 leading-[40px] flex ">
              {heroHeading} <span className="italic pl-4">{heroHighlightedWord}</span>
            </h1>
          </div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title, href: `/projects/details/${slug}` },
            ]}
          />
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>
      {/* hero section stop */}
      <SectionOne
        title={project.category || "PROJECT"}
        location={project.location || ""}
        projectName={project.title}
        studyType={project.studyType || ""}
        date={project.date || ""}
        description={project.description || project.shortDescription || ""}
        mainImage={project.mainImage?.url || "/long-highway-3.webp"}
      />
      <div className="pt-8 pb-16 md:pb-0 md:pt-0 md:px-16">
        <ProjectImpact />
      </div>
      <ProjectsCarousel />
    </div>
  );
};

export default ProjectDetailPage;
