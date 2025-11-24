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

export default function Faq() {
  const [faqs, setFaqs] = useState<Faq[]>(fallbackFaqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faqData = await getFaqs("homepage");
        if (faqData && faqData.length > 0) {
          setFaqs(faqData);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Keep fallback FAQs on error
      }
    };

    fetchData();
  }, []);


  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="md:py-16 md:pt-24 bg-white min-h-[948px] ">
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
                <span className="font-normal text-base md:text-lg leading-[37px] tracking-wider text-black  ">
                  {faq.question}
                </span>
                <RightArrowIcon
                  color={openIndex === index ? "#5FBA51" : "#E3E3E3"}
                />
              </button>

              {openIndex === index && (
                <div className="p-4 bg-white border-b border-accent font-['Glacier_Indifference'] ">
                  <p className="text-base md:text-lg leading-[24px] tracking-[0.25px] text-black/60">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
