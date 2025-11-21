import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;

const graphQLClient = new GraphQLClient(baseUrl);

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterContact {
  address: string;
  email: string;
}

export interface FooterSocial {
  platform: string;
  url: string;
}

export interface Footer {
  companyLinks: FooterLink[];
  quickLinks: FooterLink[];
  contact: FooterContact;
  socials: FooterSocial[];
  newsletterEnabled: boolean;
  copyrightText: string;
}

export interface SiteSettings {
  footer: Footer;
}

interface SiteSettingsResponse {
  SiteSettings: SiteSettings;
}

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const query = gql`
    query GetSiteSettings {
      SiteSettings {
        footer {
          companyLinks {
            label
            url
          }
          quickLinks {
            label
            url
          }
          contact {
            address
            email
          }
          socials {
            platform
            url
          }
          newsletterEnabled
          copyrightText
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request<SiteSettingsResponse>(query);
    return data.SiteSettings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
};
