# Cube Highways - Backend Documentation

> **Purpose:** Knowledge Transfer (KT) Document
> **Last Updated:** February 2026
> **Backend Location:** `cube-node/`

---

## Key Points (Quick Reference)

- **Stack:** Node.js 18 + Express + Apollo Server (GraphQL) + MongoDB (Mongoose) + AdminJS
- **Port:** 3001 (default)
- **GraphQL (read):** `POST /api/graphql` — all content queries for the frontend
- **REST (write):** `/api/contact-submissions`, `/api/resumes`, `/api/media`, `/api/newsletter`
- **Admin Panel:** `http://localhost:3001/admin` — AdminJS with email/password login
- **Media Storage:** AWS S3 — images auto-converted to WebP via Sharp
- **Database:** 17 Mongoose models (5 core content, 8 supporting, 3 form submissions, 1 config)
- **Auth:** Only on AdminJS (JWT). All public APIs are unauthenticated, protected by rate limiting.
- **Email:** Nodemailer configured but currently **disabled** (commented out in routes)
- **Deployment:** Docker multi-stage build, health check at `GET /health`

---

## Table of Contents

1. [Architecture](#1-architecture)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Database Models](#5-database-models)
6. [API Endpoints](#6-api-endpoints)
7. [Services Layer](#7-services-layer)
8. [Middleware Pipeline](#8-middleware-pipeline)
9. [Admin Panel](#9-admin-panel)
10. [Environment Variables](#10-environment-variables)
11. [Deployment](#11-deployment)
12. [Architectural Decisions](#12-architectural-decisions)
13. [Known Limitations](#13-known-limitations)

---

## 1. Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                       │
│                    http://localhost:3000                      │
└──────────┬──────────────────────────────────┬────────────────┘
           │ GraphQL Queries                  │ REST POST
           │ (read content)                   │ (submit forms)
           ▼                                  ▼
┌──────────────────────────────────────────────────────────────┐
│                  BACKEND (Express + Apollo)                   │
│                    http://localhost:3001                      │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ GraphQL API │  │  REST Routes │  │  AdminJS Panel      │ │
│  │ /api/graphql│  │  /api/*      │  │  /admin             │ │
│  └──────┬──────┘  └──────┬───────┘  └──────────┬──────────┘ │
│         │                │                      │            │
│  ┌──────┴────────────────┴──────────────────────┴──────────┐ │
│  │              Services Layer                              │ │
│  │  s3Service.js │ imageService.js │ emailService.js       │ │
│  └──────┬────────────────┬──────────────────────┬──────────┘ │
└─────────┼────────────────┼──────────────────────┼────────────┘
          ▼                ▼                      ▼
    ┌──────────┐    ┌──────────┐          ┌──────────────┐
    │ MongoDB  │    │  AWS S3  │          │  SMTP Server │
    └──────────┘    └──────────┘          └──────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js 18+ | JavaScript server runtime |
| **Framework** | Express.js 4.18 | REST API + middleware |
| **GraphQL** | Apollo Server 4.9 | Content query engine |
| **Database** | MongoDB + Mongoose 8.0 | NoSQL storage + ODM |
| **Admin UI** | AdminJS 6.8 | Auto-generated CRUD panel |
| **Storage** | AWS S3 (SDK v3) | Media file storage |
| **Images** | Sharp 0.33 | WebP conversion, dimension extraction |
| **Email** | Nodemailer 6.9 | SMTP delivery (currently disabled) |
| **Auth** | JWT + bcryptjs | Admin panel sessions |
| **Validation** | Joi 17.11 | Request body validation |
| **Security** | Helmet + CORS + express-rate-limit | Headers, CORS, rate limiting |
| **Logging** | Winston + Morgan | App logs + HTTP request logs |

---

## 3. Project Structure

```
cube-node/
├── src/
│   ├── server.js                   # Entry point
│   ├── config/
│   │   ├── database.js             # MongoDB connection
│   │   └── aws.js                  # S3 client setup
│   ├── models/                     # 17 Mongoose schemas
│   │   ├── Page.js                 # CMS pages (dynamic sections)
│   │   ├── Media.js                # S3 file metadata
│   │   ├── Project.js              # Portfolio projects
│   │   ├── Resource.js             # News/Blog/CaseStudy/Podcast
│   │   ├── Job.js                  # Career postings
│   │   ├── Service.js              # Service offerings
│   │   ├── Solution.js             # Solution categories
│   │   ├── Partner.js              # Partner orgs
│   │   ├── Testimonial.js          # Client testimonials
│   │   ├── Award.js                # Awards
│   │   ├── Stat.js                 # Statistics
│   │   ├── Timeline.js             # Timeline milestones
│   │   ├── PopularSearch.js        # Search suggestions
│   │   ├── ContactSubmission.js    # Contact form entries
│   │   ├── Resume.js               # Job applications
│   │   ├── Newsletter.js           # Email subscriptions
│   │   └── SiteSettings.js         # Global config (singleton)
│   ├── graphql/
│   │   ├── server.js               # Apollo Server init
│   │   ├── typeDefs.js             # GraphQL schema
│   │   └── resolvers/              # Query resolvers
│   │       ├── index.js            # Resolver aggregator
│   │       ├── pageResolvers.js
│   │       ├── jobResolvers.js
│   │       ├── projectResolvers.js
│   │       ├── resourceResolvers.js
│   │       ├── generalResolvers.js
│   │       └── popularSearchResolvers.js
│   ├── routes/                     # REST endpoints
│   │   ├── contact.js              # POST /api/contact-submissions
│   │   ├── resume.js               # POST /api/resumes
│   │   ├── media.js                # POST /api/media
│   │   ├── newsletter.js           # POST/DELETE /api/newsletter
│   │   └── sitemap.js              # GET /api/sitemap.xml
│   ├── services/
│   │   ├── s3Service.js            # S3 upload/delete/presign
│   │   ├── imageService.js         # WebP conversion
│   │   └── emailService.js         # SMTP email (disabled)
│   ├── middleware/
│   │   ├── cors.js                 # CORS + Helmet
│   │   ├── rateLimiter.js          # Rate limiters
│   │   ├── validation.js           # Joi schemas
│   │   └── errorHandler.js         # Error → HTTP response
│   └── adminjs/
│       ├── index.js                # AdminJS setup
│       ├── resources/              # Per-model configs
│       └── components/             # Custom React components
├── scripts/                        # Utility scripts
├── package.json
├── Dockerfile
└── .env.example
```

**Quick Lookup — "Where do I change...?"**

| Task | File(s) |
|------|---------|
| Add a new DB collection | `src/models/` |
| Add a GraphQL query | `src/graphql/typeDefs.js` + `src/graphql/resolvers/` |
| Add a REST endpoint | `src/routes/` + mount in `src/server.js` |
| Change CORS / security | `src/middleware/cors.js` |
| Modify rate limits | `src/middleware/rateLimiter.js` |
| Change S3 behavior | `src/services/s3Service.js` |
| Add model to admin | `src/adminjs/index.js` |

---

## 4. Getting Started

```bash
cd cube-node
npm install
cp .env.example .env       # Fill in values (see Section 10)
npm run dev                 # Development (nodemon auto-reload)
npm start                   # Production
```

**Verify setup:**

| URL | Expected |
|-----|----------|
| `GET http://localhost:3001/health` | `{ "success": true }` |
| `http://localhost:3001/api/graphql` | Apollo Sandbox (dev) |
| `http://localhost:3001/admin` | Login page |

---

## 5. Database Models

### 5.1 Overview (17 Models)

```
CORE CONTENT (5)          SUPPORTING (8)         SUBMISSIONS (3)      CONFIG (1)
• Page                    • Service              • ContactSubmission   • SiteSettings
• Media                   • Partner              • Resume
• Project                 • Testimonial          • Newsletter
• Resource                • Award
• Job                     • Solution
                          • Stat
                          • Timeline
                          • PopularSearch
```

### 5.2 Core Content Models

**Page** — Dynamic CMS pages with 30+ section types (hero, FAQ, services, timeline, etc.)
- Key fields: `title`, `slug` (unique), `sections[]`, `seo`, `status` (draft/published)
- Each section has a `sectionType` that determines its structure

**Media** — Metadata for every S3 file
- Key fields: `filename`, `mimeType`, `fileSize`, `s3Key`, `s3Bucket`, `alt`, `width`, `height`
- Virtual `url` field auto-computes full S3 URL

**Project** — Portfolio/case study projects
- Key fields: `title`, `slug`, `location`, `category`, `gallery[]` (→ Media), `featured`, `mapPosition` (x, y), `status`

**Resource** — Unified model for NEWS, BLOG, CASESTUDY, PODCAST
- Key fields: `title`, `slug`, `category`, `content` (HTML), `author`, `featured`, `readTime`, `status`

**Job** — Career postings
- Key fields: `title`, `location`, `department`, `employmentType`, `experienceLevel`, `requirements[]`, `salaryRange`, `status` (active/closed/draft)

### 5.3 Supporting Models

All have `active` (Boolean) + `order` (Number) fields with composite indexes.

| Model | Key Fields | Purpose |
|-------|------------|---------|
| Service | title, description, icon, image, features[] | Services section |
| Partner | name, logo (→ Media), website | Partner logos |
| Testimonial | quote, author, company, rating (1-5) | Testimonials carousel |
| Award | name, date, organization, logo (→ Media) | Awards section |
| Solution | idString, title, description, projects[] | Solutions grid |
| Stat | value, label, icon | Statistics counters |
| Timeline | year, side, title, content, isPodcast | About page timeline |
| PopularSearch | term | Search suggestions |

### 5.4 Form & Submission Models

**ContactSubmission** — `name`, `email`, `phone`, `message`, `interestedField`, `status` (new → read → responded → archived), `ipAddress`

**Resume** — `fullName`, `phone`, `jobId` (→ Job), `resumeUpload` (→ Media), `status` (new → reviewed → shortlisted/rejected/hired)

**Newsletter** — `email` (unique), `status` (subscribed/unsubscribed), `subscribedAt`, `ipAddress`

### 5.5 SiteSettings (Singleton)

Global config: `siteName`, `siteUrl`, `logo`, `favicon`, `contactInfo`, `socialMedia[]`, `seo`, `analytics`, `footer`, `maintenanceMode`

Access: `await SiteSettings.getInstance()`

### 5.6 Model Relationships

```
Page ──→ Media, Resource          Service/Partner/Testimonial/Award ──→ Media
Project ──→ Media (gallery)       Solution ──→ Media, Project[]
Resource ──→ Media                SiteSettings ──→ Media
Resume ──→ Media, Job
```

---

## 6. API Endpoints

### 6.1 Endpoint Map

| Method | Path | Purpose | Rate Limit |
|--------|------|---------|------------|
| POST | `/api/graphql` | All content queries | 100/15min |
| POST | `/api/contact-submissions` | Contact form | 5/hour |
| POST | `/api/resumes` | Job application | 5/hour |
| POST | `/api/media` | File upload to S3 | 20/15min |
| POST | `/api/newsletter` | Subscribe | 5/hour |
| DELETE | `/api/newsletter/:email` | Unsubscribe | — |
| GET | `/api/sitemap.xml` | Dynamic sitemap | — |
| GET | `/health` | Health check | — |
| GET | `/robots.txt` | SEO robots | — |

### 6.2 GraphQL Queries

**Paginated queries** (return `{ docs, totalDocs, totalPages, page }`):
- `Pages(where, limit, page)` / `Page(id)`
- `Jobs(where, limit, page)` / `Job(id)`
- `Projects(where, limit, page)` / `Project(id, slug)`
- `Resources(where, limit, page)` / `Resource(id, slug)`

**Simple list queries** (return arrays):
- `Services(limit)`, `Partners(limit)`, `Testimonials(limit)`, `Awards(limit)`
- `Solutions(limit)`, `Stats(limit)`, `Timeline(limit)`, `PopularSearches(limit)`
- `SiteSettings` (singleton, no args)

**Filter operators:** `equals`, `contains`, `in`

### 6.3 REST API Details

**Contact Form** — `POST /api/contact-submissions`
```json
{ "name": "John", "email": "john@example.com", "phone": "9876543210", "interestedField": "Partnership", "message": "..." }
```
Allowed `interestedField`: Project Development, Investment Opportunities, Partnership, General Inquiry, Media Relations, Other

**Resume Upload** — `POST /api/resumes`
```json
{ "fullName": "Jane", "number": "9876543210", "resumeUpload": "<Media ID>", "jobId": "<Job ID (optional)>" }
```
Prerequisite: Upload file to `/api/media` first, use returned Media ID.

**Media Upload** — `POST /api/media` (multipart/form-data)
- Fields: `file` (required), `alt`, `caption`, `folder`
- Max size: 10MB
- Allowed: JPEG, PNG, GIF, WebP, SVG, PDF, DOC, DOCX
- Images auto-converted to WebP (85% quality)
- Returns: `{ id, url, filename, mimeType, width, height }`

**Newsletter** — `POST /api/newsletter` with `{ "email": "..." }` / `DELETE /api/newsletter/:email`

---

## 7. Services Layer

**S3 Service** (`src/services/s3Service.js`)
- `uploadFile(buffer, fileName, mimeType, folder)` → uploads to S3, returns `{ key, url }`
- `deleteFile(key)` → removes from S3
- `getSignedUrl(key, expiresIn=3600)` → temporary presigned URL
- File path pattern: `{folder}/{year}/{month}/{timestamp}-{filename}.ext`

**Image Service** (`src/services/imageService.js`)
- `optimizeImage(buffer)` → WebP at 85% quality
- `getImageDimensions(buffer)` → `{ width, height }`
- SVGs pass through unchanged; failures fall back to original

**Email Service** (`src/services/emailService.js`)
- SMTP via Nodemailer (Gmail or custom)
- Templates: contact notification, contact confirmation, resume notification
- **Currently disabled** — sending calls commented out in routes

---

## 8. Middleware Pipeline

```
Request → Helmet → CORS → Compression → Morgan → JSON Parser → Rate Limiter → Joi Validation → Route Handler → Error Handler → Response
```

**CORS Whitelist:** `FRONTEND_URL`, `localhost:3001` (AdminJS), `BACKEND_URL`

**Rate Limits:**

| Limiter | Limit | Routes |
|---------|-------|--------|
| apiLimiter | 100/15min | GraphQL |
| formLimiter | 5/hour | Contact, Resume, Newsletter |
| uploadLimiter | 20/15min | Media upload |

**Error Handler** maps errors to HTTP status: Mongoose validation → 400, Duplicate key → 409, Invalid ID → 400, JWT errors → 401, Multer → 400, Unknown → 500

---

## 9. Admin Panel

- **URL:** `http://localhost:3001/admin`
- **Login:** `ADMIN_EMAIL` + `ADMIN_PASSWORD` from `.env` (JWT session)
- **All 17 models** registered with CRUD interfaces
- **Features:** Drag-drop S3 uploads, image gallery preview, Resource cloning, custom React components, status workflows for submissions

---

## 10. Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cube-highways

# CORS
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# AWS S3
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
AWS_REGION=ap-south-1
AWS_S3_BUCKET=cube-highways-media

# Admin Panel
ADMIN_EMAIL=admin@cubehighways.com
ADMIN_PASSWORD=<your-secure-password>
JWT_SECRET=<random-string-32+-chars>

# Email (currently disabled)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@cubehighways.com
SMTP_PASS=<app-password>
EMAIL_FROM=Cube Highways <noreply@cubehighways.com>
ADMIN_NOTIFICATION_EMAIL=admin@cubehighways.com
```

---

## 11. Deployment

**Docker** (multi-stage build):
```bash
docker build -t cube-highways-backend .
docker run -p 3001:3001 --env-file .env cube-highways-backend
```
- Base: `node:18-alpine`, non-root user (UID 1001)
- Health check: `GET /health` every 30s

---

## 12. Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| GraphQL for reads, REST for writes | GraphQL gives frontend flexibility; REST is simpler for forms/uploads |
| AdminJS over custom admin | Auto-generates CRUD UI from Mongoose models, saves weeks |
| S3 for all media | Backend stays stateless, enables horizontal scaling |
| Auto WebP conversion | 30-50% smaller files, transparent to editors |
| Dynamic page sections (30+ types) | Editors compose pages without developer involvement |
| Singleton SiteSettings | One config document, no duplicates, `getInstance()` access |
| No auth on public API | Only published content exposed; rate limiting prevents abuse |
| Unified Resource model | News/Blog/CaseStudy/Podcast share one model with `category` field |

---

## 13. Known Limitations

| Item | Details |
|------|---------|
| Email disabled | Notifications commented out — uncomment when SMTP is ready |
| Single admin account | No multi-user or RBAC support |
| No background jobs | No scheduled tasks (newsletter, cleanup, scheduling) |
| No caching | Every query hits MongoDB directly — add Redis if traffic grows |
| Dual AWS SDK | v2 (for AdminJS upload) + v3 (custom code) both installed |
| No test suite | Manual testing via `scripts/` only |
| Dynamic sitemap | Generated per request — consider caching for high traffic |

---

## Utility Scripts

Run from project root: `node scripts/<name>.js`

| Script | Purpose |
|--------|---------|
| `check-site-settings.js` | Verify SiteSettings document exists |
| `find-orphaned-media.js` | Find unreferenced Media documents |
| `fix-media-indexes.js` | Rebuild Media collection indexes |
| `test-graphql-query.js` | Test GraphQL queries manually |
| `test-jobs-query.js` | Test job listing queries |
