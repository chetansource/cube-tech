// /utils/routes/career.ts

import { GraphQLClient, gql } from "graphql-request";
import type { PageResponse } from "../types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

// Log the API URL being used (helps debug EC2 vs localhost)
if (typeof window === 'undefined') {
  console.log('🌐 Careers GraphQL API URL (Server):', baseUrl);
} else {
  console.log('🌐 Careers GraphQL API URL (Client):', baseUrl);
}

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
  try {
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

    console.log('🔍 getCareerPageContent: GraphQL Response received');
    console.log('📊 Jobs from GraphQL:', data.Jobs?.docs?.length || 0);

    const page = data.Pages.docs[0];

    if (!page || !page.sections) {
      console.warn('⚠️ getCareerPageContent: No page or sections found');
      return {
        careerHeading: null,
        jobList: [],
        heroSection: null,
        exploreCards: []
      };
    }

    const careerHeading = page.sections.find(
      (section: any) => section.blockType === "careerTitle"
    ) as CareerPageSection | undefined;

    // Get jobs directly from Jobs query, not from page sections
    const jobList = data.Jobs?.docs || [];
    console.log('✅ getCareerPageContent: Returning jobs:', jobList.length);

    const heroSection = page.sections.find(
      (section: any) => section.blockType === "heroSection"
    ) as HeroSection | undefined;

    const exploreCardsSection = page.sections.find(
      (section: any) => section.blockType === "exploreCardsSection"
    ) as ExploreCardsSection | undefined;

    // Don't sort - order field is used for layout position (1-9), not sequence
    const exploreCards = exploreCardsSection?.cards || [];

    return { careerHeading, jobList, heroSection, exploreCards };
  } catch (error) {
    console.error('❌ getCareerPageContent: Error fetching career page:', error);
    return {
      careerHeading: null,
      jobList: [],
      heroSection: null,
      exploreCards: []
    };
  }
};
