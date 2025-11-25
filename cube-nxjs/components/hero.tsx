"use client";
import Link from "next/link";
import Image from "next/image";
import PolygonIcon from "./icons/polygon";
import { usePathname } from "next/navigation";
import RightArrowIcon from "./icons/right-arrow";

type FeaturedResource = {
  id: string;
  title: string;
  slug: string;
  image?: {
    url: string;
    alt?: string;
  };
};

type HeroProps = {
  backgroundImage: string;
  overlayOpacity?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  height?: string;
  featuredResources?: FeaturedResource[];
};

export default function Hero({
  backgroundImage,
  overlayOpacity = "bg-black/10",
  title,
  subtitle,
  ctaText,
  ctaLink,
  featuredResources = [],
}: HeroProps) {
  const pathname = usePathname();
  const showTopSection = pathname === "/resources" || pathname === "/services";
  return (
    <section
      className={`relative w-full bg-white mb-15 md:mb-[97px] overflow-hidden h-[768px]`}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 md:right-[57px] z-0">
        <div className="relative h-full md:pr-[57px]">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div
        className={`absolute top-0 bottom-0 left-0 right-0  md:right-[57px] ${overlayOpacity} z-10`}
      />
      <div className="flex relative z-20 container  md:left-[57px]  px-4  h-full flex-col  md:justify-center">
        <div className="max-w-5xl mt-[60%] md:mt-0">
          {pathname !== "/resources" && (
            <div className="text-white text-[52px] md:text-[75px] font-light mb-12 leading-[40px] flex flex-col md:gap-8 ">
              {title}
            </div>
          )}
          {subtitle && (
            <p className="font-normal text-white text-lg mb-12 max-w-xl text-[14px]">
              {subtitle}
            </p>
          )}
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="bg-accent hover:bg-green-600 text-white px-8 py-3  font-medium transition-colors duration-300"
            >
              {ctaText}
            </Link>
          )}
        </div>
        {showTopSection && (
          <div className="absolute left-0 bottom-0 p-4 md:py-18 md:grid  md:grid-cols-3 gap-4 ">
            {/* Featured Resources Cards */}
            {featuredResources.length > 0 ? (
              featuredResources.slice(0, 2).map((resource, index) => (
                <Link
                  key={resource.id}
                  href={`/resources/details?slug=${resource.slug}`}
                  className="relative bg-white/5 backdrop-blur-sm rounded-lg p-2 md:p-4 mb-8 md:mb-0 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="relative w-[200px] h-[100px] md:w-full md:h-[181px]">
                    <Image
                      src={resource.image?.url || "/long-highway-2.webp"}
                      alt={resource.image?.alt || resource.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <div className="flex flex-row items-start justify-between w-full mt-2">
                    <div className="text-[14px] md:text-[18px] font-normal text-white leading-[22px] md:leading-[28px] tracking-[1px] md:tracking-[0.75px] w-[170px] md:w-[323px] max-w-full ">
                      {resource.title}
                    </div>
                    <RightArrowIcon color={"#5FBA51"} />
                  </div>
                </Link>
              ))
            ) : (
              <>
                {/* Fallback - First Blurred Container */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-2 md:p-4 mb-8 md:mb-0 ">
                  <div className="relative w-[200px] h-[100px] md:w-full md:h-[181px]">
                    <Image src="/long-highway-2.webp" alt="Placeholder" fill />
                  </div>
                  <div className="flex flex-row items-start justify-between w-full mt-2">
                    <div className="text-[14px] md:text-[18px] font-normal text-white leading-[22px] md:leading-[28px] tracking-[1px] md:tracking-[0.75px] w-[170px] md:w-[323px] max-w-full ">
                      CubeHighways Sets a New Record in Highway Construction
                    </div>
                    <RightArrowIcon color={"#5FBA51"} />
                  </div>
                </div>

                {/* Fallback - Second Blurred Container */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-2 md:p-4 ">
                  <div className="relative w-[200px] h-[100px] md:w-full md:h-[181px]">
                    <Image
                      src="/long-highway-2.webp"
                      alt="Placeholder"
                      fill
                      priority
                    />
                  </div>
                  <div className="flex flex-row items-start justify-between w-full mt-2">
                    <div className="text-[14px] md:text-[18px] font-normal text-white leading-[22px] md:leading-[28px] tracking-[1px] md:tracking-[0.75px] w-[170px] md:w-[323px] max-w-full ">
                      CubeHighways Sets a New Record in Highway Construction
                    </div>
                    <RightArrowIcon color={"#5FBA51"} />
                  </div>
                </div>
              </>
            )}
            {/* Title Block (only for /resources) */}
            {pathname === "/resources" && (
              <div className="text-white md:ml-8  col-start-4 self-end ">
                <h1 className="text-3xl md:text-[75px] font-light md:leading-[40px] flex flex-col gap-8 ">
                  {title}
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 md:-bottom-px right-0 z-20 md:w-31 pointer-events-none">
        <PolygonIcon />
      </div>
    </section>
  );
}
