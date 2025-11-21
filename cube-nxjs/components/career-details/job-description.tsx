import React from "react";

interface JobDescriptionProps {
  title: string;
  location: string;
  description: string[];
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  title,
  location,
  description,
}) => {
  return (
    <section className="max-w-4xl mx-auto  px-4 pb-19">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base md:text-[28px] font-medium md:leading-[78px] tracking-[-0.84px] text-foreground">
          {title}
        </h2>
        <span className="text-base md:text-lg md:font-light text-muted-foreground">
          {location}
        </span>
      </div>

      <hr className="border-[2.27px] mb-12 border-[#DFDFDF]" />

      <div className="text-sm md:text-lg text-[#646464] space-y-6 ">
        {description.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};
