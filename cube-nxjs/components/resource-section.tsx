"use client";
// pages/resources.tsx
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightArrowIcon from "@/components/icons/right-arrow";

// Interface for ResourceCardProps
interface ResourceCardProps {
  category: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  categoryColor?: string;
}

// ResourceCard Component
const ResourceCard = ({
  category,
  title,
  date,
  description,
  image,
  link,
  categoryColor = "",
}: ResourceCardProps) => {
  return (
    <div className=" bg-white md:rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-2 md:px-4 md:py-4">
      <div className="relative w-full h-46  md:h-[590px]">
        <Image
          src={
            image || "https://tryeasel.dev/placeholder.svg?width=400&height=300"
          }
          alt={title}
          fill
          className="object-cover"
        />
        <div
          className={`absolute top-4 left-4 ${categoryColor} text-white px-4 py-1 text-sm font-medium`}
        >
          {category}
        </div>
      </div>
      <div className="py-2 md:p-5 flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-sm md:text-lg md:font-semibold leading-tight md:line-clamp-2 max-w-[80%]">
            {title}
          </h3>
          <Link href={link} className="shrink-0">
            <RightArrowIcon color={"#5FBA51"} />
          </Link>
        </div>

        <p className="text-sm md:text-lg text-gray-500 mb-3">{date}</p>
        <p className="text-sm md:text-lg text-gray-700 mb-4 md:line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

// Interface for LeftPanelProps
interface LeftPanelProps {
  title: string;
  description?: string;
  backgroundImage: string;
  children?: React.ReactNode;
  overlayColor?: string;
  showNewsletter?: boolean;
}

// LeftPanel Component
const LeftPanel = ({
  title,
  description,
  backgroundImage,
  children,
  overlayColor = "linear-gradient(0deg, rgba(43, 82, 92, 0.4) 0%, rgba(43, 82, 92, 0.4) 100%)",
  showNewsletter = false,
}: LeftPanelProps) => {
  return (
    <div className="relative  md:h-auto md:min-h-[774px] md:min-w-[443px]">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: overlayColor,
          }}
        ></div>

        <div className="relative z-10 py-10 px-6 md:p-12 h-full flex flex-col text-white justify-between">
          <div>
            <h2 className="md:w-[337px] text-2xl md:text-[46px] font-light mb-4 md:mt-12 leading-[35px] tracking-[1.62px] md:leading-[56px] md:tracking-[3.75px] uppercase">
              {title}
            </h2>
            {description && (
              <p className="text-white/90 text-sm md:text-[14px] md:leading-[20px] md:tracking-[0.25px]  md:font-[400] md:w-[340px]  md:h-[40px] md:flex-shrink-0 ">
                {description}
              </p>
            )}
          </div>

          {showNewsletter && (
            <div className="flex flex-col gap-4">
              <h3 className="md:text-[19px] font-medium leading-[40px]">Sign Up for Newsletter</h3>
              <input
                type="email"
                placeholder="Enter Email ID"
                className="bg-white/20 text-white placeholder-white/70 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-accent hover:bg-accent text-white font-bold uppercase py-2 px-4 md:leading-[16px] md:tracking-[2.6px] rounded cursor-pointer">
                SUBMIT
              </button>
            </div>
          )}
          {children && <div className="mt-auto">{children}</div>}
        </div>
      </div>
    </div>
  );
};

// Interface for the panel configuration
interface PanelConfig {
  title: string;
  description: string;
  showNewsletter: boolean;
}

// Define the type for panelConfig with specific keys
interface PanelConfigMap {
  [key: string]: PanelConfig;
  "/": PanelConfig;
  "/resources": PanelConfig;
  default: PanelConfig;
}

// ResourcesSection Component
export default function ResourcesSection() {
  const pathname = usePathname(); // Get the current URL path

  // Define panelConfig with explicit type
  const panelConfig: PanelConfigMap = {
    "/": {
      title: "RESOURCES",
      description:
        "Empowering innovation with cutting-edge resources for smarter and sustainable infrastructure",
      showNewsletter: false,
    },
    "/resources": {
      title: "NEWS & EVENTS",
      description: "CubeHighways Sets a New Record in Highway Construction",
      showNewsletter: true,
    },
    "/resources/:id": {
      title: "Explore more",
      description:
        "Technology Behind Traffic Monitoring – A deep dive into ATCC, video-based counting, and AI vision solutions.",
      showNewsletter: false,
    },
    default: {
      title: "CUBE HIGHWAYS",
      description: "",
      showNewsletter: false,
    },
  };

  // Ensure the key exists in panelConfig, otherwise use default
  const configKey = pathname in panelConfig ? pathname : "default";
  const config = panelConfig[configKey];

  const resources = [
    {
      category: "NEWS",
      title: "CubeHighways Sets a New Record in Highway Construction",
      date: "11/02/2023",
      description:
        "CubeHighways achieved a world record by completing 112.5 lane-km of bituminous concrete paving in just 100 hours.",
      image: "/long-highway2.webp",
      link: "/resources/cubehighways-record",
      categoryColor: "",
    },
    {
      category: "",
      title: "Smart Surveillance System Deployed for Road Safety",
      date: "11/03/2023",
      description:
        "CubeHighways enhances highway safety with AI-powered CCTV and automated incident detection.",
      image: "/long-highway3.webp",
      link: "/resources/smart-surveillance",
      categoryColor: "",
    },
  ];

  return (
    <section className="w-full  md:mb-34">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {/* Left panel with background image and heading */}
        <LeftPanel
          title={config.title} // Dynamically set title
          description={config.description}
          backgroundImage="/aerial-above-view.webp"
          showNewsletter={config.showNewsletter}
        />

        {/* Right panel with resource cards */}
        <div className="col-span-1 md:col-span-2 p-4 md:p-12 bg-[#F6F6F6] grid grid-cols-1 md:grid-cols-2 gap-12">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`w-full ${index > 0 ? "hidden md:block" : ""}`}
            >
              <ResourceCard {...resource} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
