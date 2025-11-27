require('dotenv').config();
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const uploadFeature = require('@adminjs/upload');
const bcrypt = require('bcryptjs');
const path = require('path');
const { s3Client, AWS_CONFIG } = require('../config/aws');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const AWS = require('aws-sdk'); // AWS SDK v2 for @adminjs/upload

// Configure AWS SDK v2 for @adminjs/upload (without ACL)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
  s3ForcePathStyle: false,
  signatureVersion: 'v4',
});

// Monkey-patch AWS.S3 upload to remove ACL parameter
const originalUpload = AWS.S3.prototype.upload;
AWS.S3.prototype.upload = function(params, options, callback) {
  // Remove ACL from params if it exists
  if (params && params.ACL) {
    delete params.ACL;
  }
  return originalUpload.call(this, params, options, callback);
};

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
const PopularSearch = require('../models/PopularSearch');

// Register adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Custom S3 Upload Provider for AdminJS (AWS SDK v3 - No ACL)
const customS3Provider = {
  upload: async (file, key) => {
    const timestamp = Date.now();
    const finalKey = key || `media/${timestamp}-${file.name}`;

    const params = {
      Bucket: AWS_CONFIG.bucket,
      Key: finalKey,
      Body: file,
      ContentType: file.mimetype || file.type,
      // NO ACL - relies on bucket policy for public access
    };

    try {
      const upload = new Upload({
        client: s3Client,
        params: params,
      });

      await upload.done();

      const url = `https://${AWS_CONFIG.bucket}.s3.${AWS_CONFIG.region}.amazonaws.com/${finalKey}`;

      return {
        key: finalKey,
        bucket: AWS_CONFIG.bucket,
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error(`Failed to upload to S3: ${error.message}`);
    }
  },
  delete: async (key, bucket) => {
    console.log('Delete file:', key);
    // Optional: implement delete if needed
  },
};

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
          actions: {
            clone: {
              actionType: 'record',
              icon: 'Copy',
              label: 'Clone',
              component: false,
              isVisible: true,
              isAccessible: true,
              handler: async (request, response, context) => {
                const { record, currentAdmin, resource, h } = context;

                try {
                  console.log('=== CLONE ACTION STARTED ===');
                  console.log('Record ID:', record.id());

                  // Get the original resource data
                  const originalResource = await Resource.findById(record.id());
                  console.log('Original resource found:', originalResource ? 'YES' : 'NO');

                  if (!originalResource) {
                    console.log('ERROR: Resource not found');
                    return {
                      record: record.toJSON(currentAdmin),
                      notice: {
                        message: 'Resource not found',
                        type: 'error',
                      },
                    };
                  }

                  // Create a clone with modified title and slug
                  const timestamp = Date.now();
                  const clonedData = {
                    category: originalResource.category,
                    title: `${originalResource.title} (Copy)`,
                    slug: `${originalResource.slug}-copy-${timestamp}`,
                    description: originalResource.description,
                    content: originalResource.content,
                    image: originalResource.image,
                    author: originalResource.author,
                    tags: originalResource.tags,
                    featured: originalResource.featured,
                    categoryColor: originalResource.categoryColor,
                    readTime: originalResource.readTime,
                    status: 'draft', // Set to draft to avoid accidental publishing
                    date: new Date(),
                    publishedAt: null,
                  };

                  console.log('Creating clone with slug:', clonedData.slug);

                  // Create the new resource
                  const clonedResource = await Resource.create(clonedData);
                  console.log('Clone created successfully with ID:', clonedResource._id);

                  const redirectUrl = h.resourceUrl({ resourceId: resource._name });
                  console.log('Redirect URL:', redirectUrl);
                  console.log('=== CLONE ACTION COMPLETED ===');

                  return {
                    record: record.toJSON(currentAdmin),
                    redirectUrl: redirectUrl,
                    notice: {
                      message: `Resource cloned successfully! Look for "${clonedData.title}" in the list.`,
                      type: 'success',
                    },
                  };
                } catch (error) {
                  console.error('=== CLONE ERROR ===');
                  console.error('Error message:', error.message);
                  console.error('Error stack:', error.stack);
                  return {
                    record: record.toJSON(currentAdmin),
                    notice: {
                      message: `Failed to clone: ${error.message}`,
                      type: 'error',
                    },
                  };
                }
              },
            },
          },
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
          actions: {
            delete: {
              actionType: 'record',
              handler: async (request, response, context) => {
                const { record, resource, h } = context;

                if (request.method === 'post') {
                  try {
                    // Use findByIdAndDelete instead of findOneAndRemove
                    await Media.findByIdAndDelete(record.id());

                    return {
                      record: record.toJSON(context.currentAdmin),
                      redirectUrl: h.resourceUrl({ resourceId: resource._name }),
                      notice: {
                        message: 'Successfully deleted',
                        type: 'success',
                      },
                    };
                  } catch (error) {
                    return {
                      record: record.toJSON(context.currentAdmin),
                      notice: {
                        message: `Error: ${error.message}`,
                        type: 'error',
                      },
                    };
                  }
                }

                return { record: record.toJSON(context.currentAdmin) };
              },
            },
            bulkDelete: {
              actionType: 'bulk',
              handler: async (request, response, context) => {
                const { records, resource, h } = context;

                if (request.method === 'post') {
                  try {
                    const ids = records.map(record => record.id());
                    const count = ids.length;

                    // Delete the records
                    await Media.deleteMany({ _id: { $in: ids } });

                    return {
                      records: [],
                      redirectUrl: h.resourceUrl({ resourceId: resource._name }),
                      notice: {
                        message: `Successfully deleted ${count} file${count > 1 ? 's' : ''}`,
                        type: 'success',
                      },
                    };
                  } catch (error) {
                    return {
                      records: records.map(record => record.toJSON(context.currentAdmin)),
                      notice: {
                        message: `Error: ${error.message}`,
                        type: 'error',
                      },
                    };
                  }
                }

                return { records: records.map(record => record.toJSON(context.currentAdmin)) };
              },
            },
          },
          properties: {
            file: {
              type: 'string',
              isVisible: { list: false, filter: false, show: false, edit: true },
            },
            url: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
            s3Key: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
            s3Bucket: {
              isVisible: { list: false, filter: false, show: false, edit: false },
            },
            filename: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
            originalFilename: {
              isVisible: { list: true, filter: true, show: true, edit: true },
            },
            mimeType: {
              isVisible: { list: true, filter: true, show: true, edit: false },
            },
            fileSize: {
              isVisible: { list: true, filter: false, show: true, edit: false },
            },
            alt: {
              isVisible: { list: false, filter: false, show: true, edit: true },
            },
            caption: {
              isVisible: { list: false, filter: false, show: true, edit: true },
            },
            width: {
              isVisible: { list: false, filter: false, show: true, edit: true },
            },
            height: {
              isVisible: { list: false, filter: false, show: true, edit: true },
            },
            folder: {
              isVisible: { list: true, filter: true, show: true, edit: true },
            },
            uploadedBy: {
              isVisible: { list: false, filter: false, show: true, edit: true },
            },
            createdAt: {
              isVisible: { list: true, filter: false, show: true, edit: false },
            },
            updatedAt: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
          },
          listProperties: ['originalFilename', 'mimeType', 'fileSize', 'folder', 'createdAt'],
          filterProperties: ['originalFilename', 'mimeType', 'folder'],
          titleProperty: 'originalFilename', // Show originalFilename in selection dropdowns
          showProperties: ['originalFilename', 'filename', 'url', 's3Key', 'mimeType', 'fileSize', 'alt', 'caption', 'width', 'height', 'folder', 'uploadedBy', 'createdAt', 'updatedAt'],
        },
        features: [
          uploadFeature({
            provider: {
              aws: {
                bucket: AWS_CONFIG.bucket,
                region: AWS_CONFIG.region,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                s3Options: {
                  // Prevent ACL from being set
                  params: {},
                  // Don't set ACL
                  ACL: undefined,
                },
              },
            },
            properties: {
              key: 's3Key',
              file: 'file',
              filePath: 'url',
              filename: 'filename', // Maps uploaded filename to filename field, leaving originalFilename manually editable
              mimeType: 'mimeType',
              size: 'fileSize',
            },
            validation: {
              mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg', 'image/svg+xml', 'application/pdf'],
            },
            uploadPath: (record, filename) => `media/${Date.now()}-${filename}`,
          }),
        ],
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
            projects: {
              type: 'reference',
              reference: 'Project',
              isArray: true,
            },
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
        resource: PopularSearch,
        options: {
          navigation: { name: 'Site Elements', icon: 'Search' },
          listProperties: ['term', 'order', 'active', 'updatedAt'],
          filterProperties: ['term', 'active'],
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
      cookie: {
        httpOnly: true,
        secure: false, // Disable secure cookie to allow HTTP/IP access
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    },
    // Custom form override to disable CSP
    {
      formidable: {},
    }
  );

  // Add middleware to remove CSP headers for AdminJS routes
  router.use((_req, res, next) => {
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('Content-Security-Policy-Report-Only');
    next();
  });

  return router;
};

module.exports = { createAdminJS, createAdminRouter };
