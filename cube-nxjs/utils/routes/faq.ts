import { GraphQLClient, gql } from "graphql-request";
import type { FaqSection, PageResponse } from "../types";
import type { Faq } from "../types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;

const graphQLClient = new GraphQLClient(baseUrl, {
  fetch: (url, options) =>
    fetch(url, { ...options, next: { revalidate: 5 } } as RequestInit),
});

export const getFaqs = async (slug: string): Promise<Faq[]> => {
  const query = gql`
    query GetPageBySlug($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          id
          title
          slug
          sections {
            ... on FaqSection {
              blockType
              faqs {
                question
                answer
              }
            }
          }
        }
      }
    }
  `;

  const variables = { slug };

  let data;
  try {
    data = await graphQLClient.request<PageResponse<FaqSection>>(
      query,
      variables
    );
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }

  const page = data.Pages.docs[0];
  const faqSection = page?.sections.find(
    (section) => section.blockType === "faqSection"
  );

  return faqSection?.faqs || [];
};
