# Cube Highways - Frontend Documentation

> **Purpose:** Knowledge Transfer (KT) Document
> **Last Updated:** February 2026
> **Frontend Location:** `cube-nxjs/`

---

## Key Points (Quick Reference)

- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- **Port:** 3000 (default)
- **Data Source:** All content fetched from backend via GraphQL (`graphql-request`)
- **Env Variable:** Only `NEXT_PUBLIC_API_URL` (points to backend, default `http://localhost:3001`)
- **Pages:** 8 routes — Homepage, About, Services, Projects, Resources, Careers, Contact, + detail pages
- **Rendering:** Server Components by default, `force-dynamic` on all pages (no static generation)
- **Client Components:** Only for interactive elements — forms, header menu, carousels
- **State Management:** No global store (no Redux/Zustand) — `useState` for local state only
- **Styling:** Tailwind CSS 4 with `@theme` config in `globals.css`, mobile-first responsive
- **Forms:** Contact form, resume upload (2-step: file → S3, then submit), newsletter signup
- **Icons:** Custom SVG components (15+), not an icon library
- **Deployment:** Docker multi-stage build, standalone output, health check at `GET /api/health`

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Routing & Pages](#routing--pages)
6. [Components Architecture](#components-architecture)
7. [Data Fetching & API Integration](#data-fetching--api-integration)
8. [State Management](#state-management)
9. [Styling Approach](#styling-approach)
10. [Form Handling](#form-handling)
11. [Configuration & Environment Variables](#configuration--environment-variables)
12. [Deployment](#deployment)
13. [Performance Optimizations](#performance-optimizations)
14. [Key Architectural Decisions](#key-architectural-decisions)

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router) | 15.3.0 |
| UI Library | React | 19.0.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.1.3 |
| GraphQL Client | graphql-request | 7.1.2 |
| UI Components | shadcn/ui (Radix UI) | - |
| Icons | Lucide React + Custom SVGs | 0.487.0 |
| Class Utilities | clsx + tailwind-merge + CVA | various |
| Animations | tw-animate-css | 1.2.5 |
| Build Tool | Turbopack (dev) | built-in |

---

## Project Structure

```
cube-nxjs/
├── app/                              # Next.js App Router (pages)
│   ├── layout.tsx                    # Root layout (metadata, fonts, Footer)
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles + Tailwind theme
│   │
│   ├── api/
│   │   └── health/route.ts          # Health check API route
│   │
│   ├── about-us/
│   │   └── page.tsx                  # About Us page
│   │
│   ├── careers/
│   │   ├── page.tsx                  # Careers listing page
│   │   └── details/[id]/page.tsx     # Job details (dynamic route)
│   │
│   ├── contact-us/
│   │   └── page.tsx                  # Contact form page
│   │
│   ├── projects/
│   │   ├── page.tsx                  # Projects listing
│   │   └── details/[slug]/page.tsx   # Project details (dynamic route)
│   │
│   ├── resources/
│   │   ├── page.tsx                  # Resources listing
│   │   └── details/[slug]/page.tsx   # Resource details (dynamic route)
│   │
│   └── services/
│       └── page.tsx                  # Services page
│
├── components/                       # React components (~60+ files)
│   ├── ui/                           # shadcn/ui components
│   │   └── button.tsx                # Button with variants (CVA)
│   │
│   ├── icons/                        # Custom SVG icon components
│   │   ├── mobile-icons/             # Mobile-specific icons
│   │   ├── polygon.tsx
│   │   ├── location.tsx
│   │   ├── Phone.tsx
│   │   ├── mail.tsx
│   │   ├── right-arrow.tsx
│   │   ├── left-arrow.tsx
│   │   └── ... (15+ icon files)
│   │
│   ├── about-us/
│   │   └── Timeline.tsx              # About page timeline
│   │
│   ├── career-details/               # Career detail components
│   ├── project-details/              # Project detail components
│   ├── project-page/                 # Project listing components
│   ├── resources/                    # Resources components
│   ├── resources-details/            # Resource detail components
│   │
│   ├── header.tsx                    # Main navigation + mobile menu
│   ├── navbar.tsx                    # Desktop navbar
│   ├── footer.tsx                    # Footer + newsletter signup
│   ├── hero.tsx                      # Hero section
│   ├── solutions.tsx                 # Solutions section
│   ├── servicesComponent.tsx         # Services grid
│   ├── projects.tsx                  # Featured projects
│   ├── stats.tsx                     # Statistics display
│   ├── testimonial.tsx               # Testimonials carousel
│   ├── faq.tsx                       # FAQ accordion
│   ├── awards.tsx                    # Awards section
│   ├── partners.tsx                  # Partner logos
│   ├── resource-section.tsx          # Resources grid
│   ├── resource-development.tsx      # R&D section
│   ├── resume-upload.tsx             # Resume upload form
│   ├── carrer-opportunity.tsx        # Job opportunities listing
│   └── career-explore-more.tsx       # Career explore cards
│
├── lib/
│   └── utils.ts                      # cn() utility (clsx + tailwind-merge)
│
├── utils/
│   ├── types.ts                      # Shared TypeScript interfaces
│   └── routes/                       # GraphQL data fetching functions
│       ├── Homepage.ts               # Homepage content queries
│       ├── Careers.ts                # Career page queries
│       ├── Projects.ts               # Projects queries
│       ├── Services.ts               # Services queries
│       ├── Resources.ts              # Resources queries
│       ├── ResourcesPage.ts          # Resources page queries
│       ├── AboutUs.ts                # About page queries
│       ├── ContactInfo.ts            # Contact info queries
│       ├── faq.ts                    # FAQ queries
│       ├── Awards.ts                 # Awards queries
│       ├── SiteSettings.ts           # Site settings queries
│       ├── SubmitContactForm.ts      # Contact form submission
│       ├── SubmitResume.ts           # Resume upload
│       └── SubmitNewsletter.ts       # Newsletter signup
│
├── public/                           # Static assets
│   ├── fonts/                        # Custom fonts (Glacial Indifference)
│   └── ... (60+ images: WebP, PNG, SVG)
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json                   # shadcn/ui config
├── Dockerfile
└── .env
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running on `http://localhost:3001` (see Backend Documentation)

### Installation

```bash
cd cube-nxjs
npm install
```

### Environment Setup

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Running

```bash
# Development (with Turbopack for fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

The frontend runs on `http://localhost:3000` by default.

---

## Routing & Pages

The app uses the **Next.js App Router** with file-based routing.

### Route Map

| Route | File | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | `app/page.tsx` | Server (dynamic) | Homepage with hero, solutions, services, projects, stats, testimonials, partners, resources, awards |
| `/about-us` | `app/about-us/page.tsx` | Server (dynamic) | Company story, leadership, timeline, corporate responsibility |
| `/services` | `app/services/page.tsx` | Server (dynamic) | Services listing, popular searches, project map |
| `/projects` | `app/projects/page.tsx` | Server (dynamic) | Featured projects, interactive map, all projects grid |
| `/projects/details/[slug]` | `app/projects/details/[slug]/page.tsx` | Server (dynamic) | Individual project details with gallery |
| `/resources` | `app/resources/page.tsx` | Server (dynamic) | Resources listing with filtering |
| `/resources/details/[slug]` | `app/resources/details/[slug]/page.tsx` | Server (dynamic) | Individual resource content |
| `/careers` | `app/careers/page.tsx` | Server (dynamic) | Job listings, career explore cards |
| `/careers/details/[id]` | `app/careers/details/[id]/page.tsx` | Server (dynamic) | Job details with resume upload form |
| `/contact-us` | `app/contact-us/page.tsx` | Client | Contact form with validation |
| `/api/health` | `app/api/health/route.ts` | API Route | Health check endpoint |

**Key Notes:**
- Most pages use `export const dynamic = 'force-dynamic'` — content is fetched fresh on every request (no static generation)
- Dynamic routes use `[slug]` for content (projects, resources) and `[id]` for database IDs (careers)
- All pages are async Server Components except `/contact-us` which is a Client Component (interactive form)

---

## Components Architecture

### Component Organization Pattern

```
Page (Server Component - fetches data)
  └── Layout Components (Header, Footer)
      └── Section Components (Hero, Solutions, Stats, etc.)
          └── Feature Components (ProjectMap, ResumeUpload, etc.)
              └── UI Components (Button, Icons)
```

### Layout Components

| Component | File | Type | Description |
|-----------|------|------|-------------|
| **Header** | `components/header.tsx` | Client | Main navigation with desktop navbar and mobile hamburger menu |
| **Navbar** | `components/navbar.tsx` | Client | Desktop navigation links |
| **Footer** | `components/footer.tsx` | Client | Footer with company links, newsletter signup, social media |

### Section Components (Reusable across pages)

| Component | File | Description |
|-----------|------|-------------|
| **Hero** | `components/hero.tsx` | Hero banner with background image, title, and featured resources carousel |
| **Solutions** | `components/solutions.tsx` | Grid of solution cards with numbering |
| **ServicesComponent** | `components/servicesComponent.tsx` | Services grid with icons and descriptions |
| **Projects** | `components/projects.tsx` | Featured projects carousel/grid |
| **Stats** | `components/stats.tsx` | Statistics metrics display (numbers with labels) |
| **Testimonial** | `components/testimonial.tsx` | Client testimonials carousel |
| **Partners** | `components/partners.tsx` | Partner logos grid |
| **Faq** | `components/faq.tsx` | FAQ accordion with expand/collapse |
| **Awards** | `components/awards.tsx` | Awards and recognition display |
| **ResourcesSection** | `components/resource-section.tsx` | Resource cards grid |
| **ResourceDevelopment** | `components/resource-development.tsx` | R&D showcase section |

### Page-Specific Components

| Page | Components | Description |
|------|------------|-------------|
| **About** | `about-us/Timeline.tsx` | Interactive company timeline |
| **Careers** | `carrer-opportunity.tsx`, `career-explore-more.tsx`, `resume-upload.tsx` | Job listings, explore cards, application form |
| **Projects** | `project-page/KeyProjectsSection`, `project-page/ProjectMap`, `project-page/ExploreMoreProjects` | Key projects, interactive map, grid |
| **Resources** | `resources/InsightsImpact`, `resources/ResourcesPageClient` | Insights section, filterable resources list |
| **Services** | `SolutionsSection` | Services-specific solutions display |

### Icon Components

Custom SVG components in `components/icons/`:
- Navigation: `right-arrow`, `left-arrow`, `up-arrow`, `DownArrow`
- Contact: `Phone`, `mail`, `ContactLocation`, `ContactMail`, `ContactFollow`
- Social: `Linkedin`, `Twitter`, `Youtube`, `Facebook`, `Instagram`, `Pinterest`
- UI: `polygon`, `location`, `Hamberger` (mobile menu)

### UI Components (shadcn/ui)

**Button** (`components/ui/button.tsx`):
- Built with `class-variance-authority` (CVA)
- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Sizes: `default`, `sm`, `lg`, `icon`
- Supports `asChild` prop via Radix Slot

---

## Data Fetching & API Integration

### GraphQL Client Setup

All data fetching uses `graphql-request` with a centralized base URL:

```typescript
import { GraphQLClient, gql } from "graphql-request";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
const graphQLClient = new GraphQLClient(baseUrl);
```

### Data Fetching Functions

Located in `utils/routes/`, each file exports async functions that return typed data:

#### Homepage (`utils/routes/Homepage.ts`)
```typescript
getPartners()           // → Partner[]
getSolutions()          // → Solution[]
getServices()           // → Service[]
getFeaturedProjects()   // → Project[]
getStats()              // → Stat[]
getTestimonials()       // → Testimonial[]
getFeaturedResources()  // → Resource[]
getHomepageData()       // → All above combined (parallel fetch)
```

#### Careers (`utils/routes/Careers.ts`)
```typescript
getCareerPageContent()  // → Page sections + Job listings
```

#### Projects (`utils/routes/Projects.ts`)
```typescript
getProjectsPageContent()  // → Page sections
getMapProjects()          // → Projects with map coordinates
getFeaturedProjects()     // → Featured projects
```

#### Resources (`utils/routes/Resources.ts`)
```typescript
getResources()              // → Paginated resources with filtering
getFeaturedCaseStudies()    // → Featured case studies
```

#### Form Submissions
```typescript
submitContactForm(data)    // → POST /api/contact-submissions
submitResume(formData)     // → POST /api/media + POST /api/resumes
submitNewsletter(email)    // → POST /api/newsletter
```

### Data Fetching Pattern

Pages use **async Server Components** with parallel data fetching:

```typescript
// Example: app/page.tsx (Homepage)
export default async function Home() {
  const data = await getHomepageData();
  // getHomepageData() internally uses Promise.all() for parallel fetches

  return (
    <>
      <Hero data={data.hero} />
      <Solutions data={data.solutions} />
      <Stats data={data.stats} />
      {/* ... */}
    </>
  );
}
```

### Error Handling

All data fetching functions use try-catch with fallback data:

```typescript
export async function getServices() {
  try {
    const data = await graphQLClient.request(query);
    return data.Services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return []; // Fallback to empty array
  }
}
```

---

## State Management

The frontend uses **no global state management library**. State is managed through:

### Server Components (Default)
- Data fetched at the server level via `async/await`
- Props passed down to child components
- No client-side state needed for content display

### Client Components (`"use client"`)
- `useState` for local component state (form inputs, toggles, loading states)
- `useEffect` for side effects (scroll handlers, animations)
- `useCallback` for memoized event handlers

### Examples

**Contact Form (`app/contact-us/page.tsx`):**
```typescript
"use client";

const [formData, setFormData] = useState({ name: "", email: "", ... });
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
```

**Header (`components/header.tsx`):**
```typescript
"use client";

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

**Footer (`components/footer.tsx`):**
```typescript
"use client";

const [expandedSection, setExpandedSection] = useState<string | null>(null);
const [email, setEmail] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
```

---

## Styling Approach

### Tailwind CSS 4

The project uses **Tailwind CSS 4** with the new `@theme` inline configuration (no `tailwind.config.js` file).

### Theme Configuration (`app/globals.css`)

```css
@theme {
  --color-primary: #171717;     /* Dark / text */
  --color-secondary: #ffffff;   /* White / backgrounds */
  --color-accent: #5FBA51;      /* Green / CTAs */
  --color-footer: #0B0909;      /* Very dark / footer bg */
}
```

### Custom Fonts

- **Glacial Indifference** (Regular + Bold) — loaded from `/public/fonts/`
- **Roboto** — loaded from Google Fonts CDN

### Responsive Design

Mobile-first approach using Tailwind breakpoints:

```tsx
// Typical responsive pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<h1 className="text-2xl md:text-4xl lg:text-6xl">
<div className="p-4 md:p-8 lg:p-12">
<nav className="hidden md:block">        {/* Desktop only */}
<button className="block md:hidden">     {/* Mobile only */}
```

### Utility Function

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This `cn()` function is used throughout for conditional and merged class names:

```tsx
<button className={cn("px-4 py-2", isActive && "bg-accent", className)}>
```

### Custom CSS Utilities

Defined in `globals.css`:
- `.scrollbar-hide` / `.hide-scrollbar` — Hide scrollbars
- `.animate-carousel` — Carousel animation keyframes
- Dark mode support via `.dark` class (CSS variables switch)

---

## Form Handling

### Contact Form (`app/contact-us/page.tsx`)

- **Type:** Client Component with `useState`
- **Fields:** name, email, phone, interestedField (dropdown), message
- **Validation:** Client-side field validation before submission
- **Submission:** `fetch()` POST to `/api/contact-submissions`
- **States:** loading, success, error

### Resume Upload (`components/resume-upload.tsx`)

- **Type:** Client Component
- **Fields:** fullName, phone number, resume file, jobId (from URL)
- **File Upload:** Two-step process:
  1. Upload file via `POST /api/media` (multipart FormData)
  2. Submit application via `POST /api/resumes` with media ID
- **Allowed Files:** PDF, DOC, DOCX
- **States:** loading, success, error

### Newsletter Signup (`components/footer.tsx`)

- **Type:** Inline form in Footer component
- **Fields:** email
- **Submission:** `POST /api/newsletter`
- **States:** submitting, success

---

## Configuration & Environment Variables

### Environment Variables

| Variable | Scope | Default | Description |
|----------|-------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Public (browser + server) | `http://localhost:3001` | Backend API base URL |

### Next.js Configuration (`next.config.ts`)

```typescript
const nextConfig = {
  output: 'standalone',              // Docker-optimized build
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cube-highways.s3.ap-south-1.amazonaws.com',
        pathname: '/media/**',       // AWS S3 images
      },
      {
        protocol: 'https',
        hostname: 'tryeasel.dev',
        pathname: '/**',             // External CDN images
      },
    ],
  },
};
```

### TypeScript Configuration (`tsconfig.json`)

- Strict mode enabled
- Path alias: `@/*` → `./*`
- Target: ES2017
- Module: ESNext

### shadcn/ui Configuration (`components.json`)

- Style: `new-york`
- CSS variables: enabled
- Tailwind prefix: none
- Base color: `neutral`

---

## Deployment

### Docker

Multi-stage Dockerfile for optimized production builds:

```dockerfile
# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build application
FROM node:18-alpine AS builder
ARG NEXT_PUBLIC_API_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["node", "server.js"]
```

**Build & Run:**
```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://your-backend-url.com \
  -t cube-highways-frontend .

docker run -p 3000:3000 cube-highways-frontend
```

### Health Check

```
GET /api/health
→ { "status": "ok", "timestamp": "2026-02-21T..." }
```

---

## Performance Optimizations

### Server Components (Default)
- All pages are React Server Components by default
- Only interactive components use `"use client"` (forms, menus, carousels)
- Reduces JavaScript sent to the browser

### Image Optimization
- **Next.js `<Image>` component** used throughout
- Automatic lazy loading for below-fold images
- `priority` prop on above-fold hero images
- Remote images served from AWS S3 (already optimized to WebP by backend)
- `fill` layout with `object-cover` for responsive sizing

### Parallel Data Fetching
```typescript
const [solutions, services, projects, stats] = await Promise.all([
  getSolutions(),
  getServices(),
  getFeaturedProjects(),
  getStats(),
]);
```

### Bundle Size
- Minimal dependencies (no state management library, no heavy UI framework)
- Custom SVG icons instead of icon fonts
- Single shadcn/ui component (Button) — no unused component bloat
- Tailwind CSS purges unused styles in production

### Turbopack (Development)
- `npm run dev` uses Turbopack for fast hot module replacement
- Faster development builds than Webpack

### Standalone Output
- `output: 'standalone'` in Next.js config
- Produces minimal Docker images with only necessary files

---

## Key Architectural Decisions

1. **Next.js App Router over Pages Router** — Leverages React Server Components for better performance, simpler data fetching (async components), and the latest Next.js features.

2. **Server Components by default** — Content pages fetch data on the server and render HTML, minimizing client-side JavaScript. Only interactive elements (forms, menus, carousels) are Client Components.

3. **`graphql-request` over Apollo Client** — Lightweight GraphQL client (~5KB vs ~50KB for Apollo). Since there's no client-side caching or subscriptions needed, the simpler library is sufficient.

4. **No global state management** — With Server Components fetching data and passing it down as props, there's no need for Redux/Zustand. Local `useState` handles the few interactive elements.

5. **`force-dynamic` on all pages** — Content is always fresh from the CMS. This trades caching for real-time content updates, appropriate for a CMS-driven site where editors expect changes to appear immediately.

6. **Tailwind CSS 4 with `@theme`** — Uses the new Tailwind 4 inline theme configuration, eliminating the need for a separate `tailwind.config.js` file.

7. **Custom SVG icon components** — Instead of importing an entire icon library, custom SVG components are used for the specific icons needed, keeping the bundle size small.

8. **Two-step resume upload** — Files are first uploaded to S3 via `/api/media`, then the application is submitted with the media ID. This decouples file storage from form submission and allows the same media endpoint to be reused.

9. **Centralized data fetching in `utils/routes/`** — All GraphQL queries and REST calls are organized by page/feature in separate files, keeping page components clean and making API changes easy to locate.

10. **Fallback data on API errors** — Every data fetching function returns empty/default data on failure, ensuring the page always renders even if the backend is temporarily unavailable.
