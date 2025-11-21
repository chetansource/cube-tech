const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: Date,
  description: String,
  logo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  organization: String,
  category: String,
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

awardSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Award', awardSchema);
