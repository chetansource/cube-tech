const mongoose = require('mongoose');

const salaryRangeSchema = new mongoose.Schema({
  min: Number,
  max: Number,
  currency: {
    type: String,
    default: 'INR',
  },
}, { _id: false });

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    trim: true,
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time',
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead'],
  },
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  salaryRange: salaryRangeSchema,
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'draft',
    index: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  closingDate: Date,
}, {
  timestamps: true,
});

// Index for filtering active jobs
jobSchema.index({ status: 1, postedDate: -1 });

module.exports = mongoose.model('Job', jobSchema);
