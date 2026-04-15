"use client";

import React, { useState } from "react";
import CaseStudiesGrid from "./case-study-grid";
import { Resource } from "@/utils/routes/Resources";

interface ResourcesPageClientProps {
  allResources: Resource[];
}

const ResourcesPageClient: React.FC<ResourcesPageClientProps> = ({ allResources }) => {
  const [activeCategory] = useState<string | null>(null);

  // Category filtering is currently disabled (see commented code below)
  // const handleCategoryClick = (category: string) => {
  //   if (activeCategory === category) {
  //     setActiveCategory(null);
  //   } else {
  //     setActiveCategory(category);
  //   }
  // };

  return (
    <>
      {/* Resource Gallery start */}
      <div className="relative w-full overflow-hidden pl-5 md:pl-[53px]">
        <h2
          className="font-normal select-none text-[#EDEDED] text-[90px] md:text-[220px]"
          style={{
            lineHeight: "0.847",
            letterSpacing: "-2.72px",
          }}
        >
          Resource<br />Gallery
        </h2>
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
