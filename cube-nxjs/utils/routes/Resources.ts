import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

// GraphQL fragments
const MEDIA_FRAGMENT = `
  fragment MediaFields on Media {
    id
    filename
    url
    mimeType
    alt
  }
`;

const RESOURCE_FRAGMENT = `
  fragment ResourceFields on Resource {
    id
    category
    title
    slug
    date
    description
    content
    image {
      ...MediaFields
    }
    author
    companyName
    duration
    tags
    featured
    categoryColor
    readTime
    status
    publishedAt
    createdAt
    updatedAt
  }
`;

// Type definitions
export interface Media {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  alt?: string;
}

export interface Resource {
  id: string;
  category: 'NEWS' | 'BLOG' | 'CASESTUDY' | 'PODCAST';
  title: string;
  slug: string;
  date?: string;
  description: string;
  content?: string;
  image?: Media;
  author?: string;
  companyName?: string;
  duration?: string;
  tags?: string[];
  featured?: boolean;
  categoryColor?: string;
  readTime?: number;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourcesResponse {
  Resources: {
    docs: Resource[];
    totalDocs: number;
    totalPages: number;
  };
}

export interface ResourceResponse {
  Resource: Resource;
}

/**
 * Fetch all resources with optional filtering
 */
export async function getResources(
  category?: string,
  featured?: boolean,
  limit: number = 100
): Promise<Resource[]> {
  const query = gql`
    ${MEDIA_FRAGMENT}
    ${RESOURCE_FRAGMENT}
    query GetResources($where: ResourceWhereInput, $limit: Int) {
      Resources(
        where: $where
        limit: $limit
      ) {
        docs {
          ...ResourceFields
        }
      }
    }
  `;

  try {
    const where: any = {
      status: { equals: "published" }
    };

    if (category) {
      where.category = { equals: category };
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    const variables = { where, limit };

    const data: ResourcesResponse = await graphQLClient.request(query, variables);
    return data.Resources.docs;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

/**
 * Fetch featured case studies for carousel
 */
export async function getFeaturedCaseStudies(): Promise<Resource[]> {
  return getResources('CASESTUDY', true);
}

/**
 * Fetch a single resource by slug
 */
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const query = gql`
    ${MEDIA_FRAGMENT}
    ${RESOURCE_FRAGMENT}
    query GetResourceBySlug($slug: String!) {
      Resource(slug: $slug) {
        ...ResourceFields
      }
    }
  `;

  try {
    const data: ResourceResponse = await graphQLClient.request(query, { slug });
    return data.Resource;
  } catch (error) {
    console.error('Error fetching resource by slug:', error);
    return null;
  }
}

/**
 * Fetch related resources (same category, excluding current resource)
 */
export async function getRelatedResources(
  category: string,
  excludeId: string,
  limit: number = 2
): Promise<Resource[]> {
  try {
    const allResources = await getResources(category);
    return allResources
      .filter(resource => resource.id !== excludeId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related resources:', error);
    return [];
  }
}
