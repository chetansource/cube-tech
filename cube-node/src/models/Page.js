const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  title: { type: String, maxlength: 60 },
  description: { type: String, maxlength: 160 },
  keywords: [{ type: String }],
  ogImage: { type: String },
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const locationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  address: { type: String, required: true },
}, { _id: false });

const socialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
}, { _id: false });

// Define section schemas for different block types
const sectionSchema = new mongoose.Schema({
  blockType: {
    type: String,
    required: true,
    enum: [
      'faqSection',
      'contact-info',
      'careerTitle',
      'jobListSection',
      'heroSection',
      'exploreCardsSection',
      'servicesSection',
      'projectsSection',
      'statsSection',
      'partnersSection',
      'testimonialsSection',
      'aboutSection',
      'timelineSection',
      'awardsSection',
      'solutionsSection',
      'ctaSection'
    ]
  },
  // FAQ Section fields
  faqs: [faqSchema],

  // Contact Info fields
  phone: String,
  email: String,
  locations: [locationSchema],
  socials: [socialSchema],

  // Career Title fields
  headingLine1: String,
  headingLine2: String,
  description: String,

  // Job List Section
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],

  // Hero Section fields
  heading: String,
  subheading: String,
  ctaText: String,
  ctaLink: String,
  backgroundImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  },

  // Explore Cards Section (for Career page)
  cards: [{
    title: String,
    content: String,
    date: String,
    cardType: { type: String, enum: ['text', 'featured', 'image'] },
    bgColor: String,
    textColor: String,
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media'
    }
  }],

  // Generic content fields
  title: String,
  content: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  },
  items: [mongoose.Schema.Types.Mixed],
}, { _id: false, strict: false }); // strict: false allows flexible fields per block type

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  sections: [sectionSchema],
  seo: seoSchema,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
    index: true,
  },
  publishedAt: Date,
}, {
  timestamps: true,
});

// Auto-set publishedAt when status changes to published
pageSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Page', pageSchema);
