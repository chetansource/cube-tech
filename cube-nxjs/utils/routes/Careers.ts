// /utils/routes/career.ts

import { GraphQLClient, gql } from "graphql-request";
import type { PageResponse } from "../types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
}

export interface CareerPageSection {
  blockType: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export interface JobListSection {
  blockType: string;
}

export interface HeroSection {
  blockType: string;
  heading?: string;
  subheading?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface ExploreCard {
  title: string;
  content: string;
  date?: string;
  cardType: 'text' | 'featured' | 'image';
  bgColor?: string;
  textColor?: string;
  image?: {
    url: string;
    alt?: string;
  };
  order?: number;
}

export interface ExploreCardsSection {
  blockType: string;
  cards: ExploreCard[];
}

interface CareerPageResponse {
  sections: (CareerPageSection | JobListSection | HeroSection | ExploreCardsSection)[];
}

export const getCareerPageContent = async (slug: string) => {
  const query = gql`
    query GetCareerPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on CareerTitle {
              blockType
              headingLine1
              headingLine2
              description
            }
            ... on JobListSection {
              blockType
            }
            ... on HeroSection {
              blockType
              heading
              subheading
              backgroundImage {
                url
                alt
              }
            }
            ... on ExploreCardsSection {
              blockType
              cards {
                title
                content
                date
                cardType
                bgColor
                textColor
                image {
                  url
                  alt
                }
                order
              }
            }
          }
        }
      }
      Jobs(where: { status: { equals: "active" } }, limit: 100) {
        docs {
          id
          title
          location
          description
        }
      }
    }
  `;

  const variables = { slug };

  const data = await graphQLClient.request<PageResponse<CareerPageResponse> & { Jobs: { docs: Job[] } }>(
    query,
    variables
  );

  const page = data.Pages.docs[0];

  if (!page || !page.sections) return {
    careerHeading: null,
    jobList: [],
    heroSection: null,
    exploreCards: []
  };

  const careerHeading = page.sections.find(
    (section: any) => section.blockType === "careerTitle"
  ) as CareerPageSection | undefined;

  // Get jobs directly from Jobs query, not from page sections
  const jobList = data.Jobs?.docs || [];

  const heroSection = page.sections.find(
    (section: any) => section.blockType === "heroSection"
  ) as HeroSection | undefined;

  const exploreCardsSection = page.sections.find(
    (section: any) => section.blockType === "exploreCardsSection"
  ) as ExploreCardsSection | undefined;

  // Don't sort - order field is used for layout position (1-9), not sequence
  const exploreCards = exploreCardsSection?.cards || [];

  return { careerHeading, jobList, heroSection, exploreCards };
};
