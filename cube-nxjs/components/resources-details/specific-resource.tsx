import Image from "next/image";
import { Download } from "lucide-react";
import { Resource } from "@/utils/routes/Resources";

interface SpecificResourceProps {
  resource: Resource;
}

export default function SpecificResource({ resource }: SpecificResourceProps) {
  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const displayDate = formatDate(resource.publishedAt || resource.date);

  // Split title for styling (you can customize this logic based on your needs)
  const titleParts = resource.title.split(' ');
  const lastWord = titleParts.pop() || '';
  const restOfTitle = titleParts.join(' ');

  return (
    <div className="max-w-8xl mx-auto px-4 md:px-16 bg-white mb-22">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="pr-4">
          <h1 className="text-2xl md:text-[46px] font-light leading-[67px] tracking-[3.75px] text-black">
            {restOfTitle}
            {restOfTitle && <br />}
            <span className="text-accent italic font-semibold">{lastWord}</span>
          </h1>

          {displayDate && (
            <p className="text-[#404040]/50 text-lg mt-6">
              Posted Date: {displayDate}
            </p>
          )}

          <button className="mt-6 bg-accent text-white px-6 py-3 flex items-center text-xs uppercase font-bold  gap-8">
            <span>DOWNLOAD</span>
            <Download className=" h-4 w-4" />
          </button>
        </div>

        {/* Right Column */}
        <div>
          <div className="flex flex-col">
            <h2 className="text-8xl font-light text-gray-100">01.</h2>

            <div className="grid md:grid-cols-2 gap-4 mt-4 ">
              {resource.companyName && (
                <div>
                  <h3 className="text-lg text-black md:leading-[55px] md:tracking-[0.75px] py-4 md:py-0 ">
                    Company Name
                  </h3>
                  <p className="text-base text-black/60 md:leading-[28px] md:tracking-[0.25px]">
                    {resource.companyName}
                  </p>
                </div>
              )}

              {resource.duration && (
                <div>
                  <h3 className="text-lg text-black md:leading-[55px] md:tracking-[0.75px] py-4 md:py-0">
                    Duration
                  </h3>
                  <p className="text-base text-black/60 md:leading-[28px] md:tracking-[0.25px]">
                    {resource.duration}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-black/50 mt-6 leading-[31px]">
              {resource.description}
            </p>

            {/* Resource Image */}
            {resource.image?.url && (
              <div className="mt-6 relative">
                <Image
                  src={resource.image.url}
                  alt={resource.image.alt || resource.title}
                  width={619}
                  height={464}
                  className="w-full rounded-md object-cover"
                />
                {resource.image.alt && (
                  <p className="text-xs text-gray-500 text-right mt-1">
                    {resource.image.alt}
                  </p>
                )}
              </div>
            )}

            {/* Full Content - rendered as HTML */}
            {resource.content && (
              <div
                className="text-sm md:text-base text-black/50 mt-6 leading-[28px] prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: resource.content }}
              />
            )}

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-1 border-[#90BD3D] -ml-20"></div>
    </div>
  );
}
