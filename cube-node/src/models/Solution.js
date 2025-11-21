const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  idString: {
    type: String, // e.g., "01", "02", "03"
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
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

solutionSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('Solution', solutionSchema);
