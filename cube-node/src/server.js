require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { json } = require('express');

// Import configurations
const connectDatabase = require('./config/database');
const { createApolloServer, expressMiddleware } = require('./graphql/server');
const { createAdminJS, createAdminRouter } = require('./adminjs');

// Import middleware
const corsMiddleware = require('./middleware/cors');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const contactRoutes = require('./routes/contact');
const resumeRoutes = require('./routes/resume');
const mediaRoutes = require('./routes/media');
const sitemapRoutes = require('./routes/sitemap');
const newsletterRoutes = require('./routes/newsletter');
const exportRoutes = require('./routes/export');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Security middleware
    app.use(helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false, // Disable COOP for HTTP access
    }));

    // CORS
    app.use(corsMiddleware);

    // Compression
    app.use(compression());

    // Logging
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('combined'));
    }

    // Health check
    app.get('/health', (req, res) => {
      res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      });
    });

    // AdminJS - Must come BEFORE body-parser middleware
    const adminJs = createAdminJS();
    const adminRouter = createAdminRouter(adminJs);

    // Remove CSP headers for admin routes
    app.use(adminJs.options.rootPath, (_req, res, next) => {
      res.removeHeader('Content-Security-Policy');
      res.removeHeader('Content-Security-Policy-Report-Only');
      res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; form-action *;");
      next();
    });

    app.use(adminJs.options.rootPath, adminRouter);

    // CSV Export routes for admin (placed after admin auth)
    app.get('/admin/export/contacts', async (req, res) => {
      const ContactSubmission = require('./models/ContactSubmission');
      const records = await ContactSubmission.find({}).sort({ submittedAt: -1 }).lean();
      const escCsv = (val) => { const s = String(val == null ? '' : val).replace(/"/g, '""').replace(/\n/g, ' '); return `"${s}"`; };
      const header = 'Name,Email,Phone,Interested Field,Message,Status,Submitted At';
      const rows = records.map((r) => [r.name, r.email, r.phone, r.interestedField, r.message, r.status, r.submittedAt ? new Date(r.submittedAt).toISOString() : ''].map(escCsv).join(','));
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"');
      res.send([header, ...rows].join('\n'));
    });

    app.get('/admin/export/job-applicants', async (req, res) => {
      const Resume = require('./models/Resume');
      const records = await Resume.find({}).populate('jobId', 'title').populate('resumeUpload', 'url originalFilename').sort({ submittedAt: -1 }).lean();
      const escCsv = (val) => { const s = String(val == null ? '' : val).replace(/"/g, '""').replace(/\n/g, ' '); return `"${s}"`; };
      const header = 'Full Name,Phone,Job Title,Resume File,Resume URL,Status,Notes,Submitted At';
      const rows = records.map((r) => [r.fullName, r.number, r.jobId?.title || 'General Application', r.resumeUpload?.originalFilename || '', r.resumeUpload?.url || '', r.status, r.notes, r.submittedAt ? new Date(r.submittedAt).toISOString() : ''].map(escCsv).join(','));
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="job-applicants.csv"');
      res.send([header, ...rows].join('\n'));
    });

    // Body parsing - AFTER AdminJS
    app.use(json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // REST API Routes
    app.use('/api/contact-submissions', contactRoutes);
    app.use('/api/resumes', resumeRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/sitemap.xml', sitemapRoutes);
    app.use('/api/newsletter', newsletterRoutes);
    app.use('/api/export', exportRoutes);

    // Robots.txt for SEO
    app.get('/robots.txt', (_req, res) => {
      res.type('text/plain');
      res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/sitemap.xml
`);
    });

    // GraphQL API with rate limiting
    const apolloServer = await createApolloServer();
    app.use(
      '/api/graphql',
      apiLimiter,
      corsMiddleware,
      json(),
      expressMiddleware(apolloServer)
    );

    // 404 handler
    app.use(notFoundHandler);

    // Global error handler
    app.use(errorHandler);

    // Start server
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ===============================================');
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✅ GraphQL API: http://localhost:${PORT}/api/graphql`);
      console.log(`✅ Admin Panel: http://localhost:${PORT}/admin`);
      console.log(`✅ Health Check: http://localhost:${PORT}/health`);
      console.log('🚀 ===============================================');
      console.log('');
    });

  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
