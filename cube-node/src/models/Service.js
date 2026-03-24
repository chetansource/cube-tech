const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Rich HTML content for detail page
  },
  contentImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  icon: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  features: [String],
  order: {
    type: Number,
    default: 0,
  },
  link: String,
  active: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
});

// Auto-generate slug from title if not provided
serviceSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Index for sorting
serviceSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Service', serviceSchema);
