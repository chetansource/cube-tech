require('dotenv').config();
const mongoose = require('mongoose');
const connectDatabase = require('./src/config/database');
const Service = require('./src/models/Service');

async function generateSlugs() {
  await connectDatabase();

  const services = await Service.find({ $or: [{ slug: null }, { slug: '' }, { slug: { $exists: false } }] });

  console.log(`Found ${services.length} services without slugs`);

  for (const service of services) {
    await service.save(); // triggers pre-save hook which generates slug
    console.log(`Generated slug for "${service.title}": ${service.slug}`);
  }

  console.log('Done!');
  process.exit(0);
}

generateSlugs().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
