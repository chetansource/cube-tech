const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
  website: String,
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

partnerSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Partner', partnerSchema);
