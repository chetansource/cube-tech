'use client';
import React,{useState,useEffect} from "react";
import { MapPin } from "lucide-react";
import RightArrowIcon from "./icons/right-arrow";
import { getCareerPageContent, Job } from "@/utils/routes/Careers";
import { useRouter } from "next/navigation";

interface CareerHeading {
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export default function CareerOpportunities() {
  const [careerHeading, setCareerHeading] = useState<CareerHeading | null>(
    null
  );
  const [jobList, setJobList] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { careerHeading, jobList } = await getCareerPageContent("careerpage");
      setCareerHeading(careerHeading ?? null);
      setJobList(jobList);
    };

    fetchData();
  }, []);


  return (
    <div className="min-h-screen bg-white pb-18 px-4 md:px-16 ">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column - 35% */}
        <div className="md:w-[43%] space-y-6">
          <h1 className="text-2xl md:text-[32px] font-bold md:leading-[40px] md:tracking-[3.75px]">
            <span className="font-light text-black">
              {careerHeading?.headingLine1 || "CAREER "}{" "}
            </span>
            <span className=" font-medium text-accent italic">
              {careerHeading?.headingLine2 || "OPPORTUNITIES"}
            </span>
          </h1>

          <p className="md:w-[70%] text-sm text-[#404040] leading-[20px]">
            {careerHeading?.description ||
              "Grow your career with opportunities in research, data analytics, and infrastructure development."}
          </p>

          <div className="pt-4">
            <button className="flex text-base font-bold items-center text-accent gap-8">
              READ MORE
              <RightArrowIcon color="#5FBA51" />
            </button>
          </div>
        </div>

        {/* Right Column - 65% */}
        <div className="md:w-[65%] space-y-6">
          {jobList.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm"
            >
              <div className="px-6 py-3">
                <h2 className="text-3xl font-light text-black leading-[45px] mb-2 ">
                  {job.title}
                </h2>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-xl font-light text-[#2E2C2C]  leading-[30px]">
                    {job.location}
                  </span>
                </div>
              </div>

              <p className=" pl-[100px] md:pl-[220px] text-base font-['Glacier_Indifference']  text-[#484848] mb-6 leading-[24px]  line-clamp-4">
                {job.description}
              </p>

              <button
                onClick={() => router.push(`/careers/details/${job.id}`)}
                className="ml-[100px] md:ml-[220px] bg-accent hover:bg-green-600 text-white p-2 md:px-6 md:py-2 uppercase text-sm font-medium transition-colors cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
