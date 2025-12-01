/**
 * Script to fix Media collection indexes
 * This removes the text index that causes issues with AdminJS filtering
 * and creates regular indexes instead
 *
 * Run this script with: node scripts/fix-media-indexes.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

async function fixMediaIndexes() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    // Get the Media collection
    const db = mongoose.connection.db;
    const mediaCollection = db.collection('media');

    // Get existing indexes
    console.log('\nCurrent indexes:');
    const existingIndexes = await mediaCollection.indexes();
    existingIndexes.forEach(index => {
      console.log(`- ${index.name}:`, JSON.stringify(index.key));
    });

    // Drop the text index if it exists
    console.log('\nDropping text indexes...');
    try {
      await mediaCollection.dropIndex('originalFilename_text_alt_text');
      console.log('✓ Dropped text index');
    } catch (error) {
      if (error.code === 27) {
        console.log('- Text index does not exist (already removed)');
      } else {
        console.log('- Could not drop text index:', error.message);
      }
    }

    // Create new regular indexes
    console.log('\nCreating new indexes...');

    await mediaCollection.createIndex({ originalFilename: 1 });
    console.log('✓ Created index on originalFilename');

    await mediaCollection.createIndex({ folder: 1 });
    console.log('✓ Created index on folder');

    await mediaCollection.createIndex({ alt: 1 });
    console.log('✓ Created index on alt');

    await mediaCollection.createIndex({ createdAt: -1 });
    console.log('✓ Created index on createdAt');

    // Show new indexes
    console.log('\nNew indexes:');
    const newIndexes = await mediaCollection.indexes();
    newIndexes.forEach(index => {
      console.log(`- ${index.name}:`, JSON.stringify(index.key));
    });

    console.log('\n✅ Media indexes fixed successfully!');
    console.log('You can now use AdminJS filters without errors.\n');

  } catch (error) {
    console.error('❌ Error fixing indexes:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

fixMediaIndexes();
