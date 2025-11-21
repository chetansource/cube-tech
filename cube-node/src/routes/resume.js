const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const Media = require('../models/Media');
const Job = require('../models/Job');
const emailService = require('../services/emailService');
const { validate } = require('../middleware/validation');
const { formLimiter } = require('../middleware/rateLimiter');

/**
 * POST /api/resumes
 * Submit resume/CV
 */
router.post(
  '/',
  formLimiter,
  validate('resumeSubmission'),
  async (req, res, next) => {
    try {
      const { fullName, number, jobId, resumeUpload } = req.body;

      // Validate that resumeUpload (Media ID) exists
      const media = await Media.findById(resumeUpload);
      if (!media) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid resume file ID',
            code: 'INVALID_MEDIA_ID',
          },
        });
      }

      // Validate that file is a PDF or DOC
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(media.mimeType)) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Resume must be a PDF, DOC, or DOCX file',
            code: 'INVALID_FILE_TYPE',
          },
        });
      }

      // Validate jobId if provided
      if (jobId) {
        const job = await Job.findById(jobId);
        if (!job) {
          return res.status(400).json({
            success: false,
            error: {
              message: 'Invalid job ID',
              code: 'INVALID_JOB_ID',
            },
          });
        }
      }

      // Create resume submission
      const resume = await Resume.create({
        fullName,
        number,
        jobId: jobId || null,
        resumeUpload,
      });

      // Populate the resume upload for response
      await resume.populate('resumeUpload');

      // Send email notification (non-blocking)
      emailService.sendResumeNotification({
        fullName,
        number,
        jobId,
        resumeUrl: media.url,
      }).catch(err => console.error('Email notification error:', err));

      res.status(201).json({
        success: true,
        message: 'Resume submitted successfully',
        doc: {
          id: resume._id,
          fullName: resume.fullName,
          number: resume.number,
          jobId: resume.jobId,
          resumeUpload: {
            id: resume.resumeUpload._id,
            url: resume.resumeUpload.url,
            filename: resume.resumeUpload.filename,
          },
          status: resume.status,
          submittedAt: resume.submittedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
