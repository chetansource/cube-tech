import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

// TypeScript interfaces for Resources Page sections
export interface ResourcesHeroSection {
  blockType: 'resourcesHeroSection';
  heroTitle: string;
  heroTitleItalic: string;
  heroBackgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface InsightsImpactSection {
  blockType: 'insightsImpactSection';
  insightsHeading: string;
  insightsSubheading: string;
  insightsDescription: string;
  impactHighlightWord?: string;
  insightsBackgroundImage?: {
    url: string;
    alt?: string;
  };
  businessHeading?: string;
  businessHeadingItalic?: string;
  planetHeading?: string;
  planetHeadingItalic?: string;
  businessDescription?: string;
  exploreServicesButtonText?: string;
}

export interface ResourceGallerySection {
  blockType: 'resourceGallerySection';
  galleryBackgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface ExploreMoreSection {
  blockType: 'exploreMoreSection';
  exploreMoreTitle: string;
  exploreMoreDescription: string;
  exploreMoreBackgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface ResourcesPageContent {
  heroSection?: ResourcesHeroSection;
  insightsSection?: InsightsImpactSection;
  gallerySection?: ResourceGallerySection;
  exploreMoreSection?: ExploreMoreSection;
}

/**
 * Fetch Resources page content from CMS
 */
export async function getResourcesPageContent(slug: string = 'resources'): Promise<ResourcesPageContent> {
  const query = gql`
    query GetResourcesPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on ResourcesHeroSection {
              blockType
              heroTitle
              heroTitleItalic
              heroBackgroundImage {
                url
                alt
              }
            }
            ... on InsightsImpactSection {
              blockType
              insightsHeading
              insightsSubheading
              insightsDescription
              impactHighlightWord
              insightsBackgroundImage {
                url
                alt
              }
              businessHeading
              businessHeadingItalic
              planetHeading
              planetHeadingItalic
              businessDescription
              exploreServicesButtonText
            }
            ... on ResourceGallerySection {
              blockType
              galleryBackgroundImage {
                url
                alt
              }
            }
            ... on ExploreMoreSection {
              blockType
              exploreMoreTitle
              exploreMoreDescription
              exploreMoreBackgroundImage {
                url
                alt
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { slug });
    const page = data.Pages.docs[0];

    if (!page) {
      console.warn(`Resources page with slug "${slug}" not found`);
      return {};
    }

    const sections = page.sections || [];

    // Extract specific sections
    const heroSection = sections.find((s: any) => s.blockType === 'resourcesHeroSection') as ResourcesHeroSection;
    const insightsSection = sections.find((s: any) => s.blockType === 'insightsImpactSection') as InsightsImpactSection;
    const gallerySection = sections.find((s: any) => s.blockType === 'resourceGallerySection') as ResourceGallerySection;
    const exploreMoreSection = sections.find((s: any) => s.blockType === 'exploreMoreSection') as ExploreMoreSection;

    return {
      heroSection,
      insightsSection,
      gallerySection,
      exploreMoreSection,
    };
  } catch (error) {
    console.error('Error fetching resources page content:', error);
    return {};
  }
}
