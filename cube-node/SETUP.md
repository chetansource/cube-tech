# Cube Highways Backend - Setup & Next Steps

## ✅ What's Completed

The backend has been successfully built with the following features:

### Core Features
- ✅ **Express Server** running on port 3001
- ✅ **MongoDB Connection** with 15 collections
- ✅ **GraphQL API** (Apollo Server) at `/api/graphql`
- ✅ **REST APIs** for forms and file uploads
- ✅ **AWS S3 Integration** for file storage
- ✅ **Image Optimization** with Sharp (WebP conversion)
- ✅ **Email Service** with Nodemailer
- ✅ **Security** (CORS, rate limiting, Helmet, validation)
- ✅ **SEO** (sitemap.xml, robots.txt)
- ✅ **Error Handling** and logging

### Database Models (15 Collections)
1. Pages - Dynamic pages with flexible sections
2. Services - Service offerings
3. Projects - Portfolio projects
4. Resources - Knowledge center (News/Blogs/Case Studies/Podcasts)
5. Jobs - Career listings
6. ContactSubmissions - Contact form entries
7. Resumes - Resume submissions
8. Media - File metadata (S3)
9. Partners - Partner logos
10. Testimonials - Client testimonials
11. Awards - Company awards
12. Solutions - Innovation showcase
13. Stats - Success metrics
14. Timeline - Company history
15. SiteSettings - Global settings

## 🚀 Starting the Server

```bash
cd cube-node

# Start development server (with auto-reload)
npm run dev

# Or start normally
npm start
```

**Server URLs:**
- Server: `http://localhost:3001`
- GraphQL Playground: `http://localhost:3001/api/graphql`
- Health Check: `http://localhost:3001/health`
- Admin Panel: `http://localhost:3001/admin` (currently disabled - see below)

## ⚠️ Important: Configure AWS S3

Before using file upload features, you MUST set up AWS S3:

### Step 1: Create S3 Bucket
1. Log in to AWS Console
2. Go to S3 service
3. Create a new bucket (e.g., `cube-highways-media`)
4. Region: Choose nearest region (e.g., `us-east-1`)

### Step 2: Set Bucket Policy (Public Read for Images)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cube-highways-media/*"
    }
  ]
}
```

### Step 3: Enable CORS
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "https://your-production-domain.com"],
    "ExposeHeaders": []
  }
]
```

### Step 4: Create IAM User
1. Go to IAM → Users → Create User
2. Attach policy: `AmazonS3FullAccess`
3. Create Access Key
4. Copy `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

### Step 5: Update .env
```env
AWS_ACCESS_KEY_ID=your-actual-access-key
AWS_SECRET_ACCESS_KEY=your-actual-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=cube-highways-media
```

## 📧 Email Configuration (Optional)

For Gmail SMTP:
1. Enable 2-Factor Authentication in your Google Account
2. Go to Security → App Passwords
3. Generate app password for "Mail"
4. Update `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_FROM=Cube Highways <your-email@gmail.com>
ADMIN_NOTIFICATION_EMAIL=admin@cubehighways.com
```

## 🎨 AdminJS Panel (To Be Enabled)

**Current Status:** AdminJS is temporarily disabled due to ESM module compatibility issues.

**To Enable Admin Panel:**

The AdminJS dependencies (`@adminjs/express`, `@adminjs/mongoose`) are ESM modules that require different import syntax. There are two solutions:

### Solution 1: Convert to ESM (Recommended)
1. Add `"type": "module"` to `package.json`
2. Convert all `require()` to `import`
3. Convert all `module.exports` to `export`

### Solution 2: Use AdminJS v6 (Alternative)
Downgrade to AdminJS v6 which supports CommonJS:
```bash
npm install adminjs@6 @adminjs/express@5 @adminjs/mongoose@3
```

Then uncomment AdminJS code in:
- `src/server.js` (lines 12, 95-97)
- Update `src/adminjs/index.js` imports

**Access Admin Panel:**
- URL: `http://localhost:3001/admin`
- Email: `admin@cubehighways.com` (from .env)
- Password: `Admin@123456` (from .env - change this!)

## 🧪 Testing the API

### Test Health Check
```bash
curl http://localhost:3001/health
```

### Test GraphQL API
```bash
curl -X POST http://localhost:3001/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

### Test Contact Form
```bash
curl -X POST http://localhost:3001/api/contact-submissions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "interestedField": "Consulting",
    "message": "Test message"
  }'
```

## 🔗 Frontend Integration

Update `cube-nxjs/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

All existing GraphQL queries should work without changes!

## 📝 Seed Sample Data

To populate the database with sample data, you can use the GraphQL playground or create a seed script. Example:

```javascript
// Create a test page
const Page = require('./src/models/Page');

await Page.create({
  title: 'Homepage',
  slug: 'homepage',
  status: 'published',
  sections: [
    {
      blockType: 'heroSection',
      heading: 'Welcome to Cube Highways',
      subheading: 'Infrastructure Excellence',
      description: 'Leading the way in highway development',
    },
    {
      blockType: 'faqSection',
      faqs: [
        {
          question: 'What services do you offer?',
          answer: 'We provide consulting, planning, and engineering design services.',
        },
      ],
    },
  ],
});
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
pgrep -x mongod

# Start MongoDB
mongod --dbpath /path/to/data
```

### Port 3001 Already in Use
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### AWS S3 Upload Failed
- Verify AWS credentials are correct
- Check bucket exists and name matches
- Ensure IAM user has S3 permissions
- Check bucket CORS configuration

## 📦 Production Deployment

Before deploying to production:

1. **Update Environment Variables**
   - Set `NODE_ENV=production`
   - Use strong passwords
   - Set actual AWS credentials
   - Update `FRONTEND_URL` to production domain

2. **Security**
   - Change `ADMIN_PASSWORD` to a strong password
   - Generate new `JWT_SECRET` (32+ characters)
   - Enable HTTPS
   - Set up firewall rules

3. **Database**
   - Use MongoDB Atlas for production
   - Enable backups
   - Set up monitoring

4. **Deployment Platforms**
   - AWS EC2 (recommended)
   - DigitalOcean
   - Heroku
   - Railway
   - Render

## 📞 Support

If you encounter issues:
1. Check server logs in console
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Test AWS S3 credentials separately
5. Review README.md for detailed documentation

## 🎉 Next Steps

1. ✅ Server is running successfully
2. ⚠️ Configure AWS S3 credentials (required for file uploads)
3. ⚠️ Enable AdminJS (follow instructions above)
4. 📝 Seed sample data
5. 🔗 Connect frontend (`cube-nxjs`)
6. 🧪 Test all API endpoints
7. 🚀 Deploy to production

---

**Backend Built Successfully! 🎊**

All core features are implemented and the server is running. Configure AWS S3 and enable AdminJS to unlock full functionality.
