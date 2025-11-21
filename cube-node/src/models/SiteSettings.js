const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String,
}, { _id: false });

const socialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: String,
}, { _id: false });

const globalSEOSchema = new mongoose.Schema({
  defaultTitle: String,
  defaultDescription: String,
  defaultKeywords: [String],
  ogImage: String,
}, { _id: false });

const analyticsSchema = new mongoose.Schema({
  googleAnalyticsId: String,
  facebookPixelId: String,
}, { _id: false });

const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Cube Highways',
  },
  siteUrl: {
    type: String,
    default: 'https://cubehighways.com',
  },
  logo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  favicon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  contactInfo: contactInfoSchema,
  socialMedia: [socialMediaSchema],
  seo: globalSEOSchema,
  analytics: analyticsSchema,
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Only allow one site settings document
siteSettingsSchema.statics.getInstance = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
