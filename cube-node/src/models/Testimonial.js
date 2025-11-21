const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  position: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
});

testimonialSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
