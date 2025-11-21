# Cube Highways - Full Stack Web Application

A modern full-stack web application for Cube Highways, featuring a Next.js frontend and a custom Node.js CMS backend with AdminJS.

## 🚀 Project Structure

```
cube-highways/
├── cube-nxjs/          # Next.js 15 Frontend
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── utils/          # Utilities and types
│   └── public/         # Static assets
│
└── cube-node/          # Node.js Backend (CMS)
    ├── src/
    │   ├── models/     # Mongoose models (15 collections)
    │   ├── graphql/    # GraphQL schema & resolvers
    │   ├── routes/     # REST API endpoints
    │   ├── services/   # Business logic (S3, Email, Images)
    │   ├── middleware/ # Express middleware
    │   └── adminjs/    # AdminJS configuration
    └── README.md       # Backend documentation
```

## 🛠️ Tech Stack

### Frontend (cube-nxjs)
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.x
- **UI Components:** shadcn/ui (Radix UI)
- **Data Fetching:** GraphQL (graphql-request)
- **Animations:** tw-animate-css

### Backend (cube-node)
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **GraphQL:** Apollo Server 4
- **Database:** MongoDB with Mongoose
- **Admin Panel:** AdminJS v6
- **File Storage:** AWS S3
- **Image Processing:** Sharp
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** Joi

## 📦 Features

### Frontend
- 10 dynamic pages (Home, Services, Projects, About, Resources, Careers, Contact)
- Server-side rendering (SSR)
- Mobile-responsive design
- GraphQL API integration
- Form submissions
- Image optimization

### Backend
- **15 Database Collections:**
  - Pages, Services, Projects, Resources, Jobs
  - Contact Submissions, Resumes, Media
  - Partners, Testimonials, Awards
  - Solutions, Stats, Timeline, Site Settings

- **APIs:**
  - GraphQL API for content queries
  - REST APIs for forms and file uploads
  - SEO endpoints (sitemap.xml, robots.txt)

- **Admin Features:**
  - Beautiful AdminJS panel
  - Content management for all collections
  - File upload with S3 integration
  - User authentication
  - Role-based access

- **Additional Features:**
  - Email notifications
  - Image optimization (WebP conversion)
  - Rate limiting & security
  - Error handling & logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- AWS S3 bucket (for file storage)
- SMTP credentials (for emails)

### Backend Setup

```bash
cd cube-node

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Server will run on http://localhost:3001
```

**Backend URLs:**
- API: `http://localhost:3001`
- GraphQL: `http://localhost:3001/api/graphql`
- Admin Panel: `http://localhost:3001/admin`
- Admin Login: `admin@cubehighways.com` / `Admin@123456`

### Frontend Setup

```bash
cd cube-nxjs

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Set NEXT_PUBLIC_API_URL=http://localhost:3001

# Start development server
npm run dev

# Frontend will run on http://localhost:3000
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:3000

# AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket

# AdminJS
ADMIN_EMAIL=admin@cubehighways.com
ADMIN_PASSWORD=your-password
JWT_SECRET=your-secret-key

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-app-password
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 Documentation

- **Backend:** See [cube-node/README.md](cube-node/README.md)
- **Backend Setup Guide:** See [cube-node/SETUP.md](cube-node/SETUP.md)
- **Frontend Guide:** See [cube-nxjs/CLAUDE.md](cube-nxjs/CLAUDE.md)

## 🔧 API Endpoints

### GraphQL
```graphql
# Example: Get homepage data
query {
  Pages(where: { slug: { equals: "homepage" } }) {
    docs {
      title
      sections {
        ... on HeroSection {
          heading
          description
        }
      }
    }
  }
}
```

### REST
- `POST /api/contact-submissions` - Contact form
- `POST /api/resumes` - Resume upload
- `POST /api/media` - File upload
- `GET /api/sitemap.xml` - SEO sitemap

## 🎨 Admin Panel

Access the admin panel at `http://localhost:3001/admin`

**Features:**
- Content management for all 15 collections
- Rich text editor
- File upload with drag & drop
- Search and filter
- Bulk operations
- User authentication

## 🚀 Deployment

### Backend Deployment (AWS EC2 / DigitalOcean / Heroku)
1. Set up MongoDB Atlas
2. Configure AWS S3 bucket
3. Set environment variables
4. Deploy using PM2 or Docker

### Frontend Deployment (Vercel / Netlify)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 📄 License

MIT

## 👥 Authors

- Cube Highways Team

---

**Built with ❤️ for Cube Highways**
