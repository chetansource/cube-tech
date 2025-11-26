import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

// Type Definitions for Projects Page
export interface PolicyCard {
  title: string;
  description?: string;
  iconImage?: {
    url: string;
    alt?: string;
  };
}

export interface ProjectImpactMetric {
  label: string;
  value: string;
}

export interface ProjectImpact {
  title: string;
  description: string;
  metrics: ProjectImpactMetric[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  studyType?: string;
  date?: string;
  shortDescription?: string;
  description?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
  gallery?: {
    url: string;
    alt?: string;
  }[];
  tags?: string[];
  category?: string;
  client?: string;
  duration?: string;
  impact?: ProjectImpact;
  policyCards?: PolicyCard[];
  featured: boolean;
  mapPosition?: {
    x: number;
    y: number;
  };
  showOnMap: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsHeroSection {
  blockType: "projectsHeroSection";
  heading: string;
  highlightedWord?: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
}

export interface KeyProjectSection {
  blockType: "keyProjectSection";
  title?: string;
  highlightedText?: string;
  featuredProject?: Project;
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

export interface ProjectsPageData {
  heroSection?: ProjectsHeroSection;
  keyProjectSection?: KeyProjectSection;
  contactBannerSection?: ContactBannerSection;
  projectMapSection?: ProjectMapSection;
  allProjects: Project[];
}

/**
 * Fetch all projects with filtering and pagination
 */
export async function getProjects(
  limit: number = 50,
  page: number = 1,
  filters?: {
    featured?: boolean;
    status?: string;
    category?: string;
    tags?: string[];
  }
): Promise<{
  projects: Project[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  const whereClause: any = {};

  if (filters?.featured !== undefined) {
    whereClause.featured = { equals: filters.featured };
  }

  if (filters?.status) {
    whereClause.status = { equals: filters.status };
  } else {
    // Default to published projects only
    whereClause.status = { equals: "published" };
  }

  if (filters?.category) {
    whereClause.category = { equals: filters.category };
  }

  if (filters?.tags && filters.tags.length > 0) {
    whereClause.tags = { in: filters.tags };
  }

  const query = gql`
    query GetProjects($where: ProjectWhereInput, $limit: Int, $page: Int) {
      Projects(where: $where, limit: $limit, page: $page) {
        docs {
          id
          title
          slug
          location
          studyType
          date
          shortDescription
          description
          mainImage {
            url
            alt
          }
          gallery {
            url
            alt
          }
          tags
          category
          client
          duration
          impact {
            title
            description
            metrics {
              label
              value
            }
          }
          policyCards {
            title
            description
            iconImage {
              url
              alt
            }
          }
          featured
          mapPosition {
            x
            y
          }
          showOnMap
          status
          createdAt
          updatedAt
        }
        totalDocs
        totalPages
        page
        limit
      }
    }
  `;

  const variables = {
    where: whereClause,
    limit,
    page,
  };

  try {
    const data: any = await graphQLClient.request(query, variables);
    return {
      projects: data.Projects?.docs || [],
      totalDocs: data.Projects?.totalDocs || 0,
      totalPages: data.Projects?.totalPages || 0,
      page: data.Projects?.page || 1,
      limit: data.Projects?.limit || limit,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      projects: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      limit,
    };
  }
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = gql`
    query GetProjectBySlug($slug: String!) {
      Projects(where: { slug: { equals: $slug }, status: { equals: "published" } }, limit: 1) {
        docs {
          id
          title
          slug
          location
          studyType
          date
          shortDescription
          description
          mainImage {
            url
            alt
          }
          gallery {
            url
            alt
          }
          tags
          category
          client
          duration
          impact {
            title
            description
            metrics {
              label
              value
            }
          }
          policyCards {
            title
            description
            iconImage {
              url
              alt
            }
          }
          featured
          mapPosition {
            x
            y
          }
          showOnMap
          status
          createdAt
          updatedAt
        }
      }
    }
  `;

  const variables = { slug };

  try {
    const data: any = await graphQLClient.request(query, variables);
    return data.Projects?.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

/**
 * Fetch featured project for key project section
 */
export async function getFeaturedProject(): Promise<Project | null> {
  const query = gql`
    query GetFeaturedProject {
      Projects(where: { featured: { equals: true }, status: { equals: "published" } }, limit: 1) {
        docs {
          id
          title
          slug
          location
          studyType
          date
          shortDescription
          description
          mainImage {
            url
            alt
          }
          gallery {
            url
            alt
          }
          tags
          category
          client
          duration
          impact {
            title
            description
            metrics {
              label
              value
            }
          }
          policyCards {
            title
            description
            iconImage {
              url
              alt
            }
          }
          featured
          status
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    return data.Projects?.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching featured project:", error);
    return null;
  }
}

/**
 * Fetch top featured projects for key projects section
 */
export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  const query = gql`
    query GetFeaturedProjects($limit: Int!) {
      Projects(where: { featured: true, status: { equals: "published" } }, limit: $limit) {
        docs {
          id
          title
          slug
          location
          studyType
          date
          shortDescription
          description
          mainImage {
            url
            alt
          }
          gallery {
            url
            alt
          }
          tags
          category
          client
          duration
          impact {
            title
            description
            metrics {
              label
              value
            }
          }
          policyCards {
            title
            description
            iconImage {
              url
              alt
            }
          }
          featured
          status
        }
      }
    }
  `;

  const variables = { limit };

  try {
    const data: any = await graphQLClient.request(query, variables);
    return data.Projects?.docs || [];
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

/**
 * Fetch projects for map display
 */
export async function getMapProjects(): Promise<Project[]> {
  const query = gql`
    query GetMapProjects {
      Projects(where: { status: { equals: "published" }, showOnMap: true }, limit: 100) {
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
    const projects = (data.Projects?.docs || []).filter(
      (p: Project) => p.showOnMap && p.mapPosition?.x && p.mapPosition?.y
    );
    return projects;
  } catch (error) {
    console.error("Error fetching map projects:", error);
    return [];
  }
}

/**
 * Fetch projects page content by slug
 */
export async function getProjectsPageContent(slug: string = "projects"): Promise<ProjectsPageData> {
  const query = gql`
    query GetProjectsPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on ProjectsHeroSection {
              blockType
              heading
              highlightedWord
              backgroundImage {
                url
                alt
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
        keyProjectSection: undefined,
        contactBannerSection: undefined,
        projectMapSection: undefined,
        allProjects: [],
      };
    }

    const heroSection = page.sections.find(
      (section: any) => section.blockType === "projectsHeroSection"
    ) as ProjectsHeroSection | undefined;

    const contactBannerSection = page.sections.find(
      (section: any) => section.blockType === "contactBannerSection"
    ) as ContactBannerSection | undefined;

    const projectMapSection = page.sections.find(
      (section: any) => section.blockType === "projectMapSection"
    ) as ProjectMapSection | undefined;

    // Fetch projects separately, with error handling
    let projects: Project[] = [];
    try {
      const projectsResponse = await getProjects(50, 1);
      projects = projectsResponse.projects;
    } catch (projectError) {
      console.error("Error fetching projects (non-critical):", projectError);
      // Continue with empty projects array
    }

    return {
      heroSection,
      keyProjectSection: undefined,
      contactBannerSection,
      projectMapSection,
      allProjects: projects,
    };
  } catch (error) {
    console.error("Error fetching projects page data:", error);

    // Return fallback data without trying to fetch projects again
    return {
      heroSection: undefined,
      keyProjectSection: undefined,
      contactBannerSection: undefined,
      projectMapSection: undefined,
      allProjects: [],
    };
  }
}

/**
 * Fetch project details page content by slug
 */
export async function getProjectDetailsPageContent(slug: string = "project-details"): Promise<{
  heroSection?: ProjectsHeroSection;
}> {
  const query = gql`
    query GetProjectDetailsPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on ProjectsHeroSection {
              blockType
              heading
              highlightedWord
              backgroundImage {
                url
                alt
              }
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
      };
    }

    const heroSection = page.sections.find(
      (section: any) => section.blockType === "projectsHeroSection"
    ) as ProjectsHeroSection | undefined;

    return {
      heroSection,
    };
  } catch (error) {
    console.error("Error fetching project details page data:", error);
    return {
      heroSection: undefined,
    };
  }
}

/**
 * Fetch related projects (excluding current project)
 */
export async function getRelatedProjects(
  currentProjectId: string,
  category?: string,
  limit: number = 6
): Promise<Project[]> {
  const whereClause: any = {
    status: { equals: "published" },
  };

  if (category) {
    whereClause.category = { equals: category };
  }

  const query = gql`
    query GetRelatedProjects($where: ProjectWhereInput, $limit: Int) {
      Projects(where: $where, limit: $limit) {
        docs {
          id
          title
          slug
          location
          shortDescription
          mainImage {
            url
            alt
          }
          tags
          category
        }
      }
    }
  `;

  const variables = {
    where: whereClause,
    limit: limit + 5, // Fetch extra to ensure we have enough after filtering
  };

  try {
    const data: any = await graphQLClient.request(query, variables);
    const allProjects = data.Projects?.docs || [];

    // Filter out the current project and return only the requested limit
    return allProjects
      .filter((project: Project) => project.id !== currentProjectId)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching related projects:", error);
    return [];
  }
}
