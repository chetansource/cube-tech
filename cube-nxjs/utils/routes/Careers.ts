// /utils/routes/career.ts

import { GraphQLClient, gql } from "graphql-request";
import type { PageResponse } from "../types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
}

export interface CareerPageSection {
  blockType: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export interface JobListSection {
  blockType: string;
  jobs: Job[];
}

interface CareerPageResponse {
  sections: (CareerPageSection | JobListSection)[];
}

export const getCareerPageContent = async (slug: string) => {
  const query = gql`
    query GetCareerPage($slug: String!) {
      Pages(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          title
          slug
          sections {
            ... on CareerTitle {
              blockType
              headingLine1
              headingLine2
              description
            }
            ... on JobListSection {
              blockType
              jobs {
                id
                title
                location
                description
              }
            }
          }
        }
      }
    }
  `;

  const variables = { slug };

  const data = await graphQLClient.request<PageResponse<CareerPageResponse>>(
    query,
    variables
  );

  const page = data.Pages.docs[0];
  console.log("Career Page Data:", page);

  if (!page || !page.sections) return { careerHeading: null, jobList: [] };

  const careerHeading = page.sections.find(
    (section: any) => section.blockType === "careerTitle"
  ) as CareerPageSection | undefined;

  const jobList =
    (
      page.sections.find(
        (section: any) => section.blockType === "jobListSection"
      ) as JobListSection | undefined
    )?.jobs || [];

  return { careerHeading, jobList };
};
