const mongoose = require('mongoose');

const popularSearchSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    trim: true,
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

module.exports = mongoose.model('PopularSearch', popularSearchSchema);
