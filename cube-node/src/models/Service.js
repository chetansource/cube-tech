const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
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

// Index for sorting
serviceSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Service', serviceSchema);
