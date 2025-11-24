const mongoose = require('mongoose');
const slugify = require('slugify');

const resourceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['NEWS', 'BLOG', 'CASESTUDY', 'PODCAST'],
    index: true,
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  content: {
    type: String, // Full HTML content for detail page
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  author: {
    type: String,
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
    index: true,
  },
  categoryColor: {
    type: String,
    default: '#007bff',
  },
  readTime: {
    type: Number, // in minutes
  },
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

// Auto-generate slug from title if not provided
resourceSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Auto-set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Compound index for filtering
resourceSchema.index({ category: 1, status: 1, publishedAt: -1 });

module.exports = mongoose.model('Resource', resourceSchema);
