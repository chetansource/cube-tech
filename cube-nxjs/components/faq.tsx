"use client"

import { useState,useEffect } from "react"
import type { Faq } from "@/utils/types";
import RightArrowIcon from "./icons/right-arrow"
import { getFaqs } from "@/utils/routes/faq";

// Fallback FAQs if backend data doesn't load
const fallbackFaqs: Faq[] = [
  {
    question: "What services does CubeHighways offer?",
    answer: "CubeHighways provides comprehensive highway infrastructure solutions including AI-powered traffic monitoring, smart pavement management, automated incident detection, and sustainable construction practices."
  },
  {
    question: "How does CubeHighways use AI in traffic management?",
    answer: "We integrate advanced AI-driven solutions for real-time traffic monitoring, predictive maintenance, and automated incident detection to enhance highway safety and efficiency."
  },
  {
    question: "What makes CubeHighways different from other infrastructure companies?",
    answer: "We combine cutting-edge technology with sustainable practices, offering innovative solutions like IoT-enabled pavement monitoring, AI-powered traffic systems, and eco-friendly construction methods."
  },
  {
    question: "Does CubeHighways work on existing highways or only new projects?",
    answer: "We work on both new highway construction projects and enhancement of existing infrastructure, including retrofitting smart technology systems on operational highways."
  },
  {
    question: "How can I get in touch with CubeHighways for a project inquiry?",
    answer: "You can reach us through our contact page, email us directly, or call our office. Our team will respond within 24-48 hours to discuss your project requirements."
  }
];

interface FaqProps {
  items?: Faq[];
  slug?: string;
}

export default function Faq({ items, slug = "homepage" }: FaqProps = {}) {
  const [faqs, setFaqs] = useState<Faq[]>(items && items.length > 0 ? items : fallbackFaqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    // If items are passed as props, use them directly
    if (items && items.length > 0) {
      setFaqs(items);
      return;
    }

    const fetchData = async () => {
      try {
        const faqData = await getFaqs(slug);
        if (faqData && faqData.length > 0) {
          setFaqs(faqData);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchData();
  }, [items, slug]);


  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="md:py-16 md:pt-24 bg-white">
      <div className="container mx-auto px-6 md:px-24">
        <div className=" mb-6 md:mb-12 leading-[67px] tracking-[3.75px] uppercase">
          <div className="text-[23px] md:text-[46px] font-light mb-2">
            YOUR QUESTIONS,{" "}
            <span className="font-semibold text-accent italic">ANSWERED</span>
          </div>
        </div>

        <div className="max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-[#E3E3E3]">
              <button
                onClick={() => toggleFaq(index)}
                className={`flex justify-between items-center w-full text-left p-4 bg-white 
                  border-b-1 md:border-none  duration-200 cursor-pointer 
                  ${
                    openIndex === index ? "border-accent" : "border-[#E3E3E3]"
                  }`}
              >
                <span className="font-normal text-base md:text-lg leading-[37px] tracking-wider text-black" dangerouslySetInnerHTML={{ __html: faq.question || '' }} />
                <RightArrowIcon
                  color={openIndex === index ? "#5FBA51" : "#E3E3E3"}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className={`p-4 bg-white font-['Glacier_Indifference'] ${openIndex === index ? 'border-b border-accent' : ''}`}>
                    <p className="text-base md:text-lg leading-[24px] tracking-[0.25px] text-black/60" dangerouslySetInnerHTML={{ __html: faq.answer || '' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
