const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  hasIcon: {
    type: Boolean,
    default: false,
  },
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

statSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Stat', statSchema);
