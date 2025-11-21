require('dotenv').config();
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const bcrypt = require('bcryptjs');

// Import models
const Page = require('../models/Page');
const Job = require('../models/Job');
const Project = require('../models/Project');
const Resource = require('../models/Resource');
const ContactSubmission = require('../models/ContactSubmission');
const Resume = require('../models/Resume');
const Media = require('../models/Media');
const Service = require('../models/Service');
const Partner = require('../models/Partner');
const Testimonial = require('../models/Testimonial');
const Award = require('../models/Award');
const Solution = require('../models/Solution');
const Stat = require('../models/Stat');
const Timeline = require('../models/Timeline');
const SiteSettings = require('../models/SiteSettings');

// Register adapter
AdminJS.registerAdapter(AdminJSMongoose);

const createAdminJS = () => {
  const adminJs = new AdminJS({
    resources: [
      {
        resource: Page,
        options: {
          navigation: { name: 'Content', icon: 'FileText' },
          properties: {
            sections: { type: 'mixed' },
            seo: { type: 'mixed' },
            createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
            updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          },
          listProperties: ['title', 'slug', 'status', 'updatedAt'],
          filterProperties: ['title', 'slug', 'status'],
        },
      },
      {
        resource: Service,
        options: {
          navigation: { name: 'Content', icon: 'Settings' },
          properties: {
            image: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['title', 'order', 'active', 'updatedAt'],
          filterProperties: ['title', 'active'],
        },
      },
      {
        resource: Project,
        options: {
          navigation: { name: 'Content', icon: 'Briefcase' },
          properties: {
            mainImage: { type: 'reference', reference: 'Media' },
            gallery: { type: 'reference', reference: 'Media', isArray: true },
            impact: { type: 'mixed' },
            policyCards: { type: 'mixed' },
          },
          listProperties: ['title', 'slug', 'category', 'status', 'featured', 'updatedAt'],
          filterProperties: ['title', 'category', 'status', 'featured'],
        },
      },
      {
        resource: Resource,
        options: {
          navigation: { name: 'Content', icon: 'BookOpen' },
          properties: {
            image: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['title', 'category', 'status', 'featured', 'publishedAt'],
          filterProperties: ['title', 'category', 'status', 'featured'],
        },
      },
      {
        resource: Job,
        options: {
          navigation: { name: 'Careers', icon: 'Users' },
          properties: {
            salaryRange: { type: 'mixed' },
          },
          listProperties: ['title', 'location', 'department', 'status', 'postedDate'],
          filterProperties: ['title', 'location', 'department', 'status'],
        },
      },
      {
        resource: ContactSubmission,
        options: {
          navigation: { name: 'Forms', icon: 'Mail' },
          actions: {
            new: { isVisible: false }, // Disable creating submissions from admin
            edit: { isVisible: false }, // Disable editing submissions
          },
          listProperties: ['name', 'email', 'phone', 'interestedField', 'status', 'submittedAt'],
          filterProperties: ['name', 'email', 'status', 'submittedAt'],
        },
      },
      {
        resource: Resume,
        options: {
          navigation: { name: 'Forms', icon: 'FileText' },
          properties: {
            jobId: { type: 'reference', reference: 'Job' },
            resumeUpload: { type: 'reference', reference: 'Media' },
          },
          actions: {
            new: { isVisible: false }, // Disable creating resumes from admin
            edit: { isVisible: true }, // Allow editing for status updates
          },
          listProperties: ['fullName', 'number', 'jobId', 'status', 'submittedAt'],
          filterProperties: ['fullName', 'status', 'submittedAt'],
        },
      },
      {
        resource: Media,
        options: {
          navigation: { name: 'Media', icon: 'Image' },
          properties: {
            url: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
            s3Key: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
          },
          listProperties: ['filename', 'originalFilename', 'mimeType', 'fileSize', 'folder', 'createdAt'],
          filterProperties: ['originalFilename', 'mimeType', 'folder'],
        },
      },
      {
        resource: Partner,
        options: {
          navigation: { name: 'Site Elements', icon: 'Award' },
          properties: {
            logo: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['name', 'order', 'active', 'updatedAt'],
          filterProperties: ['name', 'active'],
        },
      },
      {
        resource: Testimonial,
        options: {
          navigation: { name: 'Site Elements', icon: 'MessageCircle' },
          properties: {
            avatar: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['author', 'company', 'rating', 'order', 'active', 'updatedAt'],
          filterProperties: ['author', 'company', 'active'],
        },
      },
      {
        resource: Award,
        options: {
          navigation: { name: 'Site Elements', icon: 'Star' },
          properties: {
            logo: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['name', 'organization', 'date', 'order', 'active'],
          filterProperties: ['name', 'organization', 'active'],
        },
      },
      {
        resource: Solution,
        options: {
          navigation: { name: 'Site Elements', icon: 'Lightbulb' },
          properties: {
            image: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['idString', 'title', 'order', 'active', 'updatedAt'],
          filterProperties: ['title', 'active'],
        },
      },
      {
        resource: Stat,
        options: {
          navigation: { name: 'Site Elements', icon: 'TrendingUp' },
          listProperties: ['label', 'value', 'order', 'active', 'updatedAt'],
          filterProperties: ['label', 'active'],
        },
      },
      {
        resource: Timeline,
        options: {
          navigation: { name: 'Site Elements', icon: 'Calendar' },
          properties: {
            image: { type: 'reference', reference: 'Media' },
          },
          listProperties: ['year', 'title', 'order', 'active', 'updatedAt'],
          filterProperties: ['year', 'active'],
        },
      },
      {
        resource: SiteSettings,
        options: {
          navigation: { name: 'Settings', icon: 'Settings' },
          properties: {
            logo: { type: 'reference', reference: 'Media' },
            favicon: { type: 'reference', reference: 'Media' },
            contactInfo: { type: 'mixed' },
            socialMedia: { type: 'mixed' },
            seo: { type: 'mixed' },
            analytics: { type: 'mixed' },
            footer: { type: 'mixed' },
          },
          actions: {
            new: { isVisible: false }, // Only allow editing existing settings
            delete: { isVisible: false }, // Prevent deletion
          },
        },
      },
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'Cube Highways CMS',
      logo: false,
      withMadeWithLove: false,
    },
  });

  return adminJs;
};

const createAdminRouter = (adminJs) => {
  // Authentication
  const authenticate = async (email, password) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cubehighways.com';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('⚠️  ADMIN_PASSWORD not set in environment variables');
      return null;
    }

    if (email === adminEmail) {
      // For development, allow plain text password comparison
      // In production, you should hash the password
      if (password === adminPassword) {
        return { email, role: 'admin' };
      }

      // Also support bcrypt hashed passwords
      try {
        const match = await bcrypt.compare(password, adminPassword);
        if (match) {
          return { email, role: 'admin' };
        }
      } catch (err) {
        // If password is not hashed, the comparison will fail
      }
    }

    return null;
  };

  const router = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.JWT_SECRET || 'some-secret-password-at-least-32-characters-long',
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      secret: process.env.JWT_SECRET || 'some-secret-password-at-least-32-characters-long',
    }
  );

  return router;
};

module.exports = { createAdminJS, createAdminRouter };
