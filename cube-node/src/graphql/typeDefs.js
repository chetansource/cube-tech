const { gql } = require('graphql-tag');

const typeDefs = gql`
  scalar DateTime

  # SEO Type
  type SEO {
    title: String
    description: String
    keywords: [String!]
    ogImage: String
  }

  # Media Type
  type Media {
    id: ID!
    filename: String!
    originalFilename: String
    mimeType: String!
    fileSize: Int!
    url: String!
    s3Key: String!
    s3Bucket: String
    alt: String
    caption: String
    width: Int
    height: Int
    folder: String
    uploadedBy: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Page Section Types
  type FAQ {
    question: String!
    answer: String!
  }

  type Location {
    label: String!
    address: String!
  }

  type Social {
    platform: String!
    url: String!
  }

  type JobRef {
    id: ID!
    title: String!
    location: String!
  }

  # Section Union Types
  type FaqSection {
    blockType: String!
    faqs: [FAQ!]!
  }

  type ContactInfo {
    blockType: String!
    phone: String
    email: String
    locations: [Location!]
    socials: [Social!]
  }

  type CareerTitle {
    blockType: String!
    headingLine1: String
    headingLine2: String
    description: String
  }

  type JobListSection {
    blockType: String!
    jobs: [JobRef!]
  }

  type HeroSection {
    blockType: String!
    heading: String
    subheading: String
    description: String
    ctaText: String
    ctaLink: String
    backgroundImage: Media
  }

  type GenericSection {
    blockType: String!
    title: String
    description: String
    content: String
    image: Media
  }

  union Section = FaqSection | ContactInfo | CareerTitle | JobListSection | HeroSection | GenericSection

  # Page Type
  type Page {
    id: ID!
    title: String!
    slug: String!
    sections: [Section!]!
    seo: SEO
    status: String!
    publishedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PagesResponse {
    docs: [Page!]!
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
  }

  # Job Type
  type SalaryRange {
    min: Float
    max: Float
    currency: String
  }

  type Job {
    id: ID!
    title: String!
    location: String!
    description: String!
    department: String
    employmentType: String
    experienceLevel: String
    requirements: [String!]
    responsibilities: [String!]
    benefits: [String!]
    salaryRange: SalaryRange
    status: String!
    postedDate: DateTime
    closingDate: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type JobsResponse {
    docs: [Job!]!
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
  }

  # Project Type
  type Metric {
    label: String!
    value: String!
  }

  type ProjectImpact {
    title: String
    description: String
    metrics: [Metric!]
  }

  type PolicyCard {
    icon: String
    title: String!
    description: String
  }

  type Project {
    id: ID!
    title: String!
    slug: String!
    location: String
    studyType: String
    date: DateTime
    shortDescription: String
    description: String!
    mainImage: Media
    gallery: [Media!]
    tags: [String!]
    category: String
    client: String
    duration: String
    impact: ProjectImpact
    policyCards: [PolicyCard!]
    featured: Boolean
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ProjectsResponse {
    docs: [Project!]!
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
  }

  # Resource Type
  type Resource {
    id: ID!
    category: String!
    title: String!
    slug: String!
    date: DateTime
    description: String!
    content: String
    image: Media
    author: String
    tags: [String!]
    featured: Boolean
    categoryColor: String
    readTime: Int
    status: String!
    publishedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ResourcesResponse {
    docs: [Resource!]!
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
  }

  # Service Type
  type Service {
    id: ID!
    title: String!
    description: String!
    icon: String
    image: Media
    features: [String!]
    order: Int
    link: String
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Partner Type
  type Partner {
    id: ID!
    name: String!
    logo: Media
    website: String
    order: Int
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Testimonial Type
  type Testimonial {
    id: ID!
    quote: String!
    author: String!
    company: String!
    avatar: Media
    position: String
    rating: Int
    order: Int
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Award Type
  type Award {
    id: ID!
    name: String!
    date: DateTime
    description: String
    logo: Media
    organization: String
    category: String
    order: Int
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Solution Type
  type Solution {
    id: ID!
    idString: String!
    title: String!
    description: String!
    image: Media
    order: Int
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Stat Type
  type Stat {
    id: ID!
    value: Float!
    label: String!
    hasIcon: Boolean
    icon: String
    order: Int
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Timeline Type
  type TimelineItem {
    id: ID!
    year: String!
    side: String
    title: String
    content: String
    isPodcast: Boolean
    image: Media
    link: String
    icon: String
    order: Int
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Site Settings Type
  type ContactDetails {
    phone: String
    email: String
    address: String
  }

  type SocialMedia {
    platform: String!
    url: String!
    icon: String
  }

  type GlobalSEO {
    defaultTitle: String
    defaultDescription: String
    defaultKeywords: [String!]
    ogImage: String
  }

  type Analytics {
    googleAnalyticsId: String
    facebookPixelId: String
  }

  type SiteSettings {
    id: ID!
    siteName: String
    siteUrl: String
    logo: Media
    favicon: Media
    contactInfo: ContactDetails
    socialMedia: [SocialMedia!]
    seo: GlobalSEO
    analytics: Analytics
    maintenanceMode: Boolean
    updatedAt: DateTime!
  }

  # Input Types
  input StringQueryInput {
    equals: String
    contains: String
    in: [String!]
  }

  input PageWhereInput {
    slug: StringQueryInput
    status: StringQueryInput
  }

  input JobWhereInput {
    status: StringQueryInput
    department: StringQueryInput
  }

  input ProjectWhereInput {
    slug: StringQueryInput
    status: StringQueryInput
    category: StringQueryInput
    featured: Boolean
  }

  input ResourceWhereInput {
    slug: StringQueryInput
    category: StringQueryInput
    status: StringQueryInput
    featured: Boolean
  }

  # Queries
  type Query {
    # Pages
    Pages(where: PageWhereInput, limit: Int, page: Int): PagesResponse!
    Page(id: ID!): Page

    # Jobs
    Jobs(where: JobWhereInput, limit: Int, page: Int): JobsResponse!
    Job(id: ID!): Job

    # Projects
    Projects(where: ProjectWhereInput, limit: Int, page: Int): ProjectsResponse!
    Project(id: ID, slug: String): Project

    # Resources
    Resources(where: ResourceWhereInput, limit: Int, page: Int): ResourcesResponse!
    Resource(id: ID, slug: String): Resource

    # Services
    Services(limit: Int): [Service!]!

    # Partners
    Partners(limit: Int): [Partner!]!

    # Testimonials
    Testimonials(limit: Int): [Testimonial!]!

    # Awards
    Awards(limit: Int): [Award!]!

    # Solutions
    Solutions(limit: Int): [Solution!]!

    # Stats
    Stats(limit: Int): [Stat!]!

    # Timeline
    Timeline(limit: Int): [TimelineItem!]!

    # Site Settings
    SiteSettings: SiteSettings
  }
`;

module.exports = typeDefs;
