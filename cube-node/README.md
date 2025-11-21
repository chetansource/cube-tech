# Cube Highways CMS Backend

Custom Node.js CMS backend with AdminJS, GraphQL (Apollo Server), MongoDB, and AWS S3 for the Cube Highways website.

## 🚀 Features

- **GraphQL API** - Apollo Server for flexible data queries
- **REST APIs** - Form submissions, file uploads, sitemap
- **AdminJS Panel** - Beautiful admin interface for content management
- **MongoDB** - NoSQL database with Mongoose ODM
- **AWS S3** - Cloud file storage with automatic image optimization
- **Email Notifications** - Nodemailer for form submissions
- **SEO Features** - Sitemap.xml, robots.txt, metadata management
- **Security** - CORS, rate limiting, input validation, helmet
- **Performance** - Compression, image optimization, efficient queries

## 📦 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **GraphQL**: Apollo Server 4
- **Database**: MongoDB with Mongoose
- **Admin Panel**: AdminJS with Mongoose adapter
- **File Storage**: AWS S3 SDK v3
- **Image Processing**: Sharp
- **Email**: Nodemailer
- **Validation**: Joi
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Winston, Morgan

## 📁 Project Structure

```
cube-node/
├── src/
│   ├── config/          # Database and AWS configuration
│   ├── models/          # Mongoose schemas (15 collections)
│   ├── graphql/         # GraphQL schema and resolvers
│   ├── routes/          # REST API endpoints
│   ├── services/        # Business logic (S3, email, images)
│   ├── middleware/      # Express middleware
│   ├── adminjs/         # AdminJS configuration
│   └── server.js        # Main application entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- AWS Account with S3 bucket
- SMTP credentials (Gmail, SendGrid, etc.)

### Setup Steps

1. **Clone and Navigate**
   ```bash
   cd cube-node
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your credentials:
   ```env
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/cube-highways
   FRONTEND_URL=http://localhost:3000

   # AWS S3
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=cube-highways-media

   # AdminJS
   ADMIN_EMAIL=admin@cubehighways.com
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=your-random-secret-min-32-chars

   # Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=noreply@cubehighways.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=Cube Highways <noreply@cubehighways.com>
   ADMIN_NOTIFICATION_EMAIL=admin@cubehighways.com
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### GraphQL API
**Endpoint**: `POST /api/graphql`

**Example Query**:
```graphql
query GetHomepage {
  Pages(where: { slug: { equals: "homepage" } }) {
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
```

**Access GraphQL Playground**: `http://localhost:3001/api/graphql`

### REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact-submissions` | Submit contact form |
| POST | `/api/resumes` | Submit resume |
| POST | `/api/media` | Upload file to S3 |
| GET | `/api/media` | List all media files |
| DELETE | `/api/media/:id` | Delete media file |
| GET | `/api/sitemap.xml` | Generate SEO sitemap |
| GET | `/robots.txt` | SEO robots file |
| GET | `/health` | Health check |

### Contact Form Submission

**POST** `/api/contact-submissions`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "interestedField": "Consulting Services",
  "message": "I would like to know more..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "doc": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2025-01-21T..."
  }
}
```

### File Upload

**POST** `/api/media`

**Form Data**:
- `file`: File (required)
- `alt`: Alt text (optional)
- `caption`: Caption (optional)
- `folder`: Folder name (optional, default: "general")

**Response**:
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "doc": {
    "id": "...",
    "filename": "image-123456789.webp",
    "url": "https://s3.amazonaws.com/...",
    "mimeType": "image/webp",
    "fileSize": 45678,
    "width": 1920,
    "height": 1080
  }
}
```

### Resume Submission

**POST** `/api/resumes`

```json
{
  "fullName": "Jane Smith",
  "number": "+1234567890",
  "jobId": "optional-job-id",
  "resumeUpload": "media-id-from-upload"
}
```

## 🎨 Admin Panel

**Access**: `http://localhost:3001/admin`

**Default Credentials**:
- Email: Set in `.env` (ADMIN_EMAIL)
- Password: Set in `.env` (ADMIN_PASSWORD)

### Admin Features

- **Pages**: Manage homepage, services, about, careers, contact pages
- **Projects**: Add/edit portfolio projects with galleries
- **Resources**: Manage news, blogs, case studies, podcasts
- **Jobs**: Post and manage job openings
- **Services**: Configure service offerings
- **Media Library**: Upload and manage files
- **Form Submissions**: View contact form and resume submissions
- **Site Elements**: Partners, testimonials, awards, solutions, stats, timeline
- **Site Settings**: Global configuration

## 📊 Database Collections

| Collection | Description |
|------------|-------------|
| Pages | Dynamic pages with flexible sections |
| Services | Service offerings |
| Projects | Portfolio projects |
| Resources | Knowledge center content |
| Jobs | Career listings |
| ContactSubmissions | Contact form entries |
| Resumes | Resume submissions |
| Media | File metadata (S3) |
| Partners | Partner logos |
| Testimonials | Client testimonials |
| Awards | Company awards |
| Solutions | Innovation showcase |
| Stats | Success metrics |
| Timeline | Company history |
| SiteSettings | Global settings |

## 🔒 Security Features

- **CORS**: Configured for frontend origin only
- **Rate Limiting**:
  - API: 100 requests/15 min
  - Forms: 5 submissions/hour
  - Uploads: 20 uploads/15 min
- **Input Validation**: Joi schemas for all endpoints
- **Helmet**: Security headers
- **Authentication**: JWT for admin panel
- **File Validation**: Type and size checks
- **XSS Prevention**: Sanitized inputs

## 🖼️ Image Optimization

Images are automatically:
- Converted to WebP format
- Resized to multiple sizes (thumbnail, medium, large)
- Optimized for web (85% quality)
- Stored in S3 with organized structure

## 📧 Email Notifications

Emails are sent for:
- Contact form submissions (to admin + confirmation to user)
- Resume submissions (to hiring team)

Configure SMTP settings in `.env` for:
- Gmail (requires app password)
- SendGrid
- AWS SES
- Any SMTP service

## 🚀 Deployment

### Environment Variables (Production)

Ensure all variables in `.env.example` are set with production values.

### AWS S3 Setup

1. Create S3 bucket
2. Set bucket policy for public-read access (for images)
3. Enable CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://your-domain.com"],
    "ExposeHeaders": []
  }
]
```

### MongoDB Atlas

1. Create cluster
2. Whitelist IP addresses
3. Get connection string
4. Set `MONGODB_URI` in `.env`

### Deployment Platforms

**Recommended**:
- AWS EC2
- DigitalOcean
- Heroku
- Railway
- Render

## 🛠️ Development

### Scripts

```bash
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start production server
```

### Adding New Models

1. Create model in `src/models/`
2. Add to AdminJS in `src/adminjs/index.js`
3. Create GraphQL types in `src/graphql/typeDefs.js`
4. Create resolvers in `src/graphql/resolvers/`

### Testing GraphQL

Use GraphQL Playground at `http://localhost:3001/api/graphql` in development mode.

## 📝 Frontend Integration

Update frontend `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

All existing GraphQL queries should work without changes!

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check MongoDB is running: `mongod`
- Verify connection string in `.env`
- Check firewall/network settings

### AWS S3 Upload Failed
- Verify AWS credentials are correct
- Check bucket name and region
- Ensure bucket policy allows uploads

### Admin Panel Won't Load
- Check `JWT_SECRET` is set (min 32 characters)
- Verify `ADMIN_PASSWORD` is set
- Clear browser cookies

### Email Not Sending
- Check SMTP credentials
- For Gmail: Enable "App Passwords"
- Verify firewall allows SMTP port

## 📞 Support

For issues or questions:
1. Check logs in console
2. Review `.env` configuration
3. Verify all dependencies are installed
4. Check MongoDB and AWS S3 connectivity

## 📄 License

MIT

---

**Built with ❤️ for Cube Highways**
