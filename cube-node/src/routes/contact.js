const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const emailService = require('../services/emailService');
const { validate } = require('../middleware/validation');
const { formLimiter } = require('../middleware/rateLimiter');

/**
 * POST /api/contact-submissions
 * Submit contact form
 */
router.post(
  '/',
  formLimiter,
  validate('contactSubmission'),
  async (req, res, next) => {
    try {
      const { name, email, phone, interestedField, message } = req.body;

      // Create contact submission
      const submission = await ContactSubmission.create({
        name,
        email,
        phone,
        interestedField,
        message,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      // Send email notifications (non-blocking)
      Promise.all([
        emailService.sendContactNotification(submission),
        emailService.sendContactConfirmation(email, name),
      ]).catch(err => console.error('Email notification error:', err));

      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        doc: {
          id: submission._id,
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          interestedField: submission.interestedField,
          message: submission.message,
          submittedAt: submission.submittedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
