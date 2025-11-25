"use client";

import React, { useState } from "react";
import CaseStudiesGrid from "./case-study-grid";
import { Resource } from "@/utils/routes/Resources";
import { ResourceGallerySection } from "@/utils/routes/ResourcesPage";

interface ResourcesPageClientProps {
  allResources: Resource[];
  gallerySection?: ResourceGallerySection;
}

const ResourcesPageClient: React.FC<ResourcesPageClientProps> = ({ allResources, gallerySection }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    // Toggle category filter
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  // Use the function to avoid unused variable warning
  console.log('Category filter available:', handleCategoryClick);

  return (
    <>
      {/* Resource Gallery start */}
      <div
        className="relative h-[300px] md:h-[500px] w-full bg-no-repeat md:pb-[53px] bg-[20px_center] md:bg-[53px_center] bg-[length:70%] md:bg-[length:60%]"
        style={{
          backgroundImage: `url('${gallerySection?.galleryBackgroundImage?.url || "/Resource Gallery.webp"}')`,
        }}
      >
        {/* <div className="absolute bottom-0 right-0 p-4 text-[#C3C3C3] text-xs md:text-xl leading-[10px] mr-8">
          <ul className="flex space-x-4 md:space-x-12">
            {(gallerySection?.showNewsLink !== false) && (
              <li>
                <button
                  onClick={() => handleCategoryClick('NEWS')}
                  className={`hover:text-white transition-colors ${
                    activeCategory === 'NEWS' ? 'text-white font-semibold underline' : ''
                  }`}
                >
                  News
                </button>
              </li>
            )}
            {(gallerySection?.showCasestudiesLink !== false) && (
              <li>
                <button
                  onClick={() => handleCategoryClick('CASESTUDY')}
                  className={`hover:text-white transition-colors ${
                    activeCategory === 'CASESTUDY' ? 'text-white font-semibold underline' : ''
                  }`}
                >
                  Casestudies
                </button>
              </li>
            )}
            {(gallerySection?.showBlogsLink !== false) && (
              <li>
                <button
                  onClick={() => handleCategoryClick('BLOG')}
                  className={`hover:text-white transition-colors ${
                    activeCategory === 'BLOG' ? 'text-white font-semibold underline' : ''
                  }`}
                >
                  Blogs
                </button>
              </li>
            )}
            {(gallerySection?.showPodcastsLink !== false) && (
              <li>
                <button
                  onClick={() => handleCategoryClick('PODCAST')}
                  className={`hover:text-white transition-colors ${
                    activeCategory === 'PODCAST' ? 'text-white font-semibold underline' : ''
                  }`}
                >
                  Podcasts
                </button>
              </li>
            )}
          </ul>
        </div> */}
        {/* <div className="absolute bottom-0 md:left-[-50] w-full border border-accent"></div> */}
      </div>
      {/* Resource Gallery stop */}

      <CaseStudiesGrid resources={allResources} activeCategory={activeCategory} />
    </>
  );
};

export default ResourcesPageClient;
