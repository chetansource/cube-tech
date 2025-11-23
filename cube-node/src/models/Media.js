const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: false, // Auto-generated from originalFilename
  },
  originalFilename: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: false, // Set by upload feature
  },
  fileSize: {
    type: Number, // in bytes
    required: false, // Set by upload feature
  },
  url: {
    type: String, // Full S3 URL
    required: false, // Set by upload feature
  },
  s3Key: {
    type: String, // S3 object key
    required: false, // Set by upload feature
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

// Pre-save hook to set defaults
mediaSchema.pre('save', function(next) {
  // ALWAYS extract filename from s3Key if s3Key exists
  // This is the actual filename stored on S3 (with timestamp)
  if (this.s3Key) {
    // Extract just the filename from the S3 key (e.g., "media/12345-file.jpg" -> "12345-file.jpg")
    const keyParts = this.s3Key.split('/');
    this.filename = keyParts[keyParts.length - 1];

    // Auto-generate URL from s3Key if url is not set
    if (!this.url) {
      const bucket = this.s3Bucket || process.env.AWS_S3_BUCKET || 'cube-highways-media';
      const region = process.env.AWS_REGION || 'ap-south-1';
      this.url = `https://${bucket}.s3.${region}.amazonaws.com/${this.s3Key}`;
    }
  }

  // If originalFilename is not set, use the filename as fallback
  if (!this.originalFilename && this.filename) {
    this.originalFilename = this.filename;
  }

  // Set s3Bucket from env if not provided
  if (!this.s3Bucket) {
    this.s3Bucket = process.env.AWS_S3_BUCKET || 'cube-highways-media';
  }

  next();
});

// Helper function to process s3Key and generate url/filename
function processS3KeyUpdate(update) {
  if (update.s3Key || update.$set?.s3Key) {
    const s3Key = update.s3Key || update.$set?.s3Key;
    const keyParts = s3Key.split('/');
    const filename = keyParts[keyParts.length - 1];

    // Generate URL from s3Key
    const bucket = (update.s3Bucket || update.$set?.s3Bucket) || process.env.AWS_S3_BUCKET || 'cube-highways-media';
    const region = process.env.AWS_REGION || 'ap-south-1';
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`;

    return { filename, url };
  }
  return null;
}

// Pre-update hooks to set defaults for ALL update operations
mediaSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  const processed = processS3KeyUpdate(update);

  if (processed) {
    if (update.$set) {
      update.$set.filename = processed.filename;
      update.$set.url = processed.url;
    } else {
      this.set({ filename: processed.filename, url: processed.url });
    }
  }

  next();
});

mediaSchema.pre('updateOne', function(next) {
  const update = this.getUpdate();
  const processed = processS3KeyUpdate(update);

  if (processed) {
    if (update.$set) {
      update.$set.filename = processed.filename;
      update.$set.url = processed.url;
    } else {
      this.set({ filename: processed.filename, url: processed.url });
    }
  }

  next();
});

mediaSchema.pre('updateMany', function(next) {
  const update = this.getUpdate();
  const processed = processS3KeyUpdate(update);

  if (processed) {
    if (update.$set) {
      update.$set.filename = processed.filename;
      update.$set.url = processed.url;
    } else {
      this.set({ filename: processed.filename, url: processed.url });
    }
  }

  next();
});

module.exports = mongoose.model('Media', mediaSchema);
