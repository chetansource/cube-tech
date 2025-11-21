"use client"

import { useState,useEffect } from "react"
import type { Faq } from "@/utils/types";
import RightArrowIcon from "./icons/right-arrow"
import { getFaqs } from "@/utils/routes/faq";

export default function Faq() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
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
