import { getCareerPageContent } from "@/utils/routes/Careers";
import { notFound } from "next/navigation";
import { JobDescription } from "@/components/career-details/job-description";
import ResumeUpload from "@/components/resume-upload";
import Header from "@/components/header";
import PolygonIcon from "@/components/icons/polygon";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}


export default async function CareerDetailPage({ params }: Props) {
  const { id } = await params;

  const { jobList } = await getCareerPageContent("careerpage");
  const job = jobList.find((j) => String(j.id) === id);

  if (!job) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      {/* banner */}
      <section className="relative w-full bg-white mb-15 md:mb-[97px] overflow-hidden h-[527px]">
        <div className="absolute top-0 bottom-0 left-0 right-0 md:right-[57px] z-0">
          <Image
            src="/careerPage-banner.webp"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 md:right-[57px] bg-black/10 z-10" />
        <div className="relative z-20 container md:left-[57px] px-2 md:px-4 pt-60 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <div className="text-white text-[52px] md:text-[75px] font-light leading-[78px] md:leading-[90px] uppercase">
              JOIN OUR TEAM
            </div>
            <div className="text-white text-[52px] md:text-[75px] font-semibold mb-12 leading-[90px] uppercase italic">
              TODAY
            </div>
          </div>
        </div>
        <div className="absolute -bottom-px right-0 z-20 md:w-31 pointer-events-none">
          <PolygonIcon />
        </div>
      </section>

      <JobDescription
        title={job.title}
        location={job.location}
        description={job.description.split("\n")}
      />

      <ResumeUpload />
    </div>
  );
}
