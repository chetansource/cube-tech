import { GraphQLClient, gql } from "graphql-request";
import type { FaqSection, PageResponse } from "../types";
import type { Faq } from "../types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;

const graphQLClient = new GraphQLClient(baseUrl);

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
  const data = await graphQLClient.request<PageResponse<FaqSection>>(
    query,
    variables
  );
  // Extract FAQs from the FaqSection block
  const page = data.Pages.docs[0];
  const faqSection = page?.sections.find(
    (section) => section.blockType === "faqSection"
  );

  return faqSection?.faqs || [];
};
