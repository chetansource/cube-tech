import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { getPageBySlug } from "@/utils/routes/Pages";

export const revalidate = 5;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("privacy-policy");
  if (!page) return { title: "Privacy Policy" };

  return {
    title: page.seo?.title || page.title || "Privacy Policy",
    description: page.seo?.description || "",
    keywords: page.seo?.keywords || "",
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy");

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full mb-[60px] md:mb-[97px] h-[350px] md:h-[500px] bg-[#1a2e35]">
        <div className="relative z-10 container mx-auto px-4 md:px-16 h-full flex items-end pb-12 md:pb-20">
          <h1 className="text-white text-[36px] md:text-[75px] font-light leading-tight">
            {page.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-16 py-12 md:py-20">
        {page.sections.map((section, index) => {
          if (section.blockType === "richTextSection") {
            return (
              <div key={index} className="mb-12">
                {section.title && (
                  <h2 className="text-2xl md:text-3xl font-light text-black mb-6">
                    {section.title}
                  </h2>
                )}
                {section.content && (
                  <div
                    className="prose prose-lg max-w-none text-[#404040] leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: section.content
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&amp;/g, "&"),
                    }}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      </section>
    </div>
  );
}
