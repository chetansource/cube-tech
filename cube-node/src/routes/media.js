const express = require('express');
const router = express.Router();
const multer = require('multer');
const Media = require('../models/Media');
const s3Service = require('../services/s3Service');
const imageService = require('../services/imageService');
const { uploadLimiter } = require('../middleware/rateLimiter');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Allowed file types
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDF, DOC, and DOCX files are allowed.'));
    }
  },
});

/**
 * POST /api/media
 * Upload file to S3
 */
router.post(
  '/',
  uploadLimiter,
  upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'No file provided',
            code: 'NO_FILE',
          },
        });
      }

      const { alt, caption, folder } = req.body;
      const file = req.file;

      let uploadBuffer = file.buffer;
      let width, height;

      // Optimize images
      if (imageService.isImage(file.mimetype)) {
        try {
          const optimized = await imageService.optimizeImage(file.buffer, {
            quality: 85,
            format: 'webp',
          });
          uploadBuffer = optimized.buffer;
          width = optimized.width;
          height = optimized.height;

          // Update filename to .webp if it was an image
          const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '');
          file.originalname = `${originalNameWithoutExt}.webp`;
        } catch (error) {
          console.error('Image optimization error:', error);
          // Continue with original buffer if optimization fails
          const dimensions = await imageService.getImageDimensions(file.buffer);
          width = dimensions.width;
          height = dimensions.height;
        }
      }

      // Upload to S3
      const { url, key } = await s3Service.uploadFile(
        uploadBuffer,
        file.originalname,
        file.mimetype,
        folder || 'general'
      );

      // Save media metadata to database
      const media = await Media.create({
        filename: key.split('/').pop(),
        originalFilename: file.originalname,
        mimeType: file.mimetype,
        fileSize: uploadBuffer.length,
        url,
        s3Key: key,
        s3Bucket: process.env.AWS_S3_BUCKET,
        alt: alt || '',
        caption: caption || '',
        width,
        height,
        folder: folder || 'general',
      });

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        doc: {
          id: media._id,
          filename: media.filename,
          originalFilename: media.originalFilename,
          url: media.url,
          mimeType: media.mimeType,
          fileSize: media.fileSize,
          width: media.width,
          height: media.height,
          alt: media.alt,
          caption: media.caption,
          folder: media.folder,
          createdAt: media.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/media
 * List all media files (for admin)
 */
router.get('/', async (req, res, next) => {
  try {
    const { folder, limit = 20, page = 1 } = req.query;

    const query = folder ? { folder } : {};
    const skip = (page - 1) * limit;

    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const totalDocs = await Media.countDocuments(query);

    res.json({
      success: true,
      docs: media,
      totalDocs,
      page: parseInt(page),
      totalPages: Math.ceil(totalDocs / limit),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/media/:id
 * Delete media file (for admin)
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Media not found',
          code: 'NOT_FOUND',
        },
      });
    }

    // Delete from S3
    await s3Service.deleteFile(media.s3Key);

    // Delete from database
    await Media.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
