import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

export interface Award {
  id: string;
  name: string;
  date: string;
  description: string;
  logo?: {
    url: string;
    alt?: string;
  };
  organization?: string;
  category?: string;
  order: number;
  active: boolean;
}

/**
 * Fetch all active awards
 */
export async function getAwards(limit: number = 20): Promise<Award[]> {
  const query = gql`
    query GetAwards($limit: Int) {
      Awards(limit: $limit) {
        id
        name
        date
        description
        logo {
          url
          alt
        }
        organization
        category
        order
        active
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { limit });
    return data.Awards || [];
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
}
