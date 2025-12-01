/**
 * Script to check SiteSettings footer socials data
 * This helps debug what's actually stored in the database
 *
 * Run this script with: node scripts/check-site-settings.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const SiteSettings = require('../src/models/SiteSettings');
const Media = require('../src/models/Media');

async function checkSiteSettings() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!\n');

    // Get site settings
    const settings = await SiteSettings.getInstance();

    if (!settings) {
      console.log('❌ No site settings found!');
      return;
    }

    console.log('=== SITE SETTINGS ===\n');

    // Check footer socials
    if (settings.footer && settings.footer.socials) {
      console.log('Footer Socials:');
      console.log('Total socials:', settings.footer.socials.length);
      console.log('');

      for (let i = 0; i < settings.footer.socials.length; i++) {
        const social = settings.footer.socials[i];
        console.log(`[${i + 1}] ${social.platform}:`);
        console.log(`  URL: ${social.url}`);
        console.log(`  Icon type: ${typeof social.icon}`);
        console.log(`  Icon value: ${social.icon}`);

        // Check if it's an ObjectId
        if (social.icon) {
          const isObjectId = mongoose.Types.ObjectId.isValid(social.icon);
          console.log(`  Is ObjectId: ${isObjectId}`);

          if (isObjectId) {
            // Try to find the media
            const media = await Media.findById(social.icon);
            if (media) {
              console.log(`  ✓ Media found: ${media.originalFilename}`);
              console.log(`    URL: ${media.url}`);
            } else {
              console.log(`  ✗ Media not found!`);
            }
          } else {
            console.log(`  ⚠ Icon is stored as string, not ObjectId!`);
            console.log(`  Need to fix: This should be an ObjectId reference`);
          }
        } else {
          console.log(`  ✗ No icon set`);
        }
        console.log('');
      }
    } else {
      console.log('❌ No footer socials found!');
    }

    console.log('\n=== SUGGESTIONS ===');
    console.log('If icons are stored as strings:');
    console.log('1. Go to AdminJS Site Settings');
    console.log('2. For each social, click the icon field');
    console.log('3. Select the media from the dropdown (not type the filename)');
    console.log('4. Save the settings');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

checkSiteSettings();
