const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const Project = require('../models/Project');
const Resource = require('../models/Resource');

/**
 * GET /api/sitemap.xml
 * Generate XML sitemap for SEO
 */
router.get('/', async (req, res, next) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // Fetch all published pages
    const pages = await Page.find({ status: 'published' }).select('slug updatedAt').lean();
    const projects = await Project.find({ status: 'published' }).select('slug updatedAt').lean();
    const resources = await Resource.find({ status: 'published' }).select('slug updatedAt').lean();

    // Build sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add pages
    pages.forEach(page => {
      const url = page.slug === 'homepage' ? baseUrl : `${baseUrl}/${page.slug}`;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page.slug === 'homepage' ? '1.0' : '0.8'}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add projects
    projects.forEach(project => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(project.updatedAt).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += '  </url>\n';
    });

    // Add resources
    resources.forEach(resource => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/resources/${resource.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(resource.updatedAt).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
