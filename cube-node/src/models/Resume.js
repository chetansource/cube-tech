const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    // Optional - allows general applications
  },
  resumeUpload: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'new',
    index: true,
  },
  notes: {
    type: String,
    maxlength: 1000,
  },
  reviewedBy: String,
  reviewedAt: Date,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for filtering and sorting
resumeSchema.index({ status: 1, submittedAt: -1 });
resumeSchema.index({ jobId: 1 });

module.exports = mongoose.model('Resume', resumeSchema);
