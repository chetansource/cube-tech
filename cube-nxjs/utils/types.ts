export type Faq = {
    question: string;
    answer: string;
  };

export interface FaqSection {
  blockType: "faqSection";
  faqs: Faq[];
}

export interface ContactSection {
  blockType: "contact-info";
  phone: string;
  email: string;
  locations: { label: string; address: string }[];
  socials: { platform: string; url: string }[];
}

export type PageResponse<T> = {
  Pages: {
    docs: {
      id: string;
      title: string;
      slug: string;
      sections: T[];
    }[];
  };
};
