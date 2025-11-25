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

// About-Us Page Types
export interface Media {
  id: string;
  url: string;
  alt?: string;
  filename: string;
}

export interface AboutHeroSection {
  blockType: "aboutHeroSection";
  heading?: string;
  subheading?: string;
  backgroundImage?: Media;
}

export interface LeaderCard {
  name: string;
  designation: string;
  image?: Media;
  bio?: string;
  linkedIn?: string;
}

export interface LeadershipSection {
  blockType: "leadershipSection";
  title?: string;
  description?: string;
  leaders: LeaderCard[];
}

export interface TimelineItemType {
  year?: string;
  side?: "left" | "right";
  title?: string;
  content?: string;
  isPodcast?: boolean;
  podcastImage?: Media;
  podcastContent?: string;
  podcastLink?: string;
  isIconOnly?: boolean;
  iconType?: number;
}

export interface TimelineSection {
  blockType: "timelineSection";
  title?: string;
  heading?: string;
  timelineItems: TimelineItemType[];
}

export interface CorporateResponsibilitySection {
  blockType: "corporateResponsibilitySection";
  mainHeading?: string;
  subheading?: string;
  title?: string;
  description?: string;
  tags?: string[];
  backgroundImage?: Media;
}

export interface Stat {
  id: string;
  value: number;
  label: string;
  hasIcon?: boolean;
  icon?: string;
  order?: number;
}

export interface StatsSection {
  blockType: "statsSection";
  title?: string;
  stats: Stat[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  avatar?: Media;
  position?: string;
  rating?: number;
  order: number;
  active: boolean;
}

export interface TestimonialsSection {
  blockType: "testimonialsSection";
  title?: string;
  testimonials: Testimonial[];
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
