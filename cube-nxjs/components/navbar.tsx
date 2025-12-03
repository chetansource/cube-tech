"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const handleRndClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rndSection = document.getElementById("rnd");
    if (rndSection) {
      rndSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col py-12 md:p-12">
      <Link
        href="/"
        className="inline-flex w-max items-center gap-4 p-3 bg-white/20 backdrop-blur-sm"
      >
        <Image
          src="/cube-highway-logo.webp"
          alt="Green Highway Technology"
          width={88}
          height={53}
          className="object-contain w-[66px] h-[47px] md:w-[88px] md:h-[53px]"
          priority
        />
        <h1 className="hidden md:block text-white text-xl font-medium tracking-[3px] uppercase">
          CUBE HIGHWAYS TECHNOLOGIES
        </h1>
      </Link>

      <div className="hidden md:flex flex-wrap py-8">
        {[
          "HOME",
          "SERVICES",
          "PROJECTS",
          "ABOUT US",
          "RESOURCES",
          "CAREERS",
          "CONTACT US",
        ].map((item) => {
          const path =
            item.toLowerCase() === "home"
              ? "/"
              : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
          const label = item === "RESOURCES" ? "KNOWLEDGE CENTER" : item;

          const isActive = pathname === path;

          return (
            <React.Fragment key={item}>
              <Link
                href={path}
                className={`text-white font-medium tracking-[3px] px-4 py-2 mx-1 my-1 border transition-all duration-100
                  ${
                    isActive
                      ? "bg-white/30 backdrop-blur-sm border-white border-opacity-50"
                      : "border-transparent hover:bg-white/30 hover:backdrop-blur-sm hover:border-white hover:border-opacity-50"
                  }`}
              >
                {label}
              </Link>

              {/* R&D Link - Only visible on homepage, right after KNOWLEDGE CENTER */}
              {item === "RESOURCES" && isHomepage && (
                <a
                  href="#rnd"
                  onClick={handleRndClick}
                  className="text-white font-medium tracking-[3px] px-4 py-2 mx-1 my-1 border border-transparent hover:bg-white/30 hover:backdrop-blur-sm hover:border-white hover:border-opacity-50 transition-all duration-100 cursor-pointer"
                >
                  R&D
                </a>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
