const mongoose = require('mongoose');
const slugify = require('slugify');

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const projectImpactSchema = new mongoose.Schema({
  title: String,
  description: String,
  metrics: [metricSchema],
}, { _id: false });

const policyCardSchema = new mongoose.Schema({
  icon: String,
  title: { type: String, required: true },
  description: String,
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  location: {
    type: String,
    trim: true,
  },
  studyType: {
    type: String,
    trim: true,
  },
  date: Date,
  shortDescription: {
    type: String,
    maxlength: 500,
  },
  description: {
    type: String,
    required: true,
  },
  mainImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  gallery: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  }],
  tags: [String],
  category: {
    type: String,
    trim: true,
    index: true,
  },
  client: String,
  duration: String,
  impact: projectImpactSchema,
  policyCards: [policyCardSchema],
  featured: {
    type: Boolean,
    default: false,
    index: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
    index: true,
  },
}, {
  timestamps: true,
});

// Auto-generate slug from title if not provided
projectSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Compound index for filtering
projectSchema.index({ status: 1, featured: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
