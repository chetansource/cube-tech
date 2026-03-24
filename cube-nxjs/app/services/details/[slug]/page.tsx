import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import PolygonIcon from "@/components/icons/polygon";
import { Breadcrumb } from "@/components/project-page/bread-crump";
import Image from "next/image";
import { getServiceBySlug } from "@/utils/routes/Services";

export const revalidate = 5;

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Split title at "&" for styling (e.g. "Planning & Design Services")
  const titleParts = service.title.split("&");
  const firstPart = titleParts[0]?.trim() || service.title;
  const secondPart = titleParts.length > 1 ? `& ${titleParts.slice(1).join("&").trim()}` : "";

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative w-full bg-white mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute w-full h-full md:w-[97%] top-0 bottom-0 left-0 md:right-[57px] z-0">
          <Image
            src="/cross-road-beautiful-mount-services-banner.webp"
            alt="Services background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container md:left-[57px] px-4 md:pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl mt-4">
            <h1 className="text-white text-[52px] md:text-[75px] font-light mb-12 leading-[40px] flex">
              Our <span className="italic pl-4">Services</span>
            </h1>
          </div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/details/${slug}` },
            ]}
          />
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>

      {/* Service Detail Content */}
      <section className="w-full px-4 md:px-16 lg:px-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:h-[600px]">
          {/* Left - Image with Title Overlay */}
          <div className="relative h-[400px] md:h-full overflow-hidden">
            <Image
              src={service.image?.url || "/services-section-banner.webp"}
              alt={service.image?.alt || service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-8 left-8 md:top-12 md:left-12 text-white">
              <h2 className="text-2xl md:text-[40px] font-light leading-tight tracking-[2px] uppercase">
                {firstPart}
              </h2>
              {secondPart && (
                <h2 className="text-2xl md:text-[40px] font-light leading-tight tracking-[2px] uppercase">
                  <span className="italic font-semibold text-accent">{secondPart.split(" ")[0]} {secondPart.split(" ")[1]}</span>{" "}
                  {secondPart.split(" ").slice(2).join(" ")}
                </h2>
              )}
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-start h-[400px] md:h-full overflow-y-auto service-content-scroll">
            <p className="text-[#404040] text-base md:text-lg leading-relaxed mb-8 font-medium">
              {service.description}
            </p>
            {service.contentImage?.url && (
              <div className="relative w-full min-h-[200px] md:min-h-[250px] mb-8 overflow-hidden flex-shrink-0">
                <Image
                  src={service.contentImage.url}
                  alt={service.contentImage.alt || service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
            {service.content ? (
              <div
                className="prose prose-lg max-w-none text-[#404040] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') }}
              />
            ) : (
              <div>
                {service.features && service.features.length > 0 && (
                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-[#404040] text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
