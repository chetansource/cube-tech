"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import RightArrowIcon from "../icons/right-arrow";
import { Resource } from "@/utils/routes/Resources";

interface CaseStudyGridProps {
  resources?: Resource[];
  activeCategory?: string | null;
}

// Fallback static resources data
const fallbackResources: Resource[] = [
  {
    id: "1",
    category: "CASESTUDY",
    title: "CubeHighway's Technology-Driven Approach to Corporate Social Responsibility",
    slug: "",
    description: "CubeHighways merges technology with CSR to drive sustainability, road safety, and conservation.",
    status: "published",
    date: "2025-02-11",
    publishedAt: "2025-02-11",
    createdAt: "2025-02-11",
    updatedAt: "2025-02-11",
  },
  {
    id: "2",
    category: "CASESTUDY",
    title: "Innovative Traffic Management Solutions for Modern Highways",
    slug: "",
    description: "Implementing smart traffic systems to enhance highway efficiency and reduce congestion.",
    status: "published",
    date: "2025-02-10",
    publishedAt: "2025-02-10",
    createdAt: "2025-02-10",
    updatedAt: "2025-02-10",
  },
  {
    id: "3",
    category: "PODCAST",
    title: "The Future of Highway Infrastructure",
    slug: "",
    description: "We integrate AI-driven traffic monitoring, smart highway management.",
    status: "published",
    date: "2025-02-09",
    publishedAt: "2025-02-09",
    createdAt: "2025-02-09",
    updatedAt: "2025-02-09",
  },
  {
    id: "4",
    category: "CASESTUDY",
    title: "We are building more than just roads",
    slug: "",
    description: "We are creating innovative solutions and collaboration growth, and the best of planned technologies.",
    status: "published",
    date: "2025-02-08",
    publishedAt: "2025-02-08",
    createdAt: "2025-02-08",
    updatedAt: "2025-02-08",
  },
  {
    id: "5",
    category: "CASESTUDY",
    title: "Life at CubeHighways Tech",
    slug: "",
    description: "At CubeHighways, we foster teamwork and growth-oriented work environments where innovation makes impact.",
    status: "published",
    date: "2025-02-07",
    publishedAt: "2025-02-07",
    createdAt: "2025-02-07",
    updatedAt: "2025-02-07",
  },
  {
    id: "6",
    category: "PODCAST",
    title: "Innovation in Highway Safety",
    slug: "",
    description: "We are innovators shaping the future of mobility.",
    status: "published",
    date: "2025-02-06",
    publishedAt: "2025-02-06",
    createdAt: "2025-02-06",
    updatedAt: "2025-02-06",
  },
  {
    id: "7",
    category: "CASESTUDY",
    title: "Advanced Highway Infrastructure Development",
    slug: "",
    description: "Employees at CubeHighways gain hands-on experience with AI-driven traffic monitoring, smart highway management, and next-gen transportation solutions.",
    status: "published",
    date: "2025-02-05",
    publishedAt: "2025-02-05",
    createdAt: "2025-02-05",
    updatedAt: "2025-02-05",
  },
  {
    id: "8",
    category: "CASESTUDY",
    title: "Sustainable Highway Construction Practices",
    slug: "",
    description: "CubeHighways merges technology with CSR to drive sustainability, road safety, and conservation.",
    status: "published",
    date: "2025-02-04",
    publishedAt: "2025-02-04",
    createdAt: "2025-02-04",
    updatedAt: "2025-02-04",
  },
  {
    id: "9",
    category: "PODCAST",
    title: "Smart Highway Technologies",
    slug: "",
    description: "Our team thrives in a dynamic, collaborative environment where every project brings new challenges and opportunities to learn and grow.",
    status: "published",
    date: "2025-02-03",
    publishedAt: "2025-02-03",
    createdAt: "2025-02-03",
    updatedAt: "2025-02-03",
  },
];

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ resources, activeCategory }) => {
  // Use dynamic resources or fallback to static data
  const dataSource = resources && resources.length > 0 ? resources : fallbackResources;

  // Filter resources based on active category
  let filteredResources = activeCategory
    ? dataSource.filter(r => r.category === activeCategory)
    : dataSource;

  // Sort resources by category priority for grid display
  // Priority order: CASESTUDY > NEWS > BLOG > PODCAST
  const categoryPriority: Record<string, number> = {
    'CASESTUDY': 1,
    'NEWS': 2,
    'BLOG': 3,
    'PODCAST': 4,
  };

  if (!activeCategory) {
    // Only sort when showing all categories (no filter active)
    filteredResources = [...filteredResources].sort((a, b) => {
      const priorityA = categoryPriority[a.category] || 999;
      const priorityB = categoryPriority[b.category] || 999;

      // Sort by category priority first, then by date (newest first)
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      const dateA = new Date(a.publishedAt || a.date || 0).getTime();
      const dateB = new Date(b.publishedAt || b.date || 0).getTime();
      return dateB - dateA; // Newest first
    });
  }

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Get category label with slash
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'NEWS': '/News',
      'BLOG': '/Blog',
      'CASESTUDY': '/Casestudy',
      'PODCAST': '/Podcaste',
    };
    return labels[category] || '/Resource';
  };

  return (
    <div className="container mx-auto p-4 mb-19">
      {/* Desktop Grid - Masonry layout matching the design */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {filteredResources.slice(0, 9).map((resource, index) => {
          const categoryLabel = getCategoryLabel(resource.category);
          const displayDate = formatDate(resource.publishedAt || resource.date);
          const hasLink = resource.slug && resource.slug !== "";

          // Define specific card layouts based on index to match the image
          const cardLayouts = [
            // Row 1
            { gridClass: '', bgClass: 'bg-white', hasImage: false, height: 'md:h-[339px]' }, // Card 1
            { gridClass: '', bgClass: 'bg-white', hasImage: false, height: 'md:h-[339px]' }, // Card 2
            { gridClass: '', bgClass: 'bg-[#02472F]', hasImage: false, height: 'md:h-[339px]', textWhite: true }, // Card 3
            // Row 2
            { gridClass: '', bgClass: '', hasImage: true, height: 'md:h-[319px]', imageUrl: '/career-explore-img3.webp' }, // Card 4 - with background image
            { gridClass: 'col-span-2', bgClass: '', hasImage: true, height: 'md:h-[319px]', imageUrl: '/career-explore-img1.webp', overlay: true }, // Card 5 - large with overlay
            // Row 3
            { gridClass: 'row-span-2', bgClass: '', hasImage: true, height: 'md:h-[666px]', imageUrl: '/career-explore-img2.webp', textWhite: true }, // Card 6 - tall
            { gridClass: 'col-span-2', bgClass: 'bg-white', hasImage: false, height: 'md:h-[320px]' }, // Card 7 - wide
            // Row 4
            { gridClass: '', bgClass: 'bg-white', hasImage: false, height: 'md:h-[339px]' }, // Card 8
            { gridClass: '', bgClass: 'bg-accent', hasImage: false, height: 'md:h-[339px]', textWhite: true }, // Card 9
          ];

          const layout = cardLayouts[index] || cardLayouts[0];
          const cardClassName = `${layout.gridClass} ${layout.hasImage ? 'relative' : layout.bgClass} p-6 ${layout.hasImage ? '' : 'border border-gray-100 shadow-sm'} flex flex-col ${layout.height} ${hasLink ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} group overflow-hidden`;

          const cardContent = (
            <>
              {/* Background Image */}
              {layout.hasImage && (
                <>
                  <Image
                    src={resource.image?.url || layout.imageUrl || '/top-view-bridge.webp'}
                    alt={resource.image?.alt || resource.title}
                    fill
                    className="object-cover"
                  />
                  {layout.overlay && (
                    <div className="absolute inset-0 bg-green-600/60"></div>
                  )}
                  <div className={`relative z-10 flex flex-col ${layout.overlay ? 'justify-end text-white' : 'justify-between'} h-full`}>
                    {layout.overlay ? (
                      <>
                        <h2 className="text-2xl font-bold mb-2">{resource.title}</h2>
                        <div className="flex text-base text-white font-medium uppercase gap-4 mb-2">
                          <span>{categoryLabel}</span>
                          <RightArrowIcon color="#FFFFFF" />
                        </div>
                        <p className="md:text-lg md:w-[40%]">{resource.description}</p>
                      </>
                    ) : (
                      <>
                        <div className="bg-black/30 flex flex-col justify-around text-white px-8 gap-3 mt-auto">
                          <h3 className="text-[32px] md:leading-[40px] font-bold">{resource.title}</h3>
                          <div className="flex text-base text-white font-medium uppercase gap-4">
                            <span>{categoryLabel}</span>
                            <RightArrowIcon color="#FFFFFF" />
                          </div>
                          <p className="text-lg font-['Glacier_Indifference'] md:leading-[24px]">{resource.description}</p>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Regular Card Content */}
              {!layout.hasImage && (
                <>
                  <div className={`flex flex-grow text-base ${layout.textWhite ? 'text-white' : 'text-[#808080]'} font-medium mb-4 uppercase gap-4`}>
                    <span>{categoryLabel}</span>
                    <RightArrowIcon color={layout.textWhite ? '#FFFFFF' : '#5FBA51'} />
                  </div>

                  <h3 className={`text-lg font-semibold md:leading-[22px] md:tracking-[0.75px] mb-2 ${layout.textWhite ? 'text-white' : 'text-black'} ${hasLink ? 'group-hover:text-accent transition-colors' : ''}`}>
                    {resource.title}
                  </h3>

                  {displayDate && (
                    <p className={`text-lg ${layout.textWhite ? 'text-white/80' : 'text-black/60'} mb-2`}>
                      {displayDate}
                    </p>
                  )}

                  <p className={`text-lg ${layout.textWhite ? 'text-white/90' : 'text-black/60'} line-clamp-3`}>
                    {resource.description}
                  </p>
                </>
              )}
            </>
          );

          return hasLink ? (
            <Link
              key={resource.id}
              href={`/resources/details/${resource.slug}`}
              className={cardClassName}
            >
              {cardContent}
            </Link>
          ) : (
            <div
              key={resource.id}
              className={cardClassName}
            >
              {cardContent}
            </div>
          );
        })}
      </div>
      {/* MOBILE ONLY: Horizontally scrollable 2-row layout */}
      <div className="md:hidden overflow-x-auto hide-scrollbar">
        <div
          className="flex gap-x-4 px-4 py-6 min-w-max "
          style={{
            height: "700px", // Two rows of 320px + gap
          }}
        >
          {/* Group resources into columns of 2 */}
          {Array.from({ length: Math.ceil(filteredResources.length / 2) }).map((_, colIdx) => {
            const startIdx = colIdx * 2;
            const columnResources = filteredResources.slice(startIdx, startIdx + 2);

            return (
              <div key={colIdx} className="flex flex-col gap-y-4">
                {columnResources.map((resource) => {
                  const categoryLabel = getCategoryLabel(resource.category);
                  const displayDate = formatDate(resource.publishedAt || resource.date);
                  const hasLink = resource.slug && resource.slug !== "";

                  const content = (
                    <>
                      {/* Show image if available */}
                      {resource.image?.url && (
                        <div className="relative w-full h-[120px] mb-3 -mx-4 -mt-4">
                          <Image
                            src={resource.image.url}
                            alt={resource.image.alt || resource.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex text-base text-[#808080] font-medium uppercase gap-2">
                        <span>{categoryLabel}</span>
                        <RightArrowIcon color="#5FBA51" />
                      </div>
                      <h3 className="text-md font-semibold leading-tight line-clamp-3">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-black/60">{displayDate}</p>
                      <p className="text-sm text-black/60 line-clamp-3">
                        {resource.description}
                      </p>
                    </>
                  );

                  return hasLink ? (
                    <Link
                      key={resource.id}
                      href={`/resources/details/${resource.slug}`}
                      className="w-[220px] h-[320px] bg-[#FBFBFB] p-4 flex flex-col justify-between flex-shrink-0 hover:shadow-lg transition-shadow"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div
                      key={resource.id}
                      className="w-[220px] h-[320px] bg-[#FBFBFB] p-4 flex flex-col justify-between flex-shrink-0"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyGrid;
