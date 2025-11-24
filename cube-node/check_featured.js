const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cubehighways')
  .then(async () => {
    console.log('Connected to MongoDB');

    const Resource = mongoose.model('Resource', new mongoose.Schema({}, { strict: false }));

    // Find all resources
    const allResources = await Resource.find({}).select('title slug category featured status date publishedAt');
    console.log('\n=== ALL RESOURCES ===');
    console.log('Total resources:', allResources.length);
    console.log('');

    // Find featured and published
    const featuredResources = await Resource.find({
      featured: true,
      status: 'published'
    }).select('title slug category featured status date publishedAt');

    console.log('=== FEATURED & PUBLISHED RESOURCES ===');
    console.log('Total found:', featuredResources.length);
    console.log('');

    if (featuredResources.length === 0) {
      console.log('❌ No featured resources found!');
      console.log('\nShowing all resources to help debug:\n');

      allResources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.title}`);
        console.log(`   Featured: ${resource.featured || false}`);
        console.log(`   Status: ${resource.status}`);
        console.log('');
      });
    } else {
      featuredResources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.title}`);
        console.log(`   Slug: ${resource.slug}`);
        console.log(`   Category: ${resource.category}`);
        console.log(`   Featured: ${resource.featured}`);
        console.log(`   Status: ${resource.status}`);
        console.log('');
      });
      console.log(`✅ Found ${featuredResources.length} featured resources`);
    }

    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
