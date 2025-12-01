const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: false, // Auto-generated from originalFilename
  },
  originalFilename: {
    type: String,
    required: false, // Auto-generated from filename, but can be manually edited
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

// Index for searching and filtering
mediaSchema.index({ originalFilename: 1 });
mediaSchema.index({ folder: 1 });
mediaSchema.index({ alt: 1 });
mediaSchema.index({ createdAt: -1 });

// Add toString method for AdminJS display
mediaSchema.methods.toString = function() {
  return this.originalFilename || this.filename || this._id.toString();
};

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

  // Extract original filename from the timestamped filename
  // AdminJS upload adds timestamp like: "1764570272950-telegram.png"
  // We want to extract just "telegram.png" for originalFilename
  // ONLY auto-set if originalFilename is empty or if filename was just set by upload
  const wasFilenameModified = this.isModified('filename');
  const isOriginalFilenameEmpty = !this.originalFilename || this.originalFilename.trim() === '';

  if (isOriginalFilenameEmpty && this.filename && wasFilenameModified) {
    // Remove timestamp prefix (format: timestamp-filename)
    const match = this.filename.match(/^\d+-(.+)$/);
    if (match) {
      this.originalFilename = match[1]; // Extract just the original name
    } else {
      this.originalFilename = this.filename; // No timestamp found, use as-is
    }
  }

  // Set s3Bucket from env if not provided
  if (!this.s3Bucket) {
    this.s3Bucket = process.env.AWS_S3_BUCKET || 'cube-highways-media';
  }

  next();
});

// Helper function to process s3Key and generate url/filename/originalFilename
function processS3KeyUpdate(update) {
  if (update.s3Key || update.$set?.s3Key) {
    const s3Key = update.s3Key || update.$set?.s3Key;
    const keyParts = s3Key.split('/');
    const filename = keyParts[keyParts.length - 1];

    // Extract original filename from timestamped filename
    let originalFilename = filename;
    const match = filename.match(/^\d+-(.+)$/);
    if (match) {
      originalFilename = match[1]; // Remove timestamp prefix
    }

    // Generate URL from s3Key
    const bucket = (update.s3Bucket || update.$set?.s3Bucket) || process.env.AWS_S3_BUCKET || 'cube-highways-media';
    const region = process.env.AWS_REGION || 'ap-south-1';
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`;

    return { filename, url, originalFilename };
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
      // Only auto-set originalFilename if it's not already provided in the update
      // This allows manual editing in AdminJS to be preserved
      if (update.$set.originalFilename === undefined) {
        update.$set.originalFilename = processed.originalFilename;
      }
    } else {
      this.set({
        filename: processed.filename,
        url: processed.url,
        ...((!update.originalFilename) && { originalFilename: processed.originalFilename })
      });
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
      // Only auto-set if not explicitly provided
      if (update.$set.originalFilename === undefined) {
        update.$set.originalFilename = processed.originalFilename;
      }
    } else {
      this.set({
        filename: processed.filename,
        url: processed.url,
        ...((!update.originalFilename) && { originalFilename: processed.originalFilename })
      });
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
      // Only auto-set if not explicitly provided
      if (update.$set.originalFilename === undefined) {
        update.$set.originalFilename = processed.originalFilename;
      }
    } else {
      this.set({
        filename: processed.filename,
        url: processed.url,
        ...((!update.originalFilename) && { originalFilename: processed.originalFilename })
      });
    }
  }

  next();
});

module.exports = mongoose.model('Media', mediaSchema);
