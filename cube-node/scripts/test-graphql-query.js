/**
 * Script to test SiteSettings GraphQL query
 * This simulates what the frontend does
 *
 * Run this script with: node scripts/test-graphql-query.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { graphql, buildSchema } = require('graphql');
const typeDefs = require('../src/graphql/typeDefs');
const generalResolvers = require('../src/graphql/resolvers/generalResolvers');
// Load models
const Media = require('../src/models/Media');
const SiteSettings = require('../src/models/SiteSettings');

async function testGraphQLQuery() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!\n');

    // Test the SiteSettings query
    console.log('=== TESTING GRAPHQL QUERY ===\n');

    const result = await generalResolvers.Query.SiteSettings();

    console.log('Footer Socials from GraphQL:');
    console.log('Total socials:', result.footer?.socials?.length || 0);
    console.log('');

    if (result.footer && result.footer.socials) {
      for (let i = 0; i < result.footer.socials.length; i++) {
        const social = result.footer.socials[i];
        console.log(`[${i + 1}] ${social.platform}:`);
        console.log(`  URL: ${social.url}`);
        console.log(`  Icon:`, social.icon);

        if (social.icon) {
          console.log(`  Icon URL: ${social.icon.url}`);
          console.log(`  Icon originalFilename: ${social.icon.originalFilename}`);
          console.log(`  ✓ Icon is populated!`);
        } else {
          console.log(`  ✗ Icon is NOT populated!`);
        }
        console.log('');
      }
    }

    console.log('\n=== RESULT ===');
    if (result.footer?.socials?.every(s => s.icon?.url)) {
      console.log('✅ All social icons are properly populated!');
      console.log('The frontend should now display the icons.');
    } else {
      console.log('❌ Some icons are not populated.');
      console.log('Check the GraphQL resolver.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

testGraphQLQuery();
