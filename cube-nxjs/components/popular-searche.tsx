'use client';

import React from 'react';

const searches = [
  "Digital Transformation",
  "Cloud Migration",
  "Mobile App Development",
  "E-commerce Platform",
  "AI Integration",
  "Blockchain Solution",
  "IoT Ecosystem",
  "Data Analytics Dashboard",
  "Virtual Reality Experience",
  "Cybersecurity Framework",
  "Enterprise CRM",
  "Smart City Infrastructure"
];

export default function PopularSearch() {
  // Double the projects array to ensure continuous scrolling
  const allSearches = [...searches, ...searches];
  
  return (
    <div className="w-full relative overflow-hidden pb-[97px] ">
        <div className=" text-base font-bold mb-12 text-center text-accent leading-[20px] tracking-[0.25px]">POPULAR SEARCHES</div>
      {/* Gradient fade on the left */}
      <div className="absolute left-0 top-0 h-full w-34 bg-gradient-to-r from-background to-transparent z-10"></div>
      
      {/* Scrolling container */}
      <div className="marquee-container w-full overflow-hidden">
        <div className="marquee flex whitespace-nowrap animate-marquee">
          {allSearches.map((search, index) => (
            <div key={index} className="flex items-center">
              <div  className="text-xl font-normal">{search}</div>
              <div className="h-[2px] w-12 bg-accent mx-[39px]"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient fade on the right */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}