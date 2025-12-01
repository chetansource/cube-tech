import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

// Type Definitions
export interface Partner {
  id: string;
  name: string;
  logo: {
    url: string;
    alt?: string;
  };
  website?: string;
  order: number;
  active: boolean;
}

export interface Solution {
  id: string;
  idString: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt?: string;
  };
  order: number;
  active: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: {
    url: string;
    alt?: string;
  };
  image?: {
    url: string;
    alt?: string;
  };
  features?: string[];
  order: number;
  link?: string;
  active: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  studyType?: string;
  date?: string;
  shortDescription?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
  category?: string;
  client?: string;
  featured: boolean;
  status: string;
}

export interface Stat {
  id: string;
  value: number;
  label: string;
  hasIcon: boolean;
  icon?: string;
  order: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  position?: string;
  rating?: number;
  avatar?: {
    url: string;
    alt?: string;
  };
  order: number;
  active: boolean;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  image?: {
    url: string;
    alt?: string;
  };
  category?: string;
  tags?: string[];
  date?: string;
  featured: boolean;
}

export interface HeroSection {
  blockType: "heroSection";
  heading: string;
  subheading?: string;
  description?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  ctaText?: string;
  ctaLink?: string;
}

export interface SolutionsSection {
  blockType: "solutionsSection";
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  heading?: string;
  highlightedWord?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ServicesSection {
  blockType: "servicesSection";
  image?: {
    url: string;
    alt?: string;
  };
  title?: string;
  description?: string;
  content?: string;
}

export interface RDSection {
  blockType: "exploreMoreSection";
  exploreMoreTitle?: string;
  exploreMoreDescription?: string;
  exploreMoreBackgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface HomepageData {
  hero?: HeroSection;
  solutionsSection?: SolutionsSection;
  servicesSection?: ServicesSection;
  rdSection?: RDSection;
  partners: Partner[];
  solutions: Solution[];
  services: Service[];
  projects: Project[];
  stats: Stat[];
  testimonials: Testimonial[];
  featuredResources: Resource[];
}

/**
 * Fetch partners
 */
export async function getPartners(limit: number = 20): Promise<Partner[]> {
  const query = gql`
    query GetPartners {
      Partners {
        id
        name
        logo {
          url
          alt
        }
        website
        order
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    // Filter active partners and sort by order
    const partners = (data.Partners || [])
      .filter((p: Partner) => p.active)
      .sort((a: Partner, b: Partner) => a.order - b.order)
      .slice(0, limit);
    return partners;
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

/**
 * Fetch solutions
 */
export async function getSolutions(limit: number = 10): Promise<Solution[]> {
  const query = gql`
    query GetSolutions {
      Solutions {
        id
        idString
        title
        description
        image {
          url
          alt
        }
        order
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const solutions = (data.Solutions || [])
      .filter((s: Solution) => s.active)
      .sort((a: Solution, b: Solution) => a.order - b.order)
      .slice(0, limit);
    return solutions;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return [];
  }
}

/**
 * Fetch services
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
 * Fetch featured projects
 */
export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  const query = gql`
    query GetFeaturedProjects {
      Projects {
        docs {
          id
          title
          slug
          location
          studyType
          date
          shortDescription
          mainImage {
            url
            alt
          }
          tags
          category
          client
          featured
          status
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const projects = (data.Projects?.docs || [])
      .filter((p: Project) => p.featured && p.status === "published")
      .sort((a: Project, b: Project) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
    return projects;
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

/**
 * Fetch stats
 */
export async function getStats(limit: number = 10): Promise<Stat[]> {
  const query = gql`
    query GetStats {
      Stats {
        id
        value
        label
        hasIcon
        icon
        order
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const stats = (data.Stats || [])
      .filter((s: Stat) => s.active)
      .sort((a: Stat, b: Stat) => a.order - b.order)
      .slice(0, limit);
    return stats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
}

/**
 * Fetch testimonials
 */
export async function getTestimonials(limit: number = 10): Promise<Testimonial[]> {
  const query = gql`
    query GetTestimonials {
      Testimonials {
        id
        quote
        author
        company
        position
        rating
        avatar {
          url
          alt
        }
        order
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const testimonials = (data.Testimonials || [])
      .filter((t: Testimonial) => t.active)
      .sort((a: Testimonial, b: Testimonial) => a.order - b.order)
      .slice(0, limit);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

/**
 * Fetch featured resources
 */
export async function getFeaturedResources(limit: number = 2): Promise<Resource[]> {
  const query = gql`
    query GetFeaturedResources {
      Resources {
        docs {
          id
          title
          slug
          description
          image {
            url
            alt
          }
          category
          tags
          date
          featured
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const resources = (data.Resources?.docs || [])
      .filter((r: Resource) => r.featured)
      .sort((a: Resource, b: Resource) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
    return resources;
  } catch (error) {
    console.error("Error fetching featured resources:", error);
    return [];
  }
}

/**
 * Fetch hero section from homepage page
 */
export async function getHeroSection(): Promise<HeroSection | null> {
  const query = gql`
    query GetHomepageHero {
      Pages(where: { slug: { equals: "homepage" } }, limit: 1) {
        docs {
          sections {
            ... on HeroSection {
              blockType
              heading
              subheading
              description
              backgroundImage {
                url
                alt
              }
              ctaText
              ctaLink
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const page = data.Pages?.docs?.[0];
    if (page?.sections) {
      const heroSection = page.sections.find(
        (section: any) => section.blockType === "heroSection"
      );
      return heroSection || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return null;
  }
}

/**
 * Fetch solutions section from homepage page
 */
export async function getSolutionsSection(): Promise<SolutionsSection | null> {
  const query = gql`
    query GetHomepageSolutions {
      Pages(where: { slug: { equals: "homepage" } }, limit: 1) {
        docs {
          sections {
            ... on ServicesSolutionsSection {
              blockType
              backgroundImage {
                url
                alt
              }
              heading
              highlightedWord
              ctaText
              ctaLink
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const page = data.Pages?.docs?.[0];
    if (page?.sections) {
      const solutionsSection = page.sections.find(
        (section: any) => section.blockType === "servicesSolutionsSection"
      );
      return solutionsSection || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching solutions section:", error);
    return null;
  }
}

/**
 * Fetch services section from homepage page
 */
export async function getServicesSection(): Promise<ServicesSection | null> {
  const query = gql`
    query GetHomepageServices {
      Pages(where: { slug: { equals: "homepage" } }, limit: 1) {
        docs {
          sections {
            ... on GenericSection {
              blockType
              title
              description
              content
              image {
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
    const data: any = await graphQLClient.request(query);
    const page = data.Pages?.docs?.[0];
    if (page?.sections) {
      const servicesSection = page.sections.find(
        (section: any) => section.blockType === "servicesSection"
      );
      return servicesSection || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching services section:", error);
    return null;
  }
}

/**
 * Fetch R&D section from homepage page
 */
export async function getRDSection(): Promise<RDSection | null> {
  const query = gql`
    query GetHomepageRD {
      Pages(where: { slug: { equals: "homepage" } }, limit: 1) {
        docs {
          sections {
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
    const data: any = await graphQLClient.request(query);
    const page = data.Pages?.docs?.[0];
    if (page?.sections) {
      const rdSection = page.sections.find(
        (section: any) => section.blockType === "exploreMoreSection"
      );
      return rdSection || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching R&D section:", error);
    return null;
  }
}

/**
 * Fetch all homepage data in one call
 */
export async function getHomepageData(): Promise<HomepageData> {
  try {
    const [
      hero,
      solutionsSection,
      servicesSection,
      rdSection,
      partners,
      solutions,
      services,
      projects,
      stats,
      testimonials,
      featuredResources,
    ] = await Promise.all([
      getHeroSection(),
      getSolutionsSection(),
      getServicesSection(),
      getRDSection(),
      getPartners(),
      getSolutions(),
      getServices(),
      getFeaturedProjects(),
      getStats(),
      getTestimonials(),
      getFeaturedResources(),
    ]);

    return {
      hero: hero || undefined,
      solutionsSection: solutionsSection || undefined,
      servicesSection: servicesSection || undefined,
      rdSection: rdSection || undefined,
      partners,
      solutions,
      services,
      projects,
      stats,
      testimonials,
      featuredResources,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      partners: [],
      solutions: [],
      services: [],
      projects: [],
      stats: [],
      testimonials: [],
      featuredResources: [],
    };
  }
}
