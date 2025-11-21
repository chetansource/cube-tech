const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalFilename: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number, // in bytes
    required: true,
  },
  url: {
    type: String, // Full S3 URL
    required: true,
  },
  s3Key: {
    type: String, // S3 object key
    required: true,
  },
  s3Bucket: {
    type: String,
  },
  alt: {
    type: String, // Alt text for images (accessibility + SEO)
  },
  caption: String,
  width: Number, // For images
  height: Number, // For images
  folder: {
    type: String,
    default: 'general',
  },
  uploadedBy: String,
}, {
  timestamps: true,
});

// Index for searching
mediaSchema.index({ originalFilename: 'text', alt: 'text' });
mediaSchema.index({ folder: 1, createdAt: -1 });

module.exports = mongoose.model('Media', mediaSchema);
