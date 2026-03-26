import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl, {
  fetch: (url, options) =>
    fetch(url, { ...options, next: { revalidate: 5 } } as RequestInit),
});

export interface RichTextSection {
  blockType: "richTextSection";
  title?: string;
  content?: string;
}

export interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface PageData {
  id: string;
  title: string;
  slug: string;
  sections: RichTextSection[];
  seo?: PageSEO;
  status: string;
}

const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: StringQueryInput, $status: StringQueryInput) {
    Pages(where: { slug: $slug, status: $status }, limit: 1) {
      docs {
        id
        title
        slug
        status
        seo {
          title
          description
          keywords
        }
        sections {
          ... on RichTextSection {
            blockType
            title
            content
          }
        }
      }
    }
  }
`;

export async function getPageBySlug(
  slug: string
): Promise<PageData | null> {
  try {
    const data = await graphQLClient.request<{
      Pages: { docs: PageData[] };
    }>(GET_PAGE_BY_SLUG, {
      slug: { equals: slug },
      status: { equals: "published" },
    });

    return data.Pages.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return null;
  }
}
