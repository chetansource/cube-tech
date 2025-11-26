import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

// Type Definitions for Services Page
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: {
    url: string;
    alt?: string;
  };
  features?: string[];
  order: number;
  link?: string;
  active: boolean;
}

export interface PopularSearch {
  id: string;
  term: string;
  order: number;
  active: boolean;
}

export interface MapProject {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  mapPosition?: {
    x: number;
    y: number;
  };
  showOnMap: boolean;
}

export interface ServicesHeroSection {
  blockType: "servicesHeroSection";
  heading: string;
  highlightedWord?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  featuredResources?: {
    id: string;
    title: string;
    slug: string;
    image?: {
      url: string;
      alt?: string;
    };
  }[];
}

export interface ServiceSolution {
  id: string;
  idString: string;
  title: string;
  description: string;
  order: number;
  projects?: {
    id: string;
    title: string;
    slug: string;
    mainImage?: {
      url: string;
      alt?: string;
    };
  }[];
}

export interface ServicesSolutionsSection {
  blockType: "servicesSolutionsSection";
  heading?: string;
  highlightedWord?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  solutions?: ServiceSolution[];
}

export interface ServicesOfferedSection {
  blockType: "servicesOfferedSection";
  heading?: string;
  highlightedWord?: string;
  description?: string;
  bannerImage?: {
    url: string;
    alt?: string;
  };
}

export interface ContactBannerSection {
  blockType: "contactBannerSection";
  heading?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface ProjectMapSection {
  blockType: "projectMapSection";
  title?: string;
  highlightedWord?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ServicesPageData {
  heroSection?: ServicesHeroSection;
  servicesOfferedSection?: ServicesOfferedSection;
  solutionsSection?: ServicesSolutionsSection;
  contactBannerSection?: ContactBannerSection;
  projectMapSection?: ProjectMapSection;
}

/**
 * Fetch services page content by slug
 */
export async function getServicesPageContent(slug: string = "services"): Promise<ServicesPageData> {
  const query = gql`
    query GetServicesPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on ServicesHeroSection {
              blockType
              heading
              highlightedWord
              backgroundImage {
                url
                alt
                filename
              }
              featuredResources {
                id
                title
                slug
                image {
                  url
                  alt
                }
              }
            }
            ... on ServicesOfferedSection {
              blockType
              heading
              highlightedWord
              description
              bannerImage {
                url
                alt
              }
            }
            ... on ServicesSolutionsSection {
              blockType
              heading
              highlightedWord
              description
              ctaText
              ctaLink
              backgroundImage {
                url
                alt
              }
              solutions {
                id
                idString
                title
                description
                order
                projects {
                  id
                  title
                  slug
                  mainImage {
                    url
                    alt
                  }
                }
              }
            }
            ... on ContactBannerSection {
              blockType
              heading
              ctaText
              ctaLink
              backgroundImage {
                url
                alt
              }
            }
            ... on ProjectMapSection {
              blockType
              title
              highlightedWord
              description
              ctaText
              ctaLink
            }
          }
        }
      }
    }
  `;

  const variables = { slug };

  try {
    const data: any = await graphQLClient.request(query, variables);
    const page = data.Pages?.docs?.[0];

    if (!page || !page.sections) {
      return {
        heroSection: undefined,
        servicesOfferedSection: undefined,
        solutionsSection: undefined,
        contactBannerSection: undefined,
      };
    }

    const heroSection = page.sections.find(
      (section: any) => section.blockType === "servicesHeroSection"
    ) as ServicesHeroSection | undefined;

    const servicesOfferedSection = page.sections.find(
      (section: any) => section.blockType === "servicesOfferedSection"
    ) as ServicesOfferedSection | undefined;

    const solutionsSection = page.sections.find(
      (section: any) => section.blockType === "servicesSolutionsSection"
    ) as ServicesSolutionsSection | undefined;

    const contactBannerSection = page.sections.find(
      (section: any) => section.blockType === "contactBannerSection"
    ) as ContactBannerSection | undefined;

    const projectMapSection = page.sections.find(
      (section: any) => section.blockType === "projectMapSection"
    ) as ProjectMapSection | undefined;

    return {
      heroSection,
      servicesOfferedSection,
      solutionsSection,
      contactBannerSection,
      projectMapSection,
    };
  } catch (error) {
    console.error("Error fetching services page data:", error);
    return {
      heroSection: undefined,
      servicesOfferedSection: undefined,
      solutionsSection: undefined,
      contactBannerSection: undefined,
      projectMapSection: undefined,
    };
  }
}

/**
 * Fetch services directly from Services collection
 */
export async function getServices(limit: number = 10): Promise<Service[]> {
  const query = gql`
    query GetServices {
      Services {
        id
        title
        description
        icon
        image {
          url
          alt
        }
        features
        order
        link
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const services = (data.Services || [])
      .filter((s: Service) => s.active)
      .sort((a: Service, b: Service) => a.order - b.order)
      .slice(0, limit);
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Fetch popular searches
 */
export async function getPopularSearches(limit: number = 20): Promise<PopularSearch[]> {
  const query = gql`
    query GetPopularSearches {
      PopularSearches(limit: ${limit}) {
        id
        term
        order
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const searches = (data.PopularSearches || [])
      .filter((s: PopularSearch) => s.active)
      .sort((a: PopularSearch, b: PopularSearch) => a.order - b.order);
    return searches;
  } catch (error) {
    console.error("Error fetching popular searches:", error);
    return [];
  }
}

/**
 * Fetch projects for map display
 */
export async function getMapProjects(): Promise<MapProject[]> {
  const query = gql`
    query GetMapProjects {
      Projects(where: { status: { equals: "published" } }, limit: 50) {
        docs {
          id
          title
          slug
          shortDescription
          mainImage {
            url
            alt
          }
          mapPosition {
            x
            y
          }
          showOnMap
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const projects = (data.Projects?.docs || [])
      .filter((p: MapProject) => p.showOnMap && p.mapPosition?.x && p.mapPosition?.y);
    return projects;
  } catch (error) {
    console.error("Error fetching map projects:", error);
    return [];
  }
}
