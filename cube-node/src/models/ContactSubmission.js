const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  interestedField: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'Project Development',
      'Investment Opportunities',
      'Partnership',
      'General Inquiry',
      'Media Relations',
      'Other',
    ],
  },
  message: {
    type: String,
    maxlength: 2000,
  },
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'archived'],
    default: 'new',
    index: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for sorting by submission date
contactSubmissionSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);
