/**
 * Script to find orphaned media records (database has record but S3 file doesn't exist)
 * Run this script with: node scripts/find-orphaned-media.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
const Media = require('../src/models/Media');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function checkIfFileExists(bucket, key) {
  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: bucket,
      Key: key
    }));
    return true;
  } catch (error) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw error;
  }
}

async function findOrphanedMedia() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!\n');

    console.log('Fetching all media records...');
    const allMedia = await Media.find({});
    console.log(`Found ${allMedia.length} media records\n`);

    console.log('Checking which files exist in S3...\n');
    const orphaned = [];

    for (const media of allMedia) {
      if (media.s3Key) {
        const exists = await checkIfFileExists(media.s3Bucket, media.s3Key);

        if (!exists) {
          orphaned.push(media);
          console.log(`❌ MISSING: ${media.originalFilename}`);
          console.log(`   ID: ${media._id}`);
          console.log(`   S3 Key: ${media.s3Key}`);
          console.log(`   URL: ${media.url}\n`);
        } else {
          console.log(`✓ ${media.originalFilename}`);
        }
      }
    }

    console.log('\n=== SUMMARY ===');
    console.log(`Total records: ${allMedia.length}`);
    console.log(`Orphaned records (file missing in S3): ${orphaned.length}`);

    if (orphaned.length > 0) {
      console.log('\n⚠️  ACTION REQUIRED:');
      console.log('The following media records have no file in S3:');
      orphaned.forEach(media => {
        console.log(`  - ${media.originalFilename} (ID: ${media._id})`);
      });
      console.log('\nYou should:');
      console.log('1. Re-upload these files in AdminJS, OR');
      console.log('2. Delete these orphaned records');
    } else {
      console.log('\n✅ All media records have corresponding files in S3!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

findOrphanedMedia();
