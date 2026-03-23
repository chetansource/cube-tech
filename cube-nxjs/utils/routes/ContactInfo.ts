// lib/contact.ts

import { GraphQLClient, gql } from "graphql-request";
import type { ContactSection, PageResponse } from "../types"; // You can define a Contact type here if needed

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;

const graphQLClient = new GraphQLClient(baseUrl, {
  fetch: (url, options) =>
    fetch(url, { ...options, next: { revalidate: 5 } } as RequestInit),
});

export const ContactInfo = async (slug: string) => {
  const query = gql`
    query GetPageBySlug($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          id
          title
          slug
          sections {
            ... on ContactInfo {
              blockType
              phone
              email
              locations {
                label
                address
              }
              socials {
                platform
                url
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
    data = await graphQLClient.request<PageResponse<ContactSection>>(
      query,
      variables
    );
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }

  const page = data.Pages.docs[0];

  const contactSection = page?.sections.find(
    (section) => section.blockType === "contact-info"
  );

  return contactSection || null;
};
