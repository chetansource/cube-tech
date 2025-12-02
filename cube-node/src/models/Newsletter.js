const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    index: true,
  },
  status: {
    type: String,
    enum: ['subscribed', 'unsubscribed'],
    default: 'subscribed',
    index: true,
  },
  ipAddress: String,
  userAgent: String,
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for sorting by subscription date
newsletterSchema.index({ subscribedAt: -1 });

// Prevent duplicate email subscriptions
newsletterSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingSubscription = await this.constructor.findOne({ email: this.email });
    if (existingSubscription) {
      const error = new Error('This email is already subscribed to the newsletter');
      error.code = 'DUPLICATE_EMAIL';
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
