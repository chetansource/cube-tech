import { GraphQLClient, gql } from "graphql-request";
import type {
  PageResponse,
  AboutHeroSection,
  LeadershipSection,
  TimelineSection,
  CorporateResponsibilitySection,
  StatsSection,
  TestimonialsSection
} from "../types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

interface AboutPageResponse {
  sections: (
    | AboutHeroSection
    | LeadershipSection
    | TimelineSection
    | CorporateResponsibilitySection
    | StatsSection
    | TestimonialsSection
  )[];
}

export const getAboutPageContent = async (slug: string) => {
  const query = gql`
    query GetAboutPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on AboutHeroSection {
              blockType
              heading
              subheading
              backgroundImage {
                url
                alt
                filename
              }
            }
            ... on TimelineSection {
              blockType
              title
              heading
              timelineItems {
                year
                side
                title
                content
                isPodcast
                podcastImage {
                  url
                  alt
                  filename
                }
                podcastContent
                podcastLink
                isIconOnly
                iconType
              }
            }
            ... on LeadershipSection {
              blockType
              title
              description
              leaders {
                name
                designation
                image {
                  url
                  alt
                  filename
                }
                bio
                linkedIn
              }
            }
            ... on CorporateResponsibilitySection {
              blockType
              mainHeading
              subheading
              title
              description
              tags
              backgroundImage {
                url
                alt
                filename
              }
            }
            ... on StatsSection {
              blockType
              title
              stats {
                id
                value
                label
                hasIcon
                icon
                order
              }
            }
            ... on TestimonialsSection {
              blockType
              title
              testimonials {
                id
                quote
                author
                company
                avatar {
                  url
                  alt
                  filename
                }
                position
                rating
                order
                active
              }
            }
          }
        }
      }
    }
  `;

  const variables = { slug };

  const data = await graphQLClient.request<PageResponse<AboutPageResponse>>(
    query,
    variables
  );

  const page = data.Pages.docs[0];

  if (!page || !page.sections)
    return {
      heroSection: null,
      timelineSection: null,
      leadershipSection: null,
      corporateResponsibilitySection: null,
      statsSection: null,
      testimonialsSection: null,
    };

  const heroSection = page.sections.find(
    (section: any) => section.blockType === "aboutHeroSection"
  ) as AboutHeroSection | undefined;

  const timelineSection = page.sections.find(
    (section: any) => section.blockType === "timelineSection"
  ) as TimelineSection | undefined;

  const leadershipSection = page.sections.find(
    (section: any) => section.blockType === "leadershipSection"
  ) as LeadershipSection | undefined;

  const corporateResponsibilitySection = page.sections.find(
    (section: any) => section.blockType === "corporateResponsibilitySection"
  ) as CorporateResponsibilitySection | undefined;

  const statsSection = page.sections.find(
    (section: any) => section.blockType === "statsSection"
  ) as StatsSection | undefined;

  const testimonialsSection = page.sections.find(
    (section: any) => section.blockType === "testimonialsSection"
  ) as TestimonialsSection | undefined;

  return {
    heroSection,
    timelineSection,
    leadershipSection,
    corporateResponsibilitySection,
    statsSection,
    testimonialsSection,
  };
};
