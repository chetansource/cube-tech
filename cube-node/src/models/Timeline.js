const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    enum: ['left', 'right'],
  },
  title: String,
  content: String,
  isPodcast: {
    type: Boolean,
    default: false,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  link: String,
  icon: String,
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

timelineSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Timeline', timelineSchema);
